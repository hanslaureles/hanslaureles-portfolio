const { test, expect } = require('@playwright/test');
const { LEGACY_CSP, buildCsp } = require('../lib/csp.mjs');

test.describe('sakura API', () => {
  let headers;
  test.beforeEach(async ({}, testInfo) => {
    headers = { 'x-forwarded-for': `test-${testInfo.testId}-${Date.now()}` };
  });
  async function check(response, status) {
    expect(response.status()).toBe(status);
    expect(response.headers()['content-type']).toContain('application/json');
    expect(response.headers()['cache-control']).toContain('no-store');
    expect(response.status()).not.toBe(500);
    return response.json();
  }
  for (const golden of require('./sakura-golden.json').cases) {
    test(`golden: ${golden.question}`, async ({ request }) => {
      const body = await check(await request.post('/api/sakura', { headers, data: { question: golden.question } }), 200);
      expect(body.answers).toEqual(golden.answers);
    });
  }
  test('400 empty, missing and invalid questions', async ({ request }) => {
    for (const data of [{}, { question: '' }, { question: '  ' }, { question: 12 }, null, []]) {
      await check(await request.post('/api/sakura', { headers: { ...headers, 'content-type': 'application/json' }, data: Buffer.from(JSON.stringify(data)) }), 400);
    }
  });
  test('413 over 2000 characters; 2000 accepted', async ({ request }) => {
    await check(await request.post('/api/sakura', { headers, data: { question: 'a'.repeat(2000) } }), 200);
    await check(await request.post('/api/sakura', { headers, data: { question: 'a'.repeat(2001) } }), 413);
  });
  test('413 bounds the actual request body', async ({ request }) => {
    await check(await request.post('/api/sakura', { headers, data: { question: 'React', padding: 'a'.repeat(66000) } }), 413);
  });
  test('415 non-JSON', async ({ request }) => {
    await check(await request.post('/api/sakura', { headers: { ...headers, 'content-type': 'text/plain' }, data: '{"question":"React"}' }), 415);
  });
  test('malformed JSON never returns 500', async ({ request }) => {
    await check(await request.post('/api/sakura', { headers: { ...headers, 'content-type': 'application/json' }, data: Buffer.from('{') }), 400);
  });
  test('405 other methods', async ({ request }) => {
    for (const method of ['GET', 'HEAD', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']) {
      const response = await request.fetch('/api/sakura', { method, headers });
      expect(response.status()).toBe(405);
      expect(response.headers().allow).toBe('POST');
    }
  });
  test('429 after 20 a minute per IP', async ({ request }) => {
    for (let i = 0; i < 20; i++) await check(await request.post('/api/sakura', { headers, data: { question: 'React' } }), 200);
    const response = await request.post('/api/sakura', { headers, data: { question: 'React' } });
    await check(response, 429);
    expect(Number(response.headers()['retry-after'])).toBeGreaterThan(0);
    await check(await request.post('/api/sakura', { headers: { 'x-forwarded-for': `${headers['x-forwarded-for']}-other` }, data: { question: 'React' } }), 200);
  });
  test('input is never echoed as HTML', async ({ request }) => {
    const question = '<img src=x onerror=alert(1)> React <script>alert(1)</script>';
    const response = await request.post('/api/sakura', { headers, data: { question } });
    await check(response, 200);
    expect(await response.text()).not.toContain(question);
    expect(await response.text()).not.toContain('<script>');
  });
});

test('CSP nonce is per request', async ({ request }) => {
  for (const path of ['/', '/no-such-page', '/404', '/about', ...require('fs').readdirSync(require('path').join(__dirname, '../app')).filter(name => name.startsWith('case-')).map(name => '/' + name)]) {
    const nonces = [];
    for (let i = 0; i < 2; i++) {
      const response = await request.get(path);
      const policy = response.headers()['content-security-policy'];
      const nonce = /'nonce-([^']+)'/.exec(policy || '')?.[1];
      expect(nonce).toBeTruthy();
      expect(Buffer.from(nonce, 'base64')).toHaveLength(16);
      expect(policy).toBe(buildCsp(nonce));
      expect(response.headers()['cache-control']).not.toContain('public');
      nonces.push(nonce);
    }
    expect(nonces[0]).not.toBe(nonces[1]);
  }
});

test('legacy pages keep the hash CSP', async ({ request }) => {
  for (const path of ['/aura-store', '/aura-store/checkout']) {
    expect((await request.get(path)).headers()['content-security-policy']).toBe(LEGACY_CSP);
  }
});

