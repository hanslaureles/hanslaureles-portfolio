const { test, expect } = require('@playwright/test');
const original = require('./google-font-ranges.json').families;
const fs = require('node:fs');
const path = require('node:path');

function ranges(value) {
  return value.split(',').map(part => {
    const [start, end] = part.trim().replace(/^U\+/i, '').split('-');
    return [parseInt(start.replaceAll('?', '0'), 16), parseInt((end || start).replaceAll('?', 'F'), 16)];
  });
}
const includes = (intervals, code) => intervals.some(([start, end]) => code >= start && code <= end);
const familyKey = name => Object.keys(original).find(key => key.toLowerCase() === name.replace(/["' _]/g, '').toLowerCase());

test('rendered pages retain original Google font character coverage', async ({ page }) => {
  test.setTimeout(90_000);
  await page.route(/fonts\.(googleapis|gstatic)\.com/, route => route.abort());
  await page.goto('/', { waitUntil: 'networkidle' });
  const faces = await page.evaluate(() => {
    const faces = [];
    function visit(rules) {
      for (const rule of rules) {
        if (rule instanceof CSSFontFaceRule) faces.push({ family: rule.style.fontFamily, range: rule.style.unicodeRange });
        else if ('cssRules' in rule) visit(rule.cssRules);
      }
    }
    for (const sheet of document.styleSheets) visit(sheet.cssRules);
    return faces;
  });
  const committed = {};
  for (const face of faces) {
    const family = familyKey(face.family);
    if (family) (committed[family] ||= []).push(...ranges(face.range));
  }
  for (const family of Object.keys(original)) expect(committed[family], family).toBeTruthy();
  const routes = ['/', '/about', '/404', '/ciel', '/ciel-hud', ...fs.readdirSync(path.join(__dirname, '../app')).filter(name => name.startsWith('case-')).map(name => '/' + name), '/aura-store', '/aura-store/checkout', '/aura-store/confirmation'];
  const missing = new Set();
  for (const route of routes) {
    await page.goto(route, { waitUntil: 'networkidle' });
    const text = await page.evaluate(() => {
      const rows = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      for (let node; (node = walker.nextNode());) {
        if (!node.textContent.trim() || node.parentElement.closest('script,style,noscript,template')) continue;
        rows.push({ text: node.textContent, family: getComputedStyle(node.parentElement).fontFamily.split(',')[0] });
      }
      return rows;
    });
    for (const row of text) {
      const family = familyKey(row.family);
      if (!family) continue;
      const before = Object.values(original[family]).flatMap(ranges);
      for (const char of row.text) {
        const code = char.codePointAt(0);
        if (includes(before, code) && !includes(committed[family], code)) missing.add(`${route}: ${family} ${char} U+${code.toString(16).toUpperCase()}`);
      }
    }
  }
  expect([...missing], 'Previously covered characters need a committed face with a matching unicode-range').toEqual([]);
});
