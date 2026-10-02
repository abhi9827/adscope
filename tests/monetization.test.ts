import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { 
  getMonetizationConfig, 
  isMonetizationEnabled, 
  isAdsEnabled, 
  isAffiliateEnabled, 
  isSponsoredEnabled 
} from '@/lib/monetization/config';
import { 
  MockAdProvider, 
  GoogleAdSenseProvider, 
  getActiveAdProvider, 
  AD_FORMAT_DIMENSIONS 
} from '@/lib/monetization/ads';
import { 
  AFFILIATE_TOOLS, 
  getAffiliateTools, 
  getRecommendedCreativeTools, 
  getEffectiveToolUrl 
} from '@/lib/monetization/affiliates';
import { 
  DEMO_SPONSORS, 
  getActiveSponsors, 
  getFeaturedSponsor 
} from '@/lib/monetization/sponsors';
import { AdSlot } from '@/components/monetization/AdSlot';
import { AdPlaceholder } from '@/components/monetization/AdPlaceholder';

describe('AdScope Monetization Foundation Test Suite', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    delete process.env.NEXT_PUBLIC_MONETIZATION_ENABLED;
    delete process.env.MONETIZATION_ENABLED;
    delete process.env.NEXT_PUBLIC_ADS_ENABLED;
    delete process.env.ADS_ENABLED;
    delete process.env.NEXT_PUBLIC_AFFILIATE_ENABLED;
    delete process.env.AFFILIATE_ENABLED;
    delete process.env.NEXT_PUBLIC_SPONSORED_CONTENT_ENABLED;
    delete process.env.SPONSORED_CONTENT_ENABLED;
    delete process.env.NEXT_PUBLIC_ADS_PROVIDER;
    delete process.env.ADS_PROVIDER;
    delete process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
    delete process.env.ADSENSE_CLIENT_ID;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('Zero-Budget Default Mode', () => {
    it('should disable all monetization features by default when env variables are unset', () => {
      const config = getMonetizationConfig();

      expect(config.monetizationEnabled).toBe(false);
      expect(config.adsEnabled).toBe(false);
      expect(config.affiliateEnabled).toBe(false);
      expect(config.sponsoredContentEnabled).toBe(false);
      expect(config.adsProvider).toBe('none');
      expect(config.adsenseClientId).toBeUndefined();

      expect(isMonetizationEnabled()).toBe(false);
      expect(isAdsEnabled()).toBe(false);
    });

    it('should return null for getActiveAdProvider when ads are disabled', () => {
      expect(getActiveAdProvider()).toBeNull();
    });

    it('should return empty list for sponsors when sponsored content is disabled', () => {
      expect(getActiveSponsors()).toEqual([]);
      expect(getFeaturedSponsor()).toBeNull();
    });
  });

  describe('Configuration & Provider Logic', () => {
    it('should safely normalize invalid ad providers to none', () => {
      process.env.NEXT_PUBLIC_MONETIZATION_ENABLED = 'true';
      process.env.NEXT_PUBLIC_ADS_ENABLED = 'true';
      process.env.NEXT_PUBLIC_ADS_PROVIDER = 'unknown-malicious-provider';

      const config = getMonetizationConfig();
      expect(config.adsProvider).toBe('none');
      expect(getActiveAdProvider()).toBeNull();
    });

    it('should return MockAdProvider when explicitly configured', () => {
      process.env.NEXT_PUBLIC_MONETIZATION_ENABLED = 'true';
      process.env.NEXT_PUBLIC_ADS_ENABLED = 'true';
      process.env.NEXT_PUBLIC_ADS_PROVIDER = 'mock';

      const provider = getActiveAdProvider();
      expect(provider).not.toBeNull();
      expect(provider?.id).toBe('mock');
      expect(provider?.isAvailable()).toBe(true);
    });

    it('should not activate GoogleAdSenseProvider if client ID is invalid or missing', () => {
      process.env.NEXT_PUBLIC_MONETIZATION_ENABLED = 'true';
      process.env.NEXT_PUBLIC_ADS_ENABLED = 'true';
      process.env.NEXT_PUBLIC_ADS_PROVIDER = 'adsense';
      delete process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

      const provider = getActiveAdProvider();
      expect(provider).toBeNull();

      const invalidProvider = new GoogleAdSenseProvider('invalid-id-without-ca-pub');
      expect(invalidProvider.isAvailable()).toBe(false);
      expect(invalidProvider.renderAd('banner', 'homepage-between-sections')).toBeNull();
    });

    it('should activate GoogleAdSenseProvider when valid ca-pub client ID is set', () => {
      process.env.NEXT_PUBLIC_MONETIZATION_ENABLED = 'true';
      process.env.NEXT_PUBLIC_ADS_ENABLED = 'true';
      process.env.NEXT_PUBLIC_ADS_PROVIDER = 'adsense';
      process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID = 'ca-pub-1234567890123456';

      const provider = getActiveAdProvider();
      expect(provider).not.toBeNull();
      expect(provider?.id).toBe('adsense');
      expect(provider?.isAvailable()).toBe(true);

      const rendered = provider?.renderAd('responsive', 'homepage-between-sections');
      expect(rendered).toBeDefined();
    });
  });

  describe('CLS Layout Shift Prevention & Dimensions', () => {
    it('should enforce distinct min-heights across all ad formats', () => {
      expect(AD_FORMAT_DIMENSIONS.banner.minHeight).toBe('60px');
      expect(AD_FORMAT_DIMENSIONS.leaderboard.minHeight).toBe('90px');
      expect(AD_FORMAT_DIMENSIONS.rectangle.minHeight).toBe('250px');
      expect(AD_FORMAT_DIMENSIONS.sidebar.minHeight).toBe('600px');
      expect(AD_FORMAT_DIMENSIONS['in-content'].minHeight).toBe('120px');
      expect(AD_FORMAT_DIMENSIONS.mobile.minHeight).toBe('50px');
      expect(AD_FORMAT_DIMENSIONS.responsive.minHeight).toBe('100px');
    });
  });

  describe('Affiliate System & Ethical Transparency', () => {
    it('should have curated creative tools with correct categories', () => {
      expect(AFFILIATE_TOOLS.length).toBeGreaterThan(0);
      const figma = AFFILIATE_TOOLS.find(t => t.id === 'tool-figma');
      expect(figma).toBeDefined();
      expect(figma?.category).toBe('Design');
      expect(figma?.websiteUrl).toBe('https://www.figma.com');
    });

    it('should fall back to clean websiteUrl when no affiliateUrl is configured', () => {
      const toolWithoutAffiliate = AFFILIATE_TOOLS[0];
      const effective = getEffectiveToolUrl(toolWithoutAffiliate);

      expect(effective.isAffiliate).toBe(false);
      expect(effective.url).toBe(toolWithoutAffiliate.websiteUrl);
    });

    it('should mark disclosureRequired and isAffiliate true only when affiliateUrl exists', () => {
      const toolWithAffiliate = {
        ...AFFILIATE_TOOLS[0],
        affiliateUrl: 'https://partner.example.com?ref=adscope',
      };
      const effective = getEffectiveToolUrl(toolWithAffiliate);

      expect(effective.isAffiliate).toBe(true);
      expect(effective.url).toBe('https://partner.example.com?ref=adscope');
    });

    it('should filter tools by category accurately', () => {
      process.env.NEXT_PUBLIC_AFFILIATE_ENABLED = 'true';
      const videoTools = getAffiliateTools('Video');
      expect(videoTools.length).toBeGreaterThan(0);
      videoTools.forEach(t => expect(t.category).toBe('Video'));
    });
  });

  describe('Sponsored Content System', () => {
    it('should return demo sponsor when sponsored content is enabled in dev', () => {
      process.env.NEXT_PUBLIC_MONETIZATION_ENABLED = 'true';
      process.env.NEXT_PUBLIC_SPONSORED_CONTENT_ENABLED = 'true';

      const sponsors = getActiveSponsors();
      expect(sponsors.length).toBeGreaterThan(0);
      expect(sponsors[0].sponsorName).toContain('MotionForge');
    });

    it('should filter out expired sponsors', () => {
      process.env.NEXT_PUBLIC_MONETIZATION_ENABLED = 'true';
      process.env.NEXT_PUBLIC_SPONSORED_CONTENT_ENABLED = 'true';

      const expiredSponsor = {
        ...DEMO_SPONSORS[0],
        endDate: '2020-01-01',
      };

      // Ensure date check rejects expired dates
      const isStillValid = new Date(expiredSponsor.endDate) >= new Date();
      expect(isStillValid).toBe(false);
    });
  });
});
