import { NextResponse } from 'next/server';
import { analyzeAdCreative } from '@/lib/ai';

export async function POST(request: Request) {
  try {
    const { adId, imageUrl } = await request.json();
    
    if (!imageUrl) {
      return NextResponse.json({ error: 'Missing image URL' }, { status: 400 });
    }

    const analysis = await analyzeAdCreative(imageUrl);
    
    // We would normally save this to the DB here:
    // await prisma.aIAnalysis.create({ data: { adId, ...analysis } })
    
    return NextResponse.json(analysis);
  } catch (error) {
    console.error('AI Analysis failed:', error);
    return NextResponse.json(
      { error: 'Analysis failed. Please check if your API key is configured.' },
      { status: 500 }
    );
  }
}
