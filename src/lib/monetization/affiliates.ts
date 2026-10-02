import { AffiliateTool, ToolCategory } from './types';
import { isAffiliateEnabled } from './config';

/**
 * Curated Creative Software & Tools
 *
 * ETHICAL AFFILIATE POLICY:
 * - We only use affiliate links when explicitly partnered and configured.
 * - When no affiliate partner link is set, tools link directly to their clean website URL.
 * - All affiliate links are clearly labeled ("Partner Link" / "Affiliate Link").
 * - We never endorse low-quality spam or tools we haven't researched.
 */
export const AFFILIATE_TOOLS: AffiliateTool[] = [
  {
    id: 'tool-figma',
    name: 'Figma',
    description: 'Collaborative UI/UX design, moodboarding, and advertising artboard composition.',
    websiteUrl: 'https://www.figma.com',
    category: 'Design',
    enabled: true,
    disclosureRequired: false,
    badge: 'Industry Standard',
  },
  {
    id: 'tool-runway',
    name: 'Runway Gen-3',
    description: 'Generative video models for prototyping cinematic camera angles and motion visual effects.',
    websiteUrl: 'https://runwayml.com',
    category: 'Video',
    enabled: true,
    disclosureRequired: false,
    badge: 'AI Motion',
  },
  {
    id: 'tool-capcut',
    name: 'CapCut Desktop',
    description: 'Vertical 9:16 short-form video editing with native TikTok auto-captions and audio rhythm sync.',
    websiteUrl: 'https://www.capcut.com',
    category: 'Video',
    enabled: true,
    disclosureRequired: false,
    badge: '9:16 Short-form',
  },
  {
    id: 'tool-elevenlabs',
    name: 'ElevenLabs',
    description: 'High-fidelity AI voice synthesis for rapid UGC dialogue and video narration prototypes.',
    websiteUrl: 'https://elevenlabs.io',
    category: 'AI',
    enabled: true,
    disclosureRequired: false,
    badge: 'Voiceover AI',
  },
  {
    id: 'tool-semrush',
    name: 'Semrush',
    description: 'Competitive market intelligence, search keyword research, and advertising domain teardowns.',
    websiteUrl: 'https://www.semrush.com',
    category: 'Marketing',
    enabled: true,
    disclosureRequired: false,
    badge: 'SEO & Ads',
  },
  {
    id: 'tool-midjourney',
    name: 'Midjourney',
    description: 'Photorealistic conceptual image synthesis for campaign treatment decks and moodboards.',
    websiteUrl: 'https://www.midjourney.com',
    category: 'Design',
    enabled: true,
    disclosureRequired: false,
    badge: 'Visual Concept',
  },
];

/**
 * Retrieve tools by category or all active tools
 */
export function getAffiliateTools(category?: ToolCategory): AffiliateTool[] {
  if (!isAffiliateEnabled()) {
    // In zero-budget mode with affiliate disabled, still return empty or safe tools
    return [];
  }

  let tools = AFFILIATE_TOOLS.filter(t => t.enabled);
  if (category) {
    tools = tools.filter(t => t.category === category);
  }
  return tools;
}

/**
 * Get top creative tools for inspiration page
 */
export function getRecommendedCreativeTools(count = 4): AffiliateTool[] {
  const tools = AFFILIATE_TOOLS.filter(t => t.enabled);
  return tools.slice(0, count);
}

/**
 * Returns the ethical link target and transparency status
 */
export function getEffectiveToolUrl(tool: AffiliateTool): { url: string; isAffiliate: boolean } {
  if (tool.affiliateUrl && tool.affiliateUrl.trim().length > 0) {
    return {
      url: tool.affiliateUrl,
      isAffiliate: true,
    };
  }

  return {
    url: tool.websiteUrl,
    isAffiliate: false,
  };
}
