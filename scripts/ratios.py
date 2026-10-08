#!/usr/bin/env python3
"""Calcule le rapport largeur/hauteur de chaque miniature d'album -> scripts/ratios.json (utilisé pour aligner les photos en rangées justifiées)."""
import json, glob, os
from PIL import Image
r = {}
for p in glob.glob("public/media/evenements/*/t/*.webp"):
    w, h = Image.open(p).size
    parts = p.split("/")
    r[f"{parts[3]}/{os.path.splitext(parts[5])[0]}"] = round(w / h, 3)
json.dump(r, open("scripts/ratios.json", "w"), indent=0, sort_keys=True)
print(len(r), "ratios")
