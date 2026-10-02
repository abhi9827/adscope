'use client';

import React from 'react';
import { ExternalLink, Tag } from 'lucide-react';
import { SponsoredPlacement } from '@/lib/monetization/types';

interface SponsoredCardProps {
  sponsor: SponsoredPlacement;
  className?: string;
}

export function SponsoredCard({ sponsor, className = '' }: SponsoredCardProps) {
  return (
    <aside
      aria-label="Sponsored Placement"
      className={`obsidian-card p-6 flex flex-col justify-between border-primary/30 bg-gradient-to-br from-surface-container-low via-surface-container to-surface-container-low relative overflow-hidden group ${className}`}
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Unmistakable SPONSORED Label */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-label-sm text-[10px] uppercase tracking-widest text-primary font-bold px-2 py-0.5 rounded-full bg-primary/15 border border-primary/30">
            SPONSORED
          </span>

          <span className="font-label-sm text-[11px] text-zinc-500">
            {sponsor.sponsorName}
          </span>
        </div>

        <h3 className="font-display text-lg font-bold text-zinc-100 group-hover:text-primary transition-colors leading-snug">
          {sponsor.title}
        </h3>

        <p className="font-body-md text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
          {sponsor.description}
        </p>
      </div>

      <div className="pt-4 mt-5 border-t border-outline-variant/30 flex items-center justify-between">
        <span className="text-[10px] font-label-sm text-zinc-500 uppercase tracking-widest">
          {sponsor.category || 'Partner Placement'}
        </span>

        <a
          href={sponsor.targetUrl}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-white font-label-md text-xs uppercase tracking-wider font-semibold transition-all shadow-md shadow-indigo-500/20"
        >
          <span>{sponsor.ctaText || 'Learn More'}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </aside>
  );
}
