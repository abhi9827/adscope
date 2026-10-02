import { NextRequest, NextResponse } from 'next/server';
import { analyzeAdCreative } from '@/lib/ai';
import { checkAiRateLimit, rateLimitResponse } from '@/lib/security/rate-limit';
import { AiAnalyzeSchema } from '@/lib/security/validation';

export async function POST(request: NextRequest) {
  // 1. Rate limit — AI calls are expensive
  if (checkAiRateLimit(request)) {
    return rateLimitResponse();
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // 2. Validate input with Zod (URL scheme check included)
  const parsed = AiAnalyzeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid request', details: parsed.error.issues.map((i) => i.message) },
      { status: 400 }
    );
  }

  const { imageUrl } = parsed.data;

  try {
    const analysis = await analyzeAdCreative(imageUrl);
    return NextResponse.json(analysis);
  } catch {
    // 3. Never leak internal error details to the client
    return NextResponse.json(
      { error: 'Analysis failed. Please try again later.' },
      { status: 500 }
    );
  }
}
