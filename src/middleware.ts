import { NextRequest, NextResponse } from 'next/server';

/**
 * AdScope Middleware
 *
 * Responsibilities:
 * 1. Block public access to /internal and /internal/* in production.
 *    These routes expose ingestion health, source adapter status,
 *    and monetisation config — they MUST NOT be publicly accessible.
 *
 * How to access /internal in production:
 *   Set the INTERNAL_SECRET env variable (server-only, no NEXT_PUBLIC_).
 *   Then send the header:  X-Internal-Secret: <your-secret>
 *   Or visit with the query: ?internal_secret=<your-secret>
 *   (query-param method is for quick browser access only; prefer the header in scripts)
 *
 * 2. Add security headers to every response.
 */

const INTERNAL_SECRET = process.env.INTERNAL_SECRET;

function isInternalRoute(pathname: string): boolean {
  return pathname === '/internal' || pathname.startsWith('/internal/');
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── 1. Internal route protection ─────────────────────────────
  if (isInternalRoute(pathname)) {
    // In development, allow unrestricted access for convenience.
    if (process.env.NODE_ENV !== 'production') {
      return addSecurityHeaders(NextResponse.next());
    }

    // In production, require a secret.
    if (!INTERNAL_SECRET) {
      // No secret configured → lock the route down completely.
      return new NextResponse('Internal routes are disabled.', { status: 403 });
    }

    const headerSecret = req.headers.get('x-internal-secret');
    const querySecret  = req.nextUrl.searchParams.get('internal_secret');

    if (headerSecret !== INTERNAL_SECRET && querySecret !== INTERNAL_SECRET) {
      return new NextResponse('Forbidden', { status: 403 });
    }
  }

  // ── 2. Security headers on every response ────────────────────
  return addSecurityHeaders(NextResponse.next());
}

function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );
  return response;
}

export const config = {
  matcher: [
    /*
     * Apply to all routes except:
     * - _next/static  (static files)
     * - _next/image   (image optimisation)
     * - favicon.ico
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
