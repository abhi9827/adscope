'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles } from 'lucide-react';
import { AdCreativePlaceholder } from './AdCreativePlaceholder';

interface InteractiveAdPlayerProps {
  imageUrl?: string;
  brand: string;
  campaign?: string;
  format?: string;
  platform?: string;
  hookType?: string;
}

export function InteractiveAdPlayer({
  imageUrl,
  brand,
  campaign = "Creative Campaign",
  format = "Short-form Video",
  platform = "Platform",
  hookType,
}: InteractiveAdPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [imageError, setImageError] = useState(false);

  const isVideoFormat = format.toLowerCase().includes('video') || !format;

  return (
    <div className="relative w-full aspect-[9/16] bg-zinc-950 rounded-2xl border border-outline-variant/60 overflow-hidden flex items-center justify-center shadow-2xl group select-none">
      {/* Media or Brand Visual Placeholder */}
      {imageUrl && !imageError ? (
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt={campaign}
            fill
            className={`object-contain bg-black transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100'}`}
            priority
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/50 pointer-events-none" />
        </div>
      ) : (
        <AdCreativePlaceholder
          brand={brand}
          campaign={campaign}
          format={format}
          platform={platform}
          hookType={hookType}
          aspectRatio="vertical"
          className="w-full h-full"
        />
      )}

      {/* Top Header Overlay */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 font-label-sm text-xs text-zinc-200">
          <span className="w-2 h-2 rounded-full bg-primary" />
          {platform} · {format}
        </span>

        <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-label-sm text-zinc-400 uppercase tracking-widest">
          Specimen Preview
        </span>
      </div>

      {/* Play/Pause Button Overlay for video formats */}
      {isVideoFormat && (
        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? "Pause preview" : "Play preview"}
          className={`absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-all cursor-pointer z-10 ${
            isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-primary/90 text-white backdrop-blur-md flex items-center justify-center shadow-2xl border border-white/20 hover:scale-110 transition-transform">
            {isPlaying ? (
              <Pause className="w-7 h-7 fill-current" />
            ) : (
              <Play className="w-7 h-7 fill-current ml-1" />
            )}
          </div>
        </button>
      )}

      {/* Realistic Player Bottom Timeline Scrub & Audio Controls */}
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent z-20 flex flex-col gap-2">
        {/* Mock scrubber track */}
        <div className="w-full h-1.5 rounded-full bg-white/20 overflow-hidden relative cursor-pointer group/scrub">
          <div 
            className={`h-full bg-primary rounded-full transition-all duration-300 ${isPlaying ? 'w-2/3' : 'w-1/4'}`}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-400 font-label-sm pt-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-zinc-300">
              {isPlaying ? '0:07 / 0:15' : '0:02 / 0:15'}
            </span>
            <span className="text-zinc-600">·</span>
            <span className="text-[10px] uppercase tracking-wider text-zinc-400">
              {isPlaying ? 'Simulated Loop' : 'Paused'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMuted(!isMuted)}
              className="p-1 rounded hover:bg-white/10 text-zinc-300 transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Clear Disclaimer */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-label-sm uppercase tracking-wider text-zinc-500">
          <span>Source: Public Ad Archive</span>
          <span className="text-amber-400/90 font-medium">Concept Representation</span>
        </div>
      </div>
    </div>
  );
}
