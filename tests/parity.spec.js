const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const { ROUTES, filename, captureRoute } = require('./capture-parity');
const { diff, normalizeStyles } = require('./style-snapshot');

const MIGRATED = ['/case-vellum', '/404'];

for (const route of ROUTES) {
  test(`legacy parity: ${route}`, async ({ browser, baseURL }) => {
    test.skip(!MIGRATED.includes(route), 'Legacy file; enable when its App Router route migrates');
    const expected = JSON.parse(fs.readFileSync(path.join(__dirname, 'parity', `${filename(route)}.json`), 'utf8'));
    const actual = await captureRoute(browser, baseURL, route);
    expect(actual.h).toEqual(expected.h);
    expect(actual.head).toEqual(expected.head);
    expect(actual.text).toBe(expected.text);
    expect(actual.links).toEqual(expected.links);
    expect(diff(normalizeStyles(expected.styles), normalizeStyles(actual.styles))).toBe(0);
  });
}
