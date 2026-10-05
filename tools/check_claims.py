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
    (r"0\.015s|\b\d+ (Unit |automated )?Tests\b|\b\d+/\d+ (automated )?tests\b",
     "hardcoded test count (goes stale; point at CI instead)"),
    (r"ZERO LATENCY|100% vector|2\.5–5s", "absolute or uncited performance claim"),
    (r"~?350\s?MB\+|800\s?ms\+", "unmeasured vector-DB figures"),
    (r"State: nominal|100% nominal|5/5 Agents Nominal", "status nobody checked"),
    (r"first for every seeded|Top-1 Recall on Test Queries",
     "seeded-query recall claim (replaced by the held-out eval, 3C)"),
    (r"\+42%|-55%|94% (task|usability|completion)|4\.8/5|-65%|sub-3\.2 ?s|3\.2 ?s (logging|input|average)|"
     r"12 ?s benchmark|85 ?ms|60 FPS|100% Lighthouse|400 ms FCP|1\.0 ?s LCP",
     "unsourced design case-study outcome (3E-9; restore only with N, date and method)"),
    (r"WCAG AAA|zero[- ]latency|engagement by over|sub-second FCP|Full WCAG",
     "uncited compliance or performance claim (3E round 1; CI checks WCAG 2.1 AA only)"),
    (r"SAMPLE GAUGES|\d+(\.\d+)?% load|\d+(\.\d+)? GB of \d+(\.\d+)? GB|\d+(\.\d+)? GB free space|"
     r"\d+°C \(Feels|\d+ km/h [NSEW]{1,3}\b|within normal range|NVMe Gen4|12 ?ms average",
     "invented sample telemetry or status (4A; show what the tool reads, or a cited measurement)"),
    (r"\d+-bit Encrypt|Connecting to [^<`]{0,40}Gateway|Paid Online|TOTAL PAID",
     "payment or security claim on the Aura demo (it processes no payment; Codex 4A FIX)"),
    (r"\b(c1e190a|8f4a21d|c71e08a|9f3a21c|5d89b12|4b129aa|9fb2617)\b",
     "invented commit hash on the career timeline (Batch 5; exists in no repo)"),
    (r"\d\.\d ?/ ?5 Star|\d[\d,.]*k?\+? (coffee lovers|reviews)|rating: '\d",
     "invented Aura rating or review count (Batch 5; the demo store has no customers)"),
    (r"user interviews with|user testing sessions with|interviews? with (university|students)",
     "user research that was not run (Batch 5: Vellum and FinTrack are assumption-led)"),
    (r"B2B (SaaS|Engineering|Dashboard)|sprint velocit|burnup|Monte Carlo|Zero-Garbage|Offscreen Canvas|"
     r"Time-Series Windowing",
     "Lumina/FinTrack feature not in the live build or prototype (Batch 5)"),
    (r"Target compensation|Groq LPU routing",
     "Ciel demo content that Preferences.md does not contain (Batch 5)"),
    (r"abandon budgeting apps within|severe drop-off|doesn.t hurt retention|sub-3-second|Mood Vector|"
     r"Eliminating budget abandonment|Inter and Fira Code",
     "unmeasured behaviour or outcome on a prototype, or a font the build does not load (Batch 5, Codex round 1)"),
    (r"\b0\.8 ?ms\b|2,000 calls|RUN LOCALLY|running 5 specialized AI agents locally",
     "superseded memory figure (cite the 0.81 ms 2026-10-02 eval) or agents claimed to run models locally (cloud is default)"),
    (r"Auto Layout 5\.0|Enterprise Safety|Executive Interface Craft|Clutter Purging",
     "audit plain-language withdrawal (no such Figma version; personal project; never deletes mail)"),
    (r"eliminate (personal )?budget abandonment|combat notification fatigue|authentic developer-native|"
     r"Algorithmic Financial Intelligence",
     "unmeasured outcome or puffery in an Ask Sakura answer (Codex plain-language NOTE)"),
    (r"React,? (&amp; |& |and )?Next\.?js|Next\.js, TypeScript",
     "Next.js claimed as a skill (Hans, 2026-10-05: no real Next.js work to show)"),
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
