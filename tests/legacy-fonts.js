const path = require('node:path');

const ranges = require('./google-font-ranges.json').families;
const FAMILIES = [
  ['Plus Jakarta Sans', 'plus-jakarta-sans', '300 700', ['normal']],
  ['Instrument Serif', 'instrument-serif', '400', ['normal', 'italic']],
  ['JetBrains Mono', 'jetbrains-mono', '400 500', ['normal']],
];
const files = new Map();
const css = FAMILIES.flatMap(([family, directory, weight, styles]) =>
  styles.flatMap(style => ['latin-ext', 'latin'].map(subset => {
    const key = family[0].toLowerCase() + family.slice(1).replaceAll(' ', '');
    const range = ranges[key][subset];
    const file = `${directory}-${subset}-${style}.woff2`;
    const url = `https://fonts.gstatic.com/parity/${file}`;
    files.set(url, path.join(__dirname, '../app/fonts', directory, file));
    return `@font-face{font-family:'${family}';font-style:${style};font-weight:${weight};font-display:swap;src:url('${url}') format('woff2');unicode-range:${range};}`;
  })),
).join('\n');

async function useCommittedFonts(context) {
  await context.route(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//, async route => {
    const url = new URL(route.request().url());
    if (url.hostname === 'fonts.googleapis.com' && url.pathname === '/css2') {
      await route.fulfill({ contentType: 'text/css', body: css });
    } else if (files.has(url.href)) {
      await route.fulfill({ contentType: 'font/woff2', path: files.get(url.href), headers: { 'access-control-allow-origin': '*' } });
    } else {
      await route.abort('blockedbyclient');
      throw new Error(`Unexpected legacy font request: ${url.href}`);
    }
  });
}

module.exports = { useCommittedFonts };
