"""
Self-test for check_csp.py (Codex 5A A3): pages and policies the guard must reject,
built in a temp copy of the site, plus two that must still pass.

Usage: python tools/test_check_csp.py      exit 1 if any case is missed
Stdlib only.
"""

import contextlib
import io
import shutil
import sys
import tempfile
from pathlib import Path

import check_csp

REPO = Path(__file__).resolve().parent.parent
HASHED = "script-src 'self' 'sha256-CityW3eaBWHgazqMiMn47dd6tTGQlMKpYOtT2YnhMMw=';"


def fixture(extra_html="", policy=lambda p: p, aura_only=False):
    tmp = Path(tempfile.mkdtemp())
    (tmp / "aura-store").mkdir()
    for f in ["vercel.json", "netlify.toml"]:
        (tmp / f).write_text(policy((REPO / f).read_text(encoding="utf-8")), encoding="utf-8")
    for p in [*REPO.glob("aura-store/*.html"), *([] if aura_only else REPO.glob("*.html"))]:
        shutil.copy(p, tmp / p.relative_to(REPO))
    page = tmp / "aura-store/index.html"
    page.write_text(page.read_text(encoding="utf-8").replace("</body>", extra_html + "</body>"), encoding="utf-8")
    return tmp


CASES = [  # (name, root, expected exit code)
    ("ld+json in another attribute", lambda: fixture('<script type="text/javascript" data-note="application/ld+json">alert(1)</script>'), 1),
    ("data-src hides an inline script", lambda: fixture('<script data-src="x.js">alert(1)</script>'), 1),
    ("iframe srcdoc", lambda: fixture('<iframe srcdoc="&lt;script&gt;alert(1)&lt;/script&gt;"></iframe>'), 1),
    ("no script-src, default-src 'unsafe-inline'", lambda: fixture(policy=lambda p: p.replace(HASHED, "").replace(
        "default-src 'self';", "default-src 'self' 'unsafe-inline';"), aura_only=True), 1),
    ("script-src-attr 'unsafe-inline'", lambda: fixture(policy=lambda p: p.replace(HASHED, HASHED + " script-src-attr 'unsafe-inline';")), 1),
    ("a real JSON-LD block", lambda: fixture('<script type="application/ld+json">{"@type": "Store"}</script>'), 0),
    ("the site as committed", lambda: fixture(), 0),
]


def main():
    missed = 0
    for name, make, want in CASES:
        check_csp.ROOT = make()
        with contextlib.redirect_stdout(io.StringIO()):
            got = check_csp.main()
        shutil.rmtree(check_csp.ROOT, ignore_errors=True)
        missed += got != want
        print(f"{'ok  ' if got == want else 'MISS'} {name}: exit {got} (want {want})")
    print(f"\n{len(CASES) - missed}/{len(CASES)} cases")
    return 1 if missed else 0


if __name__ == "__main__":
    sys.exit(main())
