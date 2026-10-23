"""
Shared-asset include check for every page: no local script or stylesheet is
included twice (two copies of app.js attach every handler twice, so toggles
flip and flip back), and every local .js/.css include carries a ?v= cache-buster
so a deploy can't serve a stale copy.

Usage: python tools/check_assets.py      exit 1 if any page fails
Stdlib only; parses *.html and aura-store/*.html.
"""

import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


class Includes(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs = []  # (url, line)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "script" and a.get("src"):
            self.refs.append((a["src"], self.getpos()[0]))
        elif tag == "link" and a.get("rel") == "stylesheet" and a.get("href"):
            self.refs.append((a["href"], self.getpos()[0]))


def check(path):
    parser = Includes()
    parser.feed(path.read_text(encoding="utf-8"))
    problems, seen = [], {}
    for url, line in parser.refs:
        if "://" in url or url.startswith("//"):
            continue  # third-party; not ours to version
        base, _, query = url.partition("?")
        if base in seen:
            problems.append(f"line {line}: {base} already included at line {seen[base]}")
        else:
            seen[base] = line
        if not query.startswith("v="):
            problems.append(f"line {line}: {url} has no ?v= cache-buster")
    return len(parser.refs), problems


def main():
    pages = sorted([*ROOT.glob("*.html"), *ROOT.glob("aura-store/*.html")])
    failed = 0
    for page in pages:
        count, problems = check(page)
        rel = page.relative_to(ROOT).as_posix()
        if problems:
            failed += 1
            print(f"FAIL {rel}")
            for p in problems:
                print(f"     {p}")
        else:
            print(f"ok   {rel} ({count} includes)")
    print(f"\n{len(pages) - failed}/{len(pages)} pages pass")
    return 1 if failed or not pages else 0


if __name__ == "__main__":
    sys.exit(main())
