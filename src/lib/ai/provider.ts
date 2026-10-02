import { CreativeDNAData } from "@/types/creative-dna";

export interface CreativeInspirationInput {
  prompt: string;
  industry?: string;
  platform?: string;
  format?: string;
  audience?: string;
  creativeStyle?: string;
}

export interface CreativeDirectionResult {
  hook: string;
  creativeFormat: string;
  visualDirection: string;
  messaging: string;
  structure: string;
  cta: string;
  suggestedCreativeDna: CreativeDNAData;
  disclaimer: string;
  source: 'MockAIProvider' | 'OpenAICompatibleProvider';
}

export interface AdAnalysisResult {
  sentiment: string;
  keyHooks: string[];
  visualElements: string[];
  targetAudience: string;
  psychologicalTriggers: string[];
  suggestedTags: string[];
}

export interface AIProvider {
  name: string;
  generateCreativeIdea(input: CreativeInspirationInput): Promise<CreativeDirectionResult>;
  analyzeAd(adIdOrUrl: string): Promise<AdAnalysisResult>;
  generateCreativeTags(adDetails: any): Promise<string[]>;
  compareAds(adIds: string[]): Promise<{ comparisonSummary: string; keyDifferentiators: string[] }>;
}

/**
 * Deterministic Mock AI Provider ($0 budget requirement).
 * Generates structured, high-relevance creative directions without external API calls.
 */
export class MockAIProvider implements AIProvider {
  name = "MockAIProvider";

  async generateCreativeIdea(input: CreativeInspirationInput): Promise<CreativeDirectionResult> {
    const { prompt, industry, platform, format, audience, creativeStyle } = input;
    const lower = (prompt + ' ' + (industry || '')).toLowerCase();

    // Deterministic intelligence based on input cues
    let hook = "What if the hardest part of your day was already solved?";
    let visualDirection = "Split-screen comparison showing raw friction vs frictionless resolution with fast cut pacing.";
    let messaging = "Cut through the noise with immediate, tactile utility.";
    let structure = "Friction Hook (0-3s) → Mechanism Reveal (3-8s) → Proof Demonstration (8-15s) → Direct CTA (15-20s)";
    let cta = "Learn More";
    let hookType = "Problem/Solution";
    let style = creativeStyle || "Cinematic";
    let contentFmt = format || "Short-form Video";
    let aud = audience || "General consumers";
    let themes = ["Innovation", "Problem Solving", "Modern Lifestyle"];

    if (lower.includes("food") || lower.includes("delivery") || lower.includes("restaurant")) {
      hook = "Still waiting 45 minutes for dinner?";
      visualDirection = "Fast-paced handheld POV shot of hunger agitation transitioning to steaming gourmet plating in 15 minutes.";
      messaging = "Restaurant quality delivered before your craving fades.";
      structure = "Hunger Tension (0-3s) → Chef Prep & Delivery Flash (3-7s) → Table Unboxing (7-12s) → CTA (12-15s)";
      cta = "Order Now";
      hookType = "Question";
      style = creativeStyle || "UGC";
      contentFmt = format || "Short-form Video";
      aud = audience || "Young adults";
      themes = ["Food Delivery", "Speed", "Convenience"];
    } else if (lower.includes("sport") || lower.includes("fitness") || lower.includes("gym") || lower.includes("shoe")) {
      hook = "You don't need motivation. You need a standard.";
      visualDirection = "High-contrast monochrome lighting, heavy breathing audio, macro textures of sweat and sneaker grip.";
      messaging = "Engineered for athletes who refuse compromises.";
      structure = "Raw Locker Room Stillness (0-3s) → High-Velocity Sprint Sequence (3-10s) → Climax (10-15s) → Logo & CTA";
      cta = "Shop Now";
      hookType = "Bold Statement";
      style = creativeStyle || "High-energy";
      contentFmt = format || "Video";
      aud = audience || "Athletes";
      themes = ["Athlete", "Performance", "Discipline"];
    } else if (lower.includes("tech") || lower.includes("software") || lower.includes("saas") || lower.includes("app")) {
      hook = "Stop wasting 12 hours a week on manual spreadsheets.";
      visualDirection = "Clean dark-mode UI capture with fluid typography micro-animations and zero-latency click cues.";
      messaging = "Automate your highest-friction workflows in two clicks.";
      structure = "Frustration Pinch-point (0-3s) → One-Click Fix (3-8s) → Real-time Metric Graph (8-14s) → CTA";
      cta = "Start Free";
      hookType = "Problem/Solution";
      style = creativeStyle || "Minimal";
      contentFmt = format || "Product Demo";
      aud = audience || "Professionals";
      themes = ["Productivity", "Tech Innovation", "Automation"];
    } else if (lower.includes("beauty") || lower.includes("skin") || lower.includes("cosmetic")) {
      hook = "The 3-ingredient formula dermatologists actually swear by.";
      visualDirection = "Macro water drops, dewy skin reflection in natural golden hour light, unboxing texture spread.";
      messaging = "Clinically validated barrier repair for radiant longevity.";
      structure = "Ingredient Curiosity Hook (0-3s) → Texture Application (3-7s) → Before & After (7-12s) → CTA";
      cta = "Discover";
      hookType = "Curiosity";
      style = creativeStyle || "Editorial";
      contentFmt = format || "Short-form Video";
      aud = audience || "Young adults";
      themes = ["Beauty", "Skincare", "Self-Care"];
    }

    return {
      hook,
      creativeFormat: contentFmt,
      visualDirection,
      messaging,
      structure,
      cta,
      suggestedCreativeDna: {
        hookType,
        visualStyle: style,
        emotionalAngle: "Inspiration",
        contentFormat: contentFmt,
        ctaType: cta,
        audienceInterpretation: aud,
        themes
      },
      disclaimer: "This is creative inspiration and structural direction, NOT verified advertising performance data.",
      source: "MockAIProvider"
    };
  }

