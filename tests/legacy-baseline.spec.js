const { test, expect } = require('@playwright/test');
const { createServer } = require('node:http');
const { startLegacyBaseline } = require('./legacy-baseline');
const { verifyLegacyPage } = require('./capture-parity');
const { useCommittedFonts } = require('./legacy-fonts');
const fs = require('node:fs');
const path = require('node:path');

test('legacy fonts use committed bytes without reaching Google', async ({ browser }) => {
  const baseline = await startLegacyBaseline();
  const context = await browser.newContext();
  const escaped = [];
  const received = [];
  try {
    // A lower-priority guard catches any Google request the font routes miss.
    await context.route(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//, route => {
      escaped.push(route.request().url());
      return route.abort('blockedbyclient');
    });
    await useCommittedFonts(context);
    const page = await context.newPage();
    page.on('response', response => {
      if (response.request().resourceType() === 'font') received.push(response);
    });
    await page.goto(baseline.url, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      for (const family of ['Plus Jakarta Sans', 'Instrument Serif', 'JetBrains Mono']) {
        for (const style of family === 'Instrument Serif' ? ['normal', 'italic'] : ['normal']) {
          for (const text of ['A', 'Ā']) {
            await document.fonts.load(`${style} 400 16px "${family}"`, text);
          }
        }
      }
    });
    expect(escaped).toEqual([]);
    expect(new Set(received.map(response => response.url())).size).toBe(8);
    for (const response of received) {
      const file = new URL(response.url()).pathname.split('/').pop();
      const directory = file.split('-latin')[0];
      expect(await response.body()).toEqual(fs.readFileSync(path.join(__dirname, '../app/fonts', directory, file)));
    }
  } finally {
    await context.close();
    await baseline.close();
  }
});

test('legacy baseline serves verified Git bytes, confines paths and closes', async () => {
  const baseline = await startLegacyBaseline();
  try {
    expect(await verifyLegacyPage(baseline.url, '/')).toBe('/index.html');
    expect(await verifyLegacyPage(baseline.url, '/404')).toBe('/404.html');
    const css = await fetch(baseline.url + '/styles.css');
    expect(css.status).toBe(200);
    expect(css.headers.get('content-type')).toContain('text/css');
    expect((await fetch(baseline.url + '/missing.html')).status).toBe(404);
    expect((await fetch(baseline.url + '/%2e%2e%2foutside')).status).toBe(403);
  } finally {
    await baseline.close();
  }
  await expect(fetch(baseline.url + '/index.html')).rejects.toThrow();
});

test('legacy page verification rejects substituted HTML bytes', async () => {
  const server = createServer((_, response) =>
    response.end('not the legacy page'),
  );
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  try {
    await expect(
      verifyLegacyPage(`http://127.0.0.1:${server.address().port}`, '/'),
    ).rejects.toThrow('server bytes differ from 4cdd1e0');
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
