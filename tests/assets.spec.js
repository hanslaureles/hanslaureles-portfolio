const { test, expect } = require('@playwright/test');
const { existsSync } = require('node:fs');
const path = require('node:path');

const ROUTES = ['/', '/about', '/404', '/case-lsfm', '/case-ciel', '/case-memory',
  '/case-aura', '/case-lumina', '/case-vellum', '/case-fintrack'];

const REMOVED = [
  'app.js',
  'home.js',
  'discovery.js',
  'motion.js',
  'sentinel.js',
  'about-view.js',
  'styles.css',
  'home.css',
];

test('every route and asset reference resolves without retired public files', async ({
  browser,
  request,
  baseURL,
}) => {
  test.setTimeout(120_000);
  for (const file of REMOVED)
    expect(existsSync(path.join(__dirname, '../public', file)), file).toBe(
      false,
    );
  const origin = new URL(baseURL).origin;
  const references = new Set();
  const requested = new Set();
  const failures = [];
  const routes = [
    ...ROUTES,
    '/ciel',
    '/ciel-hud',
    '/aura-store',
    '/aura-store/checkout',
    '/aura-store/confirmation',
    '/no-such-page',
    '/legacy-404',
  ];
  for (const route of routes) {
    const context = await browser.newContext({ baseURL });
    try {
      const page = await context.newPage();
      await page.route(
        (url) => url.origin !== origin,
        (route) => route.abort(),
      );
      page.on('request', (r) => {
        if (new URL(r.url()).origin === origin) requested.add(r.url());
      });
      page.on('requestfailed', (r) => {
        if (new URL(r.url()).origin === origin) failures.push(r.url());
      });
      page.on('response', (r) => {
        if (
          new URL(r.url()).origin === origin &&
          r.status() >= 400 &&
          r.request().resourceType() !== 'document'
        )
          failures.push(`${r.status()} ${r.url()}`);
      });
      const response = await page.goto(route, { waitUntil: 'networkidle' });
      expect(response.status(), route).toBe(
        ['/404', '/no-such-page', '/legacy-404'].includes(route) ? 404 : 200,
      );
      const urls = await page.evaluate(() => {
        const urls = [
          ...document.querySelectorAll('[src], [href], [srcset]'),
        ].flatMap((el) =>
          [
            el.getAttribute('src'),
            el.getAttribute('href'),
            ...(el.getAttribute('srcset') || '')
              .split(',')
              .map((item) => item.trim().split(/\s+/)[0]),
          ]
            .filter(Boolean)
            .map((url) => new URL(url, document.baseURI).href),
        );
        function walk(rules, base) {
          for (const rule of rules) {
            for (const match of rule.cssText.matchAll(
              /url\(\s*['"]?([^'"\s)]+)['"]?\s*\)/g,
            ))
              urls.push(new URL(match[1], base).href);
            if (rule.cssRules) walk(rule.cssRules, base);
          }
        }
        for (const sheet of document.styleSheets) {
          try {
            walk(sheet.cssRules, sheet.href || document.baseURI);
          } catch {
            /* third-party Aura fonts */
          }
        }
        return urls;
      });
      for (const url of urls)
        if (new URL(url).origin === origin) references.add(url.split('#')[0]);
    } finally {
      await context.close();
    }
  }
  expect(failures).toEqual([]);
  for (const url of new Set([...requested, ...references])) {
    expect(REMOVED.includes(new URL(url).pathname.slice(1)), url).toBe(false);
    const response = await request.get(url);
    expect(response.status(), url).toBe(
      ['/404', '/no-such-page', '/legacy-404'].includes(
        new URL(response.url()).pathname,
      )
        ? 404
        : 200,
    );
  }
  console.log(
    `asset crawl: ${routes.length} routes, ${requested.size} requested URLs, ${references.size} referenced URLs, 0 retired files, 0 failed assets`,
  );
});