test('custom 404 returns status 404', async ({ page }) => {
  const response = await page.goto('/no-such-page');
  expect(response.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText('Lost in the Margins.');
  expect(response.headers()['x-powered-by']).toBeUndefined();
});

for (const [path, status] of [['/no-such-page', 404], ['/404', 200]]) {
  test(`404 is readable without JS: ${path}`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    try {
      const page = await context.newPage();
      const response = await page.goto(new URL(path, baseURL).href);
      await expect(page.locator('h1')).toHaveText('Lost in the Margins.');
      expect(response.status()).toBe(status);
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
      await expect(page.locator('main')).toContainText('The requested URL was not found on this server');
      await expect(page.getByRole('link', { name: 'Return to Selected Work' })).toHaveAttribute('href', 'index.html');
      await expect(page.getByRole('navigation')).toBeVisible();
    } finally { await context.close(); }
  });

  test(`stored theme is applied on first paint of the app route: ${path}`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ colorScheme: 'light' });
    try {
      await context.addInitScript(() => {
        localStorage.setItem('hans_portfolio_theme', 'dark');
        requestAnimationFrame(() => { window.__firstTheme = document.documentElement.getAttribute('data-theme'); });
      });
      await context.route('**/*.js*', route => route.abort());
      const page = await context.newPage();
      const response = await page.goto(new URL(path, baseURL).href, { waitUntil: 'domcontentloaded' });
      expect(response.status()).toBe(status);
      expect(await page.locator('html').getAttribute('data-theme')).toBe('dark');
      await expect.poll(() => page.evaluate(() => window.__firstTheme)).toBe('dark');
    } finally { await context.close(); }
  });
}

test('app theme controls work under the server nonce policy', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/no-such-page');
  await page.getByRole('button', { name: 'Toggle light and dark theme' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(await page.evaluate(() => localStorage.getItem('hans_portfolio_theme'))).toBe('dark');
  await page.keyboard.press('Alt+t');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('app theme shortcut stands down for IME and editable fields', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/no-such-page');
  await page.getByRole('button', { name: 'Toggle light and dark theme' }).click();
  await page.keyboard.press('Alt+t');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.dispatchEvent('body', 'keydown', { code: 'KeyT', altKey: true, keyCode: 229 });
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.evaluate(() => { const input = document.createElement('input'); input.id = 'editable-probe'; document.body.append(input); });
  await page.locator('#editable-probe').focus();
  await page.keyboard.press('Alt+t');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('app scripts carry the response nonce and fonts stay local', async ({ page, baseURL }) => {
  const remote = [];
  page.on('request', request => { if (new URL(request.url()).origin !== new URL(baseURL).origin) remote.push(request.url()); });
  const response = await page.goto('/no-such-page', { waitUntil: 'networkidle' });
  const nonce = /'nonce-([^']+)'/.exec(response.headers()['content-security-policy'])[1];
  expect(await page.locator('script').evaluateAll(scripts => scripts.map(script => script.nonce))).toEqual(expect.arrayContaining([nonce]));
  expect(await page.locator('script').evaluateAll(scripts => scripts.every(script => Boolean(script.nonce)))).toBe(true);
  expect(remote).toEqual([]);
});

test('legacy URLs', async ({ request }) => {
  for (const [source, target] of [
    ['/index.html', '/'], ['/about.html', '/about'], ['/case-ciel.html', '/case-ciel'], ['/404.html', '/404'],
    ['/aura-store/index.html', '/aura-store'],
  ]) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect(response.status(), source).toBe(308);
    expect(new URL(response.headers().location, response.url()).pathname).toBe(target);
    expect((await request.get(target, { maxRedirects: 0 })).status()).toBe(200);
  }
  for (const alias of ['/ciel', '/ciel-hud']) {
    const response = await request.get(alias, { maxRedirects: 0 });
    expect(response.status(), alias).toBe(200);
    expect(await response.text()).toMatch(/<h1[^>]*>[\s\S]*?Ciel[\s\S]*?<\/h1>/);
  }
  for (const path of ['/aura-store', '/aura-store/']) {
    const response = await request.get(path, { maxRedirects: 0 });
    expect(response.status(), path).toBe(200);
    expect(await response.text()).toMatch(/<h1[\s>]/);
  }
  expect((await request.get('/no-such-page', { maxRedirects: 0 })).status()).toBe(404);
});

test('security headers match the legacy values', async ({ request }) => {
  for (const path of ['/', '/about', '/aura-store']) {
    const response = await request.get(path);
    expect(response.headers()).toMatchObject({
      'x-content-type-options': 'nosniff',
      'x-frame-options': 'DENY',
      'referrer-policy': 'strict-origin-when-cross-origin',
      'permissions-policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()',
    });
    expect(response.headers()['content-security-policy']).toBe(path === '/about' || path === '/'
      ? buildCsp(/'nonce-([^']+)'/.exec(response.headers()['content-security-policy'])[1]) : LEGACY_CSP);
  }
  const fs = require('fs');
  const image = fs.readdirSync(require('path').join(__dirname, '../public/images')).find(f => /\.(avif|webp)$/.test(f));
  for (const [path, cache] of [
    [`/images/${image}`, 'public, max-age=31536000, immutable'],
    ['/data/status.json', 'public, max-age=0, must-revalidate'],
    ['/Hans_Laureles_Resume.pdf', 'public, max-age=86400, must-revalidate'],
  ]) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(response.headers()['cache-control']).toBe(cache);
  }
});