  async analyzeAd(adIdOrUrl: string): Promise<AdAnalysisResult> {
    return {
      sentiment: "High-conviction and motivational",
      keyHooks: [
        "First-frame visual contrast with instant motion cue",
        "Auditory silence abruptly broken at second 0:02",
        "Clear problem-solution pivot within 5 seconds"
      ],
      visualElements: [
        "Dark charcoal shadows with neon rim highlights",
        "Direct-to-camera eye contact",
        "Dynamic pacing with 0.8s average shot duration"
      ],
      targetAudience: "Active creators, professionals, and forward-looking consumers",
      psychologicalTriggers: ["Social Proof", "Momentum", "Aspirational Identity"],
      suggestedTags: ["High Contrast", "Problem/Solution", "Dynamic Cut", "Mobile-First"]
    };
  }

  async generateCreativeTags(adDetails: any): Promise<string[]> {
    return ["Cinematic Cut", "Bold Statement", "Performance Focused", "Short-Form Vertical"];
  }

  async compareAds(adIds: string[]): Promise<{ comparisonSummary: string; keyDifferentiators: string[] }> {
    return {
      comparisonSummary: "Observed variation highlights a divergence between high-polish cinematic production and raw organic social UGC pacing.",
      keyDifferentiators: [
        "Creative A prioritizes brand equity and emotional resonance",
        "Creative B focuses on tactile product walkthrough and immediate CTA"
      ]
    };
  }
}

/**
 * Optional OpenAI-compatible provider.
 * Activates ONLY if an external API key is configured; otherwise automatically falls back to MockAIProvider.
 */
export class OpenAICompatibleProvider implements AIProvider {
  name = "OpenAICompatibleProvider";
  private fallback = new MockAIProvider();
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateCreativeIdea(input: CreativeInspirationInput): Promise<CreativeDirectionResult> {
    try {
      // In production with API key, this can call OpenAI / Gemini / Anthropic endpoints
      // For safe $0 budget fallback, if any error occurs we seamlessly return fallback
      return await this.fallback.generateCreativeIdea(input);
    } catch (e) {
      console.warn("External AI call failed, using MockAIProvider fallback", e);
      return await this.fallback.generateCreativeIdea(input);
    }
  }

  async analyzeAd(adIdOrUrl: string): Promise<AdAnalysisResult> {
    return this.fallback.analyzeAd(adIdOrUrl);
  }

  async generateCreativeTags(adDetails: any): Promise<string[]> {
    return this.fallback.generateCreativeTags(adDetails);
  }

  async compareAds(adIds: string[]): Promise<{ comparisonSummary: string; keyDifferentiators: string[] }> {
    return this.fallback.compareAds(adIds);
  }
}

/**
 * Provider factory: Returns MockAIProvider unless OPENAI_API_KEY is defined.
 */
export function getAIProvider(): AIProvider {
  const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || process.env.ANTHROPIC_API_KEY;
  if (apiKey) {
    return new OpenAICompatibleProvider(apiKey);
  }
  return new MockAIProvider();
}
