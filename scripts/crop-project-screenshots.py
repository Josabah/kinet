#!/usr/bin/env python3
"""Crop project screenshots from user originals. Uniform top trim, lossless PNG."""

from __future__ import annotations

import os
from pathlib import Path

from PIL import Image

# Remove browser chrome only — keep site navigation (logo + menu bar).
CROP_TOP_PX = 80



ASSETS = Path(
    os.environ.get(
        "KINET_SCREENSHOT_ASSETS",
        "/Users/josaba/.cursor/projects/Users-josaba-Projects-clients-kinet/assets",
    )
)
OUT = Path(__file__).resolve().parents[1] / "public" / "projects"

# Source filename -> output path (gallery/admin corrected)
MAPPING: dict[str, str] = {
    "Screenshot_2026-07-05_at_10.17.13_in_the_morning-960ba814-32a8-4156-950e-a73942175813.png": "kiduspetros/hero.png",
    "Screenshot_2026-07-05_at_10.17.24_in_the_morning-e73c8e7c-faf5-4772-9685-f86caced2864.png": "kiduspetros/about.png",
    "Screenshot_2026-07-05_at_10.17.36_in_the_morning-fb609d6b-9771-4ae7-905a-70e1242f61ee.png": "kiduspetros/gallery.png",
    "Screenshot_2026-07-05_at_10.21.53_in_the_morning-b6c8c7e5-7518-49ee-b665-cafa48bf0ec6.png": "kiduspetros/admin.png",
    "Screenshot_2026-07-05_at_10.22.34_in_the_morning-afa0cbda-8102-495e-9e85-50f594b4360b.png": "brije/hero.png",
    "Screenshot_2026-07-05_at_10.22.46_in_the_morning-e1194997-0f14-4b14-b74d-207e6e8a6ecf.png": "brije/brand-dashboard.png",
    "Screenshot_2026-07-05_at_10.23.09_in_the_morning-eeffcfb4-255a-4d07-99d7-211d146896c8.png": "brije/creator-dashboard.png",
    "Screenshot_2026-07-05_at_10.23.27_in_the_morning-96c96b8a-c464-4180-87ce-e8df318b34ae.png": "brije/campaign-chats.png",
    "Screenshot_2026-07-05_at_10.24.07_in_the_morning-920b44a5-e397-423d-960a-a2b92503f6eb.png": "unscriptedcodes/hero.png",
    "Screenshot_2026-07-05_at_10.24.15_in_the_morning-c5f27b57-2ef3-4842-a752-379b8f8fef9c.png": "unscriptedcodes/blogs.png",
    "Screenshot_2026-07-05_at_10.24.28_in_the_morning-ae9751fe-8c15-4935-b38e-cd3d64d2ce18.png": "unscriptedcodes/signup.png",
    "Screenshot_2026-07-05_at_10.38.08_in_the_morning-bd267f7e-b3da-48a2-93d0-f3b8e25c6c20.png": "povet/hero.png",
    "Screenshot_2026-07-05_at_10.38.26_in_the_morning-82575417-448c-47a9-ab70-5209ce554ffb.png": "povet/explore.png",
    "Screenshot_2026-07-05_at_10.40.59_in_the_morning-3a530f27-1d91-4371-899e-0532ea37b8d0.png": "povet/post.png",
    "Screenshot_2026-07-05_at_10.39.31_in_the_morning-4331c068-5090-4d13-9d4f-7524c58cbbb8.png": "povet/image-detail.png",
}


def crop_image(src: Path, dst: Path) -> None:
    with Image.open(src) as img:
        if img.mode not in ("RGB", "RGBA"):
            img = img.convert("RGBA" if "A" in img.getbands() else "RGB")
        w, h = img.size
        if CROP_TOP_PX >= h:
            raise ValueError(f"{src.name}: crop {CROP_TOP_PX}px exceeds height {h}px")
        cropped = img.crop((0, CROP_TOP_PX, w, h))
        dst.parent.mkdir(parents=True, exist_ok=True)
        cropped.save(dst, format="PNG", compress_level=3, optimize=False)


def main() -> None:
    if not ASSETS.is_dir():
        raise SystemExit(f"Assets folder not found: {ASSETS}")

    print(f"Cropping all screenshots: top {CROP_TOP_PX}px removed, lossless PNG\n")
    for src_name, rel in MAPPING.items():
        src = ASSETS / src_name
        dst = OUT / rel
        if not src.is_file():
            raise SystemExit(f"Missing source: {src}")
        crop_image(src, dst)
        with Image.open(dst) as out:
            kb = dst.stat().st_size // 1024
            print(f"  {rel:40} {out.size[0]}x{out.size[1]}  {kb:4d} KB")


if __name__ == "__main__":
    main()
