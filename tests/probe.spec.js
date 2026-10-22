const { test, expect } = require('@playwright/test');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const { buildCsp } = require('../lib/csp.mjs');

test('local probe rejects a missing Aura policy even when the app nonce policy is valid', () => {
  const script = `
import contextlib, importlib.util, io, json, sys
from types import SimpleNamespace
from unittest import mock
spec = importlib.util.spec_from_file_location('probe', 'tools/probe_live.py')
probe = importlib.util.module_from_spec(spec)
spec.loader.exec_module(probe)
policies = json.loads(sys.argv[1])
def fetch(route):
    headers = {'x-content-type-options':'nosniff', 'x-frame-options':'DENY',
        'referrer-policy':'strict-origin-when-cross-origin', 'permissions-policy':'present',
        'cache-control':'private, no-store, max-age=0'}
    if route == '/': headers['content-security-policy'] = policies['app']
    if route == '/about.html': return 308, {'location':'/about'}, ''
    if route == '/data/status.json': return 200, headers, '{"schema_version":1}'
    return 200, headers, '?v=2.2.34 /aura-store/styles.css'
out = io.StringIO()
with mock.patch.object(probe, 'fetch', fetch), mock.patch.object(probe.subprocess, 'run', return_value=SimpleNamespace(stdout=sys.argv[1])), contextlib.redirect_stdout(out):
    result = probe.main()
assert result == 1 and 'legacy Aura CSP missing' in out.getvalue(), out.getvalue()
`;
  const result = spawnSync(
    process.env.PYTHON || 'python',
    [
      '-X',
      'utf8',
      '-B',
      '-c',
      script,
      JSON.stringify({ rules: [], app: buildCsp('AAAAAAAAAAAAAAAAAAAAAA==') }),
    ],
    { cwd: path.join(__dirname, '..'), encoding: 'utf8' },
  );
  expect(result.status, result.stdout + result.stderr).toBe(0);
});
