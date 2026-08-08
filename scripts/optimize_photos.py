"""
Re-encode the site's photos (currently raw PNGs extracted from the company
profile PDF) into compact WebP assets.

Input :  public/assets/pdf/*.png   (PDF-extracted photos, ~700KB-1.9MB each)
Output:  public/assets/img/<name>.webp

The sources are only ~600-1000px wide (that's all the PDF contained), so this
script never resizes or upscales - it re-encodes lossy WebP at quality 82,
which is visually indistinguishable while typically 85-90% smaller. This keeps
the images as sharp as the source allows (HD-sharp for the gallery cells and
hero at 2x DPR) without paying PNG byte costs.

Run:  python scripts/optimize_photos.py
"""

import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC_DIR = ROOT / "public" / "assets" / "pdf"
OUT_DIR = ROOT / "public" / "assets" / "img"

QUALITY = 82


def main() -> int:
    if not SRC_DIR.exists() or not any(SRC_DIR.glob("*.png")):
        print(f"No PNGs found in {SRC_DIR}.")
        return 1

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    total_src = 0
    total_out = 0

    for src in sorted(SRC_DIR.glob("*.png")):
        img = Image.open(src).convert("RGB")
        out = OUT_DIR / f"{src.stem}.webp"
        img.save(out, "WEBP", quality=QUALITY, method=6)
        src_kb = src.stat().st_size / 1024
        out_kb = out.stat().st_size / 1024
        total_src += src_kb
        total_out += out_kb
        print(
            f"  {src.name}: {img.width}x{img.height} "
            f"{src_kb:.0f}KB -> {out_kb:.0f}KB "
            f"({100 * (1 - out_kb / src_kb):.0f}% smaller)"
        )

    print(
        f"\nTotal: {total_src:.0f}KB -> {total_out:.0f}KB "
        f"({100 * (1 - total_out / total_src):.0f}% smaller)"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
