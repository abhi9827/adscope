import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { MOCK_BRANDS } from '@/lib/db/actions';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '50');
  const page = parseInt(searchParams.get('page') || '1');
  
  try {
    const brands = await prisma.brand.findMany({
      take: limit,
      skip: (page - 1) * limit,
      orderBy: { name: 'asc' }
    });
    
    return NextResponse.json(brands);
  } catch {
    return NextResponse.json(MOCK_BRANDS);
  }
}
