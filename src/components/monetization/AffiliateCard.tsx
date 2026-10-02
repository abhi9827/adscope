'use client';

import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { AffiliateTool } from '@/lib/monetization/types';
import { getEffectiveToolUrl } from '@/lib/monetization/affiliates';

interface AffiliateCardProps {
  tool: AffiliateTool;
  className?: string;
}

export function AffiliateCard({ tool, className = '' }: AffiliateCardProps) {
  const { url, isAffiliate } = getEffectiveToolUrl(tool);

  return (
    <div
      className={`obsidian-card p-5 flex flex-col justify-between group hover:-translate-y-1 transition-all duration-300 ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-label-sm text-[10px] text-zinc-500 uppercase tracking-widest px-2 py-0.5 rounded bg-surface-container border border-outline-variant/40">
              {tool.category}
            </span>
            {tool.badge && (
              <span className="font-label-sm text-[10px] text-primary uppercase tracking-widest px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20">
                {tool.badge}
              </span>
            )}
          </div>

          {isAffiliate ? (
            <span className="font-label-sm text-[9px] uppercase tracking-wider text-amber-400 font-semibold px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
              Partner Link
            </span>
          ) : (
            <span className="font-label-sm text-[9px] uppercase tracking-wider text-zinc-500">
              Tool Reference
            </span>
          )}
        </div>

        <h3 className="font-display text-base font-bold text-zinc-100 group-hover:text-primary transition-colors flex items-center gap-1.5">
          <span>{tool.name}</span>
        </h3>

        <p className="font-body-sm text-xs text-zinc-400 mt-2 leading-relaxed">
          {tool.description}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-outline-variant/30 flex items-center justify-between">
        <span className="text-[11px] font-label-sm text-zinc-500">
          {isAffiliate ? 'Affiliate partnership' : 'Direct website'}
        </span>
        <a
          href={url}
          target="_blank"
          rel={isAffiliate ? 'sponsored noopener noreferrer' : 'noopener noreferrer'}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-zinc-200 hover:text-white font-label-md text-xs uppercase tracking-wider transition-colors border border-outline-variant/40 group-hover:border-primary/50"
        >
          <span>Explore Tool</span>
          <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-primary transition-colors" />
        </a>
      </div>
    </div>
  );
}
