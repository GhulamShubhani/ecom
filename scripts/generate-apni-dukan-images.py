#!/usr/bin/env python3
"""Generate branded placeholder images for Apni Dukan using Pillow."""

from __future__ import annotations

import math
import random
import shutil
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1] / "frontend" / "public" / "images"

# Brand palette
OATMILK = (250, 246, 240)
SAND = (245, 239, 230)
BURGUNDY = (74, 21, 37)
CLAY = (214, 160, 144)
CHAMPAGNE = (211, 179, 143)
NIGHT = (18, 10, 12)


def lerp(a: int, b: int, t: float) -> int:
    return int(a + (b - a) * t)


def gradient(size: tuple[int, int], c1: tuple[int, int, int], c2: tuple[int, int, int], angle: float = 0) -> Image.Image:
    w, h = size
    img = Image.new("RGB", size)
    px = img.load()
    rad = math.radians(angle)
    cos_a, sin_a = math.cos(rad), math.sin(rad)
    for y in range(h):
        for x in range(w):
            t = (x * cos_a + y * sin_a) / (w * abs(cos_a) + h * abs(sin_a) + 1)
            t = max(0, min(1, t))
            px[x, y] = (lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t))
    return img


def add_bokeh(base: Image.Image, count: int = 12) -> Image.Image:
    overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    w, h = base.size
    random.seed(42)
    for _ in range(count):
        r = random.randint(max(w, h) // 8, max(w, h) // 4)
        x = random.randint(-r, w)
        y = random.randint(-r, h)
        alpha = random.randint(18, 45)
        color = random.choice([CLAY, CHAMPAGNE, OATMILK])
        draw.ellipse((x - r, y - r, x + r, y + r), fill=(*color, alpha))
    overlay = overlay.filter(ImageFilter.GaussianBlur(radius=28))
    return Image.alpha_composite(base.convert("RGBA"), overlay).convert("RGB")


def add_label(img: Image.Image, title: str, subtitle: str = "") -> Image.Image:
    draw = ImageDraw.Draw(img)
    w, h = img.size
    try:
        font_lg = ImageFont.truetype("arial.ttf", max(28, w // 28))
        font_sm = ImageFont.truetype("arial.ttf", max(16, w // 48))
    except OSError:
        font_lg = ImageFont.load_default()
        font_sm = ImageFont.load_default()

    draw.text((w * 0.08, h * 0.72), title, fill=OATMILK, font=font_lg)
    if subtitle:
        draw.text((w * 0.08, h * 0.72 + max(36, h // 18)), subtitle, fill=(*CLAY, 255), font=font_sm)
    return img


def save(path: str, img: Image.Image, quality: int = 88) -> None:
    dest = ROOT / path
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "JPEG", quality=quality, optimize=True)
    print(f"  OK {path}")


def hero_banner() -> Image.Image:
    img = gradient((1920, 1080), NIGHT, BURGUNDY, angle=35)
    return add_bokeh(img, 18)


def editorial_pair(c1, c2, label: str) -> Image.Image:
    img = gradient((1200, 1500), c1, c2, angle=120)
    img = add_bokeh(img, 10)
    return add_label(img, label, "Apni Dukan")


def main() -> None:
    if ROOT.exists():
        shutil.rmtree(ROOT)
    ROOT.mkdir(parents=True)

    print("Generating Apni Dukan images with Pillow…")

    save("banners/hero-main.jpg", add_label(hero_banner(), "Apni Dukan", "Your style, your shop"))
    save("banners/promo-split.jpg", gradient((1400, 900), BURGUNDY, CLAY, 90))
    save("banners/banner-overlay.jpg", gradient((1920, 1080), NIGHT, (40, 15, 22), 0))

    save("editorial/for-her.jpg", editorial_pair(BURGUNDY, CLAY, "For Her"))
    save("editorial/for-him.jpg", editorial_pair(NIGHT, CHAMPAGNE, "For Him"))
    save("editorial/for-couples.jpg", editorial_pair((90, 30, 45), CLAY, "Dresses"))
    save("editorial/essentials.jpg", editorial_pair(SAND, CHAMPAGNE, "Essentials"))

    save("pages/about-hero.jpg", add_label(gradient((1600, 900), NIGHT, BURGUNDY, 25), "Our Story", "Fashion for every occasion"))
    save("pages/contact-hero.jpg", add_label(gradient((1600, 900), BURGUNDY, CLAY, 160), "Contact Us", "We are here to help"))

    fallback = gradient((900, 900), SAND, OATMILK, 45)
    save("products/product-fallback.jpg", fallback)

    print(f"\nDone — 10 images in {ROOT}")


if __name__ == "__main__":
    main()
