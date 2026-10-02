import { SponsoredPlacement } from './types';
import { isSponsoredEnabled, isDevelopmentMode } from './config';

/**
 * Sponsored Placements Registry
 *
 * POLICY:
 * - Real sponsors are configured via environment or verified agreements.
 * - Demo/specimen sponsors are only loaded in development when explicitly enabled.
 * - Sponsored cards are ALWAYS labeled "SPONSORED" with high contrast.
 * - Never masquerade as organic AdScope brand analysis or user content.
 */
export const DEMO_SPONSORS: SponsoredPlacement[] = [
  {
    id: 'sponsor-demo-creative-kit',
    sponsorName: 'MotionForge Studio (Partner Demo)',
    title: 'Speed Up 9:16 Video Production with Pre-Cut Templates',
    description: '400+ vertical motion project files designed for TikTok and Instagram Reels creative teams.',
    targetUrl: 'https://adscope.dev/sponsor/motionforge',
    ctaText: 'Explore Templates',
    startDate: '2026-01-01',
    endDate: '2026-12-31',
    enabled: true,
    category: 'Video Production',
  },
];

/**
 * Get active sponsors adhering to current date and enablement flags
 */
export function getActiveSponsors(): SponsoredPlacement[] {
  if (!isSponsoredEnabled()) {
    return [];
  }

  const now = new Date();
  const sponsors = isDevelopmentMode() ? DEMO_SPONSORS : [];

  return sponsors.filter((sponsor) => {
    if (!sponsor.enabled) return false;
    if (sponsor.startDate && new Date(sponsor.startDate) > now) return false;
    if (sponsor.endDate && new Date(sponsor.endDate) < now) return false;
    return true;
  });
}

/**
 * Get single active sponsor for a section or return null
 */
export function getFeaturedSponsor(): SponsoredPlacement | null {
  const active = getActiveSponsors();
  return active.length > 0 ? active[0] : null;
}
