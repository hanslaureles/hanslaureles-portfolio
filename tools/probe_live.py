"""
Live-site probe (run on a schedule by .github/workflows/live-probe.yml).

Checks the deployed site, not the repo:
  - every public route answers with its expected status (cleanUrls pages,
    the /ciel aliases, the Aura subfolder rewrites, the resume PDF);
  - /about.html redirects to /about (cleanUrls);
  - security headers are present; app CSP matches buildCsp with the response nonce,
    Aura keeps the legacy policy, and no report-only CSP is sent;
  - /aura-store references its own stylesheet (root-absolute URLs);
  - /data/status.json is served as schema-1 JSON with max-age=0;
  - the live pages carry the same ?v= cache-buster as the theme/script source in this
    checkout, so a push to main that never deployed shows up as a failure.

Usage: python tools/probe_live.py [base_url]      exit 1 on any failure
Stdlib only.
"""

import json
import argparse
import subprocess
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
ROOT = REPO / "public"
BASE = "https://hanslaureles.vercel.app"

PAGES = ["/", "/about", "/case-lsfm", "/case-ciel", "/case-memory", "/case-aura", "/case-lumina",
         "/case-vellum", "/case-fintrack", "/ciel", "/ciel-hud", "/aura-store", "/aura-store/checkout"]
FILES = ["/Hans_Laureles_Resume.pdf", "/styles.css", "/app.js"]
HEADERS = {"x-content-type-options": "nosniff", "x-frame-options": "DENY",
           "referrer-policy": "strict-origin-when-cross-origin"}


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


OPENER = urllib.request.build_opener(NoRedirect)


def fetch(path):
    req = urllib.request.Request(BASE + path, headers={"User-Agent": "portfolio-live-probe"})
    try:
        with OPENER.open(req, timeout=20) as r:
            return r.status, {k.lower(): v for k, v in r.headers.items()}, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, {k.lower(): v for k, v in e.headers.items()}, ""


def main():
    legacy_home = (ROOT / "index.html").is_file()
    version_source = ROOT / "index.html" if legacy_home else REPO / "components/home/Motion.tsx"
    expected_v = re.search(r"\?v=([\d.]+)", version_source.read_text(encoding="utf-8")).group(1)
    problems = []

    for path in PAGES:
        status, headers, body = fetch(path)
        versions = set(re.findall(r"\?v=([\d.]+)", body))
        note = f"?v={','.join(sorted(versions)) or '-'}"
        if status != 200:
            problems.append(f"{path}: HTTP {status} (expected 200)")
        elif versions != {expected_v}:
            problems.append(f"{path}: serves {note}, repo has ?v={expected_v} (deploy behind main?)")
        print(f"{status}  {path:24} {note}")

    for path in FILES:
        status, _, _ = fetch(path)
        print(f"{status}  {path}")
        if status != 200:
            problems.append(f"{path}: HTTP {status} (expected 200)")

    status, headers, _ = fetch("/about.html")
    location = headers.get("location", "")
    print(f"{status}  /about.html -> {location}")
    # Exactly 308: Vercel's cleanUrls answers .html requests with a permanent,
    # method-preserving redirect. A 301 would mean the config changed.
    if status != 308 or not location.rstrip("/").endswith("/about"):
        problems.append(f"/about.html: HTTP {status} -> {location!r} (expected 308 -> /about)")

    _, headers, _ = fetch("/")
    for name, value in HEADERS.items():
        if headers.get(name, "").lower() != value.lower():
            problems.append(f"header {name}: {headers.get(name)!r} (expected {value!r})")
    if "permissions-policy" not in headers:
        problems.append("header permissions-policy missing")
    nonce = re.search(r"'nonce-([A-Za-z0-9+/]+={0,2})'", headers.get("content-security-policy", ""))
    result = subprocess.run(["node", "--input-type=module", "-e",
        "import config from './next.config.mjs'; import {buildCsp} from './lib/csp.mjs'; "
        "console.log(JSON.stringify({rules:await config.headers(),app:buildCsp(process.argv[1])}))",
        nonce.group(1) if nonce else ""],
        cwd=REPO, capture_output=True, text=True, check=True)
    policies = json.loads(result.stdout)
    rules = policies["rules"]
    csp = {h["key"].lower(): h["value"] for r in rules if r["source"] == "/aura-store/:path*" for h in r["headers"]}
    # The CSP is enforced (batch B, 2026-10-06): the enforced header must match vercel.json and the
    # report-only header must be gone, so a revert to report-only shows up as a failure.
    # A key missing from both sides would compare None == None, so require it in vercel.json first.
    expected_csp = csp.get("content-security-policy")
    aura_csp = expected_csp
    if not aura_csp:
        problems.append("legacy Aura CSP missing from config")
    if not legacy_home:
        expected_csp = policies["app"]
        if not nonce:
            problems.append("homepage CSP has no nonce")
        if "public" in headers.get("cache-control", ""):
            problems.append("app homepage HTML is publicly cacheable")
    if not expected_csp:
        problems.append("vercel.json: no enforced Content-Security-Policy header for /(.*)")
    elif headers.get("content-security-policy") != expected_csp:
        problems.append(f"header content-security-policy: {headers.get('content-security-policy')!r} "
                        f"(vercel.json has {expected_csp!r})")
    if "content-security-policy-report-only" in headers:
        problems.append("header content-security-policy-report-only still sent (expected only the enforced CSP)")

    # /aura-store has no trailing slash, so a relative "styles.css" would load the
    # portfolio's stylesheet (the store shipped unstyled that way until 4A).
    _, aura_headers, body = fetch("/aura-store")
    if aura_headers.get("content-security-policy") != aura_csp:
        problems.append("/aura-store: CSP differs from the legacy policy")
    if "/aura-store/styles.css" not in body:
        problems.append("/aura-store: page does not reference /aura-store/styles.css")

    # The agent-status snapshot (4C): served, parseable, never cached. Its age is not a
    # failure: an old snapshot is shown as old on the page, which is the honest outcome.
    status, headers, body = fetch("/data/status.json")
    print(f"{status}  /data/status.json  cache-control: {headers.get('cache-control')}")
    try:
        if status != 200 or json.loads(body).get("schema_version") != 1:
            problems.append(f"/data/status.json: HTTP {status} or schema_version != 1")
    except ValueError:
        problems.append("/data/status.json: not valid JSON")
    if "max-age=0" not in headers.get("cache-control", ""):
        problems.append(f"/data/status.json: cache-control {headers.get('cache-control')!r} (expected max-age=0)")

    print()
    if problems:
        print("FAIL")
        for p in problems:
            print(f"  - {p}")
        return 1
    print(f"OK: {len(PAGES) + len(FILES) + 2} routes, headers, and ?v={expected_v} live")
    return 0


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("base_url", nargs="?", default=BASE)
    parser.add_argument("--root", type=Path, default=ROOT)
    args = parser.parse_args()
    ROOT, BASE = args.root.resolve(), args.base_url.rstrip("/")
    sys.exit(main())
