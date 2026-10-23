"""
Metric cards (Phase 5E-3): one tick per recorded run, drawn as static inline SVG
from data/bench/*.json (values copied from lsfm-ai-hq at a pinned commit).

  python tools/build_metric_cards.py                 write each card into its page
  python tools/build_metric_cards.py --check         exit 1 if a page's card differs from its
                                                     data, or the page's prose disagrees with it
  python tools/build_metric_cards.py --verify-source <lsfm-ai-hq checkout>
                                                     exit 1 if a data file differs from its source
  python tools/build_metric_cards.py --self-test     the maths and the drift checks

Ticks, not lines: each one is a separate run, and a line would suggest a trend over
time that these runs are not. Percentiles are nearest-rank, as in the benchmark
(bench/bench_ciel.py), so a card always shows the published p50 / p95.
Stdlib only. No JS on the page; CSP unchanged.
"""

import html
import json
import math
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data" / "bench"
WIDTH = 1000  # SVG user units; the strip stretches to its column (preserveAspectRatio="none")


def percentile(samples, pct):
    """Nearest-rank, as bench/bench_ciel.py: with fewer than 20 samples p95 is the max."""
    ordered = sorted(samples)
    return ordered[max(1, math.ceil(pct / 100 * len(ordered))) - 1]


def fmt(ms, unit):
    """A stat as the case studies print it: 4.60 s, 736 ms, 6,177 ms."""
    return f"{ms / 1000:.2f} s" if unit == "s" else f"{ms:,.0f} ms"


def fmt_axis(ms, unit):
    if ms == 0:
        return f"0 {unit}"  # the axis starts in the card's own unit
    return f"{ms:g} ms" if ms < 1000 else f"{ms / 1000:g} s"


def x_of(ms, axis):
    lo, hi = axis["min"], axis["max"]
    if axis["scale"] == "log":
        t = (math.log(ms) - math.log(lo)) / (math.log(hi) - math.log(lo))
    else:
        t = (ms - lo) / (hi - lo)
    if not 0 <= t <= 1:
        raise ValueError(f"{ms} ms is outside the axis {lo}-{hi}")
    return round(t * WIDTH, 1)


def stat(card, name, rows):
    samples = [s for r in card["rows"] for s in r["samples_ms"]] if rows == "all" else card["rows"][rows]["samples_ms"]
    return percentile(samples, int(name[1:]))


def headline_values(card):
    return [fmt(stat(card, name, rows), card["unit"]) for name, rows in card["headline_stats"]]


def render(card):
    unit, axis, cid = card["unit"], card["axis"], card["id"]
    counts = [len(r["samples_ms"]) for r in card["rows"]]
    meta = card["meta"].format(n_each=counts[0] if len(set(counts)) == 1 else "/".join(map(str, counts)),
                               n_total=sum(counts), date=card["date"])
    out = [f'<figure class="metric-card" data-metric="{cid}" aria-labelledby="mc-{cid}">',
           f'  <figcaption id="mc-{cid}"><span class="metric-card-title">{html.escape(card["title"])}</span>'
           f'<span class="metric-card-value">{html.escape(card["headline"].format(*headline_values(card)))}</span>'
           f'<span class="metric-card-meta">{html.escape(meta)}</span></figcaption>']
    for row in card["rows"]:
        s = row["samples_ms"]
        p50 = percentile(s, 50)
        label = f"{len(s)} runs: {fmt(min(s), unit)} to {fmt(max(s), unit)}, p50 {fmt(p50, unit)}"
        ticks = "".join(f'<line class="mc-run" x1="{x}" x2="{x}" y1="4" y2="16"/>'
                        for x in (x_of(v, axis) for v in s))
        x50 = x_of(p50, axis)
        out.append(f'  <div class="mc-row"><span class="mc-label">{html.escape(row["label"])}</span>'
                   f'<svg class="mc-strip" viewBox="0 0 {WIDTH} 20" preserveAspectRatio="none" role="img" '
                   f'aria-label="{html.escape(label)}">{ticks}'
                   f'<line class="mc-p50" x1="{x50}" x2="{x50}" y1="0" y2="20"/></svg>'
                   f'<span class="mc-stat">{fmt(p50, unit)}</span></div>')
    scale = "log scale" if axis["scale"] == "log" else "linear scale"
    out.append(f'  <div class="mc-axis" aria-hidden="true"><span>{fmt_axis(axis["min"], unit)}</span>'
               f'<span>{scale}</span><span>{fmt_axis(axis["max"], unit)}</span></div>')
    files = list(dict.fromkeys(r["source"] for r in card["rows"]))
    links = " · ".join(f'<a href="https://github.com/{card["source_repo"]}/blob/{card["source_commit"]}/{f}" '
                       f'target="_blank" rel="noopener noreferrer">{html.escape(f.rsplit("/", 1)[-1])}</a>'
                       for f in files)
    out.append(f'  <p class="metric-card-source">Each tick is one recorded run; the tall tick is the p50. Source: {links}</p>')
    out.append("</figure>")
    return "\n".join(out)


def block_re(cid):
    return re.compile(rf"(<!-- metric:{re.escape(cid)} -->)(.*?)(<!-- /metric -->)", re.S)


def cards():
    return [json.loads(p.read_text(encoding="utf-8")) for p in sorted(DATA.glob("*.json"))]


