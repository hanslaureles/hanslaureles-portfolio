"""
CSP guard (Phase 5A): the enforced policy allows no inline script except by hash.

  - vercel.json and netlify.toml send the same Content-Security-Policy;
  - the effective script policy (script-src-elem / -attr -> script-src ->
    default-src) exists and has no 'unsafe-inline' or *;
  - every inline <script> on every page hashes to a 'sha256-...' in script-src,
    and every hash in script-src is used by some page (no stale hash);
  - no page has an inline event handler (onclick=...), an srcdoc= or a javascript: URL.

Editing the theme snippet without updating both headers fails here, not in
production. Hashes are taken over the script text with CRLF -> LF, as the
browser's HTML parser does, so CRLF working copies and LF deploys agree.

Usage: python tools/check_csp.py      exit 1 on any failure
Stdlib only; parses *.html and aura-store/*.html.
"""

import base64
import hashlib
import json
import sys
import tomllib
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


class Page(HTMLParser):
    """Inline scripts (parsed attributes, so data-src= or a stray "ld+json" in another
    attribute cannot hide one) and attributes that run script inline."""

    def __init__(self):
        super().__init__()
        self.scripts = []  # (line, text)
        self.bad = []      # (line, what)
        self._script = None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        line = self.getpos()[0]
        if tag == "script" and "src" not in a and (a.get("type") or "").strip().lower() != "application/ld+json":
            self._script = (line, [])
        for name, value in attrs:
            v = (value or "").strip().lower()
            if name.startswith("on") or name == "srcdoc" or (name in ("href", "src", "action", "formaction") and v.startswith("javascript:")):
                self.bad.append((line, f"<{tag} {name}=...>"))

    def handle_data(self, data):
        if self._script:
            self._script[1].append(data)

    def handle_endtag(self, tag):
        if tag == "script" and self._script:
            self.scripts.append((self._script[0], "".join(self._script[1])))
            self._script = None


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
    # Browser fallback order: script-src-elem / script-src-attr -> script-src -> default-src.
    d = {p[0].lower(): p[1:] for p in (x.split() for x in vercel.split(";")) if p}
    elem = d.get("script-src-elem", d.get("script-src", d.get("default-src")))
    attr = d.get("script-src-attr", d.get("script-src", d.get("default-src")))
    for what, srcs in (("script elements", elem), ("inline handlers", attr)):
        if srcs is None:
            problems.append(f"no script-src or default-src restricts {what}")
        elif {"'unsafe-inline'", "*"} & {s.lower() for s in srcs}:
            problems.append(f"policy allows 'unsafe-inline' or * for {what}")
    allowed = {t.strip("'") for t in elem or [] if t.startswith("'sha256-")}

    used = set()
    pages = sorted([*ROOT.glob("*.html"), *ROOT.glob("aura-store/*.html")])
    for page in pages:
        rel = page.relative_to(ROOT).as_posix()
        parser = Page()
        parser.feed(page.read_text(encoding="utf-8"))
        for line, text in parser.scripts:
            h = sha256(text)
            used.add(h)
            if h not in allowed:
                problems.append(f"{rel}:{line}: inline <script> {h} is not in script-src")
        problems += [f"{rel}:{line}: inline handler, srcdoc or javascript: URL {what}" for line, what in parser.bad]

    problems += [f"script-src hash {h} is used by no page (stale)" for h in sorted(allowed - used)]

    for p in problems:
        print(f"FAIL {p}")
    print(f"\n{len(pages)} pages, {len(used)} inline script hash(es), {len(problems)} problem(s)")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
