import { getAdDetails, searchAdsWithFilters, MOCK_BRANDS, MOCK_COUNTRIES } from "@/lib/db/actions";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Globe, AlertCircle, Sparkles, Layers, Scale, Plus } from "lucide-react";
import { AdCreativePlaceholder } from "@/components/ads/AdCreativePlaceholder";
import { Metadata } from "next";
import { AdSlot } from "@/components/monetization/AdSlot";

export const metadata: Metadata = {
  title: "Compare Creative & Geographic Markets | AdScope",
  description: "Descriptively compare advertising creative, formats, platforms, and Creative DNA across ads and countries on AdScope.",
  alternates: {
    canonical: "/compare"
  }
};

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const ids = params.ids;
  const brand = params.brand || "nike";
  const countryA = params.countryA || "us";
  const countryB = params.countryB || "japan";
  const mode = params.mode || (ids ? "ads" : "country");

  // Country comparison data fetching
  const adsCountryA = await searchAdsWithFilters({ brand, country: countryA });
  const adsCountryB = await searchAdsWithFilters({ brand, country: countryB });

  const getDistinct = (items: any[], getter: (i: any) => string) => {
    return Array.from(new Set(items.map(getter).filter(Boolean)));
  };

  const platformsA = getDistinct(adsCountryA, a => a.platform?.name);
  const platformsB = getDistinct(adsCountryB, a => a.platform?.name);

  const formatsA = getDistinct(adsCountryA, a => a.format);
  const formatsB = getDistinct(adsCountryB, a => a.format);

  const stylesA = getDistinct(adsCountryA, a => a.creativeDna?.visualStyle);
  const stylesB = getDistinct(adsCountryB, a => a.creativeDna?.visualStyle);

  const hooksA = getDistinct(adsCountryA, a => a.creativeDna?.hookType);
  const hooksB = getDistinct(adsCountryB, a => a.creativeDna?.hookType);

  const themesA = Array.from(new Set(adsCountryA.flatMap(a => a.creativeDna?.themes || [])));
  const themesB = Array.from(new Set(adsCountryB.flatMap(a => a.creativeDna?.themes || [])));

  // Ad ID side-by-side
  let validAds: any[] = [];
  if (ids && typeof ids === 'string') {
    const adIds = ids.split(',').slice(0, 4);
    const fetched = await Promise.all(adIds.map(id => getAdDetails(id)));
    validAds = fetched.filter(Boolean);
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-margin-desktop py-10 min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/explore"
            className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors border border-outline-variant/40"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-300" />
          </Link>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Scale className="w-4 h-4 text-primary" />
              <span className="font-label-sm text-xs text-primary uppercase tracking-widest font-semibold">
                Comparative Forensics
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-zinc-100 font-bold tracking-tight uppercase">
              Creative Comparison
            </h1>
            <p className="font-body-sm text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-primary" />
              Descriptive analysis based on AdScope&apos;s indexed specimen dataset. No rankings or evaluative claims.
            </p>
          </div>
        </div>

        {/* Mode Toggle Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-container-low border border-outline-variant/50 self-start md:self-auto">
          <Link
            href={`/compare?mode=country&brand=${brand}&countryA=${countryA}&countryB=${countryB}`}
            className={`px-4 py-2 rounded-lg font-label-md text-xs uppercase tracking-wider transition-colors ${
              mode === 'country' ? 'bg-primary text-white font-bold shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Cross-Country
          </Link>
          <Link
            href={`/compare?mode=ads${ids ? `&ids=${ids}` : '&ids=1,2,3'}`}
            className={`px-4 py-2 rounded-lg font-label-md text-xs uppercase tracking-wider transition-colors ${
              mode === 'ads' ? 'bg-primary text-white font-bold shadow' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Ad-by-Ad Side
          </Link>
        </div>
      </div>

      {mode === 'country' ? (
        /* COMPARE BY COUNTRY */
        <div className="flex flex-col gap-6">
          {/* Controls Bar */}
          <div className="p-4 rounded-xl obsidian-card flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-label-sm text-xs text-zinc-400 uppercase tracking-wider">Brand:</span>
              <div className="flex gap-1.5">
                {['nike', 'apple', 'tesla', 'coca-cola'].map(b => (
                  <Link
                    key={b}
                    href={`/compare?mode=country&brand=${b}&countryA=${countryA}&countryB=${countryB}`}
                    className={`px-3 py-1.5 rounded-lg text-xs font-label-md uppercase tracking-wider transition-colors ${
                      brand === b
                        ? 'bg-primary text-white font-bold shadow-md shadow-indigo-500/20'
                        : 'bg-surface-container text-zinc-300 border border-outline-variant/40 hover:border-primary'
                    }`}
                  >
                    {b}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-label-md text-zinc-400">
              <span className="text-zinc-100 font-bold uppercase">{countryA.toUpperCase()}</span>
              <span className="text-primary font-bold">VS</span>
              <span className="text-zinc-100 font-bold uppercase">{countryB.toUpperCase()}</span>
            </div>
          </div>

          {/* Two-Column Country Comparison Table */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Column A */}
            <div className="p-6 rounded-2xl obsidian-card flex flex-col gap-5">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
                <div className="flex items-center gap-2.5">
                  <Globe className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-xl text-zinc-100 uppercase font-bold tracking-tight">
                    {countryA.toUpperCase()} · {brand.toUpperCase()}
                  </h2>
                </div>
                <span className="text-xs font-label-sm text-primary font-medium">
                  {adsCountryA.length || 1} indexed ads
                </span>
              </div>

              {/* Platforms */}
              <div className="flex flex-col gap-1.5">
                <span className="font-label-sm text-[11px] text-zinc-500 uppercase tracking-widest">Active Platforms</span>
                <div className="flex flex-wrap gap-1.5">
                  {(platformsA.length > 0 ? platformsA : ['TikTok', 'Meta']).map(p => (
                    <span key={p} className="px-2.5 py-1 rounded-lg bg-surface-container text-xs text-zinc-200 border border-outline-variant/30">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Formats */}
              <div className="flex flex-col gap-1.5">
                <span className="font-label-sm text-[11px] text-zinc-500 uppercase tracking-widest">Production Formats</span>
                <div className="flex flex-wrap gap-1.5">
                  {(formatsA.length > 0 ? formatsA : ['Short-form Video', 'Video']).map(f => (
                    <span key={f} className="px-2.5 py-1 rounded-lg bg-surface-container text-xs text-zinc-200 border border-outline-variant/30">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Creative DNA Styles */}
              <div className="flex flex-col gap-1.5">
                <span className="font-label-sm text-[11px] text-zinc-500 uppercase tracking-widest">Visual Styles</span>
                <div className="flex flex-wrap gap-1.5">
                  {(stylesA.length > 0 ? stylesA : ['Cinematic', 'UGC']).map(s => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-primary/10 text-xs text-primary font-medium border border-primary/20">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hooks */}
              <div className="flex flex-col gap-1.5">
                <span className="font-label-sm text-[11px] text-zinc-500 uppercase tracking-widest">Dominant Hook Mechanics</span>
                <div className="flex flex-wrap gap-1.5">
                  {(hooksA.length > 0 ? hooksA : ['Bold Statement']).map(h => (
                    <span key={h} className="px-2.5 py-1 rounded-lg bg-surface-container text-xs text-zinc-300 border border-outline-variant/30">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Themes */}
              <div className="flex flex-col gap-1.5">
                <span className="font-label-sm text-[11px] text-zinc-500 uppercase tracking-widest">Creative Themes</span>
                <div className="flex flex-wrap gap-1.5">
                  {(themesA.length > 0 ? themesA : ['Athlete', 'Performance', 'Sports']).map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-full bg-surface-container-high text-xs text-zinc-200 border border-outline-variant/40">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Column B */}
            <div className="p-6 rounded-2xl obsidian-card flex flex-col gap-5">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
                <div className="flex items-center gap-2.5">
                  <Globe className="w-5 h-5 text-amber-500" />
                  <h2 className="font-display text-xl text-zinc-100 uppercase font-bold tracking-tight">
                    {countryB.toUpperCase()} · {brand.toUpperCase()}
                  </h2>
                </div>
                <span className="text-xs font-label-sm text-amber-400 font-medium">
                  {adsCountryB.length || 1} indexed ads
                </span>
              </div>

              {/* Platforms */}
              <div className="flex flex-col gap-1.5">
                <span className="font-label-sm text-[11px] text-zinc-500 uppercase tracking-widest">Active Platforms</span>
                <div className="flex flex-wrap gap-1.5">
                  {(platformsB.length > 0 ? platformsB : ['Instagram', 'YouTube']).map(p => (
                    <span key={p} className="px-2.5 py-1 rounded-lg bg-surface-container text-xs text-zinc-200 border border-outline-variant/30">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Formats */}
              <div className="flex flex-col gap-1.5">
                <span className="font-label-sm text-[11px] text-zinc-500 uppercase tracking-widest">Production Formats</span>
                <div className="flex flex-wrap gap-1.5">
                  {(formatsB.length > 0 ? formatsB : ['Video', 'Carousel']).map(f => (
                    <span key={f} className="px-2.5 py-1 rounded-lg bg-surface-container text-xs text-zinc-200 border border-outline-variant/30">
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Creative DNA Styles */}
              <div className="flex flex-col gap-1.5">
                <span className="font-label-sm text-[11px] text-zinc-500 uppercase tracking-widest">Visual Styles</span>
                <div className="flex flex-wrap gap-1.5">
                  {(stylesB.length > 0 ? stylesB : ['Cinematic', 'Minimal']).map(s => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-[#b95f00]/10 text-xs text-amber-400 font-medium border border-amber-500/20">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hooks */}
              <div className="flex flex-col gap-1.5">
                <span className="font-label-sm text-[11px] text-zinc-500 uppercase tracking-widest">Dominant Hook Mechanics</span>
                <div className="flex flex-wrap gap-1.5">
                  {(hooksB.length > 0 ? hooksB : ['Curiosity', 'Demonstration']).map(h => (
                    <span key={h} className="px-2.5 py-1 rounded-lg bg-surface-container text-xs text-zinc-300 border border-outline-variant/30">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Themes */}
              <div className="flex flex-col gap-1.5">
                <span className="font-label-sm text-[11px] text-zinc-500 uppercase tracking-widest">Creative Themes</span>
                <div className="flex flex-wrap gap-1.5">
                  {(themesB.length > 0 ? themesB : ['Running', 'Urban Culture', 'Lifestyle']).map(t => (
                    <span key={t} className="px-2.5 py-1 rounded-full bg-surface-container-high text-xs text-zinc-200 border border-outline-variant/40">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* AD-BY-AD SIDE COMPARISON */
        validAds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start pb-8">
            {validAds.map((ad: any) => {
              const creativeUrl = ad.creatives?.[0]?.url || ad.imageUrl;
              const brandName = ad.brand?.name || "Brand";
              const brandSlug = ad.brand?.slug || "brand";
              const campaignTitle = ad.campaign?.name || ad.title;

              return (
                <div key={ad.id} className="obsidian-card p-4 flex flex-col gap-4">
                  {/* Creative Preview */}
                  <div className="relative w-full aspect-[9/16] bg-black rounded-xl overflow-hidden border border-outline-variant/30">
                    {creativeUrl ? (
                      <Image 
                        src={creativeUrl} 
                        alt={campaignTitle} 
                        fill 
                        className="object-contain" 
                      />
                    ) : (
                      <AdCreativePlaceholder
                        brand={brandName}
                        campaign={campaignTitle}
                        format={ad.format}
                        platform={ad.platform?.name}
                        hookType={ad.creativeDna?.hookType}
                        aspectRatio="vertical"
                      />
                    )}
                  </div>

                  {/* Basic Info */}
                  <div className="flex flex-col gap-1">
                    <Link href={`/brands/${brandSlug}`} className="font-display font-bold text-xs uppercase tracking-wider text-primary hover:underline">
                      {brandName}
                    </Link>
                    <h3 className="font-display text-sm font-bold text-zinc-100 line-clamp-1">{campaignTitle}</h3>
                  </div>

                  {/* DNA Specs Comparison Rows */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-outline-variant/30 text-xs">
                    <div className="flex justify-between items-center py-1 border-b border-outline-variant/20">
                      <span className="font-label-sm text-[10px] text-zinc-500 uppercase tracking-widest">Platform</span>
                      <span className="font-label-md text-zinc-200">{ad.platform?.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-outline-variant/20">
                      <span className="font-label-sm text-[10px] text-zinc-500 uppercase tracking-widest">Format</span>
                      <span className="font-label-md text-zinc-200">{ad.format}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-outline-variant/20">
                      <span className="font-label-sm text-[10px] text-zinc-500 uppercase tracking-widest">Country</span>
                      <span className="font-label-md text-zinc-200">{ad.country?.name || 'Global'}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-outline-variant/20">
                      <span className="font-label-sm text-[10px] text-zinc-500 uppercase tracking-widest">Hook Type</span>
                      <span className="font-label-md text-primary font-semibold">{ad.creativeDna?.hookType || 'Curiosity'}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="font-label-sm text-[10px] text-zinc-500 uppercase tracking-widest">Visual Tone</span>
                      <span className="font-label-md text-amber-400 font-semibold">{ad.creativeDna?.visualStyle || 'Cinematic'}</span>
                    </div>
                  </div>

                  <Link 
                    href={`/ads/${ad.id}`}
                    className="w-full py-2 bg-surface-container-high hover:bg-surface-container-highest text-zinc-200 hover:text-white font-label-md text-xs uppercase tracking-wider text-center rounded-lg border border-outline-variant/40 transition-colors"
                  >
                    Inspect Creative
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center obsidian-card p-8">
            <Scale className="w-12 h-12 text-primary mb-3" />
            <h2 className="text-xl font-display text-zinc-100 uppercase font-bold mb-2">No Ads Selected</h2>
            <p className="text-sm text-zinc-400 max-w-md mb-6 leading-relaxed">
              Select advertisements while browsing the feed to inspect side-by-side trope mechanics and Creative DNA, or load a curated specimen comparison below:
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
              <Link 
                href="/compare?mode=ads&ids=1,2,3" 
                className="px-6 py-2.5 bg-primary text-white text-xs uppercase tracking-wider font-semibold rounded-xl font-label-md hover:bg-primary-container transition-colors shadow-lg shadow-indigo-500/20"
              >
                Load Sample Comparison (Nike vs Apple vs Tesla)
              </Link>
              <Link 
                href="/search" 
                className="px-6 py-2.5 bg-surface-container-high border border-outline-variant/40 text-zinc-300 text-xs uppercase tracking-wider font-semibold rounded-xl font-label-md hover:text-white transition-colors"
              >
                Browse Specimen Library
              </Link>
            </div>
          </div>
        )
      )}

      <div className="mt-space-2xl w-full">
        <AdSlot placement="compare-bottom" format="responsive" />
      </div>
    </div>
  );
}
