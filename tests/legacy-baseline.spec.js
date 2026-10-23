const { test, expect } = require('@playwright/test');
const { createServer } = require('node:http');
const { startLegacyBaseline } = require('./legacy-baseline');
const { verifyLegacyPage } = require('./capture-parity');

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
