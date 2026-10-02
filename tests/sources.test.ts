import { describe, it, expect, beforeEach } from 'vitest';
import { 
  getAllSourceAdapters, 
  getSourceAdapter, 
  isSourceEnabled, 
  getSourceStatus, 
  isIngestEnabled 
} from '@/lib/sources/registry';
import { validateRawAd } from '@/lib/sources/validators';
import { normalizeAd, harmonizeFormat, slugify } from '@/lib/sources/normalize';
import { deduplicateBatch, getAdFingerprint } from '@/lib/sources/deduplicate';
import { MockSourceAdapter } from '@/lib/sources/mock-source';
import { MetaAdLibraryAdapter } from '@/lib/sources/meta-ad-library';
import { GoogleAdsTransparencyAdapter } from '@/lib/sources/google-ads-transparency';
import { TikTokCreativeCenterAdapter } from '@/lib/sources/tiktok-creative-center';
import { LinkedInAdLibraryAdapter } from '@/lib/sources/linkedin-ad-library';

describe('AdScope Source Ingestion Architecture Test Suite', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.INGEST_ENABLED;
    delete process.env.GOOGLE_SOURCE_ENABLED;
    delete process.env.META_SOURCE_ENABLED;
    delete process.env.TIKTOK_SOURCE_ENABLED;
    delete process.env.LINKEDIN_SOURCE_ENABLED;
    delete process.env.MOCK_SOURCE_ENABLED;
    delete process.env.GOOGLE_API_KEY;
    delete process.env.META_ACCESS_TOKEN;
    delete process.env.TIKTOK_API_KEY;
    delete process.env.LINKEDIN_API_KEY;
  });

  describe('Source Registry & Metadata Compliance', () => {
    it('should register all 5 adapters (Google, Meta, TikTok, LinkedIn, Mock)', () => {
      const adapters = getAllSourceAdapters();
      expect(adapters.length).toBe(5);

      const sources = adapters.map(a => a.source);
      expect(sources).toContain('google');
      expect(sources).toContain('meta');
      expect(sources).toContain('tiktok');
      expect(sources).toContain('linkedin');
      expect(sources).toContain('mock');
    });

    it('should have complete metadata for every registered adapter', () => {
      const adapters = getAllSourceAdapters();
      for (const adapter of adapters) {
        expect(adapter.name).toBeDefined();
        expect(adapter.metadata.officialSourceUrl).toMatch(/^https?:\/\//);
        expect(Array.isArray(adapter.metadata.supportedCountries)).toBe(true);
        expect(Array.isArray(adapter.metadata.supportedPlatforms)).toBe(true);
        expect(Array.isArray(adapter.metadata.supportedFields)).toBe(true);
        expect(typeof adapter.metadata.requiresCredentials).toBe('boolean');
        expect(typeof adapter.metadata.available).toBe('boolean');
      }
    });

    it('should have INGEST_ENABLED disabled by default', () => {
      expect(isIngestEnabled()).toBe(false);
      expect(isSourceEnabled('meta')).toBe(false);
      expect(isSourceEnabled('google')).toBe(false);
      expect(isSourceEnabled('tiktok')).toBe(false);
      expect(isSourceEnabled('linkedin')).toBe(false);
    });

    it('should respect source enablement flags when INGEST_ENABLED is true', () => {
      process.env.INGEST_ENABLED = 'true';
      process.env.META_SOURCE_ENABLED = 'true';

      expect(isSourceEnabled('meta')).toBe(true);
      expect(isSourceEnabled('google')).toBe(false);
      expect(getSourceStatus('meta')).toBe('requires_credentials'); // No token yet
    });

    it('should mark source available when credentials are provided', () => {
      process.env.INGEST_ENABLED = 'true';
      process.env.META_SOURCE_ENABLED = 'true';
      process.env.META_ACCESS_TOKEN = 'EAABfake_access_token_12345';

      expect(getSourceStatus('meta')).toBe('available');
    });
  });

  describe('Legitimate Provider Safety & Standby', () => {
    it('should safely return empty results from Meta adapter when token is missing without scraping', async () => {
      const meta = new MetaAdLibraryAdapter();
      expect(meta.metadata.available).toBe(false);

      const results = await meta.search({ brand: 'Nike' });
      expect(results).toEqual([]);
    });

    it('should safely return empty results from Google adapter when API key is missing without scraping', async () => {
      const google = new GoogleAdsTransparencyAdapter();
      expect(google.metadata.available).toBe(false);

      const results = await google.search({ brand: 'Apple' });
      expect(results).toEqual([]);
    });

    it('should safely return empty results from TikTok adapter when API key is missing without scraping', async () => {
      const tiktok = new TikTokCreativeCenterAdapter();
      expect(tiktok.metadata.available).toBe(false);

      const results = await tiktok.search({ brand: 'Red Bull' });
      expect(results).toEqual([]);
    });

    it('should safely return empty results from LinkedIn adapter when API key is missing without scraping', async () => {
      const linkedin = new LinkedInAdLibraryAdapter();
      expect(linkedin.metadata.available).toBe(false);

      const results = await linkedin.search({ brand: 'Microsoft' });
      expect(results).toEqual([]);
    });

    it('should return mock ads from MockSourceAdapter for safe offline testing', async () => {
      const mock = new MockSourceAdapter();
      expect(mock.metadata.available).toBe(true);
      expect(mock.metadata.requiresCredentials).toBe(false);

      const ads = await mock.search({ limit: 2 });
      expect(ads.length).toBe(2);
      expect(ads[0].brandName).toBeDefined();
      expect(ads[0].source).toBe('mock');
    });
  });

  describe('Zod Validation & Normalization', () => {
    it('should validate valid raw advertisement records', () => {
      const validRaw = {
        source: 'meta',
        sourceAdId: 'meta_12345',
        title: 'Nike Just Do It Campaign',
        brandName: 'Nike',
        platformName: 'Instagram',
        countryCode: 'US',
        format: 'Short-form Video',
        creativeUrl: 'https://example.com/ad.mp4'
      };

      const result = validateRawAd(validRaw);
      expect(result.success).toBe(true);
      expect(result.data?.brandName).toBe('Nike');
    });

    it('should reject invalid raw records missing mandatory fields', () => {
      const invalidRaw = {
        source: 'meta',
        // missing sourceAdId
        title: 'Ad Title',
        // missing brandName
      };

      const result = validateRawAd(invalidRaw);
      expect(result.success).toBe(false);
      expect(result.errors && result.errors.length).toBeGreaterThan(0);
    });

    it('should correctly slugify brand names', () => {
      expect(slugify('Nike, Inc.')).toBe('nike-inc');
      expect(slugify("L'Oréal Paris")).toBe('loral-paris');
      expect(slugify('Coca-Cola & Sprite')).toBe('coca-cola-sprite');
    });

    it('should harmonize varied platform format names', () => {
      expect(harmonizeFormat('Reel')).toBe('Short-form Video');
      expect(harmonizeFormat('TikTok Video')).toBe('Short-form Video');
      expect(harmonizeFormat('Carousel Gallery')).toBe('Carousel');
      expect(harmonizeFormat('Static Image')).toBe('Image');
      expect(harmonizeFormat('Sponsored Search')).toBe('Text');
      expect(harmonizeFormat('Standard TV Commercial')).toBe('Video');
    });

    it('should normalize a raw ad into the unified AdScope schema with sourceMetadata JSON', () => {
      const raw = {
        source: 'mock' as const,
        sourceAdId: 'mock_99',
        title: 'Special Edition Reveal',
        description: 'New model unveiling live.',
        brandName: 'Tesla',
        platformName: 'YouTube',
        countryCode: 'US',
        format: 'Video',
        creativeUrl: 'https://example.com/video.mp4',
        rawPayload: { originalId: 9942, internalPacing: 'fast' }
      };

      const norm = normalizeAd(raw);
      expect(norm.success).toBe(true);
      expect(norm.data?.brandSlug).toBe('tesla');
      expect(norm.data?.country).toBe('United States');
      expect(norm.data?.format).toBe('Video');
      expect(norm.data?.isDemo).toBe(true);
      expect(norm.data?.sourceMetadata.originalId).toBe(9942);
      expect(norm.data?.sourceMetadata.internalPacing).toBe('fast');
    });
  });

  describe('Deduplication Engine', () => {
    it('should generate consistent deterministic fingerprints', () => {
      const key1 = getAdFingerprint({ source: 'meta', sourceAdId: '12345' });
      const key2 = getAdFingerprint({ source: 'META', sourceAdId: '12345  ' });
      expect(key1).toBe('meta::12345');
      expect(key2).toBe('meta::12345');
    });

    it('should deduplicate duplicate ads in a batch and preserve unique ones', () => {
      const mockRaw = {
        source: 'mock' as const,
        sourceAdId: 'mock_dup_01',
        title: 'Ad Title',
        description: 'Desc',
        brandName: 'Nike',
        platformName: 'Meta',
        countryCode: 'US',
        format: 'Video',
        rawPayload: {}
      };

      const norm1 = normalizeAd(mockRaw).data!;
      const norm2 = normalizeAd({ ...mockRaw, title: 'Duplicate Instance' }).data!;
      const norm3 = normalizeAd({ ...mockRaw, sourceAdId: 'mock_unique_02' }).data!;

      const result = deduplicateBatch([norm1, norm2, norm3]);
      expect(result.unique.length).toBe(2);
      expect(result.duplicates.length).toBe(1);
      expect(result.duplicateCount).toBe(1);
    });
  });
});
