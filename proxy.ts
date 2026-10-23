import { randomBytes } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { buildCsp } from './lib/csp.mjs';

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname.toLowerCase();
  const nonce = randomBytes(16).toString('base64');
  const policy = buildCsp(nonce);
  const headers = new Headers(request.headers);
  headers.set('x-nonce', nonce);
  headers.set('Content-Security-Policy', policy);
  headers.set('x-portfolio-path', ['/ciel', '/ciel-hud'].includes(pathname) ? '/case-ciel' : pathname);
  const response = NextResponse.next({ request: { headers } });
  response.headers.set('Content-Security-Policy', policy);
  response.headers.set('Cache-Control', 'private, no-store, max-age=0, must-revalidate');
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|images/|data/|aura-store(?:/|$)|.*\\.(?:html|pdf|css|js|png|ico)$).*)'],
};
