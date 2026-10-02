export interface AdAnalysis {
  sentiment: string;
  keyHooks: string[];
  visualElements: string[];
  targetAudience: string;
  psychologicalTriggers: string[];
  estimatedEffectiveness: number;
}

const MOCK_ANALYSIS: AdAnalysis = {
  sentiment: "Positive and energetic",
  keyHooks: [
    "High contrast opening frame",
    "Rapid text overlays in first 3s",
    "Human face visible immediately"
  ],
  visualElements: [
    "Warm color grading",
    "Product-centric framing",
    "Dynamic camera movement"
  ],
  targetAudience: "Gen Z and Millennials, urban, active lifestyle",
  psychologicalTriggers: [
    "FOMO (Fear of Missing Out)",
    "Social Proof",
    "Instant Gratification"
  ],
  estimatedEffectiveness: 85
};

export async function analyzeAdCreative(imageUrl: string): Promise<AdAnalysis> {
  const apiKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY || process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.warn("No AI API key found. Returning mock analysis for $0 budget MVP.");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return MOCK_ANALYSIS;
  }

  // In a real implementation with an API key, we would use the Vercel AI SDK 
  // or a direct fetch to the provider (OpenAI/Anthropic/Google).
  // For this $0 MVP, if an API key exists but logic isn't wired, we'll still return the mock
  // but in production this is where the `generateObject` call would go.
  
  return MOCK_ANALYSIS;
}
