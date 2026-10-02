import { describe, it, expect, beforeEach } from 'vitest';
import { 
  searchAdsWithFilters, 
  getBrandCreativeProfile, 
  getCampaignTimeline, 
  getCountryWithAds,
  getCountryList,
  MOCK_ADS
} from '@/lib/db/actions';
import { findSimilarAds } from '@/lib/search/similarity';
import { 
  saveAd, 
  getSavedAds, 
  removeSavedAd, 
  updateAdNote, 
  sanitizeText, 
  createCollection, 
  getCollections, 
  recordRecentlyViewed, 
  getRecentlyViewed, 
  clearRecentlyViewed 
} from '@/lib/storage/local';
import { MockAIProvider, getAIProvider } from '@/lib/ai/provider';
import { normalizeAdRecord } from '@/lib/sources/normalize';
import { deduplicateRecords, isExactDuplicate } from '@/lib/sources/deduplicate';

// Mock localStorage for node test environment
class LocalStorageMock {
  private store: Record<string, string> = {};
  getItem(key: string) { return this.store[key] || null; }
  setItem(key: string, value: string) { this.store[key] = value.toString(); }
  removeItem(key: string) { delete this.store[key]; }
  clear() { this.store = {}; }
}

global.localStorage = new LocalStorageMock() as any;
(global as any).window = {
  dispatchEvent: () => true
};

