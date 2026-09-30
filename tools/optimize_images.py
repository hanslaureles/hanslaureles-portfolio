#!/usr/bin/env python3
"""
optimize_images.py - Responsive AVIF/WebP pipeline for the portfolio (stdlib + ffmpeg, no pip installs).

For every source image it writes content-hashed, responsive variants into images/:
  images/<project-slug>/<name-slug>-<width>.<hash8>.avif   (opaque images only; 4:4:4 keeps UI text crisp)
  images/<project-slug>/<name-slug>-<width>.<hash8>.webp   (always; keeps alpha when the source has it)
  images/og/<name-slug>.<hash8>.jpg                        (optional 1200px JPEG for og:image / twitter:image)

Hashed filenames make the `Cache-Control: immutable` header on /images/* in vercel.json safe: a changed
image always gets a new URL. Each variant's quality is measured with SSIM against the source scaled to
the same size, and everything is recorded in tools/image-manifest.json.

Master (full-resolution) originals are NOT kept in this repo; they live in C:\\AI-Workspace\\archive\\images\\
with their original folder structure, so paths in the manifest ("images/Laureles_.../x.png") resolve under
--src C:\\AI-Workspace\\archive.

Usage:
  python tools/optimize_images.py --src C:\\AI-Workspace\\archive --only "images/<folder>/<file>.png" [...]
                                  [--og "images/<folder>/<file>.png" ...]
Then reference the variants listed in tools/image-manifest.json from a <picture> element.
Requires ffmpeg/ffprobe (with libwebp and libaom-av1) on PATH.
"""

import argparse
import hashlib
import json
import re
import shutil
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

SITE_ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = SITE_ROOT / "images"
MANIFEST = Path(__file__).resolve().parent / "image-manifest.json"

WIDTHS = [480, 960, 1600, 2400]      # 2400 covers the 1240px case banner at 2x DPR
WEBP_QUALITY = 82
AVIF_CRF = 28
OG_WIDTH = 1200
OG_BACKGROUND = "0xF7F5F0"           # --bg (light "bone paper") for flattening transparent mockups

ALPHA_FORMATS = {"rgba", "ya8", "ya16be", "ya16le", "rgba64be", "rgba64le", "pal8", "yuva420p", "gbrap"}


def run(cmd: list[str]) -> str:
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        raise RuntimeError(f"{' '.join(cmd[:3])}... failed:\n{res.stderr[-800:]}")
    return res.stdout + res.stderr


def probe(path: Path) -> tuple[int, int, str]:
    out = run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
               "stream=width,height,pix_fmt", "-of", "json", str(path)])
    s = json.loads(out[out.index("{"):])["streams"][0]
    return int(s["width"]), int(s["height"]), s.get("pix_fmt", "")


def has_real_alpha(path: Path, pix_fmt: str) -> bool:
    """An alpha channel counts only if some pixel is actually transparent (many PNGs carry a solid one)."""
    if pix_fmt not in ALPHA_FORMATS:
        return False
    out = run(["ffmpeg", "-v", "error", "-i", str(path), "-vf",
               "format=rgba,alphaextract,signalstats,metadata=print:key=lavfi.signalstats.YMIN",
               "-f", "null", "-"])
    mins = [int(float(v)) for v in re.findall(r"YMIN=([\d.]+)", out)]
    return bool(mins) and min(mins) < 255


