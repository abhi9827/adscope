import Image from "next/image";
import Link from "next/link";
import { Filter, Play } from "lucide-react";
import { AdCard } from "@/components/ads/AdCard";
import { getPlatformWithAds } from "@/lib/db/actions";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/monetization/AdSlot";

export default async function PlatformDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const platform = await getPlatformWithAds(slug);
  
  if (!platform) {
    notFound();
  }

  const platformName = platform.name;
  const platformAds = platform.ads || [];
  
  let platformColor = "#ffffff";
  if (slug === 'tiktok') platformColor = "#ff0050";
  if (slug === 'meta') platformColor = "#0081fb";

  return (
    <div className="w-full flex flex-col min-h-screen pb-space-xl">
      {/* Platform Header */}
      <div className="w-full bg-surface-container-lowest border-b border-surface-variant pt-space-xl pb-space-lg px-margin-desktop relative overflow-hidden">
        <div 
           className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[100px] opacity-10 pointer-events-none"
           style={{ backgroundColor: platformColor }}
        ></div>
        <div className="max-w-7xl mx-auto flex flex-col relative z-10">
          <div className="flex items-center gap-space-sm mb-space-sm text-primary font-label-sm text-label-sm uppercase tracking-widest">
            <span>Platform Forensics</span>
          </div>
          <div className="flex items-center gap-space-md mb-space-md">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg" style={{ backgroundColor: `${platformColor}15`, border: `1px solid ${platformColor}40` }}>
               <Play className="w-8 h-8" style={{ color: platformColor }} />
            </div>
            <h1 className="font-display text-5xl md:text-6xl text-on-surface font-bold tracking-tight uppercase">
              {platformName}
            </h1>
          </div>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
            {platformAds.length} Active Ads. Explore algorithmic constraints, native hooks, and dominant visual formats currently scaling on {platformName}.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-margin-desktop py-space-xl">
        <div className="flex flex-col lg:flex-row gap-space-lg items-start">
          
          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col w-64 shrink-0 gap-space-lg sticky top-24">
            <div>
              <h3 className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface mb-space-sm flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filters
              </h3>
              <div className="h-[1px] w-full bg-outline-variant/30 mb-space-md"></div>
              
              <div className="flex flex-col gap-space-sm">
                <h4 className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Industry</h4>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-4 h-4 rounded-sm border border-outline-variant group-hover:border-primary transition-colors flex items-center justify-center"></div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface">Sports</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-4 h-4 rounded-sm border border-outline-variant group-hover:border-primary transition-colors flex items-center justify-center"></div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface">Tech</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 w-full flex flex-col">
            <div className="flex items-center justify-between mb-space-md">
              <span className="font-label-md text-label-md text-on-surface-variant">Showing {platformAds.length} ads on {platformName}</span>
              <select className="bg-transparent border-none text-on-surface font-label-md outline-none cursor-pointer">
                <option className="bg-surface">Sort by: Velocity (High to Low)</option>
                <option className="bg-surface">Sort by: Newest First</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-space-md items-start">
              {platformAds.map((ad: any, i: number) => (
                <AdCard 
                  key={`${ad.id}-${i}`}
                  id={ad.id}
                  brand={ad.brand?.name}
                  brandSlug={ad.brand?.slug}
                  platform={platformName}
                  format={ad.format}
                  imageUrl={ad.creatives?.[0]?.url || ad.imageUrl || ""}
                  campaign={ad.campaign?.name || ad.title}
                />
              ))}
            </div>
            
            <div className="my-space-xl w-full">
              <AdSlot placement="platform-detail" format="responsive" />
            </div>

            <div className="w-full flex justify-center">
              <button className="px-space-xl py-3 rounded-full border border-outline-variant/60 text-on-surface font-label-md hover:border-primary hover:bg-surface-container transition-colors">
                Load More Creative
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
