import { AdSourceAdapter, RawAd, SearchParams, SourceMetadataInfo } from "./types";
import { fetchWithRetry } from "./client";

/**
 * Google Ads Transparency Center Official Adapter
 *
 * SPECIFICATION:
 * - Integrates with authorized Google Transparency endpoints or Google Ads developer services.
 * - Does NOT scrape adstransparency.google.com or bypass Google Cloud bot protections.
 * - Requires GOOGLE_API_KEY / developer token when querying authorized endpoints.
 * - Safe standby mode when uncredentialed.
 */
export class GoogleAdsTransparencyAdapter implements AdSourceAdapter {
  readonly source = 'google';
  readonly name = 'Google Ads Transparency Center (Search, YouTube, Display)';

  get metadata(): SourceMetadataInfo {
    const hasKey = Boolean(process.env.GOOGLE_API_KEY);
    return {
      available: hasKey,
      requiresCredentials: true,
      supportedCountries: ['US', 'GB', 'DE', 'FR', 'JP', 'CA', 'GLOBAL'],
      supportedPlatforms: ['YouTube', 'Google Search', 'Google Display'],
      supportedFields: [
        'adId',
        'advertiserName',
        'creativeFormat',
        'videoUrl',
        'displayUrl',
        'firstShown',
        'lastShown'
      ],
      officialSourceUrl: 'https://adstransparency.google.com/',
      description: 'Official Google public registry for commercial and political advertisements broadcasted across Google networks.',
      documentationUrl: 'https://support.google.com/adspolicy/answer/9755941'
    };
  }

  async search(params: SearchParams): Promise<RawAd[]> {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.warn('[GoogleAdsTransparencyAdapter] GOOGLE_API_KEY is not configured. Safe standby mode active.');
      return [];
    }

    const brand = params.brand || params.query || 'technology';
    const limit = Math.min(params.limit || 20, 50);

    // Authorized Google Ads Transparency developer endpoint
    const url = new URL('https://content-adstransparency.googleapis.com/v1/advertisers:search');
    url.searchParams.set('key', apiKey);
    url.searchParams.set('query', brand);
    url.searchParams.set('pageSize', String(limit));

    try {
      const response = await fetchWithRetry(url.toString(), {
        maxRetries: 3,
        baseDelayMs: 1500,
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) {
        console.error(`[GoogleAdsTransparencyAdapter] Google API returned HTTP ${response.status}`);
        return [];
      }

      const data = await response.json();
      const ads = Array.isArray(data.ads) ? data.ads : [];

      return ads.map((item: any): RawAd => {
        const isVideo = item.creativeFormat === 'VIDEO' || Boolean(item.youtubeVideoId);
        return {
          source: 'google',
          sourceAdId: item.adId || item.id || `google_${Date.now()}`,
          title: item.title || `${item.advertiserName || brand} Google Creative`,
          description: item.bodyText || item.snippet || '',
          brandName: item.advertiserName || brand,
          platformName: isVideo ? 'YouTube' : 'Google Display',
          countryCode: params.country || 'US',
          format: isVideo ? 'Video' : 'Image',
          sourceUrl: item.transparencyUrl || `https://adstransparency.google.com/advertiser/${item.advertiserId || ''}`,
          creativeUrl: item.creativeUrl || (item.youtubeVideoId ? `https://www.youtube.com/watch?v=${item.youtubeVideoId}` : undefined),
          thumbnailUrl: item.thumbnailUrl,
          firstSeen: item.firstShown ? new Date(item.firstShown) : new Date(),
          lastSeen: item.lastShown ? new Date(item.lastShown) : new Date(),
          active: true,
          tags: ['Google Ads Transparency', isVideo ? 'YouTube Ad' : 'Display Network'],
          rawPayload: item
        };
      });
    } catch (err: any) {
      console.error('[GoogleAdsTransparencyAdapter] Ingestion request failed:', err.message);
      return [];
    }
  }

  async getAd(id: string): Promise<RawAd | null> {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) return null;

    try {
      const url = `https://content-adstransparency.googleapis.com/v1/ads/${id}?key=${apiKey}`;
      const res = await fetchWithRetry(url);
      if (!res.ok) return null;
      const data = await res.json();
      return {
        source: 'google',
        sourceAdId: id,
        title: data.title,
        brandName: data.advertiserName,
        rawPayload: data
      };
    } catch {
      return null;
    }
  }
}
