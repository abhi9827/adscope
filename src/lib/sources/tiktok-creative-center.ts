import { AdSourceAdapter, RawAd, SearchParams, SourceMetadataInfo } from "./types";
import { fetchWithRetry } from "./client";

/**
 * TikTok Commercial Content Library / Creative Center Official Adapter
 *
 * SPECIFICATION:
 * - Integrates with TikTok Commercial Content API (business-api.tiktok.com).
 * - Requires TIKTOK_API_KEY / Developer App Credentials.
 * - Does NOT scrape, reverse-engineer mobile signatures, or bypass platform anti-bot measures.
 * - Safe standby mode when uncredentialed.
 */
export class TikTokCreativeCenterAdapter implements AdSourceAdapter {
  readonly source = 'tiktok';
  readonly name = 'TikTok Commercial Content Library & Creative Center';

  get metadata(): SourceMetadataInfo {
    const hasKey = Boolean(process.env.TIKTOK_API_KEY);
    return {
      available: hasKey,
      requiresCredentials: true,
      supportedCountries: ['US', 'GB', 'DE', 'FR', 'IT', 'ES', 'JP', 'GLOBAL'],
      supportedPlatforms: ['TikTok'],
      supportedFields: [
        'ad_id',
        'advertiser_name',
        'ad_format',
        'video_url',
        'cover_image_url',
        'ad_text',
        'first_shown_date',
        'last_shown_date',
        'targeting_summary'
      ],
      officialSourceUrl: 'https://library.tiktok.com/',
      description: 'Official repository of commercial advertisements run across TikTok pursuant to global transparency mandates.',
      documentationUrl: 'https://business-api.tiktok.com/portal/docs?id=1771100799076353'
    };
  }

  async search(params: SearchParams): Promise<RawAd[]> {
    const apiKey = process.env.TIKTOK_API_KEY;
    if (!apiKey) {
      console.warn('[TikTokCreativeCenterAdapter] TIKTOK_API_KEY is not configured. Safe standby mode active.');
      return [];
    }

    const brand = params.brand || params.query || 'sports';
    const country = (params.country || 'US').toUpperCase();
    const limit = Math.min(params.limit || 20, 50);

    const url = new URL('https://business-api.tiktok.com/open_api/v1.3/commercial_content/ad/search/');
    url.searchParams.set('search_term', brand);
    url.searchParams.set('country_code', country);
    url.searchParams.set('page_size', String(limit));

    try {
      const response = await fetchWithRetry(url.toString(), {
        maxRetries: 3,
        baseDelayMs: 2000,
        headers: {
          'Access-Token': apiKey,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        console.error(`[TikTokCreativeCenterAdapter] TikTok API returned HTTP ${response.status}`);
        return [];
      }

      const data = await response.json();
      const ads = Array.isArray(data.data?.ads) ? data.data.ads : [];

      return ads.map((item: any): RawAd => {
        return {
          source: 'tiktok',
          sourceAdId: item.ad_id || `tiktok_${Date.now()}`,
          title: item.title || `${item.advertiser_name || brand} TikTok Creative`,
          description: item.ad_text || item.caption || '',
          brandName: item.advertiser_name || brand,
          platformName: 'TikTok',
          countryCode: country,
          format: 'Short-form Video',
          sourceUrl: item.library_url || `https://library.tiktok.com/ad?id=${item.ad_id}`,
          creativeUrl: item.video_url,
          thumbnailUrl: item.cover_image_url,
          firstSeen: item.first_shown_date ? new Date(item.first_shown_date) : new Date(),
          lastSeen: item.last_shown_date ? new Date(item.last_shown_date) : new Date(),
          active: true,
          tags: ['TikTok Creative', '9:16 Video', 'Commercial Library'],
          rawPayload: item
        };
      });
    } catch (err: any) {
      console.error('[TikTokCreativeCenterAdapter] Ingestion request failed:', err.message);
      return [];
    }
  }

  async getAd(id: string): Promise<RawAd | null> {
    const apiKey = process.env.TIKTOK_API_KEY;
    if (!apiKey) return null;

    try {
      const url = `https://business-api.tiktok.com/open_api/v1.3/commercial_content/ad/get/?ad_id=${id}`;
      const res = await fetchWithRetry(url, { headers: { 'Access-Token': apiKey } });
      if (!res.ok) return null;
      const data = await res.json();
      return {
        source: 'tiktok',
        sourceAdId: id,
        title: data.data?.title,
        brandName: data.data?.advertiser_name,
        rawPayload: data
      };
    } catch {
      return null;
    }
  }
}
