import React from 'react';
import { AdFormat, AdPlacement } from '@/lib/monetization/types';
import { isAdsEnabled, isDevelopmentMode } from '@/lib/monetization/config';
import { getActiveAdProvider, AD_FORMAT_DIMENSIONS } from '@/lib/monetization/ads';
import { AdPlaceholder } from './AdPlaceholder';

interface AdSlotProps {
  placement: AdPlacement;
  format?: AdFormat;
  slotId?: string;
  className?: string;
}

/**
 * Reusable Display Ad Slot
 *
 * RESTRICTED & RESTRAINED PLACEMENT RULES:
 * - Renders nothing when monetization is disabled in production.
 * - Shows a subtle placeholder in development to verify slot layout and dimensions.
 * - Enforces min-heights to eliminate Cumulative Layout Shift (CLS).
 * - Accessible aria labeling.
 * - Never mimics AdScope UI buttons or controls.
 */
export function AdSlot({
  placement,
  format = 'responsive',
  slotId,
  className = '',
}: AdSlotProps) {
  const adsEnabled = isAdsEnabled();
  const isDev = isDevelopmentMode();
  const dimensions = AD_FORMAT_DIMENSIONS[format] || AD_FORMAT_DIMENSIONS.responsive;

  // In production with ads disabled: render nothing
  if (!adsEnabled) {
    if (isDev) {
      return (
        <AdPlaceholder 
          placement={placement} 
          format={format} 
          className={className} 
        />
      );
    }
    return null;
  }

  const provider = getActiveAdProvider();
  if (!provider || !provider.isAvailable()) {
    if (isDev) {
      return (
        <AdPlaceholder 
          placement={placement} 
          format={format} 
          className={className} 
        />
      );
    }
    return null;
  }

  return (
    <aside
      aria-label="Advertisement"
      className={`w-full flex items-center justify-center my-6 overflow-hidden mx-auto ${className}`}
      style={{ minHeight: dimensions.minHeight, maxWidth: dimensions.maxWidth }}
    >
      {provider.renderAd(format, placement, slotId)}
    </aside>
  );
}
