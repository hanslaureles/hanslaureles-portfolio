"""Verify 18 deployed routes, the exact Git SHA, enforced CSP and cache policy.

Usage: python tools/probe_live.py [base_url] [--root public]
The checkout must be the revision being verified. Stdlib only; exit 1 on failure.
"""
import argparse
import json
import re
import subprocess
import sys
import urllib.error
import urllib.request
from urllib.parse import urljoin, urlparse
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
ROOT = REPO / "public"
BASE = "https://hanslaureles.vercel.app"
PAGES = ["/", "/about", "/case-lsfm", "/case-ciel", "/case-memory", "/case-aura", "/case-lumina",
         "/case-vellum", "/case-fintrack", "/ciel", "/ciel-hud", "/aura-store", "/aura-store/checkout", "/404"]
FILES = ["/Hans_Laureles_Resume.pdf"]
HEADERS = {"x-content-type-options": "nosniff", "x-frame-options": "DENY",
           "referrer-policy": "strict-origin-when-cross-origin"}


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


OPENER = urllib.request.build_opener(NoRedirect)


def fetch(path):
    req = urllib.request.Request(BASE + path, headers={"User-Agent": "portfolio-live-probe"})
    try:
        with OPENER.open(req, timeout=20) as response:
            return response.status, {k.lower(): v for k, v in response.headers.items()}, response.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as error:
        return error.code, {k.lower(): v for k, v in error.headers.items()}, error.read().decode("utf-8", "replace")


def main():
    expected_sha = subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=REPO, text=True).strip()
    result = subprocess.run(["node", "--input-type=module", "-e",
        "import {buildCsp,LEGACY_CSP} from './lib/csp.mjs'; "
        "console.log(JSON.stringify({app:buildCsp('__NONCE__'),legacy:LEGACY_CSP}))"],
        cwd=REPO, capture_output=True, text=True, check=True)
    policies = json.loads(result.stdout)
    problems = []
    if not policies.get("legacy"):
        problems.append("legacy Aura CSP missing from lib/csp.mjs")
    app_pattern = re.escape(policies["app"]).replace("__NONCE__", r"[A-Za-z0-9+/]{22}==")
    for path in PAGES:
        status, headers, body = fetch(path)
        expected_status = 404 if path == "/404" else 200
        print(f"{status}  {path}")
        if status != expected_status:
            problems.append(f"{path}: HTTP {status} (expected {expected_status})")
        for name, value in HEADERS.items():
            if headers.get(name, "").lower() != value.lower():
                problems.append(f"{path}: header {name} differs from {value!r}")
        if "permissions-policy" not in headers:
            problems.append(f"{path}: permissions-policy missing")
        csp = headers.get("content-security-policy", "")
        if path.startswith("/aura-store"):
            if csp != policies.get("legacy"):
                problems.append(f"{path}: CSP differs from the legacy policy")
        else:
            if not re.fullmatch(app_pattern, csp):
                problems.append(f"{path}: CSP differs from the app nonce policy")
            cache = headers.get("cache-control", "").lower()
            if "public" in cache or "no-store" not in cache:
                problems.append(f"{path}: app HTML is publicly cacheable or lacks no-store")
        if "content-security-policy-report-only" in headers:
            problems.append(f"{path}: report-only CSP still sent")
        if path == "/aura-store" and "/aura-store/styles.css" not in body:
            problems.append("/aura-store: own stylesheet reference missing")
        if path == "/404" and not re.search(r"<h1\b[^>]*>Lost in the <span\b[^>]*>Margins\.</span></h1>", body):
            problems.append("/404: custom server-rendered heading missing")

    for path in FILES:
        status, _, _ = fetch(path)
        print(f"{status}  {path}")
        if status != 200:
            problems.append(f"{path}: HTTP {status} (expected 200)")

    status, headers, body = fetch("/version.json")
    print(f"{status}  /version.json  expected SHA {expected_sha}")
    try:
        if status != 200 or json.loads(body) != {"sha": expected_sha}:
            problems.append("/version.json: deployed SHA differs from git HEAD")
    except ValueError:
        problems.append("/version.json: not valid JSON")
    if "no-store" not in headers.get("cache-control", "").lower() or "public" in headers.get("cache-control", "").lower():
        problems.append("/version.json: must be no-store and not public")

    status, headers, _ = fetch("/about.html")
    location = headers.get("location", "")
    print(f"{status}  /about.html -> {location}")
    if status != 308 or urlparse(urljoin(BASE, location)).path != "/about":
        problems.append(f"/about.html: HTTP {status} -> {location!r} (expected 308 -> /about)")

    status, headers, body = fetch("/data/status.json")
    print(f"{status}  /data/status.json")
    try:
        if status != 200 or json.loads(body).get("schema_version") != 1:
            problems.append("/data/status.json: HTTP status or schema_version differs")
    except (ValueError, AttributeError):
        problems.append("/data/status.json: not a JSON object")
    if "max-age=0" not in headers.get("cache-control", ""):
        problems.append("/data/status.json: max-age=0 missing")

    for problem in problems:
        print(f"FAIL {problem}")
    if problems:
        return 1
    print(f"OK: {len(PAGES) + len(FILES) + 3} routes, headers, and SHA {expected_sha} live")
    return 0


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("base_url", nargs="?", default=BASE)
    parser.add_argument("--root", type=Path, default=ROOT)
    args = parser.parse_args()
    ROOT, BASE = args.root.resolve(), args.base_url.rstrip("/")
    sys.exit(main())
