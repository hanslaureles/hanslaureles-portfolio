const { test, expect } = require('@playwright/test');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const { buildCsp, LEGACY_CSP } = require('../lib/csp.mjs');
const cwd = path.join(__dirname, '..');
const python = process.env.PYTHON || 'python';

for (const [scenario, message] of [
  ['valid', 'OK: 18 routes'],
  ['stale SHA', 'deployed SHA differs'],
  ['cached version', 'must be no-store'],
  ['missing Aura policy', 'legacy Aura CSP missing'],
  ['wrong Aura policy', 'CSP differs from the legacy'],
  ['wrong app policy', 'CSP differs from the app nonce'],
  ['public HTML', 'app HTML is publicly cacheable'],
  ['blank 404', 'custom server-rendered heading missing'],
]) {
  test(`live probe: ${scenario}`, () => {
    const script = `
import contextlib, importlib.util, io, json, sys
from types import SimpleNamespace
from unittest import mock
spec = importlib.util.spec_from_file_location('probe', 'tools/probe_live.py')
probe = importlib.util.module_from_spec(spec)
spec.loader.exec_module(probe)
policies = json.loads(sys.argv[1])
scenario, message = sys.argv[2:4]
expected_sha = 'a' * 40
def fetch(route):
    headers = {'x-content-type-options':'nosniff', 'x-frame-options':'DENY',
        'referrer-policy':'strict-origin-when-cross-origin', 'permissions-policy':'present',
        'cache-control':'private, no-store, max-age=0',
        'content-security-policy': policies['legacy'] if route.startswith('/aura-store') else policies['app'].replace('__NONCE__', 'AAAAAAAAAAAAAAAAAAAAAA==')}
    if route == '/about.html': return 308, {'location':'/about'}, ''
    if route == '/version.json':
        if scenario == 'cached version': headers['cache-control'] = 'public, max-age=3600'
        return 200, headers, json.dumps({'sha': 'b' * 40 if scenario == 'stale SHA' else expected_sha})
    if route == '/data/status.json': return 200, headers, '{"schema_version":1}'
    if scenario == 'wrong Aura policy' and route.startswith('/aura-store'): headers['content-security-policy'] = "default-src 'none'"
    if scenario == 'wrong app policy' and route == '/about': headers['content-security-policy'] = "default-src 'none'"
    if scenario == 'public HTML' and route == '/about': headers['cache-control'] = 'public, max-age=3600'
    if route == '/404': return 404, headers, '' if scenario == 'blank 404' else '<h1>Lost in the <span>Margins.</span></h1>'
    return 200, headers, '/aura-store/styles.css'
if scenario == 'missing Aura policy': policies['legacy'] = ''
out = io.StringIO()
with mock.patch.object(probe, 'fetch', fetch), mock.patch.object(probe.subprocess, 'run', return_value=SimpleNamespace(stdout=json.dumps(policies))), mock.patch.object(probe.subprocess, 'check_output', return_value=expected_sha), contextlib.redirect_stdout(out):
    result = probe.main()
assert result == (0 if scenario == 'valid' else 1), out.getvalue()
assert message in out.getvalue(), out.getvalue()
`;
    const result = spawnSync(
      python,
      [
        '-X',
        'utf8',
        '-B',
        '-c',
        script,
        JSON.stringify({ app: buildCsp('__NONCE__'), legacy: LEGACY_CSP }),
        scenario,
        message,
      ],
      { cwd, encoding: 'utf8' },
    );
    expect(result.status, result.stdout + result.stderr).toBe(0);
  });
}

test('live probe verifies all 18 routes on next start', async ({ baseURL }) => {
  const result = spawnSync(
    python,
    ['-X', 'utf8', '-B', 'tools/probe_live.py', baseURL, '--root', 'public'],
    { cwd, encoding: 'utf8' },
  );
  expect(result.status, result.stdout + result.stderr).toBe(0);
  expect(result.stdout).toContain('OK: 18 routes');
});
