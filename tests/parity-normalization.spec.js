const { test, expect } = require('@playwright/test');
const { diff, normalizeStyles } = require('./style-snapshot');
const baseline = require('./parity/404.json').styles;

test('parity normalization preserves UI, color and layout differences', () => {
  const expected = normalizeStyles(baseline);
  expect(diff(expected, normalizeStyles(baseline))).toBe(0);
  for (const [index, value] of [[0, 'rgb(1, 2, 3)'], [24, '200px'], [23, 'Wrong Family']]) {
    const changed = structuredClone(expected);
    changed['1280 light']['header[0]'][index] = value;
    expect(diff(expected, changed)).toBeGreaterThan(0);
  }
  const missing = structuredClone(expected);
  delete missing['1280 light']['header[0]'];
  expect(diff(expected, missing)).toBeGreaterThan(0);
});

test('parity normalization maps only the intended generated font families', () => {
  for (const [family, expected] of [['__Plus_Jakarta_Sans_a123', 'Plus Jakarta Sans'], ['__Instrument_Serif_b234', 'Instrument Serif'], ['__JetBrains_Mono_c345', 'JetBrains Mono']]) {
    const changed = structuredClone(baseline);
    changed['1280 light']['header[0]'][23] = `"${family}", Arial`;
    expect(normalizeStyles(changed)['1280 light']['header[0]'][23]).toBe(`${expected}, Arial`);
  }
});
