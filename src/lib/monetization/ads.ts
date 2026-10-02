import React from 'react';
import { AdFormat, AdPlacement, AdProvider } from './types';
import { getMonetizationConfig, isDevelopmentMode } from './config';

/**
 * Format Dimensions and CSS styles for zero CLS (Cumulative Layout Shift)
 */
export const AD_FORMAT_DIMENSIONS: Record<AdFormat, { minHeight: string; maxWidth?: string; label: string }> = {
  banner: { minHeight: '60px', maxWidth: '728px', label: '728×60 Banner' },
  leaderboard: { minHeight: '90px', maxWidth: '728px', label: '728×90 Leaderboard' },
  rectangle: { minHeight: '250px', maxWidth: '300px', label: '300×250 Medium Rectangle' },
  sidebar: { minHeight: '600px', maxWidth: '300px', label: '300×600 Skyscraper' },
  'in-content': { minHeight: '120px', maxWidth: '100%', label: 'In-Content Flow' },
  mobile: { minHeight: '50px', maxWidth: '320px', label: '320×50 Mobile Banner' },
  responsive: { minHeight: '100px', maxWidth: '100%', label: 'Fluid Responsive Unit' },
};

/**
 * Mock Ad Provider for testing and local development
 */
export class MockAdProvider implements AdProvider {
  id = 'mock' as const;
  name = 'Mock Display Ad Provider';

  isAvailable(): boolean {
    return true;
  }

  renderAd(format: AdFormat, placement: AdPlacement, customSlotId?: string): React.ReactNode {
    const dimensions = AD_FORMAT_DIMENSIONS[format] || AD_FORMAT_DIMENSIONS.responsive;
    
    return React.createElement(
      'div',
      {
        className: 'w-full flex flex-col items-center justify-center p-4 rounded-xl bg-surface-container-low border border-dashed border-outline-variant/60 text-center select-none obsidian-dots',
        style: { minHeight: dimensions.minHeight, maxWidth: dimensions.maxWidth },
        'data-ad-placement': placement,
        'data-ad-format': format,
        'data-slot-id': customSlotId,
      },
      React.createElement(
        'span',
        { className: 'font-label-sm text-[10px] uppercase tracking-widest text-zinc-500 font-semibold mb-1' },
        'ADVERTISEMENT · MOCK PROVIDER'
      ),
      React.createElement(
        'span',
        { className: 'font-mono text-xs text-zinc-400' },
        `${placement} · ${dimensions.label}`
      )
    );
  }
}

/**
 * Google AdSense Provider
 *
 * HOW TO CONFIGURE IN PRODUCTION:
 * 1. Set NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-XXXXXXXXXXXXXXXX" in your environment variables.
 * 2. Set NEXT_PUBLIC_MONETIZATION_ENABLED="true"
 * 3. Set NEXT_PUBLIC_ADS_ENABLED="true"
 * 4. Set NEXT_PUBLIC_ADS_PROVIDER="adsense"
 *
 * The provider will render standard Google AdSense tags with lazy loading.
 */
export class GoogleAdSenseProvider implements AdProvider {
  id = 'adsense' as const;
  name = 'Google AdSense';

  private clientId?: string;

  constructor(clientId?: string) {
    this.clientId = clientId;
  }

  isAvailable(): boolean {
    return Boolean(this.clientId && this.clientId.startsWith('ca-pub-'));
  }

  renderAd(format: AdFormat, placement: AdPlacement, customSlotId?: string): React.ReactNode {
    if (!this.isAvailable()) {
      return null;
    }

    const dimensions = AD_FORMAT_DIMENSIONS[format] || AD_FORMAT_DIMENSIONS.responsive;

    return React.createElement(
      'div',
      {
        className: 'w-full flex items-center justify-center overflow-hidden',
        style: { minHeight: dimensions.minHeight, maxWidth: dimensions.maxWidth },
      },
      React.createElement('ins', {
        className: 'adsbygoogle',
        style: { display: 'block', width: '100%', minHeight: dimensions.minHeight },
        'data-ad-client': this.clientId,
        'data-ad-slot': customSlotId || '1234567890',
        'data-ad-format': format === 'responsive' ? 'auto' : undefined,
        'data-full-width-responsive': format === 'responsive' ? 'true' : undefined,
      })
    );
  }
}

/**
 * Resolve the active Ad Provider based on configuration
 */
export function getActiveAdProvider(): AdProvider | null {
  const config = getMonetizationConfig();

  if (!config.adsEnabled) {
    return null;
  }

  if (config.adsProvider === 'adsense') {
    const provider = new GoogleAdSenseProvider(config.adsenseClientId);
    if (provider.isAvailable()) {
      return provider;
    }
    return null;
  }

  if (config.adsProvider === 'mock') {
    return new MockAdProvider();
  }

  return null;
}
