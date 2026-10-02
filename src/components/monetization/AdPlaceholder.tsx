'use client';

import React from 'react';
import { AdFormat, AdPlacement } from '@/lib/monetization/types';
import { AD_FORMAT_DIMENSIONS } from '@/lib/monetization/ads';

interface AdPlaceholderProps {
  placement: AdPlacement;
  format?: AdFormat;
  className?: string;
}

export function AdPlaceholder({
  placement,
  format = 'responsive',
  className = '',
}: AdPlaceholderProps) {
  const dimensions = AD_FORMAT_DIMENSIONS[format] || AD_FORMAT_DIMENSIONS.responsive;

  return (
    <aside
      aria-label="Development Ad Slot Placeholder"
      className={`w-full flex flex-col items-center justify-center p-4 rounded-xl bg-surface-container-lowest/60 border border-dashed border-outline-variant/50 text-center select-none obsidian-dots relative overflow-hidden my-4 ${className}`}
      style={{ minHeight: dimensions.minHeight, maxWidth: dimensions.maxWidth }}
    >
      <div className="flex flex-col items-center gap-1 relative z-10">
        <span className="font-label-sm text-[10px] uppercase tracking-widest text-zinc-500 font-bold px-2 py-0.5 rounded bg-surface-container border border-outline-variant/30">
          ADVERTISEMENT
        </span>
        <span className="font-mono text-xs text-zinc-400 font-medium">
          Development Slot · {dimensions.label}
        </span>
        <span className="font-label-sm text-[10px] text-zinc-600">
          Placement: {placement} (Hidden in Production when ads disabled)
        </span>
      </div>
    </aside>
  );
}
