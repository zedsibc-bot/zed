"""
Extract text and images from company-profile.pdf into the Next.js public folder.

Outputs:
  scripts/company_data.md     -> per-page text dump (copy source)
  public/assets/pdf/          -> every image found on each page (pg-NN-idx.ext)
  public/assets/thumbs/       -> full-page snapshots for visual reference
  public/assets/manifest.json -> machine-readable asset map for the site build
"""

import json
import sys
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parent.parent
PDF_PATH = ROOT / "public" / "pdf" / "company-profile.pdf"
TEXT_OUT = ROOT / "scripts" / "company_data.md"
IMG_OUT = ROOT / "public" / "assets" / "pdf"
THUMB_OUT = ROOT / "public" / "assets" / "thumbs"
MANIFEST = ROOT / "public" / "assets" / "manifest.json"

IMG_OUT.mkdir(parents=True, exist_ok=True)
THUMB_OUT.mkdir(parents=True, exist_ok=True)


def ext_for(mime: str | None) -> str:
    if not mime:
        return "png"
    if "jpeg" in mime or "jpg" in mime:
        return "jpg"
    if "png" in mime:
        return "png"
    if "gif" in mime:
        return "gif"
    if "bmp" in mime:
        return "bmp"
    return "png"


def clean_text(text: str) -> str:
    lines = [ln.rstrip() for ln in text.splitlines()]
    return "\n".join([ln for ln in lines if ln.strip()])


def main() -> int:
    doc = fitz.open(PDF_PATH)
    text_blocks: list[str] = []
    manifest: dict = {"pages": [], "images": []}
    image_tally = 0

    for page_no, page in enumerate(doc, start=1):
        p_text = page.get_text()
        text_blocks.append(f"===== PAGE {page_no} =====\n\n{clean_text(p_text)}\n")

        thumb = page.get_pixmap(matrix=fitz.Matrix(1.0, 1.0))
        thumb_path = THUMB_OUT / f"pg-{page_no:02d}.png"
        thumb.save(thumb_path)

        page_images = []
        for idx, img in enumerate(page.get_images(full=True), start=1):
            xref = img[0]
            try:
                base = doc.extract_image(xref)
            except Exception as ex:  # noqa: BLE001
                print(f"  [warn] page {page_no} xref {xref}: {ex}")
                continue
            mime = base.get("ext")
            name = f"pg-{page_no:02d}-{idx:02d}.{ext_for(mime)}"
            dest = IMG_OUT / name
            with dest.open("wb") as fh:
                fh.write(base["image"])
            page_images.append(
                {
                    "file": f"/assets/pdf/{name}",
                    "width": base.get("width"),
                    "height": base.get("height"),
                }
            )
            image_tally += 1

        manifest["pages"].append(
            {
                "page": page_no,
                "text_chars": len(p_text.strip()),
                "images": page_images,
                "thumb": f"/assets/thumbs/pg-{page_no:02d}.png",
            }
        )

    doc.close()

    with TEXT_OUT.open("w", encoding="utf-8") as fh:
        fh.write("\n\n".join(text_blocks))

    with MANIFEST.open("w", encoding="utf-8") as fh:
        json.dump(manifest, fh, indent=2)

    print(f"pages: {len(manifest['pages'])}")
    print(f"images extracted: {image_tally}")
    print(f"text  -> {TEXT_OUT}")
    print(f"images-> {IMG_OUT}")
    print(f"thumbs-> {THUMB_OUT}")
    print(f"map   -> {MANIFEST}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
