import { NextResponse, type NextRequest } from 'next/server';

// ─────────────────────────────────────────────────────────────
// Simple in-memory rate limiter (zero-cost, no Redis needed)
// Key = IP, Value = { count, resetAt }
// Resets every WINDOW_MS milliseconds.
// ─────────────────────────────────────────────────────────────
const RATE_LIMIT_MAP = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 60;  // 60 req/min per IP (generous for public read endpoints)
const AI_MAX_REQUESTS = 10; // 10 req/min for AI/write endpoints

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

/**
 * Returns true if the request is rate-limited (should be blocked).
 * @param key     A unique key, e.g. `ip` or `ip:route`
 * @param limit   Max requests allowed in WINDOW_MS
 */
export function isRateLimited(key: string, limit = MAX_REQUESTS): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT_MAP.get(key);

  if (!entry || now > entry.resetAt) {
    RATE_LIMIT_MAP.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  if (entry.count > limit) {
    return true;
  }
  return false;
}

export function rateLimitResponse() {
  return NextResponse.json(
    { error: 'Too many requests. Please slow down.' },
    {
      status: 429,
      headers: {
        'Retry-After': String(Math.ceil(WINDOW_MS / 1000)),
      },
    }
  );
}

/**
 * Helper used by AI routes that are expensive.
 */
export function checkAiRateLimit(req: NextRequest) {
  const ip = getClientIp(req);
  return isRateLimited(`ai:${ip}`, AI_MAX_REQUESTS);
}

/**
 * Helper used by public read routes.
 */
export function checkPublicRateLimit(req: NextRequest) {
  const ip = getClientIp(req);
  return isRateLimited(`pub:${ip}`, MAX_REQUESTS);
}
