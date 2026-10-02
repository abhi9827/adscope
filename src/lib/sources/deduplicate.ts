import { NormalizedAd } from "./types";

/**
 * Generate a deterministic deduplication key for an ad
 */
export function getAdFingerprint(ad: { source: string; sourceAdId: string; brandSlug?: string; title?: string }): string {
  if (ad.source && ad.sourceAdId) {
    return `${ad.source.toLowerCase().trim()}::${ad.sourceAdId.toLowerCase().trim()}`;
  }
  // Fallback signature based on brand and title
  const brand = (ad.brandSlug || 'unknown').toLowerCase().trim();
  const title = (ad.title || '').toLowerCase().trim();
  return `content::${brand}::${title}`;
}

export interface DeduplicateResult {
  unique: NormalizedAd[];
  duplicates: NormalizedAd[];
  duplicateCount: number;
}

/**
 * Deduplicate a batch of normalized advertisements in-memory
 */
export function deduplicateBatch(
  ads: NormalizedAd[],
  existingKeys: Set<string> = new Set()
): DeduplicateResult {
  const seen = new Set<string>(existingKeys);
  const unique: NormalizedAd[] = [];
  const duplicates: NormalizedAd[] = [];

  for (const ad of ads) {
    const key = getAdFingerprint(ad);
    if (seen.has(key)) {
      duplicates.push(ad);
    } else {
      seen.add(key);
      unique.push(ad);
    }
  }

  return {
    unique,
    duplicates,
    duplicateCount: duplicates.length,
  };
}

/**
 * Backward-compatible helper for legacy test suite
 */
export function deduplicateRecords(records: any[]): {
  uniqueRecords: any[];
  duplicateCount: number;
} {
  const seen = new Set<string>();
  const uniqueRecords: any[] = [];
  let duplicateCount = 0;

  for (const r of records) {
    const key = `${(r.source || '').toLowerCase()}::${(r.sourceAdId || '').toLowerCase()}`;
    if (seen.has(key)) {
      duplicateCount++;
    } else {
      seen.add(key);
      uniqueRecords.push(r);
    }
  }

  return {
    uniqueRecords,
    duplicateCount
  };
}

/**
 * Checks if two ad records are exact duplicates based on source and sourceAdId
 */
export function isExactDuplicate(
  a: { source: string; sourceAdId: string },
  b: { source: string; sourceAdId: string }
): boolean {
  return (
    a.source.toLowerCase().trim() === b.source.toLowerCase().trim() &&
    a.sourceAdId.toLowerCase().trim() === b.sourceAdId.toLowerCase().trim()
  );
}


