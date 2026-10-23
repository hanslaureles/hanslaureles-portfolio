const { test: base, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const {
  ROUTES,
  filename,
  captureRoute,
  verifyLegacyPage,
} = require('./capture-parity');
const { diff, normalizeStyles } = require('./style-snapshot');
const { startLegacyBaseline } = require('./legacy-baseline');

const test = base.extend({
  legacyURL: [
    async ({}, use) => {
      const baseline = await startLegacyBaseline();
      try {
        await use(baseline.url);
      } finally {
        await baseline.close();
      }
    },
    { scope: 'worker' },
  ],
});

const MIGRATED = [
  '/',
  '/about',
  '/case-lsfm',
  '/case-ciel',
  '/case-memory',
  '/case-aura',
  '/case-lumina',
  '/case-fintrack',
  '/case-vellum',
  '/404',
];

for (const route of ROUTES) {
  test(`legacy parity: ${route}`, async ({ browser, baseURL, legacyURL }) => {
    test.skip(
      !MIGRATED.includes(route),
      'Legacy file; enable when its App Router route migrates',
    );
    const expected = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, 'parity', `${filename(route)}.json`),
        'utf8',
      ),
    );
    const actual = await captureRoute(browser, baseURL, route);
    expect(actual.h).toEqual(expected.h);
    expect(actual.head).toEqual(expected.head);
    expect(actual.text).toBe(expected.text);
    expect(actual.links).toEqual(expected.links);
    const legacyRoute = await verifyLegacyPage(legacyURL, route);
    console.log(`${route}: legacy HTML byte-verified against 4cdd1e0`);
    const legacy = await captureRoute(browser, legacyURL, legacyRoute);
    // Committed content/head fixtures are portable; style fixtures are not.
    expect(
      diff(normalizeStyles(legacy.styles), normalizeStyles(actual.styles)),
    ).toBe(0);
  });
}
