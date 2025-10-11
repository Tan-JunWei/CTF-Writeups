#!/usr/bin/env python3
"""
organise_img.py

Scan a Markdown tree for Obsidian-style image embeds (![[...]]), locate the referenced
image files under an Assets root, and copy or move them into subfolders that mirror
the Markdown folder structure.

Recommended: run with --dry-run first to verify actions.
"""
from __future__ import annotations
import argparse
import os
import re
import shutil
from pathlib import Path
from collections import defaultdict
from typing import Iterable, Dict, List

# Regexes
OBS_RE = re.compile(r'!\[\[([^\]]+?)\]\]')
STD_RE = re.compile(r'!\[[^\]]*\]\(([^)]+)\)')

COMMON_IMAGE_EXTS = [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp", ".tiff", ".svg"]


def parse_args():
    p = argparse.ArgumentParser(description="Organize embedded images into subfolders mirroring the MD tree.")
    p.add_argument("--md-dir", help="Root directory containing Markdown files (scanned recursively).")
    p.add_argument("--assets-root", help="Root directory where images currently live (and will be destination root).")
    p.add_argument("--include-std-md", action="store_true", help="Also parse standard Markdown image syntax ![alt](path).")
    p.add_argument("--move", action="store_true", help="Move images instead of copying them.")
    p.add_argument("--dry-run", action="store_true", help="Show what would happen without writing files.")
    return p.parse_args()


def prompt_if_missing(args):
    def ask(prompt_text, default=None):
        if default:
            resp = input(f"{prompt_text} [{default}]: ").strip()
            return resp or default
        return input(f"{prompt_text}: ").strip()

    if not args.md_dir:
        args.md_dir = ask("Enter the target directory containing Markdown files (e.g., your PJPT root)")
    if not args.assets_root:
        args.assets_root = ask("Enter the Assets root where images currently live (and will be organized into)")
    return args


def _normalize_quotes(s: str) -> str:
    """Turn smart quotes into ASCII quotes and normalize some odd punctuation."""
    if not s:
        return s
    return (s.replace("“", '"').replace("”", '"').replace("„", '"')
              .replace("‘", "'").replace("’", "'").replace("‹", "'").replace("›", "'"))


def _wrap_first_word_variants(n: str) -> Iterable[str]:
    """
    If pattern looks like:  Word' <rest>   (apostrophe after first word),
    also try wrapping the first word in quotes:  'Word' <rest>, "Word" <rest>
    """
    m = re.match(r"^([A-Za-z0-9._ -]+?)'\s+(.*)$", n)
    if m:
        first, rest = m.groups()
        first = first.strip()
        rest = rest.strip()
        if first and rest:
            yield f"'{first}' {rest}"
            yield f"\"{first}\" {rest}"


def _candidate_names(name: str) -> Iterable[str]:
    """
    Yield progressively 'looser' candidates to try when searching in assets:
      1) normalized (smart quotes -> ascii)
      2) strip surrounding quotes
      3) remove all quotes inside
      4) collapse multiple spaces
      5) wrap-first-word variants if pattern is Word' rest
    """
    if name is None:
        return
    n0 = _normalize_quotes(name).strip()
    yield n0

    n1 = n0.strip(' "\'')
    if n1 != n0:
        yield n1

    n2 = n1.replace('"', "").replace("'", "")
    if n2 != n1:
        yield n2

    n3 = re.sub(r"\s+", " ", n2).strip()
    if n3 != n2:
        yield n3

    for v in _wrap_first_word_variants(n0):
        yield v


def clean_embed_target(s: str) -> str:
    """
    From inside [[ ... ]] strip alias/size and headings:
      - left of '|' (alias/size)
      - left of '#' (heading)
    Normalize smart quotes and strip wrapping quotes.
    Return basename (filename) portion.
    """
    if s is None:
        return ""
    s = s.strip()
    s = s.split("|", 1)[0]
    s = s.split("#", 1)[0]
    s = _normalize_quotes(s).strip(' "\'')
    return os.path.basename(s)


def extract_images_from_text(text: str, include_std_md: bool) -> set[str]:
    """Return set of basenames referenced by embeds in text."""
    found = set()
    for m in OBS_RE.finditer(text):
        inner = m.group(1)
        base = clean_embed_target(inner)
        if base:
            found.add(base)

    if include_std_md:
        for m in STD_RE.finditer(text):
            path = m.group(1).strip()
            path = path.split(" ", 1)[0]
            path = path.split("#", 1)[0]
            path = path.split("?", 1)[0]
            base = os.path.basename(path)
            if base:
                found.add(base)
    return found


def _index_keys_for_name(name: str) -> List[str]:
    """Generate all index keys (with and without extension) for a given filename."""
    keys = []
    name_norm = _normalize_quotes(name)
    name_strip = name_norm.strip(' "\'')
    name_noquotes = name_norm.replace('"', "").replace("'", "")
    name_collapsed = re.sub(r"\s+", " ", name_noquotes).strip()

    for k in (name, name_norm, name_strip, name_noquotes, name_collapsed):
        if k:
            keys.append(k.lower())

    stem = os.path.splitext(name)[0]
    stem_norm = _normalize_quotes(stem)
    stem_strip = stem_norm.strip(' "\'')
    stem_noquotes = stem_norm.replace('"', "").replace("'", "")
    stem_collapsed = re.sub(r"\s+", " ", stem_noquotes).strip()

    for k in (stem, stem_norm, stem_strip, stem_noquotes, stem_collapsed):
        if k:
            keys.append(k.lower())

    return keys


def index_assets(root: Path) -> Dict[str, List[Path]]:
    """
    Build a case-insensitive index for all files under assets root.

    For each file we add multiple keys so lookups are robust:
      - original filename (lowercased)
      - normalized (smart quotes -> ascii)
      - stripped-surrounding-quotes
      - all-quotes-removed
      - collapsed-spaces variant
      - and each of the above WITHOUT extension (so 'name' -> matches 'name.png' lookups)
    """
    idx: Dict[str, List[Path]] = defaultdict(list)

    def add_key(key: str, path: Path):
        if not key:
            return
        if path not in idx[key]:
            idx[key].append(path)

    for p in root.rglob("*"):
        if not p.is_file():
            continue
        for key in _index_keys_for_name(p.name):
            add_key(key, p)

    return idx


def index_add_path(idx: Dict[str, List[Path]], path: Path):
    for key in _index_keys_for_name(path.name):
        key = key.lower()
        if path not in idx[key]:
            idx[key].append(path)


def index_remove_path(idx: Dict[str, List[Path]], path: Path):
    for key in _index_keys_for_name(path.name):
        key = key.lower()
        if key in idx:
            try:
                while path in idx[key]:
                    idx[key].remove(path)
            except ValueError:
                pass
            if not idx[key]:
                del idx[key]


def find_in_assets(idx: Dict[str, List[Path]], name: str):
    """
    Try multiple relaxed variants of the requested filename, case-insensitively.
    The index contains many normalized keys for each file, so candidates will map.
    """
    if not name:
        return None

    for cand in _candidate_names(name):
        c = cand.strip()
        if not c:
            continue

        matches = idx.get(c.lower())
        if matches:
            return sorted(matches, key=lambda x: (len(str(x)), str(x)))[0]

        stem, ext = os.path.splitext(c)
        if not ext:
            for e in COMMON_IMAGE_EXTS:
                key = (stem + e).lower()
                matches = idx.get(key)
                if matches:
                    return sorted(matches, key=lambda x: (len(str(x)), str(x)))[0]

    s = name
    if s and (s.startswith("'") or s.endswith("'")):
        alt = s.strip("'").strip()
        for cand in _candidate_names(alt):
            matches = idx.get(cand.lower())
            if matches:
                return sorted(matches, key=lambda x: (len(str(x)), str(x)))[0]

    return None


def unique_path(dest: Path) -> Path:
    """
    If dest exists, return a new path by appending _1, _2, ... before extension.
    """
    if not dest.exists():
        return dest
    parent = dest.parent
    stem = dest.stem
    suffix = dest.suffix
    i = 1
    while True:
        candidate = parent / f"{stem}_{i}{suffix}"
        if not candidate.exists():
            return candidate
        i += 1


def main():
    args = parse_args()
    args = prompt_if_missing(args)

    md_root = Path(args.md_dir).resolve()
    assets_root = Path(args.assets_root).resolve()

    if not md_root.is_dir():
        raise SystemExit(f"Markdown directory not found: {md_root}")
    if not assets_root.is_dir():
        raise SystemExit(f"Assets root not found: {assets_root}")

    md_files = list(md_root.rglob("*.md"))
    if not md_files:
        print("No Markdown files found under:", md_root)
        return

    print(f"Indexing assets under {assets_root} ...")
    idx = index_assets(assets_root)

    total_refs = 0
    total_done = 0
    total_missing = 0
    missing_map = defaultdict(list)

    moved_once = set()  

    for md in sorted(md_files):
        try:
            rel_parent = md.parent.relative_to(md_root)
        except Exception:
            rel_parent = Path(md.parent.name)
        dest_dir = assets_root / rel_parent

        text = md.read_text(encoding="utf-8", errors="ignore")
        images = extract_images_from_text(text, include_std_md=args.include_std_md)
        if not images:
            continue

        print(f"\n[{md.relative_to(md_root)}]  ->  {dest_dir}")
        if not args.dry_run:
            dest_dir.mkdir(parents=True, exist_ok=True)

        for name in sorted(images):
            total_refs += 1
            src = find_in_assets(idx, name)
            if not src:
                total_missing += 1
                missing_map[str(md.relative_to(md_root))].append(name)
                print(f"  ! MISSING: {name}")
                continue

            dest = dest_dir / src.name

            try:
                if src.resolve() == dest.resolve():
                    print(f"  = SKIP (already in place): {dest}")
                    continue
            except Exception:
                pass

            dest = unique_path(dest)

            do_move = args.move and (src.resolve() not in moved_once)

            op = "MOVE" if do_move else "COPY"
            print(f"  {op}: {src}  ->  {dest}")

            if not args.dry_run:
                dest.parent.mkdir(parents=True, exist_ok=True)
                if do_move:
                    shutil.move(str(src), str(dest))
                    moved_once.add(dest.resolve())

                    index_remove_path(idx, src)
                    index_add_path(idx, dest)
                else:
                    shutil.copy2(str(src), str(dest))

            total_done += 1

    print("\nSummary")
    print("-------")
    print(f"Markdown files scanned : {len(md_files)}")
    print(f"Image references found : {total_refs}")
    print(f"Images copied/moved    : {total_done}")
    print(f"Missing images         : {total_missing}")

    if missing_map:
        print("\nMissing by note:")
        for note, names in missing_map.items():
            print(f"  {note}:")
            for n in names:
                print(f"    - {n}")


if __name__ == "__main__":
    main()
