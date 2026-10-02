'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { isAdSaved, saveAd, removeSavedAd } from "@/lib/storage/local";
import { Bookmark, Sparkles, Scale, ArrowUpRight } from "lucide-react";
import { AdCreativePlaceholder } from "./AdCreativePlaceholder";

export interface AdCardProps {
  id: string;
  brand: string;
  brandSlug: string;
  platform: string;
  format: string;
  imageUrl?: string;
  campaign?: string;
  hookType?: string;
  country?: string;
  visualStyle?: string;
  aspectRatio?: 'vertical' | 'square' | 'cinematic';
  className?: string;
}

export function AdCard({
  id,
  brand,
  brandSlug,
  platform,
  format,
  imageUrl,
  campaign = "Always-On Campaign",
  hookType,
  country = "US",
  visualStyle,
  aspectRatio = "vertical",
  className = "",
}: AdCardProps) {
  const [saved, setSaved] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setSaved(isAdSaved(id));
    
    const handleStorageChange = () => {
      setSaved(isAdSaved(id));
    };
    window.addEventListener('adscope-storage-changed', handleStorageChange);
    return () => window.removeEventListener('adscope-storage-changed', handleStorageChange);
  }, [id]);

  const toggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (saved) {
      removeSavedAd(id);
    } else {
      saveAd({
        id,
        brand,
        brandSlug,
        campaign,
        format,
        platform,
        imageUrl,
        savedAt: new Date().toISOString()
      });
    }
  };

  // Platform accent dot
  let platformBadgeColor = "#6366f1";
  const platLower = platform.toLowerCase();
  if (platLower.includes("tiktok")) platformBadgeColor = "#ff0050";
  else if (platLower.includes("meta") || platLower.includes("facebook") || platLower.includes("instagram")) platformBadgeColor = "#0081fb";
  else if (platLower.includes("youtube")) platformBadgeColor = "#ff0000";
  else if (platLower.includes("google")) platformBadgeColor = "#34a853";

  // Aspect ratio class mapping
  const aspectClass = 
    aspectRatio === 'square' ? 'aspect-square' :
    aspectRatio === 'cinematic' ? 'aspect-[16/9]' :
    'aspect-[9/16]';

  return (
    <div className={`obsidian-card group relative overflow-hidden flex flex-col justify-between transition-all duration-300 ${className}`}>
      {/* Top Preview Area */}
      <div className={`relative w-full ${aspectClass} bg-surface-container-highest overflow-hidden`}>
        {imageUrl && !imageError ? (
          <>
            <Image 
              src={imageUrl} 
              alt={`Advertising creative concept for ${brand}`} 
              width={480}
              height={720}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
            />
            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
            
            {/* Disclaimer pill over real or external image */}
            <div className="absolute bottom-2 left-2 z-10 pointer-events-none">
              <span className="px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10 text-[9px] font-label-sm uppercase tracking-wider text-zinc-400">
                Demo Asset
              </span>
            </div>
          </>
        ) : (
          <AdCreativePlaceholder 
            brand={brand}
            campaign={campaign}
            format={format}
            hookType={hookType}
            platform={platform}
            aspectRatio={aspectRatio}
          />
        )}
        
        {/* Top Badges Bar */}
        <div className="absolute top-2.5 inset-x-2.5 z-20 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 font-label-sm text-[11px] text-zinc-200">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: platformBadgeColor }} />
            {platform}
          </span>

          <button
            type="button"
            onClick={toggleSave}
            title={saved ? "Remove from personal library" : "Save to personal library"}
            className={`pointer-events-auto w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
              saved 
                ? 'bg-primary border-primary text-white shadow-lg shadow-indigo-500/30' 
                : 'bg-black/60 border-white/10 text-zinc-300 hover:text-white hover:border-white/30'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
          </button>
        </div>
        
        {/* Bottom Actions Overlay on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-between gap-2 z-20">
          <Link 
            href={`/ads/${id}`} 
            className="flex-1 py-2 px-3 bg-primary hover:bg-primary-container text-white font-label-md text-xs text-center rounded-lg uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-md"
          >
            <span>Inspect</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <Link 
            href={`/compare?ids=${id}`} 
            className="p-2 bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-primary rounded-lg border border-white/10 transition-colors flex items-center justify-center" 
            title="Compare with another ad"
          >
            <Scale className="w-4 h-4" />
          </Link>
        </div>
      </div>
      
      {/* Card Metadata Footer */}
      <div className="p-3.5 bg-surface-container-low flex flex-col justify-between gap-2 flex-1">
        <div>
          <div className="flex items-center justify-between gap-2">
            <Link 
              href={`/brands/${brandSlug}`} 
              className="font-headline-sm text-xs font-semibold text-zinc-400 hover:text-primary uppercase tracking-wider transition-colors"
            >
              {brand}
            </Link>
            <span className="font-label-sm text-[10px] text-zinc-500 uppercase tracking-widest px-1.5 py-0.5 rounded bg-surface-container-highest border border-outline-variant/30">
              {country}
            </span>
          </div>

          <Link href={`/ads/${id}`}>
            <h3 className="font-display text-sm font-bold text-zinc-100 line-clamp-1 mt-1 group-hover:text-primary transition-colors">
              {campaign}
            </h3>
          </Link>
        </div>

        {/* Authentic Creative DNA Tags */}
        <div className="pt-2 border-t border-outline-variant/40 flex items-center justify-between font-label-sm text-[11px] text-zinc-400">
          <span className="text-zinc-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-primary" />
            {hookType || (format?.toLowerCase().includes("video") ? "Video Hook" : "Visual Concept")}
          </span>
          <span className="text-zinc-500">
            {format?.replace("Short-form ", "")}
          </span>
        </div>
      </div>
    </div>
  );
}
