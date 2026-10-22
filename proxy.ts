import { randomBytes } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { buildCsp } from './lib/csp.mjs';
import { legacyPaths } from './lib/legacy-routes';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname.toLowerCase();
  if (legacyPaths.includes(pathname)) return NextResponse.next();
  const nonce = randomBytes(16).toString('base64');
  const policy = buildCsp(nonce);
  const headers = new Headers(request.headers);
  headers.set('x-nonce', nonce);
  headers.set('Content-Security-Policy', policy);
  headers.set('x-portfolio-path', pathname);
  // Next reserves the literal /404 route with status 404; legacy /404 answers 200.
  const destination = pathname === '/404' ? '/legacy-404' : pathname === '/legacy-404' ? '/no-such-page' : null;
  const response = destination
    ? NextResponse.rewrite(new URL(destination, request.url), { request: { headers } })
    : NextResponse.next({ request: { headers } });
  response.headers.set('Content-Security-Policy', policy);
  response.headers.set('Cache-Control', 'private, no-store, max-age=0, must-revalidate');
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|images/|data/|aura-store(?:/|$)|.*\\.(?:html|pdf|css|js|png|ico)$).*)'],
};
