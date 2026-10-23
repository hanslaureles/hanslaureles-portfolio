const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const migrated = fs.readdirSync(path.join(__dirname, '../app')).filter(name => name.startsWith('case-'));

test('Ciel document title stays separate from its SVG title on every alias', async ({ page }) => {
  for (const route of ['/case-ciel', '/ciel', '/ciel-hud']) {
    await page.goto(route);
    await expect(page).toHaveTitle('Manas: Ciel — Case Study · Hans Aaron Laureles');
    await expect(page.locator('svg title#lcTitle')).toHaveText('Lifecycle of one Ciel voice request');
  }
});

test('case variants of migrated About return 404 under the nonce policy', async ({ request }) => {
  for (const url of ['/About', '/ABOUT']) {
    const response = await request.get(url);
    expect(response.status()).toBe(404);
    expect(response.headers()['content-security-policy']).toContain("'nonce-");
  }
});

test('404 and the removed helper return full not-found pages', async ({ request }) => {
  for (const route of ['/legacy-404', '/404']) {
    const response = await request.get(route);
    expect(response.status()).toBe(404);
    const html = await response.text();
    for (const tag of ['header', 'main', 'footer', 'h1']) expect(html).toContain(`<${tag}`);
    expect(html).toContain('Lost in the');
  }
  expect(fs.existsSync(path.join(__dirname, '../app/legacy-404'))).toBe(false);
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
