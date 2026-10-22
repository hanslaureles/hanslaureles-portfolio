const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const { ROUTES, filename, captureRoute } = require('./capture-parity');
const { diff } = require('./style-snapshot');

const MIGRATED = [];

for (const route of ROUTES) {
  test(`legacy parity: ${route}`, async ({ browser, baseURL }) => {
    test.skip(!MIGRATED.includes(route), 'Legacy file; enable when its App Router route migrates');
    const expected = JSON.parse(fs.readFileSync(path.join(__dirname, 'parity', `${filename(route)}.json`), 'utf8'));
    const actual = await captureRoute(browser, baseURL, route === '/404' ? '/no-such-page' : route);
    expect(actual.h).toEqual(expected.h);
    expect(actual.text).toBe(expected.text);
    expect(actual.links).toEqual(expected.links);
    expect(diff(expected.styles, actual.styles)).toBe(0);
  });
}
