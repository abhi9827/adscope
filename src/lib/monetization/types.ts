import React from 'react';

export type AdFormat = 
  | 'banner' 
  | 'leaderboard' 
  | 'rectangle' 
  | 'sidebar' 
  | 'in-content' 
  | 'mobile' 
  | 'responsive';

export type AdPlacement = 
  | 'homepage-between-sections' 
  | 'homepage-pre-footer' 
  | 'brand-after-grid' 
  | 'brands-directory'
  | 'campaigns-middle'
  | 'ad-detail-middle' 
  | 'trend-between-sections' 
  | 'trends-directory'
  | 'search-inline'
  | 'explore-middle'
  | 'industries-directory'
  | 'industry-detail'
  | 'platforms-directory'
  | 'platform-detail'
  | 'countries-directory'
  | 'country-detail'
  | 'compare-bottom'
  | 'saved-bottom'
  | 'inspiration-middle'
  | 'about-bottom'
  | (string & {});

export type AdProviderType = 'none' | 'adsense' | 'mock';

export interface AdProvider {
  id: AdProviderType;
  name: string;
  isAvailable(): boolean;
  renderAd(format: AdFormat, placement: AdPlacement, customSlotId?: string): React.ReactNode;
}

export type ToolCategory = 
  | 'Design' 
  | 'Video' 
  | 'AI' 
  | 'Marketing' 
  | 'Analytics' 
  | 'Hosting' 
  | 'Productivity';

export interface AffiliateTool {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  affiliateUrl?: string;
  category: ToolCategory;
  logo?: string;
  enabled: boolean;
  disclosureRequired: boolean;
  badge?: string;
}

export interface SponsoredPlacement {
  id: string;
  sponsorName: string;
  title: string;
  description: string;
  imageUrl?: string;
  targetUrl: string;
  ctaText: string;
  startDate?: string;
  endDate?: string;
  enabled: boolean;
  category?: string;
}

export interface MonetizationConfig {
  monetizationEnabled: boolean;
  adsEnabled: boolean;
  affiliateEnabled: boolean;
  sponsoredContentEnabled: boolean;
  adsProvider: AdProviderType;
  adsenseClientId?: string;
}
