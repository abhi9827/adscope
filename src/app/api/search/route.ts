import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { MOCK_ADS } from '@/lib/db/actions';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  
  if (!q) {
    return NextResponse.json({ results: [] });
  }

  try {
    // Prisma full-text search on PostgreSQL
    // We use basic 'contains' for cross-database compatibility (SQLite fallback)
    // but in a pure Postgres environment, we'd use `search`
    const ads = await prisma.ad.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { campaign: { name: { contains: q, mode: 'insensitive' } } },
          { brand: { name: { contains: q, mode: 'insensitive' } } }
        ]
      },
      include: {
        brand: true,
        platform: true,
        campaign: true,
        creatives: true
      },
      take: 20
    });
    
    return NextResponse.json({ results: ads });
  } catch (error) {
    console.error('Search failed, falling back to mock data', error);
    
    // Graceful degradation for $0 MVP
    const mockResults = MOCK_ADS.filter(ad => 
      ad.title.toLowerCase().includes(q.toLowerCase()) || 
      ad.brand.name.toLowerCase().includes(q.toLowerCase())
    );
    
    return NextResponse.json({ results: mockResults });
  }
}
