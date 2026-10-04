#!/usr/bin/env python3
"""Build the one master box record per movie from the sleeve files on disk.

A shelved box is a slug that has a real cover, a real spine, and a back that
is a different picture from the cover. Lobby/aisle named backs win over the
generic -still.jpg. The script writes public/data/boxes.json, the sync helper
public/assets/box-assets.js, and matching sleeve-slugs.json / nd-covers.json.
It fails if any shelved record is missing or blank.
"""
import hashlib
import json
import re
from pathlib import Path

from PIL import Image, ImageStat

ROOT = Path(__file__).resolve().parents[1]
SLEEVES = ROOT / "public" / "sleeves"
SPINES = SLEEVES / "spines"
THUMBS = SLEEVES / "thumbs"
DATA = ROOT / "public" / "data"
SHELL = ROOT / "store-shell"

# Lobby/aisle backs. These stay the master unless the file is the cover.
NAMED_BACKS = {
    "coming-to-america": "coming-to-america-shop.jpg",
    "the-thing-1982": "the-thing-1982-blood.jpg",
    "the-lion-king": "the-lion-king-rock.jpg",
    "the-shawshank-redemption": "the-shawshank-redemption-beach.jpg",
    "dune-part-two": "dune-part-two-worm.jpg",
    "first-blood": "first-blood-woods.jpg",
    "goodfellas": "goodfellas-copa.jpg",
    "se7en": "se7en-desert.jpg",
    "jaws": "jaws-orca.jpg",
    "the-shining": "the-shining-maze.jpg",
    "blade-runner": "blade-runner-roof.jpg",
    "back-to-the-future": "back-to-the-future-clock.jpg",
}

REQUIRED = [
    "the-godfather",
    "kill-bill-vol-1",
    "a-christmas-story",
    "the-lost-boys",
    "mad-max-fury-road",
    "shaun-of-the-dead",
    "knives-out",
    "10-things-i-hate-about-you",
    "shrek",
    "wall-e",
]


def digest(path: Path) -> str:
    return hashlib.md5(path.read_bytes()).hexdigest()


def blank(path: Path) -> bool:
    if path.stat().st_size < 4000:
        return True
    with Image.open(path) as im:
        im = im.convert("L")
        im.thumbnail((48, 72))
        stat = ImageStat.Stat(im)
        lo, hi = stat.extrema[0]
        return stat.stddev[0] < 4 or (hi - lo) < 8


def url_for(path: Path) -> str:
    rel = path.relative_to(ROOT / "public").as_posix()
    return f"/{rel}?v={digest(path)[:8]}"


def is_scene_file(stem: str) -> bool:
    """A scene still shares a movie's slug plus one of these endings.

    The movie itself can end the same way (first-blood, there-will-be-blood).
    Only skip the file when the shorter movie cover is also on disk.
    """
    for suf in ("-shop", "-blood", "-rock", "-beach", "-worm", "-woods", "-copa", "-desert", "-orca", "-maze", "-roof", "-clock"):
        if stem.endswith(suf) and len(stem) > len(suf):
            base = stem[: -len(suf)]
            if (SLEEVES / f"{base}.jpg").is_file():
                return True
    return False


def choose_back(slug: str, cover: Path):
    cover_hash = digest(cover)
    named = NAMED_BACKS.get(slug)
    candidates = []
    if named:
        candidates.append(SLEEVES / named)
    candidates.append(SLEEVES / f"{slug}-still.jpg")
    for path in candidates:
        if not path.is_file():
            continue
        if digest(path) == cover_hash:
            continue
        if blank(path):
            continue
        return path
    return None


def rebuild_thumb(slug: str, cover: Path):
    THUMBS.mkdir(exist_ok=True)
    dest = THUMBS / f"{slug}.jpg"
    with Image.open(cover) as im:
        im = im.convert("RGB")
        w = 480
        h = max(1, round(im.height * (w / im.width)))
        im = im.resize((w, h), Image.Resampling.LANCZOS)
        im.save(dest, quality=80, optimize=True)


def build():
    boxes = {}
    problems = []
    for cover in sorted(SLEEVES.glob("*.jpg")):
        name = cover.name
        if name.endswith("-still.jpg"):
            continue
        if name in set(NAMED_BACKS.values()):
            continue
        # skip other scene stills that are not the front
        slug = cover.stem
        if is_scene_file(slug):
            continue
        spine = SPINES / f"{slug}.png"
        if not spine.is_file():
            continue
        back = choose_back(slug, cover)
        if back is None:
            continue
        for label, path in (("cover", cover), ("spine", spine), ("back", back)):
            if blank(path):
                problems.append(f"{slug} {label} is blank: {path.name}")
        if any(p.startswith(slug + " ") for p in problems):
            continue
        rebuild_thumb(slug, cover)
        boxes[slug] = {
            "cover": url_for(cover),
            "spine": url_for(spine),
            "back": url_for(back),
            "fit": "contain",
        }
    for slug in REQUIRED:
        if slug not in boxes:
            problems.append(f"required box missing from the shelf: {slug}")
    if problems:
        raise SystemExit("box check failed:\n" + "\n".join(problems))

    DATA.mkdir(exist_ok=True)
    (DATA / "boxes.json").write_text(json.dumps(boxes, indent=2, sort_keys=True) + "\n")
    slugs = sorted(boxes)
    (DATA / "sleeve-slugs.json").write_text(json.dumps({"covers": slugs, "stills": slugs}) + "\n")
    (DATA / "nd-covers.json").write_text(json.dumps(slugs) + "\n")

    js = (
        "/* Generated by scripts/build-boxes.py. One box per movie. */\n"
        "(function () {\n"
        "  var boxes = "
        + json.dumps(boxes, sort_keys=True)
        + ";\n"
        "  function boxAssets(slug) {\n"
        "    var row = boxes[String(slug || '')];\n"
        "    return row ? { cover: row.cover, spine: row.spine, back: row.back, fit: row.fit || 'contain' } : null;\n"
        "  }\n"
        "  window.__rwBoxes = boxes;\n"
        "  window.boxAssets = boxAssets;\n"
        "})();\n"
    )
    (ROOT / "public" / "assets" / "box-assets.js").write_text(js)
    stamp = digest(ROOT / "public" / "assets" / "box-assets.js")[:8]
    point_shells(boxes, stamp)
    print(f"boxes {len(boxes)} stamp {stamp}")


def point_shells(boxes, stamp):
    thumb = re.compile(r"/sleeves/thumbs/([a-z0-9-]+)\.jpg\?v=[0-9A-Za-z]+")

    def repl_thumb(m):
        row = boxes.get(m.group(1))
        return row["cover"] if row else m.group(0)

    tag = f'<script src="/assets/box-assets.js?v={stamp}"></script>'
    for html in sorted(SHELL.glob("*.html")):
        text = html.read_text()
        text = thumb.sub(repl_thumb, text)
        text = text.replace("freshclub316", "freshclub317")
        text = re.sub(r'<script src="/assets/box-assets\.js\?v=[^"]+"></script>', "", text)
        needle = '<script src="/assets/night-drop-stage-v92.3aebc85561.js'
        if needle in text and tag not in text:
            text = text.replace(needle, tag + needle, 1)
        html.write_text(text)


if __name__ == "__main__":
    build()
