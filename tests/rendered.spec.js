const { test } = require('@playwright/test');
const { execFileSync } = require('node:child_process');
const path = require('node:path');

test('rendered case-study copy and headings pass the Python guards', async ({ baseURL }) => {
  test.setTimeout(60_000);
  const cwd = path.join(__dirname, '..');
  execFileSync(process.execPath, ['tests/render-pages.mjs', baseURL], { cwd });
  for (const tool of ['check_claims.py', 'check_headings.py']) {
    console.log(execFileSync(process.env.PYTHON || 'python', ['-X', 'utf8', `tools/${tool}`, '--root', '.rendered'], { cwd, encoding: 'utf8' }));
  }
  console.log(execFileSync(process.env.PYTHON || 'python', ['-X', 'utf8', 'tools/build_metric_cards.py', '--root', '.rendered', '--check'], { cwd, encoding: 'utf8' }));
});
