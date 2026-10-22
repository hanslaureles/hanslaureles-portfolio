const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const migrated = fs.readdirSync(path.join(__dirname, '../app')).filter(name => name.startsWith('case-'));

test('case variants of legacy paths keep the legacy CSP', async ({ request }) => {
  const { LEGACY_CSP } = require('../lib/csp.mjs');
  for (const url of ['/About', '/ABOUT']) {
    const response = await request.get(url);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-security-policy']).toBe(LEGACY_CSP);
  }
});

test('helper route is not public', async ({ request }) => {
  expect((await request.get('/legacy-404')).status()).toBe(404);
  expect((await request.get('/404')).status()).toBe(200);
});

for (const route of migrated) {
  test(`${route} is readable without JS under the nonce policy`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    try {
      const page = await context.newPage();
      const response = await page.goto(new URL('/' + route, baseURL).href);
      expect(response.status()).toBe(200);
      expect(response.headers()['content-security-policy']).toContain("'nonce-");
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('main')).toContainText('Return to Selected Work');
      await expect(page.getByRole('navigation', { name: 'Main Navigation' })).toBeVisible();
      await expect(page.locator('main a[href="index.html"]').first()).toBeVisible();
      const progress = () => page.evaluate(() => {
        const matrix = getComputedStyle(document.body, '::before').transform.match(/matrix\(([^,]+)/);
        return matrix ? Number(matrix[1]) : null;
      });
      for (const reducedMotion of ['no-preference', 'reduce']) {
        await page.emulateMedia({ reducedMotion });
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await expect.poll(progress).toBeLessThan(0.02);
        await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
        await expect.poll(progress).toBeGreaterThan(0.98);
      }
    } finally { await context.close(); }
  });
}