def prose_problems(card, page_text):
    """The sentence the card sits in (its enclosing <dd>, card removed) must state the same
    headline figures. Not the whole page: a figure repeated elsewhere would hide a stale line."""
    m = block_re(card["id"]).search(page_text)
    if not m:
        return []
    start, end = page_text.rfind("<dd>", 0, m.start()), page_text.find("</dd>", m.end())
    if start < 0 or end < 0:
        return [f"{card['page']}: card {card['id']} is not inside a <dd>"]
    around = (page_text[start:m.start()] + page_text[m.end():end]).replace("&nbsp;", " ")
    return [f"{card['page']}: the sentence around card {card['id']} does not state {v!r} (the data gives it)"
            for v in headline_values(card) if v not in around]


def build(write):
    problems = []
    for card in cards():
        page = ROOT / card["page"]
        text = page.read_bytes().decode("utf-8")
        m = block_re(card["id"]).search(text)
        if not m:
            problems.append(f"{card['page']}: no <!-- metric:{card['id']} --> marker")
            continue
        nl = "\r\n" if "\r\n" in text else "\n"
        want = nl + render(card).replace("\n", nl) + nl
        if m.group(2) != want:
            if write:
                text = text[:m.start(2)] + want + text[m.end(2):]
                page.write_bytes(text.encode("utf-8"))
                print(f"wrote {card['id']} -> {card['page']}")
            else:
                problems.append(f"{card['page']}: card {card['id']} differs from data/bench/{card['id']}.json "
                                f"(run python tools/build_metric_cards.py)")
        problems += prose_problems(card, text)
    return problems


def verify_source(checkout):
    problems = []
    for card in cards():
        for row in card["rows"]:
            raw = subprocess.run(["git", "-C", checkout, "show", f"{card['source_commit']}:{row['source']}"],
                                 capture_output=True, text=True, encoding="utf-8")
            if raw.returncode:
                problems.append(f"{card['id']}: cannot read {row['source']} at {card['source_commit'][:7]}")
                continue
            node = json.loads(raw.stdout)
            for k in row["key"]:
                node = node[k]
            if "field" in row:
                node = [c[row["field"]] for c in node if c.get("ok")]
            if node != row["samples_ms"]:
                problems.append(f"{card['id']} / {row['label']}: values differ from {row['source']}")
    return problems


def self_test():
    # Nearest-rank, as the benchmark: p50 of 10 is the 5th smallest, of 50 the 25th.
    assert percentile([5, 1, 4, 2, 3, 6, 7, 8, 9, 10], 50) == 5
    assert percentile(list(range(1, 51)), 50) == 25 and percentile(list(range(1, 51)), 95) == 48
    assert percentile(list(range(1, 11)), 95) == 10  # < 20 samples: p95 is the max
    assert fmt(1407.6, "s") == "1.41 s" and fmt(736.3, "ms") == "736 ms" and fmt(6177.1, "ms") == "6,177 ms"
    assert fmt_axis(250, "ms") == "250 ms" and fmt_axis(8000, "ms") == "8 s"
    assert fmt_axis(0, "s") == "0 s" and fmt_axis(0, "ms") == "0 ms"
    lin, log = {"scale": "linear", "min": 0, "max": 6000}, {"scale": "log", "min": 250, "max": 8000}
    assert (x_of(0, lin), x_of(3000, lin), x_of(6000, lin)) == (0.0, 500.0, 1000.0)
    assert (x_of(250, log), x_of(8000, log)) == (0.0, 1000.0) and x_of(math.sqrt(250 * 8000), log) == 500.0
    try:
        x_of(9000, lin)
        raise AssertionError("a run outside the axis must fail")
    except ValueError:
        pass
    card = {"id": "t", "page": "p.html", "title": "T", "date": "2026-01-01", "unit": "ms",
            "axis": lin, "headline": "{0} p50", "headline_stats": [["p50", "all"]], "meta": "N = {n_total}",
            "source_repo": "o/r", "source_commit": "c" * 40,
            "rows": [{"label": "A", "source": "x.json", "key": [], "samples_ms": [100, 200, 300]}]}
    svg = render(card)
    assert svg.count('class="mc-run"') == 3 and 'aria-label="3 runs: 100 ms to 300 ms, p50 200 ms"' in svg
    wrap = lambda prose, rest="": f"<dd>{prose}<!-- metric:t -->{svg}<!-- /metric --></dd>{rest}"
    assert prose_problems(card, wrap("p50 was 200&nbsp;ms")) == []
    assert prose_problems(card, wrap("p50 was 210 ms"))  # prose that disagrees is caught
    assert prose_problems(card, wrap("p50 was 210 ms", "<p>200 ms</p>"))  # even if the page says it elsewhere
    page = f"<!-- metric:t -->\n{svg}\n<!-- /metric -->"
    assert block_re("t").search(page).group(2) == f"\n{svg}\n"  # unchanged page passes
    tampered = page.replace('class="mc-run" x1="', 'class="mc-run" x1="9', 1)  # move one tick
    assert tampered != page and block_re("t").search(tampered).group(2) != f"\n{svg}\n"
    print("self-test ok")
    return 0


def main(argv):
    if argv[1:2] == ["--self-test"]:
        return self_test()
    if argv[1:2] == ["--verify-source"] and len(argv) == 3:
        problems = verify_source(argv[2])
    elif argv[1:] in ([], ["--check"]):
        problems = build(write=not argv[1:])
    else:
        print(__doc__)
        return 2
    for p in problems:
        print(f"FAIL {p}")
    print(f"{len(cards())} card(s), {len(problems)} problem(s)")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
