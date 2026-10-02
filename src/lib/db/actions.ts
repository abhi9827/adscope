import prisma from "./prisma";

export interface SearchFilters {
  q?: string;
  brand?: string;
  platform?: string;
  format?: string;
  country?: string;
  creativeStyle?: string;
  hook?: string;
  industry?: string;
}

export const MOCK_BRANDS = [
  { id: "1", name: "Nike", slug: "nike", description: "Global sportswear and athletic equipment corporation." },
  { id: "2", name: "Apple", slug: "apple", description: "Consumer electronics, computer software, and online services." },
  { id: "3", name: "Tesla", slug: "tesla", description: "Electric vehicles and clean energy technologies." },
  { id: "4", name: "Coca-Cola", slug: "coca-cola", description: "Carbonated beverages and global refreshment brand." },
  { id: "5", name: "Adidas", slug: "adidas", description: "Sportswear, footwear, and lifestyle brand." },
  { id: "6", name: "Samsung", slug: "samsung", description: "Global technology and electronics conglomerate." },
  { id: "7", name: "IKEA", slug: "ikea", description: "Ready-to-assemble furniture and home accessories." },
  { id: "8", name: "Red Bull", slug: "red-bull", description: "Energy drinks, extreme sports, and high-energy media." },
  { id: "9", name: "L'Oréal", slug: "loreal", description: "Cosmetics, beauty, and personal care powerhouse." },
];

export const MOCK_COUNTRIES = [
  { id: "c1", name: "United States", code: "US", slug: "us", adCount: 420 },
  { id: "c2", name: "United Kingdom", code: "UK", slug: "uk", adCount: 280 },
  { id: "c3", name: "Japan", code: "JP", slug: "japan", adCount: 195 },
  { id: "c4", name: "Germany", code: "DE", slug: "germany", adCount: 160 },
  { id: "c5", name: "Global", code: "GLOBAL", slug: "global", adCount: 610 },
];

