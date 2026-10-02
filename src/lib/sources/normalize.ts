import { RawAd, NormalizedAd } from "./types";
import { validateRawAd, NormalizedAdZodSchema } from "./validators";

/**
 * Standardize brand names into clean URL slugs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'general';
}

/**
 * Country code normalization mapping
 */
const COUNTRY_NAME_MAP: Record<string, string> = {
  US: 'United States',
  UK: 'United Kingdom',
  GB: 'United Kingdom',
  JP: 'Japan',
  DE: 'Germany',
  FR: 'France',
  CA: 'Canada',
  AU: 'Australia',
  GLOBAL: 'Global',
};

/**
 * Standardize creative formats across varied platform nomenclatures
 */
export function harmonizeFormat(rawFormat?: string): string {
  if (!rawFormat) return "Video";
  const fmt = rawFormat.toLowerCase();
  
  if (fmt.includes("carousel") || fmt.includes("collection") || fmt.includes("multi")) {
    return "Carousel";
  }
  if (fmt.includes("short") || fmt.includes("reel") || fmt.includes("tiktok") || fmt.includes("story") || fmt.includes("9:16")) {
    return "Short-form Video";
  }
  if (fmt.includes("image") || fmt.includes("photo") || fmt.includes("static") || fmt.includes("banner")) {
    return "Image";
  }
  if (fmt.includes("text") || fmt.includes("search") || fmt.includes("sponsored_content")) {
    return "Text";
  }
  return "Video";
}

/**
 * Normalize disparate source payloads into a unified AdScope NormalizedAd
 */
export function normalizeAd(rawInput: RawAd | unknown): {
  success: boolean;
  data?: NormalizedAd;
  errors?: string[];
} {
  const validation = validateRawAd(rawInput);
  if (!validation.success || !validation.data) {
    return {
      success: false,
      errors: validation.errors || ["Validation failed"]
    };
  }

  const raw = validation.data;
  const brandName = raw.brandName.trim();
  const brandSlug = slugify(brandName);
  const platformName = raw.platformName.trim();
  const platformSlug = slugify(platformName);
  const countryCode = (raw.countryCode || "GLOBAL").toUpperCase().trim();
  const countryName = COUNTRY_NAME_MAP[countryCode] || countryCode;
  const format = harmonizeFormat(raw.format);

  const firstSeen = raw.firstSeen 
    ? new Date(raw.firstSeen) 
    : new Date();
    
  const lastSeen = raw.lastSeen 
    ? new Date(raw.lastSeen) 
    : new Date();

  // Combine raw payload and extra metadata into preserved sourceMetadata JSON
  const sourceMetadata: Record<string, unknown> = {
    ...raw.rawPayload,
    ...raw.metadata,
    ingestionTimestamp: new Date().toISOString(),
    originalFormat: raw.format,
    originalPlatform: raw.platformName
  };

  const normalized: NormalizedAd = {
    source: raw.source,
    sourceAdId: raw.sourceAdId.trim(),
    sourceUrl: raw.sourceUrl || undefined,
    brand: brandName,
    brandSlug,
    platform: platformName,
    platformSlug,
    country: countryName,
    countryCode,
    format,
    creativeUrl: raw.creativeUrl || undefined,
    thumbnailUrl: raw.thumbnailUrl || undefined,
    title: raw.title?.trim() || `${brandName} ${format} Creative`,
    description: raw.description?.trim() || "",
    callToAction: raw.callToAction?.trim() || undefined,
    firstSeen,
    lastSeen,
    active: raw.active ?? true,
    isDemo: raw.source === 'mock',
    tags: raw.tags || [],
    sourceMetadata
  };

  const schemaCheck = NormalizedAdZodSchema.safeParse(normalized);
  if (!schemaCheck.success) {
    return {
      success: false,
      errors: schemaCheck.error.issues.map(i => `${i.path.join('.')}: ${i.message}`)
    };
  }

  return {
    success: true,
    data: normalized
  };
}

/**
 * Backward-compatible helper for legacy test suite
 */
export function normalizeAdRecord(raw: any): {
  success: boolean;
  data?: NormalizedAd & { fingerprint: string };
  errors?: string[];
} {
  const norm = normalizeAd({
    source: raw.source,
    sourceAdId: raw.sourceAdId,
    title: raw.title,
    description: raw.description,
    brandName: raw.brand || raw.brandName || "General",
    platformName: raw.platform || raw.platformName || "Multi-Platform",
    format: raw.format,
    countryCode: raw.countryCode,
    rawPayload: raw
  });

  if (!norm.success || !norm.data) {
    return norm as any;
  }

  return {
    success: true,
    data: {
      ...norm.data,
      fingerprint: `${norm.data.source}::${norm.data.sourceAdId}`
    }
  };
}

