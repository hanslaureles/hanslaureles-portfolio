const { test, expect } = require('@playwright/test');

test('Sakura posts to the API and renders input as text', async ({ page }) => {
  const question = '<img src=x onerror=alert(1)>';
  let sent;
  await page.route('**/api/sakura', async route => {
    sent = route.request().postDataJSON();
    await route.fulfill({ json: { answers: [] } });
  });
  await page.goto('/');
  await page.locator('#sakuraFloatingBtn').click();
  await page.locator('#sakuraSearchInput').fill(question);
  await page.locator('#sakuraSearchInput').press('Enter');
  await expect(page.locator('#sakuraOutput')).toContainText(question);
  expect(sent).toEqual({ question });
  await expect(page.locator('#sakuraOutput img, #sakuraOutput script')).toHaveCount(0);
  expect(await page.locator('script[src*="sakura-copilot"]').count()).toBe(0);
});

test('Sakura keeps the newest answer and recovers from server errors', async ({ page }) => {
  await page.route('**/api/sakura', async route => {
    const { question } = route.request().postDataJSON();
    if (question === 'old') {
      await new Promise(resolve => setTimeout(resolve, 800));
      await route.fulfill({ json: { answers: [] } }).catch(() => {});
    } else if (question === 'rate') await route.fulfill({ status: 429, json: { error: 'Rate limited.' } });
    else await route.fulfill({ json: { answers: [] } });
  });
  await page.goto('/');
  await page.locator('#sakuraFloatingBtn').click();
  const input = page.locator('#sakuraSearchInput');
  await input.fill('old');
  await input.press('Enter');
  await input.fill('new');
  await input.press('Enter');
  await expect(page.locator('#sakuraOutput')).toContainText('"new"');
  await page.waitForTimeout(900);
  await expect(page.locator('#sakuraOutput')).toContainText('"new"');
  await input.fill('rate');
  await input.press('Enter');
  await expect(page.locator('#sakuraOutput')).toContainText('Too many questions');
  await input.fill('recovered');
  await input.press('Enter');
  await expect(page.locator('#sakuraOutput')).toContainText('"recovered"');
});
