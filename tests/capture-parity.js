// Capture from a static server of `git archive 4cdd1e0`, never from a migration build.
// Usage (tests/): node capture-parity.js http://127.0.0.1:5176 [--head-only]
const { chromium } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const assert = require('node:assert/strict');
const { snapshotStyles } = require('./style-snapshot');

const ROUTES = ['/', '/about', '/404', '/case-lsfm', '/case-ciel', '/case-memory',
  '/case-aura', '/case-lumina', '/case-vellum', '/case-fintrack'];
const filename = route => route === '/' ? 'index' : route.slice(1);

async function verifyLegacyPage(base, route) {
  const file = `${filename(route)}.html`;
  const response = await fetch(new URL('/' + file, base));
  const bytes = Buffer.from(await response.arrayBuffer());
  const baseline = execFileSync('git', ['show', `4cdd1e0:${file}`], { cwd: path.join(__dirname, '..') });
  assert(response.ok, `${file}: HTTP ${response.status}`);
  assert(bytes.equals(baseline), `${file}: server bytes differ from 4cdd1e0`);
  return '/' + file;
}

async function captureRoute(browser, base, route, prepareContext) {
  const result = { h: [], text: '', links: [], styles: {} };
  for (const width of [1280, 375]) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      try {
        if (prepareContext) await prepareContext(context);
        await context.addInitScript(t => localStorage.setItem('hans_portfolio_theme', t), theme);
        const page = await context.newPage();
        await page.goto(new URL(route, base).href, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        if (width === 1280 && theme === 'light') {
          Object.assign(result, await page.evaluate(() => {
            const normalize = text => text.replace(/\s+/g, ' ').trim();
            return {
              head: {
                title: document.title,
                description: document.querySelector('meta[name="description"]')?.content || '',
                og: Object.fromEntries([...document.querySelectorAll('meta[property^="og:"]')].map(el => [el.getAttribute('property'), el.content]).sort()),
              },
              h: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(el => `${el.tagName.toLowerCase()}:${normalize(el.textContent)}`),
              text: normalize(document.querySelector('main').innerText),
              links: [...document.querySelectorAll('main a[href],header a[href]')].map(el => el.getAttribute('href')).sort(),
            };
          }));
        }
        result.styles[`${width} ${theme}`] = await snapshotStyles(page);
      } finally {
        await context.close();
      }
    }
  }
  return result;
}

module.exports = { ROUTES, filename, captureRoute, verifyLegacyPage };

if (require.main === module) (async () => {
  const base = process.argv[2];
  assert(base, 'Usage: node capture-parity.js <baseline-static-server-url>');
  const out = path.join(__dirname, 'parity');
  const headOnly = process.argv.includes('--head-only');
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch();
  try {
    for (const route of ROUTES) {
      const target = path.join(out, `${filename(route)}.json`);
      const existing = headOnly ? JSON.parse(fs.readFileSync(target, 'utf8')) : null;
      const legacyRoute = await verifyLegacyPage(base, route);
      const data = await captureRoute(browser, base, legacyRoute);
      if (!headOnly || JSON.stringify(existing.head) !== JSON.stringify(data.head)) {
        fs.writeFileSync(target, JSON.stringify(headOnly ? { ...existing, head: data.head } : data) + '\n');
      }
      console.log(`${route}: captured ${headOnly ? 'head only' : 'headings, text, links and 4 style views'} from 4cdd1e0`);
    }
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
