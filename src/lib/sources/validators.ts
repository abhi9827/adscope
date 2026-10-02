import { z } from "zod";
import { AdSourceName } from "./types";

/**
 * Zod schema for validating RawAd inputs incoming from source adapters
 */
export const RawAdZodSchema = z.object({
  source: z.enum(['google', 'meta', 'tiktok', 'linkedin', 'mock'] as const),
  sourceAdId: z.string().min(1, "Source ad identifier cannot be empty"),
  title: z.string().optional().default("Untitled Ad"),
  description: z.string().optional().default(""),
  brandName: z.string().min(1, "Brand name required"),
  platformName: z.string().optional().default("Multi-Platform"),
  countryCode: z.string().optional().default("GLOBAL"),
  format: z.string().optional().default("Video"),
  sourceUrl: z.string().url().optional().or(z.literal("")),
  creativeUrl: z.string().url().optional().or(z.literal("")),
  thumbnailUrl: z.string().url().optional().or(z.literal("")),
  callToAction: z.string().optional(),
  firstSeen: z.union([z.string(), z.date()]).optional(),
  lastSeen: z.union([z.string(), z.date()]).optional(),
  active: z.boolean().optional().default(true),
  tags: z.array(z.string()).optional().default([]),
  rawPayload: z.record(z.string(), z.unknown()).optional().default({}),
  metadata: z.record(z.string(), z.unknown()).optional().default({})
});

export type ValidatedRawAd = z.infer<typeof RawAdZodSchema>;

/**
 * Zod schema for validating NormalizedAd records prior to persistence
 */
export const NormalizedAdZodSchema = z.object({
  source: z.enum(['google', 'meta', 'tiktok', 'linkedin', 'mock'] as const),
  sourceAdId: z.string().min(1),
  sourceUrl: z.string().url().optional().or(z.literal("")),
  brand: z.string().min(1),
  brandSlug: z.string().min(1),
  campaign: z.string().optional(),
  campaignSlug: z.string().optional(),
  platform: z.string().min(1),
  platformSlug: z.string().min(1),
  country: z.string().min(1),
  countryCode: z.string().min(2).max(6),
  format: z.string().min(1),
  creativeUrl: z.string().url().optional().or(z.literal("")),
  thumbnailUrl: z.string().url().optional().or(z.literal("")),
  title: z.string().min(1),
  description: z.string(),
  callToAction: z.string().optional(),
  firstSeen: z.date(),
  lastSeen: z.date(),
  active: z.boolean(),
  isDemo: z.boolean(),
  tags: z.array(z.string()),
  sourceMetadata: z.record(z.string(), z.unknown())
});

export function validateRawAd(input: unknown): {
  success: boolean;
  data?: ValidatedRawAd;
  errors?: string[];
} {
  const result = RawAdZodSchema.safeParse(input);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.issues.map(i => `${i.path.join('.') || 'root'}: ${i.message}`)
    };
  }
  return {
    success: true,
    data: result.data
  };
}
