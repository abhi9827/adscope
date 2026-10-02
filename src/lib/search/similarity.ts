import { getAdDetails, getAllAdsForSimilarity } from "@/lib/db/actions";

export interface SimilarAdResult {
  ad: any;
  score: number;
  matchReasons: string[];
  reasonSummary: string;
}

/**
 * Deterministic heuristic similarity calculator for Ad creative discovery.
 * Does NOT require AI, embeddings, or vector databases.
 * Uses: Industry, Brand, Platform, Format, Creative DNA (Visual Style, Hook, Emotion, Themes), Tags, Country.
 */
export async function findSimilarAds(adId: string, limit: number = 4): Promise<SimilarAdResult[]> {
  const targetAd: any = await getAdDetails(adId);
  if (!targetAd) return [];

  const candidateAds: any[] = await getAllAdsForSimilarity();
  const scoredResults: SimilarAdResult[] = [];

  const targetBrand = targetAd.brand?.slug?.toLowerCase();
  const targetPlatform = targetAd.platform?.name?.toLowerCase();
  const targetFormat = targetAd.format?.toLowerCase();
  const targetCountry = (targetAd.country?.code || targetAd.country?.name || "").toLowerCase();
  
  const targetDna = targetAd.creativeDna || {};
  const targetVisualStyle = targetDna.visualStyle?.toLowerCase();
  const targetHook = targetDna.hookType?.toLowerCase();
  const targetEmotion = targetDna.emotionalAngle?.toLowerCase();
  const targetThemes: string[] = (targetDna.themes || []).map((t: string) => t.toLowerCase());
  
  const targetTags: string[] = (targetAd.tags || []).map((t: any) => 
    (t.tag?.name || t.name || "").toLowerCase()
  ).filter(Boolean);

  for (const candidate of candidateAds) {
    if (candidate.id === adId) continue;

    let score = 0;
    const matchReasons: string[] = [];

    // 1. Creative DNA: Visual Style (High weight)
    const candDna = candidate.creativeDna || {};
    const candVisualStyle = candDna.visualStyle?.toLowerCase();
    if (targetVisualStyle && candVisualStyle && targetVisualStyle === candVisualStyle) {
      score += 4;
      matchReasons.push(`${candDna.visualStyle} style`);
    }

    // 2. Creative DNA: Themes overlap
    const candThemes: string[] = (candDna.themes || []).map((t: string) => t.toLowerCase());
    const matchedThemes = targetThemes.filter(t => candThemes.includes(t));
    if (matchedThemes.length > 0) {
      score += matchedThemes.length * 3;
      matchedThemes.slice(0, 2).forEach(t => {
        const capitalized = t.charAt(0).toUpperCase() + t.slice(1);
        matchReasons.push(capitalized);
      });
    }

    // 3. Format match
    const candFormat = candidate.format?.toLowerCase();
    if (targetFormat && candFormat && targetFormat === candFormat) {
      score += 3;
      matchReasons.push(`Similar format (${candidate.format})`);
    }

    // 4. Creative DNA: Hook Type
    const candHook = candDna.hookType?.toLowerCase();
    if (targetHook && candHook && targetHook === candHook) {
      score += 3;
      matchReasons.push(`${candDna.hookType} hook`);
    }

    // 5. Creative DNA: Emotional Angle
    const candEmotion = candDna.emotionalAngle?.toLowerCase();
    if (targetEmotion && candEmotion && targetEmotion === candEmotion) {
      score += 2;
      matchReasons.push(`${candDna.emotionalAngle} angle`);
    }

    // 6. Platform match
    const candPlatform = candidate.platform?.name?.toLowerCase();
    if (targetPlatform && candPlatform && targetPlatform === candPlatform) {
      score += 2;
      matchReasons.push(`On ${candidate.platform?.name}`);
    }

    // 7. Same Brand / Campaign
    const candBrand = candidate.brand?.slug?.toLowerCase();
    if (targetBrand && candBrand && targetBrand === candBrand) {
      score += 2;
      matchReasons.push(`Same brand`);
    }

    // 8. Tags overlap
    const candTags: string[] = (candidate.tags || []).map((t: any) => 
      (t.tag?.name || t.name || "").toLowerCase()
    ).filter(Boolean);
    const matchedTags = targetTags.filter(t => candTags.includes(t));
    if (matchedTags.length > 0) {
      score += matchedTags.length * 2;
      matchedTags.slice(0, 2).forEach(t => {
        if (!matchReasons.includes(t)) matchReasons.push(t);
      });
    }

    // 9. Country match
    const candCountry = (candidate.country?.code || candidate.country?.name || "").toLowerCase();
    if (targetCountry && candCountry && targetCountry === candCountry) {
      score += 1;
    }

    if (score > 0) {
      // Create concise human summary e.g. "Similar format · Athlete · Sports"
      const uniqueReasons = Array.from(new Set(matchReasons));
      const reasonSummary = uniqueReasons.slice(0, 3).join(" · ") || "Related creative pattern";
      
      scoredResults.push({
        ad: candidate,
        score,
        matchReasons: uniqueReasons,
        reasonSummary
      });
    }
  }

  // Sort by highest score descending
  scoredResults.sort((a, b) => b.score - a.score);
  return scoredResults.slice(0, limit);
}
