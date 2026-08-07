"""
Optimize original photos into HD WebP assets for the site.

Input :  public/originals/<slot>.<ext>   (drop your high-res photos here; gitignored)
Output:  public/assets/img/<slot>.<width>w.webp   (gitignored? no - committed, deploy uses these)

Slot -> target max width (kept crisp at 2x DPR on the biggest reasonable
display the slot's container reaches):
  hero-01    -> 2880   (full-viewport background, sizes="100vw")
  why-01     -> 1600   (max-w-xl framed photo)
  gallery-01 -> 1600   (grid cell up to ~33vw; dpr2 covers ~1268px)
  gallery-02 .. gallery-06 -> 1600

Resizes down only (never upscales) and encodes lossy WebP at quality 85,
visually indistinguishable from the original PNG/JPG while ~75-85% smaller.
"""

import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC_DIR = ROOT / "public" / "originals"
OUT_DIR = ROOT / "public" / "assets" / "img"

# desired max widths per slot; any photo taller than wide is kept by height
SLOTS = {
    "hero": 2880,
    "why": 1600,
    "gallery-01": 1600,
    "gallery-02": 1600,
    "gallery-03": 1600,
    "gallery-04": 1600,
    "gallery-05": 1600,
    "gallery-06": 1600,
}

QUALITY = 85
FALLBACK_WIDTH = 1600


def optimize(path: Path, slot: str, max_w: int) -> Path | None:
    img = Image.open(path).convert("RGB")
    w, h = img.size
    if w > max_w:
        nh = round(h * max_w / w)
        img = img.resize((max_w, nh), Image.LANCZOS)
        print(f"  {slot}: {w}x{h} -> {img.width}x{img.height} (downscaled to {max_w})")
    else:
        print(f"  {slot}: {w}x{h} kept (already <= {max_w})")

    out = OUT_DIR / f"{slot}.webp"
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, "WEBP", quality=QUALITY, method=6)
    print(f"  wrote {out} ({out.stat().st_size / 1024:.0f} KB)")
    return out


def main() -> int:
    if not SRC_DIR.exists() or not any(SRC_DIR.iterdir()):
        print(f"No originals found in {SRC_DIR}.")
        print("Drop your hi-res store photos here, named: hero / why / gallery-01 .. gallery-06 (.jpg, .png).")
        return 1

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    produced: list[str] = []
    for slot, max_w in SLOTS.items():
        for ext in ("jpg", "jpeg", "png", "JPG", "JPEG", "PNG", "webp"):
            cand = SRC_DIR / f"{slot}.{ext}"
            if cand.exists():
                out = optimize(cand, slot, max_w)
                if out:
                    produced.append(str(out.relative_to(ROOT / "public")).replace("\\", "/"))
                break
        else:
            print(f"  {slot}: MISSING (optional)")

    if produced:
        print("\nGenerated. Update app/data.ts + components to reference:")
        for p in produced:
            print(f"  /{p}")
    return 0


if __name__ == "__main__":
    sys.exit(main())