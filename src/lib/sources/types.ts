/**
 * AdScope Source Adapter Architecture - Type Definitions
 *
 * POLICY & COMPLIANCE:
 * - AdScope only integrates with official APIs, authorized public archives, and transparent feeds.
 * - Scraping, CAPTCHA bypassing, bot detection circumvention, and reverse engineering are strictly prohibited.
 * - Credentials are read exclusively from server-side environment variables and NEVER exposed to clients.
 */

export type AdSourceName = 'google' | 'meta' | 'tiktok' | 'linkedin' | 'mock';

export type SourceStatus = 
  | 'available' 
  | 'requires_credentials' 
  | 'disabled' 
  | 'placeholder';

export interface SourceMetadataInfo {
  available: boolean;
  requiresCredentials: boolean;
  supportedCountries: string[];
  supportedPlatforms: string[];
  supportedFields: string[];
  officialSourceUrl: string;
  description: string;
  documentationUrl?: string;
}

export interface SearchParams {
  query?: string;
  brand?: string;
  country?: string;
  platform?: string;
  limit?: number;
  startDate?: Date;
  endDate?: Date;
}

export interface RawAd {
  source: AdSourceName;
  sourceAdId: string;
  rawPayload: Record<string, unknown>;
  title?: string;
  description?: string;
  brandName?: string;
  platformName?: string;
  countryCode?: string;
  format?: string;
  creativeUrl?: string;
  thumbnailUrl?: string;
  sourceUrl?: string;
  callToAction?: string;
  firstSeen?: string | Date;
  lastSeen?: string | Date;
  active?: boolean;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

export interface NormalizedAd {
  id?: string;
  source: AdSourceName;
  sourceAdId: string;
  sourceUrl?: string;
  brand: string;
  brandSlug: string;
  campaign?: string;
  campaignSlug?: string;
  platform: string;
  platformSlug: string;
  country: string;
  countryCode: string;
  format: string;
  creativeUrl?: string;
  thumbnailUrl?: string;
  title: string;
  description: string;
  callToAction?: string;
  firstSeen: Date;
  lastSeen: Date;
  active: boolean;
  isDemo: boolean;
  tags: string[];
  sourceMetadata: Record<string, unknown>;
}

export interface AdSourceAdapter {
  readonly source: AdSourceName;
  readonly name: string;
  readonly metadata: SourceMetadataInfo;
  
  /**
   * Search and retrieve raw advertisements from the source
   */
  search(params: SearchParams): Promise<RawAd[]>;
  
  /**
   * Optionally fetch a single specific ad by identifier
   */
  getAd?(id: string): Promise<RawAd | null>;
}

export interface IngestionReport {
  source: AdSourceName;
  fetched: number;
  valid: number;
  invalid: number;
  inserted: number;
  updated: number;
  duplicate: number;
  failed: number;
  errors: string[];
  durationMs: number;
  timestamp: Date;
}
