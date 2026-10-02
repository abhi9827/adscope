'use client';

import React from 'react';
import { AdCard } from './AdCard';

interface MasonryAdGridProps {
  ads: any[];
  className?: string;
}

export function MasonryAdGrid({ ads, className = '' }: MasonryAdGridProps) {
  if (!ads || ads.length === 0) return null;

  return (
    <div className={`masonry-grid ${className}`}>
      {ads.map((ad, index) => {
        // Vary aspect ratios dynamically based on format or staggered index for rich masonry feel
        let aspect: 'vertical' | 'square' | 'cinematic' = 'vertical';
        const fmt = (ad.format || '').toLowerCase();
        
        if (fmt.includes('carousel') || fmt.includes('image')) {
          aspect = 'square';
        } else if (fmt.includes('cinematic') || fmt.includes('horizontal') || (index % 5 === 4)) {
          aspect = 'cinematic';
        } else if (index % 3 === 1) {
          aspect = 'square';
        }

        const creativeUrl = ad.creatives?.[0]?.url || ad.imageUrl;
        const brandName = ad.brand?.name || "Brand";
        const brandSlug = ad.brand?.slug || "brand";
        const platformName = ad.platform?.name || "Platform";
        const campaignTitle = ad.campaign?.name || ad.title || "Creative Campaign";
        const hookType = ad.creativeDna?.hookType || ad.hookType;
        const countryCode = ad.country?.code || ad.countryCode || "US";
        const visualStyle = ad.creativeDna?.visualStyle;

        return (
          <div key={ad.id || index} className="masonry-item">
            <AdCard
              id={ad.id}
              brand={brandName}
              brandSlug={brandSlug}
              platform={platformName}
              format={ad.format || "Video"}
              imageUrl={creativeUrl}
              campaign={campaignTitle}
              hookType={hookType}
              country={countryCode}
              visualStyle={visualStyle}
              aspectRatio={aspect}
            />
          </div>
        );
      })}
    </div>
  );
}
