import { MonetizationConfig, AdProviderType } from './types';

/**
 * AdScope Centralized Monetization Configuration
 *
 * ZERO-BUDGET DEFAULT:
 * In zero-budget mode, all flags default to false unless explicitly enabled in environment variables.
 * When disabled:
 * - No third-party ad scripts load
 * - No tracking cookies or pixels are deployed
 * - No broken ad frames appear
 * - Core product remains 100% free and functional
 */
export function getMonetizationConfig(): MonetizationConfig {
  const isEnvTrue = (val: string | undefined): boolean => {
    return val === 'true' || val === '1';
  };

  const monetizationEnabled = isEnvTrue(
    process.env.NEXT_PUBLIC_MONETIZATION_ENABLED || process.env.MONETIZATION_ENABLED
  );

  const adsEnabled = monetizationEnabled && isEnvTrue(
    process.env.NEXT_PUBLIC_ADS_ENABLED || process.env.ADS_ENABLED
  );

  const affiliateEnabled = isEnvTrue(
    process.env.NEXT_PUBLIC_AFFILIATE_ENABLED || process.env.AFFILIATE_ENABLED
  );

  const sponsoredContentEnabled = monetizationEnabled && isEnvTrue(
    process.env.NEXT_PUBLIC_SPONSORED_CONTENT_ENABLED || process.env.SPONSORED_CONTENT_ENABLED
  );

  const rawProvider = (
    process.env.NEXT_PUBLIC_ADS_PROVIDER || process.env.ADS_PROVIDER || 'none'
  ).toLowerCase() as AdProviderType;

  const validProviders: AdProviderType[] = ['none', 'adsense', 'mock'];
  const adsProvider: AdProviderType = validProviders.includes(rawProvider) ? rawProvider : 'none';

  const adsenseClientId = 
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || process.env.ADSENSE_CLIENT_ID || undefined;

  return {
    monetizationEnabled,
    adsEnabled,
    affiliateEnabled,
    sponsoredContentEnabled,
    adsProvider,
    adsenseClientId,
  };
}

export function isMonetizationEnabled(): boolean {
  return getMonetizationConfig().monetizationEnabled;
}

export function isAdsEnabled(): boolean {
  return getMonetizationConfig().adsEnabled;
}

export function isAffiliateEnabled(): boolean {
  return getMonetizationConfig().affiliateEnabled;
}

export function isSponsoredEnabled(): boolean {
  return getMonetizationConfig().sponsoredContentEnabled;
}

export function isDevelopmentMode(): boolean {
  return process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
}
