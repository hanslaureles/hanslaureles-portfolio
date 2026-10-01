"""
Claims check for every page and script: fails on claim shapes that were removed
because no code or measurement backs them (MEM-010, Phase 3A). Add a pattern
whenever a claim is retracted, so it can't drift back in with new copy.

Usage: python tools/check_claims.py      exit 1 if any match
Stdlib only; scans *.html, aura-store/*.html and *.js.
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

RETRACTED = [
    (r"\$0\.00|\$0/mo|zero[- ]cost|zero (cloud|recurring|unexpected)|low[- ]cost|free[- ]tier",
     "unbacked cost claim (no dated billing record)"),
    (r"Groq[^.\n<]{0,40}(→|->|&gt;)\s*Gemini|falling back to Gemini on errors|with Gemini (3\.6 Flash )?(as )?(a )?fallback",
     "Groq-first routing for every agent (Yunjin runs Gemini first)"),
    (r"\b14B\s+(param|model)|7B and 14B", "no 14B model runs locally"),
    (r"0\.015s|\b\d+ (Unit )?Tests\b", "hardcoded test count (goes stale; point at CI instead)"),
    (r"ZERO LATENCY|100% vector|2\.5–5s", "absolute or uncited performance claim"),
    (r"~?350\s?MB\+|800\s?ms\+", "unmeasured vector-DB figures"),
    (r"State: nominal|100% nominal|5/5 Agents Nominal", "status nobody checked"),
]


def main():
    files = sorted([*ROOT.glob("*.html"), *ROOT.glob("aura-store/*.html"), *ROOT.glob("*.js"),
                    *ROOT.glob("aura-store/*.js")])
    hits = 0
    for path in files:
        for n, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
            for pattern, why in RETRACTED:
                if re.search(pattern, line, re.IGNORECASE):
                    hits += 1
                    print(f"FAIL {path.relative_to(ROOT).as_posix()}:{n}: {why}\n     {line.strip()[:140]}")
    print(f"\n{len(files)} files scanned, {hits} retracted claim(s) found")
    return 1 if hits else 0


if __name__ == "__main__":
    sys.exit(main())
