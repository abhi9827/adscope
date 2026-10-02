import { Filter } from "lucide-react";
import { AdCard } from "@/components/ads/AdCard";
import { FilterSheet } from "@/components/explore/FilterSheet";
import { getLatestAds } from "@/lib/db/actions";
import { AdSlot } from "@/components/monetization/AdSlot";

export default async function ExplorePage() {
  const adsData = await getLatestAds();
  const ads: any[] = adsData || [];

  return (
    <div className="w-full max-w-7xl mx-auto px-margin-desktop py-space-xl min-h-screen flex flex-col">
      <div className="mb-space-xl flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight mb-space-sm">Explore Feed</h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Real-time creative intelligence. Browse the latest ad creatives aggregated across major advertising networks.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-surface-container border border-outline-variant/40 rounded-lg px-4 py-2 text-on-surface font-label-md outline-none cursor-pointer hover:bg-surface-container-high transition-colors">
            <option>Sort: Highest Velocity</option>
            <option>Sort: Newest First</option>
            <option>Sort: Most Saved</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-space-xl items-start">
        {/* Sidebar Filters */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 gap-space-lg sticky top-24">
          <div>
            <h3 className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface mb-space-sm flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filters
            </h3>
            <div className="h-[1px] w-full bg-outline-variant/30 mb-space-md"></div>
          </div>
          
          <div className="flex flex-col gap-space-sm">
            <h4 className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Platform</h4>
            {['TikTok', 'Meta', 'YouTube', 'Google Display', 'X / Twitter'].map(plat => (
               <label key={plat} className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 rounded-sm border border-outline-variant group-hover:border-primary transition-colors flex items-center justify-center"></div>
                <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface">{plat}</span>
              </label>
            ))}
          </div>

          <div className="flex flex-col gap-space-sm">
            <h4 className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Format</h4>
            {['Video', 'Image / Static', 'Carousel', 'Playable'].map(fmt => (
               <label key={fmt} className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 rounded-sm border border-outline-variant group-hover:border-primary transition-colors flex items-center justify-center"></div>
                <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface">{fmt}</span>
              </label>
            ))}
          </div>
          
          <div className="flex flex-col gap-space-sm">
            <h4 className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Industry</h4>
            {['Sports', 'Fashion', 'Technology', 'Automotive', 'F&B'].map(ind => (
               <label key={ind} className="flex items-center gap-3 cursor-pointer group">
                <div className="w-4 h-4 rounded-sm border border-outline-variant group-hover:border-primary transition-colors flex items-center justify-center"></div>
                <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface">{ind}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Feed Grid */}
        <div className="flex-1 w-full">
            <FilterSheet />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-space-md items-start">
              {ads.map((ad: any) => (
                <AdCard 
                  key={ad.id}
                  id={ad.id}
                  brand={ad.brand?.name}
                  brandSlug={ad.brand?.slug}
                  platform={ad.platform?.name}
                  format={ad.format}
                  imageUrl={ad.creatives?.[0]?.url || ad.imageUrl}
                  campaign={ad.campaign?.name}
                />
              ))}
            </div>
            
            <div className="my-space-xl w-full">
              <AdSlot placement="explore-middle" format="responsive" />
            </div>

            <div className="w-full flex justify-center pb-space-xl">
              <button className="px-space-2xl py-4 rounded-full border border-outline-variant/60 text-on-surface font-label-md hover:border-primary hover:bg-surface-container transition-colors shadow-sm">
                Load More Creative
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}