describe('AdScope Advanced Features Test Suite', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  // 1. Creative DNA Filtering
  describe('Creative DNA Filtering', () => {
    it('should filter ads by visual style', async () => {
      const results = await searchAdsWithFilters({ creativeStyle: 'cinematic' });
      expect(results.length).toBeGreaterThan(0);
      results.forEach(ad => {
        expect(ad.creativeDna?.visualStyle?.toLowerCase()).toContain('cinematic');
      });
    });

    it('should filter ads by hook type', async () => {
      const results = await searchAdsWithFilters({ hook: 'bold statement' });
      expect(results.length).toBeGreaterThan(0);
      results.forEach(ad => {
        expect(ad.creativeDna?.hookType?.toLowerCase()).toContain('bold statement');
      });
    });
  });

  // 2. Similar Ads Service
  describe('Similar Ads Heuristic Service', () => {
    it('should find similar ads without vector database or AI', async () => {
      const targetAdId = '1'; // Nike Elite Performance
      const similar = await findSimilarAds(targetAdId, 3);
      expect(similar.length).toBeGreaterThan(0);
      expect(similar[0].score).toBeGreaterThan(0);
      expect(similar[0].reasonSummary).toBeDefined();
      expect(similar[0].ad.id).not.toBe(targetAdId);
    });
  });

  // 3. Brand Statistics & Profile
  describe('Brand Creative Profile', () => {
    it('should calculate brand format, platform, and theme breakdowns from indexed dataset', async () => {
      const profile = await getBrandCreativeProfile('nike');
      expect(profile).not.toBeNull();
      expect(profile?.brandSlug).toBe('nike');
      expect(profile?.totalIndexedAds).toBeGreaterThan(0);
      expect(profile?.disclaimer).toContain("Based on AdScope's indexed dataset.");
      expect(profile?.formats.length).toBeGreaterThan(0);
      expect(profile?.platforms.length).toBeGreaterThan(0);
    });
  });

  // 4. Campaign Timeline
  describe('Campaign Timeline', () => {
    it('should build chronological campaign timeline events', async () => {
      const timeline = await getCampaignTimeline('winning-isnt-for-everyone');
      expect(timeline).not.toBeNull();
      expect(timeline?.events.length).toBeGreaterThan(0);
      expect(timeline?.events[0].type).toBe('First indexed');
      expect(timeline?.platforms.length).toBeGreaterThan(0);
    });
  });

  // 5. Country Filtering & Explorer
  describe('Country Filtering', () => {
    it('should retrieve indexed markets and filter ads by country', async () => {
      const countries = await getCountryList();
      expect(countries.length).toBeGreaterThan(0);
      
      const usMarket = await getCountryWithAds('us');
      expect(usMarket.code).toBe('US');
      expect(usMarket.ads.length).toBeGreaterThan(0);
      expect(usMarket.disclaimer).toContain("Based on AdScope's indexed dataset.");
    });
  });

  // 6. Saved Notes, Custom Tags & Sanitization
  describe('Saved Notes & Custom Tags', () => {
    it('should save ad and sanitize personal notes to prevent script injection', () => {
      const testAd = {
        id: 'ad_test_1',
        brand: 'Nike',
        brandSlug: 'nike',
        campaign: 'Air Max 2026',
        format: 'Video',
        platform: 'TikTok',
        savedAt: new Date().toISOString()
      };

      saveAd(testAd);
      expect(getSavedAds().length).toBe(1);

      // Add unsafe script in note
      const unsafeNote = '<script>alert("hack")</script>Great visual opening hook!';
      updateAdNote('ad_test_1', unsafeNote, ['Hook', '<script>bad</script>Sports']);

      const updated = getSavedAds()[0];
      expect(updated.note).not.toContain('<script>');
      expect(updated.note).toContain('Great visual opening hook!');
      expect(updated.tags).toContain('Hook');
      expect(updated.tags).toContain('Sports');
    });

    it('should remove saved ad', () => {
      saveAd({
        id: 'ad_to_remove',
        brand: 'Apple',
        brandSlug: 'apple',
        format: 'Image',
        platform: 'Meta',
        savedAt: new Date().toISOString()
      });
      expect(getSavedAds().some(a => a.id === 'ad_to_remove')).toBe(true);

      removeSavedAd('ad_to_remove');
      expect(getSavedAds().some(a => a.id === 'ad_to_remove')).toBe(false);
    });
  });

  // 7. Collections
  describe('Collections', () => {
    it('should create custom collection and retrieve default collections', () => {
      const initial = getCollections();
      expect(initial.length).toBeGreaterThan(0);

      createCollection('Athlete-led UGC Tests', 'Curated for Q2 sprint');
      const updated = getCollections();
      expect(updated.some(c => c.name === 'Athlete-led UGC Tests')).toBe(true);
    });
  });

  // 8. Recently Viewed
  describe('Recently Viewed Tracking', () => {
    it('should record recently viewed ads up to 10 and allow clearHistory', () => {
      for (let i = 1; i <= 12; i++) {
        recordRecentlyViewed({
          id: `ad_${i}`,
          brand: 'Brand',
          brandSlug: 'brand',
          format: 'Video',
          platform: 'TikTok'
        });
      }

      const recent = getRecentlyViewed();
      expect(recent.length).toBe(10);
      expect(recent[0].id).toBe('ad_12'); // Most recent first

      clearRecentlyViewed();
      expect(getRecentlyViewed().length).toBe(0);
    });
  });

  // 9. AI Fallback Provider
  describe('AI Provider Abstraction', () => {
    it('should use MockAIProvider fallback gracefully when no API key exists', async () => {
      const provider = getAIProvider();
      expect(provider).toBeDefined();

      const idea = await provider.generateCreativeIdea({
        prompt: 'I need an advertisement for a food delivery app.',
        industry: 'Food & Beverage',
        platform: 'TikTok',
        format: 'Short-form Video',
        creativeStyle: 'UGC'
      });

      expect(idea.hook).toBeDefined();
      expect(idea.creativeFormat).toBe('Short-form Video');
      expect(idea.structure).toBeDefined();
      expect(idea.cta).toBeDefined();
      expect(idea.suggestedCreativeDna.visualStyle).toBe('UGC');
      expect(idea.disclaimer).toContain('NOT verified advertising performance data');
    });
  });

  // 10. Data Normalization & Deduplication
  describe('Sources Normalization & Deduplication', () => {
    it('should validate and normalize raw ad records using Zod', () => {
      const raw = {
        source: 'tiktok',
        sourceAdId: 'tt_12345',
        title: 'Fresh kicks test',
        brand: 'Nike',
        platform: 'TikTok',
        format: 'vertical short video'
      };

      const normalized = normalizeAdRecord(raw);
      expect(normalized.success).toBe(true);
      expect(normalized.data?.format).toBe('Short-form Video');
      expect(normalized.data?.fingerprint).toBe('tiktok::tt_12345');
    });

    it('should deduplicate records strictly by source and sourceAdId, not title', () => {
      const records = [
        { source: 'tiktok', sourceAdId: 'tt_01', title: 'Ad A' },
        { source: 'tiktok', sourceAdId: 'tt_01', title: 'Different Title Same Source ID' }, // Duplicate
        { source: 'meta', sourceAdId: 'meta_01', title: 'Ad A' }, // NOT duplicate (different source)
      ];

      const res = deduplicateRecords(records);
      expect(res.uniqueRecords.length).toBe(2);
      expect(res.duplicateCount).toBe(1);
    });
  });

  // 11. Search Query Filters
  describe('Multi-dimensional Search', () => {
    it('should search by brand, platform, and keyword', async () => {
      const results = await searchAdsWithFilters({
        brand: 'nike',
        platform: 'tiktok'
      });
      expect(results.length).toBeGreaterThan(0);
      results.forEach(ad => {
        expect(ad.brand.slug.toLowerCase()).toBe('nike');
        expect(ad.platform.slug.toLowerCase()).toBe('tiktok');
      });
    });
  });

});
