import { AdSourceAdapter, RawAd, SearchParams, SourceMetadataInfo } from "./types";

export class MockSourceAdapter implements AdSourceAdapter {
  readonly source = 'mock';
  readonly name = 'Mock Development Source';
  readonly metadata: SourceMetadataInfo = {
    available: true,
    requiresCredentials: false,
    supportedCountries: ['US', 'UK', 'JP', 'DE', 'GLOBAL'],
    supportedPlatforms: ['Meta', 'TikTok', 'YouTube', 'Google Display', 'LinkedIn'],
    supportedFields: ['title', 'description', 'brandName', 'format', 'creativeUrl', 'countryCode', 'tags'],
    officialSourceUrl: 'https://adscope.dev',
    description: 'Safe offline development adapter for validating normalization, deduplication, and database pipelines without API keys.',
    documentationUrl: 'https://adscope.dev/docs/sources/mock'
  };

  private readonly mockCatalog: RawAd[] = [
    {
      source: 'mock',
      sourceAdId: 'mock_nike_running_01',
      title: 'Nike Air Zoom Alphafly Next% 3',
      description: 'Engineered for marathon dominance. Ultra-lightweight ZoomX foam and dual Air Zoom units.',
      brandName: 'Nike',
      platformName: 'Meta',
      countryCode: 'US',
      format: 'Short-form Video',
      creativeUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjE4vB8DdWfD_PQ2OvuwPJyjpCprlqMQJReeUBhFMVYxdMlrqIY0pwp5V78E2r9bi7Vsg6W4njLSwq7yoPncf_Ilo8teK7klvsqPWDDgJBSXetflZHmX6nOmmMApWuvo1yH9cbOFnrr9ehcKFVokf76o8ejNEhp7dIqVUvYzV4g8pocb-IImzUil-1WS8laad2VmilINK-19M3H8noByQsB8d_Msc8C9h7GhOxVh11_FdGXJCEnkzj',
      thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjE4vB8DdWfD_PQ2OvuwPJyjpCprlqMQJReeUBhFMVYxdMlrqIY0pwp5V78E2r9bi7Vsg6W4njLSwq7yoPncf_Ilo8teK7klvsqPWDDgJBSXetflZHmX6nOmmMApWuvo1yH9cbOFnrr9ehcKFVokf76o8ejNEhp7dIqVUvYzV4g8pocb-IImzUil-1WS8laad2VmilINK-19M3H8noByQsB8d_Msc8C9h7GhOxVh11_FdGXJCEnkzj',
      sourceUrl: 'https://adscope.dev/demo/nike-alphafly',
      callToAction: 'Shop Now',
      firstSeen: new Date(Date.now() - 86400000 * 7),
      lastSeen: new Date(),
      active: true,
      tags: ['Athletics', 'Running', 'Performance', 'Footwear'],
      rawPayload: { internalBatch: 'q3-sports', specimenQuality: 'high' }
    },
    {
      source: 'mock',
      sourceAdId: 'mock_apple_vision_02',
      title: 'Apple Vision Pro - Spatial Audio Cinema',
      description: 'Transform your room into a private theater with Spatial Audio and ultra-high-resolution displays.',
      brandName: 'Apple',
      platformName: 'YouTube',
      countryCode: 'US',
      format: 'Video',
      creativeUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8fS6C_XHmsJRrFwvzSfCKOpA6r8TW-nyzSF3pHTQibPm5ixeRWCPef2X__SUyVgssHmhbbDHIV-MeUsHgcK_E_Wqcz_D6kNHbTTV5meUuMJ85ggNTHC3IQ0fMJH0H7Ti_0G5Qd4dag-QNVDyQCpgm0xi_8TkVBSDrSAfOA4tCM2D4iBm9SnzpxDX3h0qrLIyP630EPNAKcPslO3_OIIcxOeeoksbTmaS435a2_1aGe3TTVyPEVL2C',
      thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8fS6C_XHmsJRrFwvzSfCKOpA6r8TW-nyzSF3pHTQibPm5ixeRWCPef2X__SUyVgssHmhbbDHIV-MeUsHgcK_E_Wqcz_D6kNHbTTV5meUuMJ85ggNTHC3IQ0fMJH0H7Ti_0G5Qd4dag-QNVDyQCpgm0xi_8TkVBSDrSAfOA4tCM2D4iBm9SnzpxDX3h0qrLIyP630EPNAKcPslO3_OIIcxOeeoksbTmaS435a2_1aGe3TTVyPEVL2C',
      sourceUrl: 'https://adscope.dev/demo/apple-vision-pro',
      callToAction: 'Learn More',
      firstSeen: new Date(Date.now() - 86400000 * 14),
      lastSeen: new Date(),
      active: true,
      tags: ['Hardware', 'Spatial Computing', 'VisionOS', 'Cinematic'],
      rawPayload: { internalBatch: 'q3-tech', specimenQuality: 'ultra' }
    },
    {
      source: 'mock',
      sourceAdId: 'mock_tesla_cybertruck_03',
      title: 'Tesla Cybertruck - Exoskeleton Durability',
      description: 'Ultra-hard 30X cold-rolled stainless steel exoskeleton and armor glass designed for extreme utility.',
      brandName: 'Tesla',
      platformName: 'Google Display',
      countryCode: 'US',
      format: 'Image',
      creativeUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBooebgpyobvwb869c-K3NMJPiy-Wp8d5xzLklCw1_RAYZWxvZ9Po3iTAoGwijcSE2XF6ORFWY6R_QFZFJEE4BdKjmffRI20SGo3WW7XbRnr6Z9NM0jcXzDO4_L5X7DbJqa9BGSqut5hMYMVG_0ff9z2W5thtMJk_dZ_9Y0_9RP_ZRhOzgaEqApz6de_Td1ARAYLCcfDLGjFkeKqZqF75Ia6SDE0prZUI9-PBQM3IT4ozITTiX7_6XF',
      thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBooebgpyobvwb869c-K3NMJPiy-Wp8d5xzLklCw1_RAYZWxvZ9Po3iTAoGwijcSE2XF6ORFWY6R_QFZFJEE4BdKjmffRI20SGo3WW7XbRnr6Z9NM0jcXzDO4_L5X7DbJqa9BGSqut5hMYMVG_0ff9z2W5thtMJk_dZ_9Y0_9RP_ZRhOzgaEqApz6de_Td1ARAYLCcfDLGjFkeKqZqF75Ia6SDE0prZUI9-PBQM3IT4ozITTiX7_6XF',
      sourceUrl: 'https://adscope.dev/demo/tesla-cybertruck',
      callToAction: 'Order Now',
      firstSeen: new Date(Date.now() - 86400000 * 3),
      lastSeen: new Date(),
      active: true,
      tags: ['Automotive', 'EV', 'Engineering', 'Utility'],
      rawPayload: { internalBatch: 'q3-auto', specimenQuality: 'high' }
    },
    {
      source: 'mock',
      sourceAdId: 'mock_redbull_cliff_04',
      title: 'Red Bull Cliff Diving World Series',
      description: 'Athletes leaping from heights up to 27 meters into deep natural waters at speeds reaching 85km/h.',
      brandName: 'Red Bull',
      platformName: 'TikTok',
      countryCode: 'GLOBAL',
      format: 'Short-form Video',
      creativeUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-oRpyzJX_G0RR8nKMdzM81dCgpH0OWepvEqV-JEFonVBWi7qzXBQutOvVUJ0opzFRz2R-8J2yCzYj5Y6d_wdWv2YrqZE7KkkVKQXm_FPTgnfu4UPKcZv6eeaQsLnkXHQUtNJ2_8HDj7iPV-uh5vkdd6lBV0_WAGYB7dKiJ2PaS9uA7bodqfgvKMr4AcjQjO7Qtpv48ZSKKq46poxpDp18cCiCR8PhSpecEdzMxdCepZVudu5NNl2O',
      thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-oRpyzJX_G0RR8nKMdzM81dCgpH0OWepvEqV-JEFonVBWi7qzXBQutOvVUJ0opzFRz2R-8J2yCzYj5Y6d_wdWv2YrqZE7KkkVKQXm_FPTgnfu4UPKcZv6eeaQsLnkXHQUtNJ2_8HDj7iPV-uh5vkdd6lBV0_WAGYB7dKiJ2PaS9uA7bodqfgvKMr4AcjQjO7Qtpv48ZSKKq46poxpDp18cCiCR8PhSpecEdzMxdCepZVudu5NNl2O',
      sourceUrl: 'https://adscope.dev/demo/redbull-cliff-diving',
      callToAction: 'Watch More',
      firstSeen: new Date(Date.now() - 86400000 * 20),
      lastSeen: new Date(),
      active: true,
      tags: ['Extreme Sports', 'High-energy', 'Athletes', 'Cliff Diving'],
      rawPayload: { internalBatch: 'q3-sports', specimenQuality: 'high' }
    }
  ];

  async search(params: SearchParams): Promise<RawAd[]> {
    let results = [...this.mockCatalog];

    if (params.brand) {
      const bLower = params.brand.toLowerCase();
      results = results.filter(r => r.brandName?.toLowerCase().includes(bLower));
    }
    if (params.country) {
      const cUpper = params.country.toUpperCase();
      results = results.filter(r => r.countryCode === cUpper || r.countryCode === 'GLOBAL');
    }
    if (params.platform) {
      const pLower = params.platform.toLowerCase();
      results = results.filter(r => r.platformName?.toLowerCase().includes(pLower));
    }
    if (params.limit && params.limit > 0) {
      results = results.slice(0, params.limit);
    }

    return results;
  }

  async getAd(id: string): Promise<RawAd | null> {
    return this.mockCatalog.find(r => r.sourceAdId === id) || null;
  }
}
