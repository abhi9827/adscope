import { AdSourceAdapter, RawAd, SearchParams, SourceMetadataInfo } from "./types";
import { fetchWithRetry } from "./client";

/**
 * Meta Ad Library Official API Adapter
 *
 * SPECIFICATION:
 * - Uses the official Meta Graph API ads_archive endpoint.
 * - Requires META_ACCESS_TOKEN obtained through developers.facebook.com.
 * - Does NOT scrape, bypass protections, or violate Meta platform terms.
 * - Gracefully falls back if no token is configured.
 */
export class MetaAdLibraryAdapter implements AdSourceAdapter {
  readonly source = 'meta';
  readonly name = 'Meta Ad Library API (Instagram / Facebook)';
  
  get metadata(): SourceMetadataInfo {
    const hasToken = Boolean(process.env.META_ACCESS_TOKEN);
    return {
      available: hasToken,
      requiresCredentials: true,
      supportedCountries: ['US', 'GB', 'DE', 'FR', 'JP', 'CA', 'AU', 'IN', 'BR'],
      supportedPlatforms: ['Instagram', 'Facebook', 'Messenger', 'Audience Network'],
      supportedFields: [
        'id',
        'ad_creative_bodies',
        'ad_creative_link_captions',
        'ad_creative_link_titles',
        'ad_delivery_start_time',
        'ad_delivery_stop_time',
        'ad_snapshot_url',
        'publisher_platforms',
        'page_name'
      ],
      officialSourceUrl: 'https://www.facebook.com/ads/library/api/',
      description: 'Official transparency API covering active and inactive advertisements run across Meta platforms.',
      documentationUrl: 'https://developers.facebook.com/docs/graph-api/reference/ads_archive/'
    };
  }

  async search(params: SearchParams): Promise<RawAd[]> {
    const token = process.env.META_ACCESS_TOKEN;
    if (!token) {
      console.warn('[MetaAdLibraryAdapter] META_ACCESS_TOKEN is not configured. Safe standby mode active.');
      return [];
    }

    const searchTerm = params.query || params.brand || 'technology';
    const country = (params.country || 'US').toUpperCase();
    const limit = Math.min(params.limit || 25, 100);

    const url = new URL('https://graph.facebook.com/v20.0/ads_archive');
    url.searchParams.set('access_token', token);
    url.searchParams.set('search_terms', searchTerm);
    url.searchParams.set('ad_reached_countries', `['${country}']`);
    url.searchParams.set('ad_active_status', 'ALL');
    url.searchParams.set('limit', String(limit));
    url.searchParams.set(
      'fields',
      'id,page_name,ad_creative_bodies,ad_creative_link_captions,ad_creative_link_titles,ad_delivery_start_time,ad_delivery_stop_time,ad_snapshot_url,publisher_platforms'
    );

    try {
      const response = await fetchWithRetry(url.toString(), {
        maxRetries: 3,
        baseDelayMs: 1500,
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        console.error(`[MetaAdLibraryAdapter] Meta API error HTTP ${response.status}:`, errorJson);
        return [];
      }

      const data = await response.json();
      const items = Array.isArray(data.data) ? data.data : [];

      return items.map((item: any): RawAd => {
        const primaryText = Array.isArray(item.ad_creative_bodies) && item.ad_creative_bodies.length > 0
          ? item.ad_creative_bodies[0]
          : '';
        const headline = Array.isArray(item.ad_creative_link_titles) && item.ad_creative_link_titles.length > 0
          ? item.ad_creative_link_titles[0]
          : `${item.page_name || 'Brand'} Advertisement`;
        const platforms = Array.isArray(item.publisher_platforms) 
          ? item.publisher_platforms.join(', ') 
          : 'Meta';

        return {
          source: 'meta',
          sourceAdId: item.id,
          title: headline,
          description: primaryText,
          brandName: item.page_name || searchTerm,
          platformName: platforms.includes('instagram') ? 'Instagram' : 'Meta',
          countryCode: country,
          format: 'Video',
          sourceUrl: item.ad_snapshot_url || `https://www.facebook.com/ads/library/?id=${item.id}`,
          firstSeen: item.ad_delivery_start_time ? new Date(item.ad_delivery_start_time) : new Date(),
          lastSeen: item.ad_delivery_stop_time ? new Date(item.ad_delivery_stop_time) : new Date(),
          active: !item.ad_delivery_stop_time,
          tags: ['Meta Ad Library', 'Verified Transparency'],
          rawPayload: item
        };
      });
    } catch (err: any) {
      console.error('[MetaAdLibraryAdapter] Ingestion request failed:', err.message);
      return [];
    }
  }

  async getAd(id: string): Promise<RawAd | null> {
    const token = process.env.META_ACCESS_TOKEN;
    if (!token) return null;

    const url = new URL(`https://graph.facebook.com/v20.0/${id}`);
    url.searchParams.set('access_token', token);
    url.searchParams.set('fields', 'id,page_name,ad_creative_bodies,ad_creative_link_titles,ad_snapshot_url');

    try {
      const response = await fetchWithRetry(url.toString());
      if (!response.ok) return null;
      const item = await response.json();
      return {
        source: 'meta',
        sourceAdId: item.id,
        title: item.ad_creative_link_titles?.[0] || 'Meta Ad',
        description: item.ad_creative_bodies?.[0] || '',
        brandName: item.page_name || 'Brand',
        sourceUrl: item.ad_snapshot_url,
        rawPayload: item
      };
    } catch {
      return null;
    }
  }
}