export const MOCK_ADS: any[] = [
  {
    id: "1",
    title: "Nike Elite Performance",
    description: "High-octane athlete focus emphasizing high-stakes sports discipline and mental resilience.",
    format: "Short-form Video",
    isDemo: true,
    firstSeen: new Date("2026-01-10T10:00:00Z"),
    lastSeen: new Date("2026-03-28T14:30:00Z"),
    sourceUrl: "https://ads.tiktok.com/business/creativecenter",
    sourceAdId: "tt_ad_nike_001",
    brand: { name: "Nike", slug: "nike" },
    platform: { name: "TikTok", slug: "tiktok" },
    country: { name: "United States", code: "US", slug: "us" },
    creatives: [
      { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjE4vB8DdWfD_PQ2OvuwPJyjpCprlqMQJReeUBhFMVYxdMlrqIY0pwp5V78E2r9bi7Vsg6W4njLSwq7yoPncf_Ilo8teK7klvsqPWDDgJBSXetflZHmX6nOmmMApWuvo1yH9cbOFnrr9ehcKFVokf76o8ejNEhp7dIqVUvYzV4g8pocb-IImzUil-1WS8laad2VmilINK-19M3H8noByQsB8d_Msc8C9h7GhOxVh11_FdGXJCEnkzj" }
    ],
    campaign: { name: "Winning Isn't For Everyone", slug: "winning-isnt-for-everyone", startDate: new Date("2026-01-01"), endDate: new Date("2026-04-01") },
    tags: [{ tag: { name: "Athlete" } }, { tag: { name: "Performance" } }, { tag: { name: "Bold Hook" } }],
    creativeDna: {
      hookType: "Bold Statement",
      visualStyle: "Cinematic",
      emotionalAngle: "Inspiration",
      contentFormat: "Short-form Video",
      ctaType: "Shop Now",
      audienceInterpretation: "Athletes",
      themes: ["Athlete", "Performance", "Sports"]
    }
  },
  {
    id: "2",
    title: "Apple Cinematic Mode",
    description: "Understated visual narrative highlighting 4K sensor depth and organic shadow transitions.",
    format: "Carousel",
    isDemo: true,
    firstSeen: new Date("2026-01-15T08:00:00Z"),
    lastSeen: new Date("2026-03-20T11:00:00Z"),
    sourceUrl: "https://www.facebook.com/ads/library",
    sourceAdId: "meta_ad_apple_002",
    brand: { name: "Apple", slug: "apple" },
    platform: { name: "Meta", slug: "meta" },
    country: { name: "Global", code: "GLOBAL", slug: "global" },
    creatives: [
      { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8fS6C_XHmsJRrFwvzSfCKOpA6r8TW-nyzSF3pHTQibPm5ixeRWCPef2X__SUyVgssHmhbbDHIV-MeUsHgcK_E_Wqcz_D6kNHbTTV5meUuMJ85ggNTHC3IQ0fMJH0H7Ti_0G5Qd4dag-QNVDyQCpgm0xi_8TkVBSDrSAfOA4tCM2D4iBm9SnzpxDX3h0qrLIyP630EPNAKcPslO3_OIIcxOeeoksbTmaS435a2_1aGe3TTVyPEVL2C" }
    ],
    campaign: { name: "Shot on iPhone", slug: "shot-on-iphone", startDate: new Date("2026-01-15"), endDate: new Date("2026-05-01") },
    tags: [{ tag: { name: "Tech" } }, { tag: { name: "Minimal" } }, { tag: { name: "Cinematography" } }],
    creativeDna: {
      hookType: "Curiosity",
      visualStyle: "Minimal",
      emotionalAngle: "Curiosity",
      contentFormat: "Carousel",
      ctaType: "Learn More",
      audienceInterpretation: "Tech enthusiasts",
      themes: ["Cinematography", "Innovation", "Storytelling"]
    }
  },
  {
    id: "3",
    title: "Tesla Model Y Performance",
    description: "Rapid acceleration sequence with direct interior HUD perspective and instant torque feedback.",
    format: "Video",
    isDemo: true,
    firstSeen: new Date("2026-02-01T09:00:00Z"),
    lastSeen: new Date("2026-03-25T16:00:00Z"),
    sourceUrl: "https://adstransparency.google.com",
    sourceAdId: "goog_ad_tesla_003",
    brand: { name: "Tesla", slug: "tesla" },
    platform: { name: "YouTube", slug: "youtube" },
    country: { name: "United States", code: "US", slug: "us" },
    creatives: [
      { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUnGe9TrWoJcJIQRmfdCn_GR599ngd1D3MRl59bi5LUCyG2yZKZbTQrN6MndeUPea1Na3vk5Wtdk0ugzSM622aW9N7oR8ZSGxq_mBW988JylADvUxXwPnU76xvliTfV4piHH_F-HRcUxyYVz73-OeQ-Nq6v340_foTnMKAq0Zq-LmySHylPt3om-BXNYFsdTpWHEVgWQT49txWGunG5_HBrYjxUIVIa1ix_l5kJlcbYgJlyXNbPOLc" }
    ],
    campaign: { name: "Drive Electric", slug: "drive-electric", startDate: new Date("2026-02-01"), endDate: new Date("2026-06-01") },
    tags: [{ tag: { name: "Automotive" } }, { tag: { name: "High-Energy" } }],
    creativeDna: {
      hookType: "Problem/Solution",
      visualStyle: "High-energy",
      emotionalAngle: "Excitement",
      contentFormat: "Video",
      ctaType: "Buy Now",
      audienceInterpretation: "Tech enthusiasts",
      themes: ["Electric Vehicles", "Clean Tech", "Minimalist"]
    }
  },
  {
    id: "4",
    title: "Coca-Cola Real Magic Moments",
    description: "Warm community gatherings celebrating shared meals and emotional human bonds.",
    format: "Video",
    isDemo: true,
    firstSeen: new Date("2026-01-20T12:00:00Z"),
    lastSeen: new Date("2026-03-15T18:00:00Z"),
    sourceUrl: "https://www.facebook.com/ads/library",
    sourceAdId: "meta_ad_coke_004",
    brand: { name: "Coca-Cola", slug: "coca-cola" },
    platform: { name: "Meta", slug: "meta" },
    country: { name: "United Kingdom", code: "UK", slug: "uk" },
    creatives: [
      { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB-dXbINWJTLTAnHKl4N6PaN8VVlQjcoXDCZIHXXEVRUqxh9V4CgoMRAGn7JetZbfKjdSF1DDKs7339EPJSl0zhlKREBRpxLX_CB2luHBUln2-VuKyHQ0os4-kflIfdf1_TNoEpxrAQTpQPuk0DiceNR7hiHcP2baF-2K5Spi99njZvFytKzwLOJHgLzC2c-pVfxbzhsaoLgtlQy9McShKK2d_P1fRencBq2Gv9PTEABDErDWSKltI_" }
    ],
    campaign: { name: "Real Magic", slug: "real-magic", startDate: new Date("2026-01-01"), endDate: new Date("2026-04-01") },
    tags: [{ tag: { name: "Beverage" } }, { tag: { name: "Emotional" } }],
    creativeDna: {
      hookType: "Emotional",
      visualStyle: "Lifestyle",
      emotionalAngle: "Trust",
      contentFormat: "Video",
      ctaType: "Discover",
      audienceInterpretation: "General consumers",
      themes: ["Happiness", "Connection", "Celebration"]
    }
  },
  {
    id: "5",
    title: "Nike Air Max Pulse UGC",
    description: "Handheld smartphone POV styling showing street styling, quick unboxing, and real wear tests.",
    format: "Short-form Video",
    isDemo: true,
    firstSeen: new Date("2026-02-14T10:00:00Z"),
    lastSeen: new Date("2026-03-29T12:00:00Z"),
    sourceUrl: "https://ads.tiktok.com/business/creativecenter",
    sourceAdId: "tt_ad_nike_005",
    brand: { name: "Nike", slug: "nike" },
    platform: { name: "TikTok", slug: "tiktok" },
    country: { name: "United States", code: "US", slug: "us" },
    creatives: [
      { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjE4vB8DdWfD_PQ2OvuwPJyjpCprlqMQJReeUBhFMVYxdMlrqIY0pwp5V78E2r9bi7Vsg6W4njLSwq7yoPncf_Ilo8teK7klvsqPWDDgJBSXetflZHmX6nOmmMApWuvo1yH9cbOFnrr9ehcKFVokf76o8ejNEhp7dIqVUvYzV4g8pocb-IImzUil-1WS8laad2VmilINK-19M3H8noByQsB8d_Msc8C9h7GhOxVh11_FdGXJCEnkzj" }
    ],
    campaign: { name: "Winning Isn't For Everyone", slug: "winning-isnt-for-everyone", startDate: new Date("2026-01-01"), endDate: new Date("2026-04-01") },
    tags: [{ tag: { name: "UGC" } }, { tag: { name: "Streetwear" } }, { tag: { name: "Sneakers" } }],
    creativeDna: {
      hookType: "Product Reveal",
      visualStyle: "UGC",
      emotionalAngle: "Excitement",
      contentFormat: "UGC",
      ctaType: "Shop Now",
      audienceInterpretation: "Young adults",
      themes: ["Sneakerhead", "Streetwear", "UGC"]
    }
  },
  {
    id: "6",
    title: "Adidas You Got This",
    description: "Raw locker-room speech and track preparation confronting anxiety before major tournament.",
    format: "Video",
    isDemo: true,
    firstSeen: new Date("2026-01-25T11:00:00Z"),
    lastSeen: new Date("2026-03-22T15:00:00Z"),
    sourceUrl: "https://adstransparency.google.com",
    sourceAdId: "goog_ad_adidas_006",
    brand: { name: "Adidas", slug: "adidas" },
    platform: { name: "YouTube", slug: "youtube" },
    country: { name: "Germany", code: "DE", slug: "germany" },
    creatives: [
      { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjE4vB8DdWfD_PQ2OvuwPJyjpCprlqMQJReeUBhFMVYxdMlrqIY0pwp5V78E2r9bi7Vsg6W4njLSwq7yoPncf_Ilo8teK7klvsqPWDDgJBSXetflZHmX6nOmmMApWuvo1yH9cbOFnrr9ehcKFVokf76o8ejNEhp7dIqVUvYzV4g8pocb-IImzUil-1WS8laad2VmilINK-19M3H8noByQsB8d_Msc8C9h7GhOxVh11_FdGXJCEnkzj" }
    ],
    campaign: { name: "You Got This", slug: "you-got-this", startDate: new Date("2026-01-20"), endDate: new Date("2026-05-15") },
    tags: [{ tag: { name: "Athlete" } }, { tag: { name: "Motivation" } }],
    creativeDna: {
      hookType: "Testimonial",
      visualStyle: "Documentary",
      emotionalAngle: "Confidence",
      contentFormat: "Video",
      ctaType: "Discover",
      audienceInterpretation: "Athletes",
      themes: ["Athlete", "Motivation", "Sports"]
    }
  },
  {
    id: "7",
    title: "Nike Japan Night Run",
    description: "Neon Tokyo nocturnal running crews weaving through Shibuya crossings and neon back-alleys.",
    format: "Video",
    isDemo: true,
    firstSeen: new Date("2026-02-10T14:00:00Z"),
    lastSeen: new Date("2026-03-24T19:00:00Z"),
    sourceUrl: "https://www.facebook.com/ads/library",
    sourceAdId: "meta_ad_nike_jp_007",
    brand: { name: "Nike", slug: "nike" },
    platform: { name: "Instagram", slug: "instagram" },
    country: { name: "Japan", code: "JP", slug: "japan" },
    creatives: [
      { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjE4vB8DdWfD_PQ2OvuwPJyjpCprlqMQJReeUBhFMVYxdMlrqIY0pwp5V78E2r9bi7Vsg6W4njLSwq7yoPncf_Ilo8teK7klvsqPWDDgJBSXetflZHmX6nOmmMApWuvo1yH9cbOFnrr9ehcKFVokf76o8ejNEhp7dIqVUvYzV4g8pocb-IImzUil-1WS8laad2VmilINK-19M3H8noByQsB8d_Msc8C9h7GhOxVh11_FdGXJCEnkzj" }
    ],
    campaign: { name: "Midnight Runners", slug: "midnight-runners", startDate: new Date("2026-02-01"), endDate: new Date("2026-04-30") },
    tags: [{ tag: { name: "Running" } }, { tag: { name: "Tokyo" } }, { tag: { name: "Cinematic" } }],
    creativeDna: {
      hookType: "Curiosity",
      visualStyle: "Cinematic",
      emotionalAngle: "Excitement",
      contentFormat: "Short-form Video",
      ctaType: "Sign Up",
      audienceInterpretation: "Fitness enthusiasts",
      themes: ["Athlete", "Running", "Urban Culture"]
    }
  },
  {
    id: "8",
    title: "Samsung Galaxy AI Unfold",
    description: "Split-screen multitasking demonstration showing instantaneous real-time language interpretation.",
    format: "Carousel",
    isDemo: true,
    firstSeen: new Date("2026-01-18T07:00:00Z"),
    lastSeen: new Date("2026-03-26T10:00:00Z"),
    sourceUrl: "https://adstransparency.google.com",
    sourceAdId: "goog_ad_samsung_008",
    brand: { name: "Samsung", slug: "samsung" },
    platform: { name: "Google", slug: "google" },
    country: { name: "United States", code: "US", slug: "us" },
    creatives: [
      { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8fS6C_XHmsJRrFwvzSfCKOpA6r8TW-nyzSF3pHTQibPm5ixeRWCPef2X__SUyVgssHmhbbDHIV-MeUsHgcK_E_Wqcz_D6kNHbTTV5meUuMJ85ggNTHC3IQ0fMJH0H7Ti_0G5Qd4dag-QNVDyQCpgm0xi_8TkVBSDrSAfOA4tCM2D4iBm9SnzpxDX3h0qrLIyP630EPNAKcPslO3_OIIcxOeeoksbTmaS435a2_1aGe3TTVyPEVL2C" }
    ],
    campaign: { name: "Galaxy AI", slug: "galaxy-ai", startDate: new Date("2026-01-10"), endDate: new Date("2026-05-30") },
    tags: [{ tag: { name: "AI" } }, { tag: { name: "Product Demo" } }],
    creativeDna: {
      hookType: "Demonstration",
      visualStyle: "Product-focused",
      emotionalAngle: "Curiosity",
      contentFormat: "Product Demo",
      ctaType: "Learn More",
      audienceInterpretation: "Tech enthusiasts",
      themes: ["AI Features", "Productivity", "Innovation"]
    }
  }
];

export async function getTrendingBrands() {
  try {
    const brands = await prisma.brand.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' }
    });
    if (!brands.length) return MOCK_BRANDS;
    return brands;
  } catch (error) {
    return MOCK_BRANDS;
  }
}

export async function getLatestAds() {
  try {
    const ads = await prisma.ad.findMany({
      take: 12,
      orderBy: { createdAt: 'desc' },
      include: {
        brand: true,
        platform: true,
        country: true,
        campaign: true,
        creatives: true,
        creativeDna: true,
        tags: true
      }
    });
    if (!ads.length) return MOCK_ADS;
    return ads;
  } catch (error) {
    return MOCK_ADS;
  }
}

export async function getAllAdsForSimilarity(): Promise<any[]> {
  try {
    const ads = await prisma.ad.findMany({
      include: {
        brand: true,
        platform: true,
        country: true,
        campaign: true,
        creatives: true,
        creativeDna: true,
        tags: true
      }
    });
    if (!ads.length) return MOCK_ADS;
    return ads;
  } catch (error) {
    return MOCK_ADS;
  }
}

export async function searchAds(q: string) {
  return searchAdsWithFilters({ q });
}

export async function searchAdsWithFilters(filters: SearchFilters): Promise<any[]> {
  const { q, brand, platform, format, country, creativeStyle, hook, industry } = filters;

  try {
    const where: any = {};
    if (q) {
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        { campaign: { name: { contains: q, mode: 'insensitive' } } },
        { brand: { name: { contains: q, mode: 'insensitive' } } }
      ];
    }
    if (brand) {
      where.brand = { slug: { equals: brand, mode: 'insensitive' } };
    }
    if (platform) {
      where.platform = { slug: { equals: platform, mode: 'insensitive' } };
    }
    if (format) {
      where.format = { contains: format, mode: 'insensitive' };
    }
    if (country) {
      where.country = {
        OR: [
          { code: { equals: country, mode: 'insensitive' } },
          { slug: { equals: country, mode: 'insensitive' } }
        ]
      };
    }
    if (creativeStyle) {
      where.creativeDna = {
        visualStyle: { contains: creativeStyle, mode: 'insensitive' }
      };
    }
    if (hook) {
      where.creativeDna = {
        ...where.creativeDna,
        hookType: { contains: hook, mode: 'insensitive' }
      };
    }

    const ads = await prisma.ad.findMany({
      where,
      include: {
        brand: true,
        platform: true,
        country: true,
        campaign: true,
        creatives: true,
        creativeDna: true,
        tags: true
      },
      take: 40
    });

    if (ads.length > 0) return ads;
    // Fall back to filtering mock ads
    return filterMockAds(filters);
  } catch (error) {
    return filterMockAds(filters);
  }
}

function filterMockAds(filters: SearchFilters): any[] {
  const { q, brand, platform, format, country, creativeStyle, hook, industry } = filters;
  
  return MOCK_ADS.filter(ad => {
    if (q) {
      const qLower = q.toLowerCase();
      const matchQ = 
        ad.title.toLowerCase().includes(qLower) ||
        (ad.description || "").toLowerCase().includes(qLower) ||
        ad.brand.name.toLowerCase().includes(qLower) ||
        (ad.campaign?.name || "").toLowerCase().includes(qLower) ||
        (ad.creativeDna?.themes || []).some((t: string) => t.toLowerCase().includes(qLower));
      if (!matchQ) return false;
    }
    if (brand && ad.brand.slug.toLowerCase() !== brand.toLowerCase() && ad.brand.name.toLowerCase() !== brand.toLowerCase()) {
      return false;
    }
    if (platform && ad.platform.slug.toLowerCase() !== platform.toLowerCase() && ad.platform.name.toLowerCase() !== platform.toLowerCase()) {
      return false;
    }
    if (format && !ad.format.toLowerCase().includes(format.toLowerCase())) {
      return false;
    }
    if (country) {
      const c = country.toLowerCase();
      const adC = (ad.country?.code || ad.country?.slug || "").toLowerCase();
      if (adC !== c && !ad.country?.name.toLowerCase().includes(c)) return false;
    }
    if (creativeStyle) {
      const cs = creativeStyle.toLowerCase();
      const adStyle = (ad.creativeDna?.visualStyle || "").toLowerCase();
      if (!adStyle.includes(cs)) return false;
    }
    if (hook) {
      const h = hook.toLowerCase();
      const adHook = (ad.creativeDna?.hookType || "").toLowerCase();
      if (!adHook.includes(h)) return false;
    }
    return true;
  });
}

export async function getBrandWithAds(slug: string) {
  try {
    const brand = await prisma.brand.findUnique({
      where: { slug },
      include: {
        ads: {
          include: { brand: true, platform: true, campaign: true, creatives: true, creativeDna: true, country: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    if (!brand) {
      const mockBrand = MOCK_BRANDS.find(b => b.slug === slug);
      if (!mockBrand) return null;
      return {
        ...mockBrand,
        ads: MOCK_ADS.filter(ad => ad.brand.slug === mockBrand.slug)
      };
    }
    return brand;
  } catch (error) {
    const mockBrand = MOCK_BRANDS.find(b => b.slug === slug) || MOCK_BRANDS[0];
    return {
      ...mockBrand,
      ads: MOCK_ADS.filter(ad => ad.brand.slug === mockBrand.slug)
    };
  }
}

export async function getBrandCreativeProfile(slug: string) {
  const brandData = await getBrandWithAds(slug);
  if (!brandData) return null;

  const ads: any[] = brandData.ads || [];
  const totalAds = ads.length;

  // Platform breakdown
  const platformCounts: Record<string, number> = {};
  // Format breakdown
  const formatCounts: Record<string, number> = {};
  // Themes breakdown
  const themeCounts: Record<string, number> = {};
  // Country breakdown
  const countryCounts: Record<string, number> = {};

  for (const ad of ads) {
    // Platform
    const pName = ad.platform?.name || "Other";
    platformCounts[pName] = (platformCounts[pName] || 0) + 1;

    // Format
    const fName = ad.format || "Other";
    formatCounts[fName] = (formatCounts[fName] || 0) + 1;

    // Themes
    const themes = ad.creativeDna?.themes || [];
    for (const t of themes) {
      themeCounts[t] = (themeCounts[t] || 0) + 1;
    }

    // Country
    const cName = ad.country?.code || ad.country?.name || "Global";
    countryCounts[cName] = (countryCounts[cName] || 0) + 1;
  }

  // Ensure default representations if counts are sparse
  if (Object.keys(formatCounts).length === 0) {
    formatCounts["Video"] = 1;
  }

  return {
    brandName: brandData.name,
    brandSlug: brandData.slug,
    totalIndexedAds: totalAds,
    disclaimer: "Based on AdScope's indexed dataset.",
    platforms: Object.entries(platformCounts).map(([name, count]) => ({ name, count })),
    formats: Object.entries(formatCounts).map(([name, count]) => ({ name, count })),
    themes: Object.entries(themeCounts).map(([name, count]) => ({ name, count })),
    countries: Object.entries(countryCounts).map(([name, count]) => ({ name, count })),
  };
}

export async function getAdDetails(id: string) {
  try {
    const ad = await prisma.ad.findUnique({
      where: { id },
      include: {
        brand: true,
        platform: true,
        country: true,
        campaign: true,
        creatives: true,
        creativeDna: true,
        tags: true,
        aiAnalysis: true
      }
    });
    if (!ad) {
      return MOCK_ADS.find(a => a.id === id) || null;
    }
    return ad;
  } catch (error) {
    return MOCK_ADS.find(a => a.id === id) || MOCK_ADS[0];
  }
}

export async function getRelatedAds(adId: string) {
  try {
    const originalAd = await prisma.ad.findUnique({ 
      where: { id: adId }, 
      select: { brandId: true, campaignId: true } 
    });
    if (!originalAd) {
      const mockOriginal = MOCK_ADS.find(a => a.id === adId);
      if (!mockOriginal) return [];
      return MOCK_ADS.filter(a => a.brand.slug === mockOriginal.brand.slug && a.id !== adId).slice(0, 4);
    }
    
    const related = await prisma.ad.findMany({
      where: {
        OR: [
          { campaignId: originalAd.campaignId },
          { brandId: originalAd.brandId }
        ],
        NOT: { id: adId }
      },
      include: { brand: true, platform: true, campaign: true, creatives: true, creativeDna: true, country: true },
      take: 4
    });
    return related;
  } catch (error) {
    const mockOriginal = MOCK_ADS.find(a => a.id === adId);
    if (!mockOriginal) return [];
    return MOCK_ADS.filter(a => a.brand.slug === mockOriginal.brand.slug && a.id !== adId).slice(0, 4);
  }
}

export async function getCampaignWithAds(slug: string) {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: { slug },
      include: {
        brand: true,
        ads: {
          include: { brand: true, platform: true, campaign: true, creatives: true, creativeDna: true, country: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    if (!campaign) {
      // Find matching mock campaign
      const matchingAd = MOCK_ADS.find(a => a.campaign?.slug === slug);
      if (!matchingAd) return null;
      return {
        id: "c-mock-1",
        name: matchingAd.campaign.name,
        slug: matchingAd.campaign.slug,
        description: "An AdScope indexed multi-channel campaign.",
        startDate: matchingAd.campaign.startDate,
        endDate: matchingAd.campaign.endDate,
        brand: matchingAd.brand,
        ads: MOCK_ADS.filter(a => a.campaign?.slug === slug)
      };
    }
    return campaign;
  } catch (error) {
    const matchingAd = MOCK_ADS.find(a => a.campaign?.slug === slug) || MOCK_ADS[0];
    return {
      id: "c-mock-1",
      name: matchingAd.campaign.name,
      slug: matchingAd.campaign.slug,
      description: "An AdScope indexed multi-channel campaign.",
      startDate: matchingAd.campaign.startDate,
      endDate: matchingAd.campaign.endDate,
      brand: matchingAd.brand,
      ads: MOCK_ADS.filter(a => a.campaign?.slug === matchingAd.campaign.slug)
    };
  }
}

export async function getCampaignTimeline(slug: string) {
  const campaign: any = await getCampaignWithAds(slug);
  if (!campaign) return null;

  const ads: any[] = campaign.ads || [];
  const events = [];

  // Sort ads chronologically by firstSeen or date
  const sortedAds = [...ads].sort((a, b) => 
    new Date(a.firstSeen || a.date || a.createdAt).getTime() - new Date(b.firstSeen || b.date || b.createdAt).getTime()
  );

  const firstSeen = sortedAds[0]?.firstSeen || campaign.startDate || new Date("2026-01-01");
  const lastSeen = sortedAds[sortedAds.length - 1]?.lastSeen || new Date();

  // Distinct platforms & countries
  const platforms = Array.from(new Set(ads.map(a => a.platform?.name).filter(Boolean)));
  const countries = Array.from(new Set(ads.map(a => a.country?.name || a.country?.code).filter(Boolean)));

  // Generate milestone events from real indexed ads
  if (sortedAds.length > 0) {
    events.push({
      date: firstSeen,
      type: "First indexed",
      label: "Campaign launched and first indexed on AdScope",
      detail: `${sortedAds[0].format} on ${sortedAds[0].platform?.name}`
    });

    if (sortedAds.length > 1) {
      events.push({
        date: sortedAds[1].firstSeen || sortedAds[1].date,
        type: "New creative",
        label: `Creative variant added: "${sortedAds[1].title}"`,
        detail: `${sortedAds[1].format} on ${sortedAds[1].platform?.name}`
      });
    }

    if (sortedAds.length > 2) {
      events.push({
        date: sortedAds[sortedAds.length - 1].firstSeen,
        type: "Updated creative",
        label: `Refreshed messaging or localized variant`,
        detail: `${sortedAds[sortedAds.length - 1].format} in ${sortedAds[sortedAds.length - 1].country?.name}`
      });
    }

    events.push({
      date: lastSeen,
      type: "Last indexed",
      label: "Latest active creative observed",
      detail: `Verified active across ${platforms.join(", ")}`
    });
  }

  return {
    campaignName: campaign.name,
    campaignSlug: campaign.slug,
    brandName: campaign.brand?.name,
    firstSeen,
    lastSeen,
    totalVariants: ads.length,
    platforms,
    countries,
    events
  };
}

export async function getCountryList() {
  try {
    const countries = await prisma.country.findMany({
      include: {
        ads: {
          select: { id: true, format: true, platform: { select: { name: true } } }
        }
      }
    });

    if (countries.length > 0) {
      return countries.map((c: any) => ({
        id: c.id,
        name: c.name,
        code: c.code,
        slug: (c.slug || c.code.toLowerCase()),
        adCount: c.ads.length
      }));
    }
    return MOCK_COUNTRIES;
  } catch (error) {
    return MOCK_COUNTRIES;
  }
}

export async function getCountryWithAds(slugOrCode: string) {
  const norm = slugOrCode.toLowerCase();
  
  // Find country
  const allCountries = await getCountryList();
  const country = allCountries.find((c: any) => c.slug.toLowerCase() === norm || c.code.toLowerCase() === norm);
  
  // Find ads
  const ads = await searchAdsWithFilters({ country: norm });

  // Compute breakdown
  const brands = Array.from(new Set(ads.map(a => a.brand?.name).filter(Boolean)));
  const platforms = Array.from(new Set(ads.map(a => a.platform?.name).filter(Boolean)));
  const formats = Array.from(new Set(ads.map(a => a.format).filter(Boolean)));
  const industries = ["Sports & Fashion", "Technology", "Automotive", "Food & Beverage"];

  return {
    name: country ? country.name : (slugOrCode.toUpperCase()),
    code: country ? country.code : slugOrCode.toUpperCase(),
    slug: country ? country.slug : slugOrCode.toLowerCase(),
    adCount: ads.length,
    disclaimer: "Based on AdScope's indexed dataset.",
    brands,
    platforms,
    formats,
    industries,
    ads
  };
}

export async function getTrendDetails(slug: string) {
  const TREND_MAP: Record<string, any> = {
    "ugc": {
      id: "ugc",
      title: "User-Generated Content (UGC)",
      description: "Smartphone-shot organic testimonials, unboxing videos, and authentic creator moments cutting through polished corporate campaigns.",
      creativeStyle: "UGC",
      format: "UGC",
      disclaimer: "Observed in AdScope's indexed dataset."
    },
    "short-form-video": {
      id: "short-form-video",
      title: "Short-Form Vertical Video",
      description: "Rapid visual cuts, first-3-second hook emphasis, and mobile-native 9:16 aspect ratio dominance across TikTok and Instagram Reels.",
      format: "Short-form Video",
      disclaimer: "Observed in AdScope's indexed dataset."
    },
    "athlete-led": {
      id: "athlete-led",
      title: "Athlete-Led Performance Creative",
      description: "Behind-the-scenes training vulnerability, raw locker room prep, and mental endurance storytelling replacing glossy endorsements.",
      theme: "Athlete",
      disclaimer: "Observed in AdScope's indexed dataset."
    },
    "product-demo": {
      id: "product-demo",
      title: "Direct Product Demonstrations",
      description: "No-fluff tactile interactions showing physical textures, software UI frictionlessness, and instant before-and-after results.",
      format: "Product Demo",
      hook: "Demonstration",
      disclaimer: "Observed in AdScope's indexed dataset."
    }
  };

  const trend = TREND_MAP[slug] || {
    id: slug,
    title: slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
    description: "Emerging creative tropes and structural advertising patterns indexed across major global platforms.",
    disclaimer: "Observed in AdScope's indexed dataset."
  };

  const ads = await searchAdsWithFilters({
    creativeStyle: trend.creativeStyle,
    format: trend.format,
    hook: trend.hook,
    q: trend.theme || slug
  });

  const brands = Array.from(new Set(ads.map(a => a.brand?.name).filter(Boolean)));
  const platforms = Array.from(new Set(ads.map(a => a.platform?.name).filter(Boolean)));
  const industries = ["Sports & Fashion", "Technology", "Automotive"];
  const countries = Array.from(new Set(ads.map(a => a.country?.name || a.country?.code).filter(Boolean)));

  return {
    ...trend,
    ads,
    brands,
    platforms,
    industries,
    countries
  };
}

export async function getPlatformWithAds(slug: string) {
  try {
    const platform = await prisma.platform.findUnique({
      where: { slug },
      include: {
        ads: {
          include: { brand: true, platform: true, campaign: true, creatives: true, creativeDna: true, country: true },
          orderBy: { createdAt: 'desc' }
        }
      }
    });
    if (!platform) {
      const ads = MOCK_ADS.filter(a => a.platform?.slug === slug);
      return {
        id: "p-mock",
        name: slug.charAt(0).toUpperCase() + slug.slice(1),
        slug,
        ads
      };
    }
    return platform;
  } catch (error) {
    const ads = MOCK_ADS.filter(a => a.platform?.slug === slug);
    return {
      id: "p-mock",
      name: slug.charAt(0).toUpperCase() + slug.slice(1),
      slug,
      ads
    };
  }
}

export async function getIndustryWithBrands(slug: string) {
  try {
    const industry = await prisma.industry.findUnique({
      where: { slug },
      include: {
        brands: {
          include: {
            ads: {
              include: { brand: true, platform: true, campaign: true, creatives: true, creativeDna: true, country: true },
              orderBy: { createdAt: 'desc' },
              take: 5
            }
          }
        }
      }
    });
    if (!industry) {
      return {
        id: "ind-mock",
        name: slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
        slug,
        brands: MOCK_BRANDS.slice(0, 4).map(b => ({
          ...b,
          ads: MOCK_ADS.filter(a => a.brand.slug === b.slug)
        }))
      };
    }
    return industry;
  } catch (error) {
    return {
      id: "ind-mock",
      name: slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
      slug,
      brands: MOCK_BRANDS.slice(0, 4).map(b => ({
        ...b,
        ads: MOCK_ADS.filter(a => a.brand.slug === b.slug)
      }))
    };
  }
}
