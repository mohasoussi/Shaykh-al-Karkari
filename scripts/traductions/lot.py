"""Enregistre un lot de traductions.  Usage : python3 scripts/traductions/lot.py <en|ar> <fichier-lot.txt>
Format du lot :   === nom-de-la-page ===   (ex. actualite-les-sept-engagements)
                  le corps traduit en HTML (mêmes balises et mêmes marqueurs <!--M0--> que le texte français)
Le titre vient de scripts/titres-traduits.json ; pour un article sans titre traduit, ajouter une ligne  TITRE: …  juste après l'en-tête."""
import sys, re, json, os
code, src = sys.argv[1], sys.argv[2]
racine = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
fr = os.path.join(racine, "scripts/traductions/fr"); out = os.path.join(racine, "scripts/traductions", code)
os.makedirs(out, exist_ok=True)
txt = open(src, encoding="utf-8").read()
blocs = re.split(r"^=== (\S+) ===\s*$", txt, flags=re.M)
n = 0
for i in range(1, len(blocs), 2):
    nom, corps = blocs[i], blocs[i + 1].strip()
    if not os.path.exists(os.path.join(fr, nom + ".json")): print("inconnu :", nom); continue
    titre = ""
    m = re.match(r"TITRE:\s*(.+)\n", corps)
    if m: titre, corps = m.group(1).strip(), corps[m.end():].strip()
    src_fr = json.load(open(os.path.join(fr, nom + ".json"), encoding="utf-8"))
    a = sorted(set(re.findall(r"<!--M\d+-->", src_fr["corps"]))); b = sorted(set(re.findall(r"<!--M\d+-->", corps)))
    if a != b: print("MARQUEURS DIFFÉRENTS :", nom, set(a) ^ set(b))
    liens = lambda t: sorted(re.findall(r'href="([^"]+)"', t))
    if liens(src_fr["corps"]) != liens(corps): print("LIENS DIFFÉRENTS :", nom, set(liens(src_fr["corps"])) ^ set(liens(corps)))
    json.dump({"titre": titre, "corps": corps}, open(os.path.join(out, nom + ".json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    n += 1
print(n, "article(s) enregistrés en", code)