def slugify(text: str) -> str:
    text = re.sub(r"^Laureles_", "", text)
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def short_hash(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()[:8]


def ssim(original: Path, variant: Path, width: int, height: int) -> float:
    """SSIM of the decoded variant against the original scaled to the same size (1.0 = identical)."""
    out = run(["ffmpeg", "-v", "info", "-i", str(original), "-i", str(variant), "-lavfi",
               f"[0:v]scale={width}:{height}:flags=lanczos,format=rgb24[a];[1:v]format=rgb24[b];[a][b]ssim",
               "-f", "null", "-"])
    m = re.search(r"All:([\d.]+)", out)
    return round(float(m.group(1)), 4) if m else 0.0


def encode_variant(src: Path, dest_stem: Path, width: int, fmt: str, alpha: bool) -> dict:
    tmp = dest_stem.with_name(dest_stem.name + f".tmp.{fmt}")
    scale = f"scale={width}:-2:flags=lanczos"
    if fmt == "webp":
        cmd = ["ffmpeg", "-y", "-v", "error", "-i", str(src), "-vf",
               f"{scale},format={'yuva420p' if alpha else 'yuv420p'}",
               "-c:v", "libwebp", "-quality", str(WEBP_QUALITY), "-compression_level", "6", str(tmp)]
    else:
        cmd = ["ffmpeg", "-y", "-v", "error", "-i", str(src), "-vf", f"{scale},format=yuv444p",
               "-c:v", "libaom-av1", "-still-picture", "1", "-crf", str(AVIF_CRF), "-b:v", "0",
               "-cpu-used", "6", "-row-mt", "1", "-f", "avif", str(tmp)]
    run(cmd)
    w, h, _ = probe(tmp)
    final = dest_stem.with_name(f"{dest_stem.name}-{w}.{short_hash(tmp)}.{fmt}")
    tmp.replace(final)
    return {"width": w, "height": h, "path": final.relative_to(SITE_ROOT).as_posix(),
            "bytes": final.stat().st_size, "ssim": ssim(src, final, w, h)}


def encode_og(src: Path, slug: str, width: int, height: int) -> dict:
    og_dir = OUT_DIR / "og"
    og_dir.mkdir(parents=True, exist_ok=True)
    out_h = round(height * OG_WIDTH / width / 2) * 2
    tmp = og_dir / f"{slug}.tmp.jpg"
    run(["ffmpeg", "-y", "-v", "error", "-i", str(src), "-filter_complex",
         f"color=c={OG_BACKGROUND}:s={OG_WIDTH}x{out_h}[bg];[0:v]scale={OG_WIDTH}:{out_h}:flags=lanczos[fg];"
         f"[bg][fg]overlay=shortest=1,format=yuvj420p",
         "-frames:v", "1", "-q:v", "3", str(tmp)])
    final = og_dir / f"{slug}.{short_hash(tmp)}.jpg"
    tmp.replace(final)
    return {"width": OG_WIDTH, "height": out_h, "path": final.relative_to(SITE_ROOT).as_posix(),
            "bytes": final.stat().st_size}


def process(src_root: Path, rel: str, want_og: bool) -> tuple[str, dict]:
    src = src_root / rel
    width, height, pix_fmt = probe(src)
    alpha = has_real_alpha(src, pix_fmt)
    rel_parts = Path(rel).parts
    project = slugify(rel_parts[1]) if len(rel_parts) > 2 else ""
    name = slugify(Path(rel).stem)
    dest_dir = OUT_DIR / project if project else OUT_DIR
    dest_dir.mkdir(parents=True, exist_ok=True)

    targets = [w for w in WIDTHS if w < width] + [min(width, WIDTHS[-1])]
    formats = ["webp"] if alpha else ["avif", "webp"]
    entry = {"source_bytes": src.stat().st_size, "width": width, "height": height,
             "alpha": alpha, "variants": {f: [] for f in formats}}
    for fmt in formats:
        for w in sorted(set(targets)):
            entry["variants"][fmt].append(encode_variant(src, dest_dir / name, w, fmt, alpha))
    if want_og:
        entry["og"] = encode_og(src, f"{project}-{name}".strip("-"), width, height)
    return rel, entry


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--src", required=True, type=Path, help="Directory that contains images/<...> originals")
    ap.add_argument("--only", nargs="+", required=True, help="Relative paths (images/...) to process")
    ap.add_argument("--og", nargs="*", default=[], help="Subset of --only that also needs an og:image JPEG")
    ap.add_argument("--jobs", type=int, default=4)
    args = ap.parse_args()

    for tool in ("ffmpeg", "ffprobe"):
        if not shutil.which(tool):
            print(f"error: {tool} not found on PATH", file=sys.stderr)
            return 2

    manifest = json.loads(MANIFEST.read_text(encoding="utf-8")) if MANIFEST.exists() else {}
    og_set = set(args.og)
    with ThreadPoolExecutor(max_workers=args.jobs) as pool:
        for rel, entry in pool.map(lambda r: process(args.src, r, r in og_set), args.only):
            manifest[rel] = entry
            best = max(v["bytes"] for vs in entry["variants"].values() for v in vs)
            worst_ssim = min(v["ssim"] for vs in entry["variants"].values() for v in vs)
            print(f"{entry['source_bytes'] / 1024:>8.0f} KB -> largest variant {best / 1024:>6.0f} KB  "
                  f"min SSIM {worst_ssim:.4f}  alpha={entry['alpha']!s:<5} {rel}", flush=True)

    MANIFEST.write_text(json.dumps(manifest, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    print(f"manifest: {MANIFEST.relative_to(SITE_ROOT)} ({len(manifest)} images)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
