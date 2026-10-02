'use client';

import { useEffect } from 'react';
import { recordRecentlyViewed } from '@/lib/storage/local';

interface RecentlyViewedTrackerProps {
  ad: {
    id: string;
    brand: string;
    brandSlug: string;
    campaign?: string;
    format: string;
    platform: string;
    imageUrl?: string;
  };
}

export function RecentlyViewedTracker({ ad }: RecentlyViewedTrackerProps) {
  useEffect(() => {
    if (ad && ad.id) {
      recordRecentlyViewed(ad);
    }
  }, [ad]);

  return null;
}
