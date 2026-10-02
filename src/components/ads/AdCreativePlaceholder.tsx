'use client';

import React from 'react';

interface AdCreativePlaceholderProps {
  brand: string;
  campaign?: string;
  format?: string;
  aspectRatio?: 'vertical' | 'square' | 'cinematic';
  hookType?: string;
  platform?: string;
  className?: string;
}

export function AdCreativePlaceholder({
  brand,
  campaign = 'Campaign Creative',
  format = 'Short-form Video',
  aspectRatio = 'vertical',
  hookType,
  platform,
  className = '',
}: AdCreativePlaceholderProps) {
  const brandLower = brand.toLowerCase();

  // Color themes customized by brand style
  let brandGradient = 'from-[#121217] via-[#1a1a24] to-[#09090b]';
  let accentColor = '#6366f1';
  let secondaryColor = '#818cf8';
  let watermarkText = 'CONCEPT SPECIMEN';
  let motif = 'default';

  if (brandLower.includes('nike')) {
    brandGradient = 'from-[#1a1a1f] via-[#111114] to-[#050507]';
    accentColor = '#f43f5e';
    secondaryColor = '#ffffff';
    watermarkText = 'JUST DO IT · SPECIMEN';
    motif = 'nike';
  } else if (brandLower.includes('apple')) {
    brandGradient = 'from-[#1e1e24] via-[#121216] to-[#050507]';
    accentColor = '#c7d2fe';
    secondaryColor = '#6366f1';
    watermarkText = 'DESIGNED IN CA · CONCEPT';
    motif = 'apple';
  } else if (brandLower.includes('tesla')) {
    brandGradient = 'from-[#1c1917] via-[#141416] to-[#09090b]';
    accentColor = '#e11d48';
    secondaryColor = '#b95f00';
    watermarkText = 'CYBER SPEC · CONCEPT';
    motif = 'tesla';
  } else if (brandLower.includes('coca') || brandLower.includes('coke')) {
    brandGradient = 'from-[#450a0a] via-[#1f0a0a] to-[#09090b]';
    accentColor = '#ef4444';
    secondaryColor = '#fca5a5';
    watermarkText = 'REAL MAGIC · SPECIMEN';
    motif = 'coke';
  } else if (brandLower.includes('adidas')) {
    brandGradient = 'from-[#1e1b4b] via-[#111118] to-[#050507]';
    accentColor = '#ffffff';
    secondaryColor = '#6366f1';
    watermarkText = 'YOU GOT THIS · SPECIMEN';
    motif = 'adidas';
  } else if (brandLower.includes('samsung')) {
    brandGradient = 'from-[#0f172a] via-[#090d16] to-[#050507]';
    accentColor = '#38bdf8';
    secondaryColor = '#818cf8';
    watermarkText = 'GALAXY AI · CONCEPT';
    motif = 'samsung';
  } else if (brandLower.includes('red bull')) {
    brandGradient = 'from-[#3b1d05] via-[#1e0f03] to-[#09090b]';
    accentColor = '#b95f00';
    secondaryColor = '#f59e0b';
    watermarkText = 'GIVES YOU WINGS · SPEC';
    motif = 'redbull';
  }

  // Aspect ratio classes
  const aspectClass = 
    aspectRatio === 'vertical' ? 'aspect-[9/16]' :
    aspectRatio === 'square' ? 'aspect-square' :
    'aspect-[16/9]';

  return (
    <div
      className={`relative w-full ${aspectClass} bg-gradient-to-br ${brandGradient} overflow-hidden select-none flex flex-col justify-between p-5 border border-white/5 ${className}`}
    >
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {motif === 'nike' && (
          <div className="absolute -right-16 -top-16 w-64 h-64 border-[32px] border-white/10 rounded-full rotate-45 transform" />
        )}
        {motif === 'apple' && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />
        )}
        {motif === 'tesla' && (
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-rose-500/10 to-transparent" />
        )}
        {motif === 'coke' && (
          <div className="absolute -left-20 bottom-10 w-72 h-32 bg-red-600/20 rounded-[100%] blur-2xl rotate-12" />
        )}
        {motif === 'adidas' && (
          <div className="absolute top-0 right-8 w-24 h-full flex gap-3 opacity-15 rotate-12">
            <div className="w-3 h-full bg-white" />
            <div className="w-3 h-full bg-white" />
            <div className="w-3 h-full bg-white" />
          </div>
        )}
        {motif === 'redbull' && (
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-amber-600/25 rounded-full blur-3xl" />
        )}
      </div>

      {/* Atmospheric micro-grid */}
      <div className="absolute inset-0 obsidian-dots opacity-40 pointer-events-none" />

      {/* TOP: Brand Monogram & Format Badge */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div 
            className="w-7 h-7 rounded-lg flex items-center justify-center font-display font-bold text-xs text-white shadow-md border border-white/10"
            style={{ backgroundColor: `${accentColor}33` }}
          >
            {brand.substring(0, 2).toUpperCase()}
          </div>
          <span className="font-display font-bold text-xs uppercase tracking-wider text-white/90 drop-shadow">
            {brand}
          </span>
        </div>

        {format && (
          <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 font-label-sm text-[10px] text-zinc-300 uppercase tracking-widest">
            {format.replace('Short-form ', '').replace('Swipeable ', '')}
          </span>
        )}
      </div>

      {/* CENTER: Creative Specimen Mock Headline */}
      <div className="relative z-10 my-auto text-left py-4">
        {hookType && (
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/10 backdrop-blur-md border border-white/10 text-white font-label-sm text-[10px] uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
            {hookType}
          </div>
        )}
        <h4 className="font-display text-lg sm:text-xl font-bold uppercase tracking-tight text-white line-clamp-2 leading-tight drop-shadow-md">
          {campaign}
        </h4>
        <p className="font-body-sm text-[11px] text-zinc-300/80 mt-1 line-clamp-1">
          Creative direction & framing specimen
        </p>
      </div>

      {/* BOTTOM: Clear Demo Disclaimer & Watermark */}
      <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-label-sm uppercase tracking-wider text-zinc-400">
        <span className="inline-flex items-center gap-1 text-zinc-300">
          <span className="w-1 h-1 rounded-full bg-amber-400" />
          Concept Creative
        </span>
        <span className="text-zinc-500 text-[8px] tracking-widest">
          Demo Representation
        </span>
      </div>
    </div>
  );
}
