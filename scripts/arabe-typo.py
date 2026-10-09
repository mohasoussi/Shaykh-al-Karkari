"""Typographie arabe : retire l'espace avant « : » dans les pages ar/ (usage français). À lancer après les générateurs."""
import re, glob
for f in glob.glob('ar/*.html'):
    s = open(f, encoding='utf-8').read()
    parts = re.split(r'(<[^>]*>)', s)
    t = ''.join(p if p.startswith('<') else re.sub(r'([؀-ۿ]) :', r'\1:', p) for p in parts)
    if t != s: open(f, 'w', encoding='utf-8').write(t)
