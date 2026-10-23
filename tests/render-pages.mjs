// Rendered mirrors retain legacy filenames so the Python checks can read them.
import fs from 'node:fs/promises';
import path from 'node:path';

const base = process.argv[2] || 'http://127.0.0.1:5174';
const out = path.resolve(import.meta.dirname, '../.rendered');
const routes = ['/', '/about', '/404', '/case-lsfm', '/case-ciel', '/case-memory',
  '/case-aura', '/case-lumina', '/case-vellum', '/case-fintrack', '/ciel', '/ciel-hud',
  '/aura-store', '/aura-store/', '/aura-store/checkout', '/aura-store/confirmation',
  '/Hans_Laureles_Resume.pdf', '/data/status.json'];
for (const dir of ['data/bench', 'images']) {
  for (const entry of await fs.readdir(path.resolve(import.meta.dirname, '../public', dir), { recursive: true, withFileTypes: true })) {
    if (entry.isFile()) routes.push('/' + path.relative(path.resolve(import.meta.dirname, '../public'), path.join(entry.parentPath, entry.name)).split(path.sep).join('/'));
  }
}
for (const route of routes) {
  const response = await fetch(new URL(route, base));
  const expectedStatus = route === '/404' ? 404 : 200;
  if (response.status !== expectedStatus) throw new Error(`${route}: HTTP ${response.status} (expected ${expectedStatus})`);
  const file = route === '/' ? 'index.html' : route.startsWith('/aura-store') && ['/aura-store', '/aura-store/'].includes(route)
    ? 'aura-store/index.html' : route.slice(1) + (path.extname(route) ? '' : '.html');
  const target = path.join(out, file);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, Buffer.from(await response.arrayBuffer()));
}
console.log(`Rendered ${routes.length} routes to ${out}`);
