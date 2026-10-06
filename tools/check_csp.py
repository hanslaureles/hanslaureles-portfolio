"""
CSP guard (Phase 5A): the enforced policy allows no inline script except by hash.

  - vercel.json and netlify.toml send the same Content-Security-Policy;
  - script-src has no 'unsafe-inline';
  - every inline <script> on every page hashes to a 'sha256-...' in script-src,
    and every hash in script-src is used by some page (no stale hash);
  - no page has an inline event handler (onclick=...) or a javascript: URL.

Editing the theme snippet without updating both headers fails here, not in
production. Hashes are taken over the script text with CRLF -> LF, as the
browser's HTML parser does, so CRLF working copies and LF deploys agree.

Usage: python tools/check_csp.py      exit 1 on any failure
Stdlib only; parses *.html and aura-store/*.html.
"""

import base64
import hashlib
import json
import re
import sys
import tomllib
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INLINE_SCRIPT = re.compile(r"<script(?![^>]*\bsrc=)([^>]*)>(.*?)</script>", re.S | re.I)


class Attrs(HTMLParser):
    def __init__(self):
        super().__init__()
        self.bad = []  # (line, attribute)

    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if name.startswith("on") or (name in ("href", "src", "action") and (value or "").strip().lower().startswith("javascript:")):
                self.bad.append((self.getpos()[0], f"<{tag} {name}=...>"))


def sha256(text):
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    return "sha256-" + base64.b64encode(hashlib.sha256(text.encode("utf-8")).digest()).decode()


def policies():
    rules = json.loads((ROOT / "vercel.json").read_text(encoding="utf-8"))["headers"]
    vercel = next((h["value"] for r in rules if r["source"] == "/(.*)" for h in r["headers"]
                   if h["key"] == "Content-Security-Policy"), None)
    netlify = next((h["values"].get("Content-Security-Policy") for h in
                    tomllib.loads((ROOT / "netlify.toml").read_text(encoding="utf-8")).get("headers", [])
                    if h.get("for") == "/*"), None)
    return vercel, netlify


def main():
    problems = []
    vercel, netlify = policies()
    if not vercel:
        print("FAIL vercel.json: no Content-Security-Policy for /(.*)")
        return 1
    if vercel != netlify:
        problems.append(f"netlify.toml policy differs from vercel.json:\n       vercel:  {vercel}\n       netlify: {netlify}")
    script_src = next((d.split()[1:] for d in vercel.split(";") if d.split()[:1] == ["script-src"]), [])
    if "'unsafe-inline'" in script_src:
        problems.append("script-src allows 'unsafe-inline'")
    allowed = {t.strip("'") for t in script_src if t.startswith("'sha256-")}

    used = set()
    pages = sorted([*ROOT.glob("*.html"), *ROOT.glob("aura-store/*.html")])
    for page in pages:
        rel = page.relative_to(ROOT).as_posix()
        html = page.read_text(encoding="utf-8")
        for m in INLINE_SCRIPT.finditer(html):
            if "application/ld+json" in m.group(1):
                continue  # data, never executed
            h = sha256(m.group(2))
            used.add(h)
            if h not in allowed:
                line = html.count("\n", 0, m.start()) + 1
                problems.append(f"{rel}:{line}: inline <script> {h} is not in script-src")
        parser = Attrs()
        parser.feed(html)
        problems += [f"{rel}:{line}: inline handler or javascript: URL {what}" for line, what in parser.bad]

    problems += [f"script-src hash {h} is used by no page (stale)" for h in sorted(allowed - used)]

    for p in problems:
        print(f"FAIL {p}")
    print(f"\n{len(pages)} pages, {len(used)} inline script hash(es), {len(problems)} problem(s)")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
