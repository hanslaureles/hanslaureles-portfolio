"""
Live-site probe (run on a schedule by .github/workflows/live-probe.yml).

Checks the deployed site, not the repo:
  - every public route answers with its expected status (cleanUrls pages,
    the /ciel aliases, the Aura subfolder rewrites, the resume PDF);
  - /about.html redirects to /about (cleanUrls);
  - the security headers from vercel.json are present;
  - the live pages carry the same ?v= cache-buster as index.html in this
    checkout, so a push to main that never deployed shows up as a failure.

Usage: python tools/probe_live.py [base_url]      exit 1 on any failure
Stdlib only.
"""

import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = (sys.argv[1] if len(sys.argv) > 1 else "https://hanslaureles.vercel.app").rstrip("/")

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
    expected_v = re.search(r"\?v=([\d.]+)", (ROOT / "index.html").read_text(encoding="utf-8")).group(1)
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
    if status not in (301, 308) or not location.rstrip("/").endswith("/about"):
        problems.append(f"/about.html: HTTP {status} -> {location!r} (expected 308 -> /about)")

    _, headers, _ = fetch("/")
    for name, value in HEADERS.items():
        if headers.get(name, "").lower() != value.lower():
            problems.append(f"header {name}: {headers.get(name)!r} (expected {value!r})")
    if "permissions-policy" not in headers:
        problems.append("header permissions-policy missing")

    print()
    if problems:
        print("FAIL")
        for p in problems:
            print(f"  - {p}")
        return 1
    print(f"OK: {len(PAGES) + len(FILES) + 1} routes, headers, and ?v={expected_v} live")
    return 0


if __name__ == "__main__":
    sys.exit(main())
