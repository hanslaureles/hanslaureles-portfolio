import { LEGACY_CSP } from './lib/csp.mjs';
import { legacyPages, legacyPaths } from './lib/legacy-routes.ts';

/** @type {import('next').NextConfig} */
const config = {
  poweredByHeader: false,
  trailingSlash: false,
  // Both Aura entry URLs must answer directly under the legacy contract.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/aura-store/index.html', destination: '/aura-store', permanent: true },
      { source: '/:page.html', destination: '/:page', permanent: true },
      { source: '/aura-store/:page.html', destination: '/aura-store/:page', permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: '/', destination: '/index.html' },
      ...legacyPages.map(page => ({ source: `/${page}`, destination: `/${page}.html` })),
      { source: '/ciel', destination: '/case-ciel' },
      { source: '/ciel-hud', destination: '/case-ciel' },
      { source: '/aura-store', destination: '/aura-store/index.html' },
      { source: '/aura-store/', destination: '/aura-store/index.html' },
      { source: '/aura-store/:page(checkout|confirmation)', destination: '/aura-store/:page.html' },
    ];
  },
  async headers() {
    return [
      { source: '/:path*', headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()' },
      ] },
      ...[...legacyPaths, '/:page.html', '/aura-store/:path*'].map(source => ({
        source, headers: [{ key: 'Content-Security-Policy', value: LEGACY_CSP }],
      })),
      { source: '/images/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/:path*.:ext(css|js)', headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }] },
      { source: '/data/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }] },
      { source: '/:path*.pdf', headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, must-revalidate' }] },
    ];
  },
};
export default config;
