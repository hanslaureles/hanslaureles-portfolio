"""
Heading-outline check for every page (WCAG 1.3.1 / 2.4.6): exactly one <h1>, and
no level skipped on the way down (an h2 followed by an h4 is a jump). Visual size
is set by classes (.type-h2, .type-h3), so markup levels can stay strict.

Usage: python tools/check_headings.py      exit 1 if any page fails
Stdlib only; parses *.html and aura-store/*.html, ignoring script/style/template.
"""

import sys
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKIP = {"script", "style", "template"}


class Outline(HTMLParser):
    def __init__(self):
        super().__init__()
        self.levels = []  # (level, line)
        self.skip_depth = 0

    def handle_starttag(self, tag, attrs):
        if tag in SKIP:
            self.skip_depth += 1
        elif not self.skip_depth and len(tag) == 2 and tag[0] == "h" and tag[1] in "123456":
            self.levels.append((int(tag[1]), self.getpos()[0]))

    def handle_endtag(self, tag):
        if tag in SKIP and self.skip_depth:
            self.skip_depth -= 1


def check(path):
    parser = Outline()
    parser.feed(path.read_text(encoding="utf-8"))
    problems = []
    h1s = sum(1 for level, _ in parser.levels if level == 1)
    if h1s != 1:
        problems.append(f"{h1s} <h1> elements (expected 1)")
    prev = 0
    for level, line in parser.levels:
        if level > prev + 1:
            problems.append(f"line {line}: h{level} follows h{prev or '-'} (skips a level)")
        prev = level
    return len(parser.levels), problems


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
            print(f"ok   {rel} ({count} headings)")
    print(f"\n{len(pages) - failed}/{len(pages)} pages pass")
    return 1 if failed or not pages else 0


if __name__ == "__main__":
    sys.exit(main())
