import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { MOCK_BRANDS } from '@/lib/db/actions';
import { checkPublicRateLimit, rateLimitResponse } from '@/lib/security/rate-limit';
import { BrandsSchema } from '@/lib/security/validation';

const MAX_PAGE_SIZE = 50;

export async function GET(request: NextRequest) {
  // 1. Rate limit
  if (checkPublicRateLimit(request)) {
    return rateLimitResponse();
  }

  // 2. Validate and clamp pagination params
  const { searchParams } = new URL(request.url);
  const parsed = BrandsSchema.safeParse(Object.fromEntries(searchParams));

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid request parameters' },
      { status: 400 }
    );
  }

  const { page, limit } = parsed.data;
  const safeLimit = Math.min(limit, MAX_PAGE_SIZE);  // 3. Hard cap — ignore ?limit=999999
  const safeSkip = (page - 1) * safeLimit;

  try {
    const brands = await prisma.brand.findMany({
      take: safeLimit,
      skip: safeSkip,
      orderBy: { name: 'asc' },
    });

    return NextResponse.json(brands);
  } catch {
    // 4. Safe fallback — no error details leaked
    return NextResponse.json(MOCK_BRANDS.slice(0, safeLimit));
  }
}
