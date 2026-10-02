import Image from "next/image";
import Link from "next/link";
import { Filter } from "lucide-react";
import { AdCard } from "@/components/ads/AdCard";
import { getIndustryWithBrands } from "@/lib/db/actions";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/monetization/AdSlot";

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const industry = await getIndustryWithBrands(slug);
  
  if (!industry) {
    notFound();
  }

  const industryName = industry.name;
  const image = "https://lh3.googleusercontent.com/aida-public/AB6AXuBR8DqxGlSiMVXN2QJFiBc-MC7zr0zfZJqApwuYugDEn7MGdLgkh64Ki1EL5QK403ZWlV8FgV7zRuIUMRCSeJqbtDdtj5oUOj4_YI11edtZkumO5jeY95fRShsjR3UQblEBfqeVx9e9dvWXnLuEhWBLJUU-UszkMegasBC-MuzHCpb8nMeav6b2Vf-SoAh_I5e2nQpOEYhyR1PsZHHVMp1Tv30viKFLho3CkofreXDFIDydQ5VoNsr8";

  const topBrands = industry.brands.slice(0, 5).map((b: any) => ({
    name: b.name,
    count: b.ads?.length || 0,
    slug: b.slug
  }));

  const industryAds = industry.brands.flatMap((b: any) => b.ads || []);

  return (
    <div className="w-full flex flex-col min-h-screen pb-space-xl">
      {/* Industry Header */}
      <div className="relative w-full h-72 md:h-96 bg-surface-container-highest overflow-hidden">
        <Image src={image} alt={industryName} fill className="object-cover opacity-30 grayscale blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/80 to-transparent"></div>
        
        <div className="absolute inset-0 px-margin-desktop py-space-xl flex flex-col justify-end max-w-7xl mx-auto">
          <div className="flex items-center gap-space-sm mb-space-xs text-primary font-label-sm text-label-sm uppercase tracking-widest">
            <span>Industry Forensics</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-on-surface font-bold tracking-tight uppercase max-w-4xl">
            {industryName}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mt-space-sm leading-relaxed">
            Tracking {industry.brands.length} top brands and {industryAds.length} active creatives. Benchmark velocity, messaging tropes, and dominant platforms in this sector.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-margin-desktop py-space-xl">
        
        {/* Top Brands in Industry */}
        <div className="mb-space-2xl">
           <h3 className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface mb-space-md">Top Brands in {industryName}</h3>
           <div className="flex flex-wrap gap-space-sm">
             {topBrands.map((b: any) => (
               <Link href={`/brands/${b.slug}`} key={b.slug} className="px-space-md py-2 bg-surface-container-low border border-outline-variant/40 rounded-lg hover:border-primary hover:bg-surface-container transition-all flex items-center gap-2">
                 <span className="font-label-md text-on-surface">{b.name}</span>
                 <span className="font-label-sm text-outline">{b.count} ads</span>
               </Link>
             ))}
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-space-lg items-start">
          
          {/* Sidebar */}
          <aside className="hidden lg:flex flex-col w-64 shrink-0 gap-space-lg sticky top-24">
            <div>
              <h3 className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface mb-space-sm flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filters
              </h3>
              <div className="h-[1px] w-full bg-outline-variant/30 mb-space-md"></div>
              
              <div className="flex flex-col gap-space-sm">
                <h4 className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Platform</h4>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-4 h-4 rounded-sm border border-outline-variant group-hover:border-primary transition-colors flex items-center justify-center"></div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface">TikTok</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-4 h-4 rounded-sm border border-outline-variant group-hover:border-primary transition-colors flex items-center justify-center"></div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface">Meta (FB/IG)</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 w-full flex flex-col">
            <div className="flex items-center justify-between mb-space-md">
              <span className="font-label-md text-label-md text-on-surface-variant">Showing {industryAds.length} ads</span>
              <select className="bg-transparent border-none text-on-surface font-label-md outline-none cursor-pointer">
                <option className="bg-surface">Sort by: Velocity (High to Low)</option>
                <option className="bg-surface">Sort by: Newest First</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-space-md items-start">
              {industryAds.map((ad: any, i: number) => (
                <AdCard 
                  key={`${ad.id}-${i}`}
                  id={ad.id}
                  brand={ad.brand?.name}
                  brandSlug={ad.brand?.slug}
                  platform={ad.platform?.name || 'Unknown'}
                  format={ad.format}
                  imageUrl={ad.creatives?.[0]?.url || ad.imageUrl || ""}
                  campaign={ad.campaign?.name || ad.title}
                />
              ))}
            </div>
            
            <div className="my-space-xl w-full">
              <AdSlot placement="industry-detail" format="responsive" />
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
