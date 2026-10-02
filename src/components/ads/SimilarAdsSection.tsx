import { findSimilarAds, SimilarAdResult } from "@/lib/search/similarity";
import { AdCard } from "./AdCard";
import { Sparkles } from "lucide-react";

interface SimilarAdsSectionProps {
  adId: string;
}

export async function SimilarAdsSection({ adId }: SimilarAdsSectionProps) {
  const similarAds: SimilarAdResult[] = await findSimilarAds(adId, 6);

  if (!similarAds || similarAds.length === 0) {
    return null;
  }

  return (
    <section className="mt-20 w-full">
      <div className="flex items-center justify-between mb-space-lg pb-space-sm border-b border-outline-variant/30">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight">
            Similar Creative
          </h2>
        </div>
        <span className="font-label-sm text-xs text-outline tracking-wider uppercase">
          Pattern & DNA Match
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-lg items-start">
        {similarAds.map(({ ad, reasonSummary, score }) => (
          <div key={ad.id} className="flex flex-col gap-2">
            <AdCard
              id={ad.id}
              brand={ad.brand?.name}
              brandSlug={ad.brand?.slug}
              platform={ad.platform?.name}
              format={ad.format}
              imageUrl={ad.creatives?.[0]?.url || ad.imageUrl}
              campaign={ad.campaign?.name || ad.title}
            />
            {/* Why it is similar badge/text */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high/60 border border-outline-variant/30 text-xs font-label-sm text-on-surface-variant">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span className="truncate">{reasonSummary}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
