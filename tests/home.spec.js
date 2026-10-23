const { test, expect } = require('@playwright/test');

test('homepage content is visible without JS under the nonce policy', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
  });
  try {
    const page = await context.newPage();
    const response = await page.goto(new URL('/', baseURL).href);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-security-policy']).toContain("'nonce-");
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.hero-lead-text')).toBeVisible();
    await expect(page.locator('#work-gallery')).toBeVisible();
    for (const card of await page.locator('#work-gallery .project-card').all())
      await expect(card).toBeVisible();
    await expect(page.locator('#work-gallery .project-card')).toHaveCount(7);
    for (const id of [
      'how-i-work',
      'experience',
      'in-the-open',
      'recruiter-faq',
      'contact',
    ])
      await expect(page.locator('#' + id)).toBeVisible();
    await expect(
      page.getByRole('navigation', { name: 'Portfolio map' }),
    ).toBeVisible();
    await expect(page.locator('#recruiter-faq details')).toHaveCount(5);
    await page.locator('#recruiter-faq summary').first().click();
    await expect(
      page.locator('#recruiter-faq details p').first(),
    ).toBeVisible();
  } finally {
    await context.close();
  }
});

test('homepage navigation controls belong to React MobileMenu', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/', { waitUntil: 'networkidle' });
  expect(
    await page
      .locator('script[src]')
      .evaluateAll((els) =>
        els
          .map((el) => el.src)
          .some((src) => /\/(home|discovery|motion|sentinel)\.js/.test(src)),
      ),
  ).toBe(false);
  await expect(page.locator('.mobile-menu-btn')).toHaveAttribute(
    'aria-controls',
    'mobileMenu',
  );
  await page.locator('.mobile-menu-btn').click();
  await expect(page.locator('#mobileMenu')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#mobileMenu')).toBeHidden();
  await expect(page.locator('.mobile-menu-btn')).toBeFocused();
});

test('React Discovery supports Index view and keyboard filters', async ({
  page,
}) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.locator('[data-view="index"]').click();
  await expect(page.locator('#work-gallery')).toBeHidden();
  await expect(page.locator('#work-index .index-project:visible')).toHaveCount(
    7,
  );
  await page.locator('#filter-web').focus();
  await page.keyboard.press('End');
  await expect(page.locator('#filter-mobile')).toBeFocused();
  await expect(page.locator('#work-index .index-project:visible')).toHaveCount(
    2,
  );
  await expect(page.locator('#work-results')).toHaveAttribute(
    'aria-labelledby',
    'filter-mobile',
  );
  await page.keyboard.press('Home');
  await expect(page.locator('#work-index .index-project:visible')).toHaveCount(
    7,
  );
});

test('React FAQ uses keyboard tabs on desktop and native details on phones', async ({
  page,
}) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.locator('#faq-tab-0').focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('#faq-tab-1')).toBeFocused();
  await expect(page.locator('#faq-answer')).toContainText('UTC+8');
  await page.setViewportSize({ width: 375, height: 812 });
  await expect(page.locator('.faq-layout')).toBeHidden();
  await page.locator('#recruiter-faq summary').nth(1).click();
  await expect(page.locator('#recruiter-faq details p').nth(1)).toBeVisible();
});

test('React replay and decorative motion respond to reduced-motion changes', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.locator('#pipelineRun').click();
  await expect(page.locator('#request-pipeline')).toHaveAttribute(
    'data-state',
    'playing',
  );
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  await expect(page.locator('#request-pipeline')).toHaveAttribute(
    'data-state',
    'finished',
  );
  await expect(page.locator('.pipeline-node.is-reached')).toHaveCount(5);
  await expect(page.locator('.awaiting-entry')).toHaveCount(0);
  await page.locator('#pipelineRun').click();
  await expect(page.locator('#request-pipeline')).toHaveAttribute(
    'data-state',
    'finished',
  );
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'on');
});

test('React AgentOverview renders replay text literally and copies its report', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() =>
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: async (text) => {
          window.__report = text;
        },
      },
    }),
  );
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.locator('#heroOverviewBtn').click();
  await page.locator('#sentinelReplayBtn').click();
  await expect(page.locator('#sentinelLogFeed')).toContainText(
    '!apply <job url> received',
  );
  await expect(page.locator('#sentinelLogFeed job')).toHaveCount(0);
  await page.locator('#sentinelCopyReportBtn').click();
  expect(await page.evaluate(() => window.__report)).toContain(
    'Multi-Agent System Status Report',
  );
  await expect(page.locator('#sentinelCopyReportBtn')).toContainText(
    'Copied Report',
  );
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.locator('#sentinelReplayBtn').click();
  await expect(page.locator('#sentinelReplayBtn')).toBeDisabled();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('#sentinelReplayBtn')).toBeEnabled();
  await expect(page.locator('#sentinelCopyReportBtn')).toContainText(
    'Copy Summary Report',
  );
  await page.locator('#sentinelOpenSakuraBtn').click();
  await expect(page.locator('#sentinelModal')).toBeHidden();
  await expect(page.locator('#sakuraDrawer')).toBeVisible();
});
