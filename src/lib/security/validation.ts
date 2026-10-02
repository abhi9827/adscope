import { z } from 'zod';

// ─────────────────────────────────────────────────────────────
// SEARCH
// ─────────────────────────────────────────────────────────────
export const SearchSchema = z.object({
  q:        z.string().trim().max(100).optional(),
  brand:    z.string().trim().max(100).optional(),
  platform: z.string().trim().max(50).optional(),
  country:  z.string().trim().max(10).optional(),
  format:   z.string().trim().max(50).optional(),
  page:     z.coerce.number().int().min(1).max(1000).default(1),
  limit:    z.coerce.number().int().min(1).max(50).default(20),
});
export type SearchParams = z.infer<typeof SearchSchema>;

// ─────────────────────────────────────────────────────────────
// BRANDS
// ─────────────────────────────────────────────────────────────
export const BrandsSchema = z.object({
  page:  z.coerce.number().int().min(1).max(1000).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(50),
});
export type BrandsParams = z.infer<typeof BrandsSchema>;

// ─────────────────────────────────────────────────────────────
// AI ANALYZE
// ─────────────────────────────────────────────────────────────
export const AiAnalyzeSchema = z.object({
  adId:     z.string().trim().max(200).optional(),
  imageUrl: z
    .string()
    .trim()
    .max(2000)
    .url('imageUrl must be a valid URL')
    .refine(
      (url) => url.startsWith('https://') || url.startsWith('http://'),
      { message: 'imageUrl must use http or https scheme' }
    ),
});
export type AiAnalyzeParams = z.infer<typeof AiAnalyzeSchema>;

// ─────────────────────────────────────────────────────────────
// URL SAFETY — reusable for affiliate / sponsor URLs
// ─────────────────────────────────────────────────────────────
export const SafeUrlSchema = z
  .string()
  .trim()
  .max(2000)
  .url()
  .refine(
    (url) => {
      try {
        const parsed = new URL(url);
        return parsed.protocol === 'https:' || parsed.protocol === 'http:';
      } catch {
        return false;
      }
    },
    { message: 'URL must use http or https scheme only' }
  );

/**
 * Validates that a URL only uses http/https schemes.
 * Rejects javascript:, data:, vbscript:, etc.
 */
export function isSafeUrl(url: string): boolean {
  return SafeUrlSchema.safeParse(url).success;
}
