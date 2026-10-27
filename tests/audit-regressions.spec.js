const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
const cases = ['ciel', 'memory', 'lsfm', 'aura', 'lumina', 'vellum', 'fintrack'];

for (const slug of cases) {
  test(`${slug}: section links stay in their document`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`/case-${slug}`);
    const links = page.locator('main a[href^="#"]');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const hash = await link.getAttribute('href');
      await link.click();
      await expect(page).toHaveURL(new RegExp(`/case-${slug}${hash}$`));
      await expect(page.locator(hash)).toBeInViewport();
    }
  });
}

for (const width of [375, 768, 1440]) {
  test(`sticky navigation on all portfolio pages at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    for (const route of ['/', '/about', ...cases.map(slug => `/case-${slug}`)]) {
      await page.goto(route);
      await page.evaluate(() => scrollTo({ top: 1000, behavior: 'instant' }));
      await expect.poll(() => page.locator('.site-header').evaluate(el => el.getBoundingClientRect().top)).toBe(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      if (width === 375) {
        await page.getByRole('button', { name: 'Open navigation menu' }).click();
        await expect(page.locator('body')).toHaveCSS('overflow', 'hidden');
        await page.keyboard.press('Escape');
        await page.evaluate(() => scrollTo({ top: 1200, behavior: 'instant' }));
        await expect.poll(() => page.locator('.site-header').evaluate(el => el.getBoundingClientRect().top)).toBe(0);
      }
    }
  });
}

test('About tabs synchronize keyboard, URL, reload and history even without storage', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = Storage.prototype.setItem = () => { throw Error('blocked'); };
  });
  await page.goto('/about#git');
  const cards = page.locator('#btnViewCards');
  const git = page.locator('#btnViewGit');
  await expect(git).toHaveAttribute('aria-selected', 'true');
  await cards.click();
  await page.reload();
  await expect(cards).toHaveAttribute('aria-selected', 'true');
  await cards.focus();
  await cards.press('ArrowRight');
  await expect(git).toBeFocused();
  await expect(cards).toHaveAttribute('tabindex', '-1');
  await expect(page).toHaveURL(/#git$/);
  await page.goBack();
  await expect(cards).toHaveAttribute('aria-selected', 'true');
  await page.goForward();
  await expect(git).toHaveAttribute('aria-selected', 'true');
  await page.reload();
  await expect(git).toHaveAttribute('aria-selected', 'true');
  await git.focus();
  await git.press('Home');
  await expect(cards).toBeFocused();
});

for (const theme of ['light', 'dark']) for (const width of [375, 1440]) {
  test(`About views and tables are accessible: ${theme} ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addInitScript(theme => localStorage.setItem('hans_portfolio_theme', theme), theme);
    await page.goto('/about');
    for (const view of ['Cards', 'Git']) {
      await page.locator(`#btnView${view}`).click();
      const result = await new AxeBuilder({ page }).analyze();
      expect(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }))).toEqual([]);
    }
    for (const slug of ['ciel', 'memory']) {
      await page.goto(`/case-${slug}`);
      const result = await new AxeBuilder({ page }).withRules(['scrollable-region-focusable']).analyze();
      expect(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }))).toEqual([]);
      const tables = page.locator('.case-table-wrap');
      for (const table of await tables.all()) {
        if (await table.evaluate(el => el.scrollWidth > el.clientWidth + 1)) {
          await expect(table).toHaveAttribute('tabindex', '0');
          await table.focus();
          await table.press('ArrowRight');
          await expect.poll(() => table.evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
        }
      }
      await page.setViewportSize({ width: 1920, height: 900 });
      for (const table of await tables.all()) {
        if (await table.evaluate(el => el.scrollWidth <= el.clientWidth + 1)) await expect(table).not.toHaveAttribute('tabindex', '0');
      }
      await page.setViewportSize({ width, height: 900 });
    }
  });
}

test('nested 404 keeps root links and current facts are returned by Sakura', async ({ page, request }) => {
  await page.goto('/missing/nested/page');
  await page.getByRole('link', { name: 'Return to Selected Work' }).click();
  await expect(page).toHaveURL(/\/$/);
  for (const question of ['Next.js frontend', 'Obsidian vault', 'Memory Core', 'Patriot']) {
    const response = await request.post('/api/sakura', { data: { question }, headers: { 'x-forwarded-for': `audit-${question}` } });
    expect(response.ok()).toBe(true);
    const data = JSON.stringify(await response.json());
    expect(data).not.toMatch(/There is no Next.js|Antigravity reaches|append session logs over/);
    if (question.includes('Next.js')) expect(data).toContain('Next.js App Router');
    if (question.includes('Obsidian')) expect(data).toContain('shared cross-process lock');
  }
});

test('timeline dates, ordering, canonical URLs and contact links agree', async ({ page }) => {
  for (const route of ['/about', ...cases.map(slug => `/case-${slug}`)]) {
    await page.goto(route);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://hanslaureles.vercel.app${route}`);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', `https://hanslaureles.vercel.app${route}`);
  }
  await page.goto('/about#git');
  await expect(page.locator('.git-type')).toHaveText(['feat(ciel):', 'feat(lsfm):', 'feat(memory):', 'feat(patriot):', 'feat(academic):', 'feat(roc.ph):']);
  await expect(page.locator('.git-commit-entry').filter({ hasText: 'feat(memory)' }).locator('.git-date')).toHaveText('2026');
  await expect(page.locator('.git-commit-entry').filter({ hasText: 'feat(patriot)' }).locator('.git-date')).toHaveText('2023 – 2025');
  for (const route of ['/about', '/']) {
    await page.goto(route);
    await expect(page.getByRole('link', { name: 'LinkedIn', exact: true })).toHaveAttribute('href', 'https://www.linkedin.com/in/hans-laureles-b5a732309/');
  }
});
