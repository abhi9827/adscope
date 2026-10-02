import { AdSourceAdapter, RawAd, SearchParams, SourceMetadataInfo } from "./types";
import { fetchWithRetry } from "./client";

/**
 * LinkedIn Ad Library Official Adapter
 *
 * SPECIFICATION:
 * - Integrates with LinkedIn Marketing Developer Platform & Transparency API.
 * - Requires LINKEDIN_API_KEY / LinkedIn Developer OAuth token.
 * - Does NOT scrape or bypass LinkedIn anti-scraping / authentication safeguards.
 * - Safe standby mode when uncredentialed.
 */
export class LinkedInAdLibraryAdapter implements AdSourceAdapter {
  readonly source = 'linkedin';
  readonly name = 'LinkedIn Ad Library (B2B Commercial Content)';

  get metadata(): SourceMetadataInfo {
    const hasKey = Boolean(process.env.LINKEDIN_API_KEY);
    return {
      available: hasKey,
      requiresCredentials: true,
      supportedCountries: ['US', 'GB', 'DE', 'FR', 'CA', 'AU', 'GLOBAL'],
      supportedPlatforms: ['LinkedIn'],
      supportedFields: [
        'creativeId',
        'organizationName',
        'postContent',
        'mediaUrl',
        'callToAction',
        'startDate',
        'targetingCriteria'
      ],
      officialSourceUrl: 'https://www.linkedin.com/ad-library',
      description: 'Official transparency center for advertisements distributed to LinkedIn members globally.',
      documentationUrl: 'https://learn.microsoft.com/en-us/linkedin/marketing/'
    };
  }

  async search(params: SearchParams): Promise<RawAd[]> {
    const apiKey = process.env.LINKEDIN_API_KEY;
    if (!apiKey) {
      console.warn('[LinkedInAdLibraryAdapter] LINKEDIN_API_KEY is not configured. Safe standby mode active.');
      return [];
    }

    const brand = params.brand || params.query || 'software';
    const limit = Math.min(params.limit || 20, 50);

    const url = new URL('https://api.linkedin.com/rest/adCreatives');
    url.searchParams.set('q', 'advertiser');
    url.searchParams.set('query', brand);
    url.searchParams.set('count', String(limit));

    try {
      const response = await fetchWithRetry(url.toString(), {
        maxRetries: 3,
        baseDelayMs: 2000,
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'X-Restli-Protocol-Version': '2.0.0',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        console.error(`[LinkedInAdLibraryAdapter] LinkedIn API returned HTTP ${response.status}`);
        return [];
      }

      const data = await response.json();
      const elements = Array.isArray(data.elements) ? data.elements : [];

      return elements.map((item: any): RawAd => {
        return {
          source: 'linkedin',
          sourceAdId: item.id || `linkedin_${Date.now()}`,
          title: item.title || `${item.organizationName || brand} B2B Creative`,
          description: item.commentary || item.text || '',
          brandName: item.organizationName || brand,
          platformName: 'LinkedIn',
          countryCode: params.country || 'US',
          format: item.mediaType === 'VIDEO' ? 'Video' : 'Image',
          sourceUrl: item.shareUrl || `https://www.linkedin.com/ad-library/detail/${item.id}`,
          creativeUrl: item.mediaUrl,
          callToAction: item.callToAction?.type || 'Learn More',
          firstSeen: item.createdAt ? new Date(item.createdAt) : new Date(),
          lastSeen: new Date(),
          active: true,
          tags: ['LinkedIn B2B', 'Professional Network'],
          rawPayload: item
        };
      });
    } catch (err: any) {
      console.error('[LinkedInAdLibraryAdapter] Ingestion request failed:', err.message);
      return [];
    }
  }

  async getAd(id: string): Promise<RawAd | null> {
    const apiKey = process.env.LINKEDIN_API_KEY;
    if (!apiKey) return null;

    try {
      const url = `https://api.linkedin.com/rest/adCreatives/${id}`;
      const res = await fetchWithRetry(url, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'X-Restli-Protocol-Version': '2.0.0'
        }
      });
      if (!res.ok) return null;
      const data = await res.json();
      return {
        source: 'linkedin',
        sourceAdId: id,
        title: data.title,
        brandName: data.organizationName,
        rawPayload: data
      };
    } catch {
      return null;
    }
  }
}
