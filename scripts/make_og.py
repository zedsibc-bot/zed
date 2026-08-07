"""Generate app/opengraph-image.png (1200x630) for the site's social card."""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parent.parent / "app" / "opengraph-image.png"
W, H = 1200, 630
BG = "#FFFFFF"
GOLD = "#FFD000"
GOLD_DEEP = "#E6A800"
INK = "#1A1A1A"
MUTED = "#6B6B6B"

FONTS = [
    ("bold", r"C:\Windows\Fonts\segoeuib.ttf"),
    ("semibold", r"C:\Windows\Fonts\segoeui.ttf"),
    ("regular", r"C:\Windows\Fonts\segoeui.ttf"),
    ("fallback-bold", r"C:\Windows\Fonts\arialbd.ttf"),
    ("fallback-regular", r"C:\Windows\Fonts\arial.ttf"),
]


def load(size, bold=False):
    for name in ("bold" if bold else "semibold", "regular"):
        p = dict(FONTS)[name]
        try:
            return ImageFont.truetype(p, size)
        except OSError:
            pass
    return ImageFont.truetype(r"C:\Windows\Fonts\arial.ttf", size)


img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)

d.rectangle([0, 0, 14, H], fill=GOLD)
d.rectangle([0, H - 16, W, H], fill=GOLD_DEEP)

d.text((80, 210), "ZED'S TOOLS DEPOT", font=load(84, bold=True), fill=INK)
d.text(
    (80, 330),
    "HARDWARE TOOLS & EQUIPMENT TRADING",
    font=load(34, bold=False),
    fill=GOLD_DEEP,
)
d.text(
    (80, 420),
    "AUTHORIZED IMPORTER AND SUPPLIER OF CONSTRUCTION",
    font=load(24),
    fill=MUTED,
)
d.text(
    (80, 460),
    "AND INDUSTRIAL SUPPLIES SINCE 2020.",
    font=load(24),
    fill=MUTED,
)
d.text((80, 530), "QUEZON CITY, PHILIPPINES", font=load(20, bold=True), fill=GOLD_DEEP)

img.save(OUT, format="PNG")
print(f"wrote {OUT} ({img.size[0]}x{img.size[1]})")