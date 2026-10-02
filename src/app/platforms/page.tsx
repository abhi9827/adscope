import Link from "next/link";
import { ArrowUpRight, Play, LayoutGrid, Newspaper, Search, Box, Flame } from "lucide-react";
import { AdSlot } from "@/components/monetization/AdSlot";

export default function PlatformsPage() {
  const platforms = [
    { name: 'TikTok', format: 'Short-form Vertical Video', ads: '34,180 Ads', slug: 'tiktok', color: '#ff0050', icon: Play },
    { name: 'Meta', format: 'Mixed Feed & Stories', ads: '48,920 Ads', slug: 'meta', color: '#0081fb', icon: LayoutGrid },
    { name: 'YouTube', format: 'Long-form & Shorts', ads: '22,410 Ads', slug: 'youtube', color: '#ff0000', icon: Play },
    { name: 'LinkedIn', format: 'B2B Professional', ads: '14,820 Ads', slug: 'linkedin', color: '#0a66c2', icon: Newspaper },
    { name: 'Google Search', format: 'Text & Shopping', ads: '52,120 Ads', slug: 'google', color: '#34a853', icon: Search },
    { name: 'Snapchat', format: 'Ephemera & AR', ads: '8,950 Ads', slug: 'snapchat', color: '#fffc00', icon: Flame },
    { name: 'Pinterest', format: 'Visual Discovery', ads: '12,640 Ads', slug: 'pinterest', color: '#e60023', icon: Box },
    { name: 'X / Twitter', format: 'Real-time Conversational', ads: '18,110 Ads', slug: 'x', color: '#ffffff', icon: Newspaper },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-margin-desktop py-space-xl min-h-screen">
      <div className="mb-space-xl">
        <h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-tight mb-space-sm">Explore Platforms</h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
          Discover how creative formats adapt to different algorithmic constraints and distribution vessels.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
        {platforms.map(plat => {
          const Icon = plat.icon;
          return (
            <Link href={`/platforms/${plat.slug}`} key={plat.slug} className="group flex flex-col justify-between h-56 bg-surface-container-low border border-outline-variant/40 rounded-xl p-space-lg hover:border-primary/80 transition-all duration-300 shadow-sm relative overflow-hidden">
              {/* Subtle background glow based on platform color */}
              <div 
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-[40px] opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: plat.color }}
              ></div>
              
              <div className="flex items-start justify-between relative z-10">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: `${plat.color}15`, color: plat.color === '#ffffff' ? '#ffffff' : plat.color, border: `1px solid ${plat.color}30` }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-outline group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="relative z-10 mt-auto">
                <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">{plat.name}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{plat.format}</p>
                <div className="w-full h-[1px] bg-outline-variant/20 my-space-md"></div>
                <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase">{plat.ads}</span>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-space-2xl w-full">
        <AdSlot placement="platforms-directory" format="responsive" />
      </div>
    </div>
  );
}
