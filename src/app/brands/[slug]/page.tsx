import Link from "next/link";
import { Filter, ExternalLink, Scale, Sparkles, ArrowRight, Share2 } from "lucide-react";
import { MasonryAdGrid } from "@/components/ads/MasonryAdGrid";
import { AdSlot } from "@/components/monetization/AdSlot";
import { getBrandWithAds, getBrandCreativeProfile } from "@/lib/db/actions";
import { notFound } from "next/navigation";
import { BrandCreativeProfile } from "@/components/brands/BrandCreativeProfile";
import { ShareButton } from "@/components/ui/ShareButton";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brandData = await getBrandWithAds(slug);
  if (!brandData) return { title: "Brand Not Found | AdScope" };

  const title = `${brandData.name} Ads & Creative Intelligence | AdScope`;
  const description = `Explore ${brandData.name}'s advertising creative profile, formats, platforms, and Creative DNA patterns on AdScope.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/brands/${slug}`
    }
  };
}

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const brandData = await getBrandWithAds(slug);
  
  if (!brandData) {
    notFound();
  }

  const brandName = brandData.name;
  const brandAds = brandData.ads || [];
  const creativeProfile = await getBrandCreativeProfile(slug);

  return (
    <div className="w-full flex flex-col min-h-screen pb-16">
      {/* Brand Hero Header */}
      <div className="w-full bg-surface-container-lowest border-b border-outline-variant/30 pt-12 pb-8 px-4 md:px-margin-desktop relative overflow-hidden obsidian-dots">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:items-end justify-between">
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-surface-container-high border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-2xl">
              <span className="font-display text-3xl sm:text-4xl text-zinc-100 font-bold tracking-tight">
                {brandName.substring(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-[10px] uppercase tracking-widest border border-primary/20">
                  Verified Global Brand
                </span>
                <span className="text-zinc-500 text-xs font-label-sm">· Creative Repository</span>
              </div>
              <h1 className="font-display text-3xl sm:text-5xl text-zinc-100 font-bold tracking-tight uppercase">
                {brandName}
              </h1>
              <p className="font-body-md text-xs sm:text-sm text-zinc-400 max-w-2xl mt-2 leading-relaxed">
                {brandData.description || "High-velocity creative output across dynamic digital formats and global platforms."}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <Link
              href={`/compare?brand=${slug}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 rounded-xl text-zinc-200 font-label-md text-xs transition-colors"
            >
              <Scale className="w-3.5 h-3.5 text-primary" />
              <span>Compare Brand</span>
            </Link>
            <ShareButton title={`${brandName} Advertising Intelligence on AdScope`} />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto mt-8 flex items-center gap-6 border-b border-outline-variant/30 overflow-x-auto scrollbar-none">
          <Link 
            href={`/brands/${slug}`} 
            className="pb-3 border-b-2 border-primary font-label-md text-xs text-primary font-bold uppercase tracking-wider whitespace-nowrap"
          >
            Creative Overview
          </Link>
          <Link 
            href={`/brands/${slug}/campaigns`} 
            className="pb-3 border-b-2 border-transparent hover:border-outline-variant/60 font-label-md text-xs text-zinc-400 hover:text-zinc-200 transition-all uppercase tracking-wider whitespace-nowrap"
          >
            Campaigns
          </Link>
          <Link 
            href={`/compare?brand=${slug}&countryA=us&countryB=japan`} 
            className="pb-3 border-b-2 border-transparent hover:border-outline-variant/60 font-label-md text-xs text-zinc-400 hover:text-zinc-200 transition-all uppercase tracking-wider whitespace-nowrap"
          >
            Cross-Country Comparison
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 md:px-margin-desktop py-12">
        {/* BRAND CREATIVE PROFILE & BREAKDOWN */}
        {creativeProfile && (
          <BrandCreativeProfile profile={creativeProfile} />
        )}

        {/* Ads Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-outline-variant/30 gap-3">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg text-zinc-100 uppercase font-bold tracking-tight">
              Indexed Advertisements
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high border border-outline-variant/40 font-mono text-xs text-primary font-semibold">
              {brandAds.length}
            </span>
          </div>
          <Link 
            href={`/search?brand=${slug}`}
            className="font-label-sm text-xs uppercase tracking-wider text-primary hover:text-indigo-400 flex items-center gap-1 transition-colors"
          >
            <span>Open in Deep Search Filters</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Masonry Feed of Brand Ads */}
        {brandAds.length > 0 ? (
          <>
            <MasonryAdGrid ads={brandAds} />
            {/* DISPLAY AD SLOT: BRAND AFTER GRID */}
            <div className="my-8">
              <AdSlot placement="brand-after-grid" format="responsive" />
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-surface-container-low rounded-2xl border border-outline-variant/30 p-8">
            <p className="font-body-md text-zinc-400">No advertisements currently indexed for this brand.</p>
            <Link href="/search" className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-lg font-label-md text-xs uppercase tracking-wider">
              Browse All Ads
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
