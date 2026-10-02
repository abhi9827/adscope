export const HOOK_TYPES = [
  "Question",
  "Bold Statement",
  "Problem/Solution",
  "Curiosity",
  "Product Reveal",
  "Emotional",
  "Humor",
  "Testimonial",
  "Demonstration"
] as const;

export type HookType = typeof HOOK_TYPES[number];

export const VISUAL_STYLES = [
  "Minimal",
  "Cinematic",
  "UGC",
  "Product-focused",
  "Lifestyle",
  "Editorial",
  "High-energy",
  "Documentary",
  "Animation"
] as const;

export type VisualStyle = typeof VISUAL_STYLES[number];

export const EMOTIONAL_ANGLES = [
  "Excitement",
  "Trust",
  "Humor",
  "Inspiration",
  "Urgency",
  "Curiosity",
  "Confidence",
  "Nostalgia"
] as const;

export type EmotionalAngle = typeof EMOTIONAL_ANGLES[number];

export const CONTENT_FORMATS = [
  "Video",
  "Image",
  "Carousel",
  "Story",
  "Short-form Video",
  "Product Demo",
  "UGC",
  "Influencer"
] as const;

export type ContentFormat = typeof CONTENT_FORMATS[number];

export const CTA_TYPES = [
  "Shop Now",
  "Learn More",
  "Sign Up",
  "Download",
  "Buy Now",
  "Discover",
  "Watch More",
  "Visit Website"
] as const;

export type CtaType = typeof CTA_TYPES[number];

export const AUDIENCE_INTERPRETATIONS = [
  "Athletes",
  "Young adults",
  "Parents",
  "Professionals",
  "Tech enthusiasts",
  "Fitness enthusiasts",
  "General consumers"
] as const;

export type AudienceInterpretation = typeof AUDIENCE_INTERPRETATIONS[number];

export interface CreativeDNAData {
  hookType?: HookType | string;
  visualStyle?: VisualStyle | string;
  emotionalAngle?: EmotionalAngle | string;
  contentFormat?: ContentFormat | string;
  ctaType?: CtaType | string;
  audienceInterpretation?: AudienceInterpretation | string;
  themes: string[];
}
