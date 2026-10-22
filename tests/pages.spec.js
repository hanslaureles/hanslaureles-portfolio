const { test, expect } = require('@playwright/test');

test('About is readable without JS under the nonce policy', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    const response = await page.goto(new URL('/about', baseURL).href);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-security-policy']).toContain("'nonce-");
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('#experience-cards-view')).toContainText('ROC.PH');
    await expect(page.getByRole('link', { name: 'Return to Selected Work' })).toBeVisible();
  } finally { await context.close(); }
});

test('About view honours its hash, saved preference and blocked storage', async ({ page }) => {
  await page.goto('/about#git');
  await expect(page.locator('#experience-git-view')).toBeVisible();
  await page.locator('#btnViewCards').click();
  expect(await page.evaluate(() => localStorage.getItem('hans_about_view_pref'))).toBe('cards');
  await page.locator('#btnViewGit').click();
  await page.goto('/about');
  await expect(page.locator('#experience-git-view')).toBeVisible();
  await page.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } }));
  await page.goto('/about#git');
  await expect(page.locator('#experience-git-view')).toBeVisible();
  await page.locator('#btnViewCards').click();
  await expect(page.locator('#experience-cards-view')).toBeVisible();
});

test('About applies the stored theme before first paint without app scripts', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ colorScheme: 'light' });
  try {
    await context.addInitScript(() => {
      localStorage.setItem('hans_portfolio_theme', 'dark');
      requestAnimationFrame(() => { window.__firstTheme = document.documentElement.getAttribute('data-theme'); });
    });
    await context.route('**/*.js*', route => route.abort());
    const page = await context.newPage();
    await page.goto(new URL('/about', baseURL).href, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect.poll(() => page.evaluate(() => window.__firstTheme)).toBe('dark');
    await expect(page.locator('#experience-cards-view')).toContainText('ROC.PH');
  } finally { await context.close(); }
});

test('About contact button copies its email and restores its label', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: async text => { window.__copied = text; } } });
  });
  await page.goto('/about');
  const button = page.locator('main .contact-email-btn');
  await button.click();
  expect(await page.evaluate(() => window.__copied)).toBe('hanslaureles92@gmail.com');
  await expect(button).toContainText('Copied: hanslaureles92@gmail.com');
  await expect(button).toContainText('[Copy]');
});
