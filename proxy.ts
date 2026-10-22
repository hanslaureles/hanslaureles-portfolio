import { randomBytes } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { buildCsp } from './lib/csp.mjs';
import { legacyPaths } from './lib/legacy-routes';

export function proxy(request: NextRequest) {
  if (legacyPaths.includes(request.nextUrl.pathname)) return NextResponse.next();
  const nonce = randomBytes(16).toString('base64');
  const policy = buildCsp(nonce);
  const headers = new Headers(request.headers);
  headers.set('x-nonce', nonce);
  headers.set('Content-Security-Policy', policy);
  const response = NextResponse.next({ request: { headers } });
  response.headers.set('Content-Security-Policy', policy);
  response.headers.set('Cache-Control', 'private, no-store, max-age=0, must-revalidate');
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|images/|data/|aura-store(?:/|$)|.*\\.(?:html|pdf|css|js|png|ico)$).*)'],
};
