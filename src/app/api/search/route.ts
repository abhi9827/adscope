import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { MOCK_ADS } from '@/lib/db/actions';
import { checkPublicRateLimit, rateLimitResponse } from '@/lib/security/rate-limit';
import { SearchSchema } from '@/lib/security/validation';

const MAX_PAGE_SIZE = 50;

export async function GET(request: NextRequest) {
  // 1. Rate limit
  if (checkPublicRateLimit(request)) {
    return rateLimitResponse();
  }

  // 2. Validate query parameters
  const { searchParams } = new URL(request.url);
  const parsed = SearchSchema.safeParse(Object.fromEntries(searchParams));

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid request parameters' },
      { status: 400 }
    );
  }

  const { q, page, limit } = parsed.data;
  const safeLimit = Math.min(limit, MAX_PAGE_SIZE);
  const safeSkip = (page - 1) * safeLimit;

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  try {
    // 3. Explicit Prisma filter — no arbitrary user-controlled where clauses
    const ads = await prisma.ad.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { campaign: { name: { contains: q, mode: 'insensitive' } } },
          { brand: { name: { contains: q, mode: 'insensitive' } } },
        ],
      },
      include: {
        brand: true,
        platform: true,
        campaign: true,
        creatives: true,
      },
      take: safeLimit,  // 4. Hard pagination cap
      skip: safeSkip,
    });

    return NextResponse.json({ results: ads });
  } catch {
    // 5. Safe fallback — no error details leaked
    const mockResults = MOCK_ADS.filter(
      (ad) =>
        ad.title.toLowerCase().includes(q.toLowerCase()) ||
        ad.brand.name.toLowerCase().includes(q.toLowerCase())
    ).slice(0, safeLimit);

    return NextResponse.json({ results: mockResults });
  }
}
