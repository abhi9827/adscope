import Link from "next/link";
import { ExternalLink, Sparkles, ArrowLeft, Scale, Bookmark, Eye } from "lucide-react";
import { getAdDetails } from "@/lib/db/actions";
import { notFound } from "next/navigation";
import { CreativeDNASummary } from "@/components/ads/CreativeDNASummary";
import { SimilarAdsSection } from "@/components/ads/SimilarAdsSection";
import { ShareButton } from "@/components/ui/ShareButton";
import { SaveAdButton } from "@/components/ads/SaveAdButton";
import { RecentlyViewedTracker } from "@/components/ads/RecentlyViewedTracker";
import { InteractiveAdPlayer } from "@/components/ads/InteractiveAdPlayer";
import { AdSlot } from "@/components/monetization/AdSlot";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const ad: any = await getAdDetails(id);
  if (!ad) return { title: "Ad Not Found | AdScope" };

  const brandName = ad.brand?.name || "Brand";
  const title = `${brandName} - ${ad.campaign?.name || ad.title} | AdScope`;
  const description = ad.description || `Explore ${brandName}'s indexed creative on AdScope. Discover hook mechanics, visual style, and Creative DNA.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/ads/${id}`
    },
    openGraph: {
      title,
      description,
      type: "article"
    }
  };
}

export default async function AdDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const ad: any = await getAdDetails(id);
  
  if (!ad) {
    notFound();
  }

  const imageUrl = ad.creatives?.[0]?.url || ad.imageUrl || "";
  const brandName = ad.brand?.name || "Brand";
  const brandSlug = ad.brand?.slug || "brand";
  const campaignTitle = ad.campaign?.name || ad.title || "Advertising Specimen";

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-margin-desktop py-10 min-h-screen">
      {/* Record recently viewed in localStorage */}
      <RecentlyViewedTracker
        ad={{
          id: ad.id,
          brand: brandName,
          brandSlug: brandSlug,
          campaign: campaignTitle,
          format: ad.format,
          platform: ad.platform?.name || "Platform",
          imageUrl
        }}
      />
      
      {/* Back Navigation Breadcrumbs */}
      <div className="mb-6 flex items-center justify-between">
        <Link 
          href={`/brands/${brandSlug}`} 
          className="inline-flex items-center gap-2 font-label-md text-xs uppercase tracking-wider text-zinc-400 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {brandName} Collection</span>
        </Link>

        <span className="font-label-sm text-xs text-zinc-500 uppercase tracking-widest hidden sm:inline">
          Specimen #{ad.id}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 xl:gap-12 items-start">
        {/* LEFT: Realistic Creative Preview Player */}
        <div className="w-full lg:w-[45%] xl:w-[48%] shrink-0 sticky top-24">
          <InteractiveAdPlayer
            imageUrl={imageUrl}
            brand={brandName}
            campaign={campaignTitle}
            format={ad.format}
            platform={ad.platform?.name || "Digital"}
            hookType={ad.creativeDna?.hookType}
          />
        </div>

        {/* RIGHT: Creative Intelligence, DNA Breakdown, Actions */}
        <div className="w-full flex-1 flex flex-col gap-6">
          {/* Header & Title */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Link 
                href={`/brands/${brandSlug}`} 
                className="font-display font-bold text-xs uppercase tracking-widest text-primary hover:text-indigo-400 transition-colors"
              >
                {brandName}
              </Link>
              <div className="flex items-center gap-2">
                <ShareButton title={`${brandName} - ${campaignTitle}`} />
                <SaveAdButton
                  ad={{
                    id: ad.id,
                    brand: brandName,
                    brandSlug: brandSlug,
                    campaign: campaignTitle,
                    format: ad.format,
                    platform: ad.platform?.name || "Platform",
                    imageUrl
                  }}
                />
              </div>
            </div>
            
            <h1 className="font-display text-3xl sm:text-4xl text-zinc-100 font-bold tracking-tight uppercase leading-tight">
              {campaignTitle}
            </h1>
          </div>

          {/* Quick Specimen Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-surface-container-low border border-outline-variant/40">
            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-[10px] text-zinc-500 uppercase tracking-widest">Platform</span>
              <span className="font-display text-sm text-zinc-200 font-bold">{ad.platform?.name}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-[10px] text-zinc-500 uppercase tracking-widest">Format</span>
              <span className="font-display text-sm text-zinc-200 font-bold">{ad.format}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-[10px] text-zinc-500 uppercase tracking-widest">Target Market</span>
              <span className="font-display text-sm text-zinc-200 font-bold">{ad.country?.name || 'Global'}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-[10px] text-zinc-500 uppercase tracking-widest">Indexed Date</span>
              <span className="font-mono text-sm text-zinc-200">
                {ad.firstSeen ? new Date(ad.firstSeen).toLocaleDateString() : 'Recent'}
              </span>
            </div>
          </div>

          {/* CREATIVE DNA DEEP DIVE */}
          <div className="obsidian-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <h2 className="font-display text-sm uppercase tracking-wider font-bold text-zinc-100">
                Creative DNA Intelligence
              </h2>
            </div>
            <CreativeDNASummary dna={ad.creativeDna} adFormat={ad.format} />
          </div>

          {/* Creative Rationale / Teardown */}
          <div className="obsidian-card p-5">
            <h3 className="font-display text-xs uppercase tracking-wider text-zinc-300 mb-2 font-bold">
              Creative Execution Summary
            </h3>
            <p className="font-body-md text-sm text-zinc-400 leading-relaxed">
              {ad.description || "High-velocity advertising specimen demonstrating platform-native pacing, focused visual storytelling, and distinct retention hooks."}
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link 
              href={`/compare?ids=${ad.id}`}
              className="flex-1 py-3 px-4 bg-primary hover:bg-primary-container text-white font-label-md text-xs uppercase tracking-wider font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
            >
              <Scale className="w-4 h-4" />
              <span>Compare with Another Ad</span>
            </Link>
            {ad.sourceUrl && (
              <a 
                href={ad.sourceUrl} 
                target="_blank" 
                rel="noreferrer"
                className="py-3 px-5 bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant/50 text-zinc-300 hover:text-white font-label-md text-xs uppercase tracking-wider font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>View Source</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* DISPLAY AD SLOT: AD DETAIL MIDDLE */}
      <div className="my-8">
        <AdSlot placement="ad-detail-middle" format="responsive" />
      </div>

      {/* SIMILAR CREATIVE SECTION */}
      <SimilarAdsSection adId={ad.id} />
    </div>
  );
}
