const { test, expect } = require('@playwright/test');
const { LEGACY_CSP } = require('../lib/csp.mjs');

test('legacy URLs', async ({ request }) => {
  for (const [source, target] of [
    ['/index.html', '/'], ['/about.html', '/about'], ['/case-ciel.html', '/case-ciel'],
    ['/aura-store/index.html', '/aura-store'],
  ]) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect(response.status(), source).toBe(308);
    expect(new URL(response.headers().location, response.url()).pathname).toBe(target);
    expect((await request.get(target, { maxRedirects: 0 })).status()).toBe(200);
  }
  for (const alias of ['/ciel', '/ciel-hud']) {
    const response = await request.get(alias, { maxRedirects: 0 });
    expect(response.status(), alias).toBe(200);
    expect(await response.text()).toMatch(/<h1[^>]*>[\s\S]*?Ciel[\s\S]*?<\/h1>/);
  }
  for (const path of ['/aura-store', '/aura-store/']) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status(), path).toBe(200);
    expect(await response.text()).toMatch(/<h1[\s>]/);
  }
  expect((await request.get('/no-such-page', { maxRedirects: 0 })).status()).toBe(404);
});

test('security headers match the legacy values', async ({ request }) => {
  for (const path of ['/', '/about', '/aura-store']) {
    const response = await request.get(path);
    expect(response.headers()).toMatchObject({
      'x-content-type-options': 'nosniff',
      'x-frame-options': 'DENY',
      'referrer-policy': 'strict-origin-when-cross-origin',
      'permissions-policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
      'content-security-policy': LEGACY_CSP,
    });
  }
  const fs = require('fs');
  const image = fs.readdirSync(require('path').join(__dirname, '../public/images')).find(f => /\.(avif|webp)$/.test(f));
  for (const [path, cache] of [
    [`/images/${image}`, 'public, max-age=31536000, immutable'],
    ['/data/status.json', 'public, max-age=0, must-revalidate'],
    ['/Hans_Laureles_Resume.pdf', 'public, max-age=86400, must-revalidate'],
  ]) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(response.headers()['cache-control']).toBe(cache);
  }
});
