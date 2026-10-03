# Site — Shaykh Mohamed Faouzi Al Karkari

Site de personal branding en une page, animé (motion design) : parcours, enseignements, recherche, conférences, livres, écrits et galerie.

## Stack

- [Vite](https://vitejs.dev/) : serveur de dev et build statique
- [GSAP](https://gsap.com/) + ScrollTrigger + SplitText : toutes les animations
- [Lenis](https://lenis.darkroom.engineering/) : défilement fluide
- Polices auto-hébergées via Fontsource (Cormorant Garamond, Manrope, Amiri)

## Lancer en local

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # génère dist/
```

## Structure

```
index.html          contenu de toutes les sections
src/style.css       styles (variables de couleurs en haut du fichier)
src/main.js         animations, une fonction par section
public/media/       photos (webp) et boucles vidéo (mp4)
```

## Animations principales

| Section | Effet |
| --- | --- |
| Chargement | Carreaux aux couleurs de la muraqqa'a qui s'assemblent puis s'effacent |
| Accueil | Vidéo plein écran, titre lettre par lettre, la vidéo se referme en arche au scroll |
| Manifeste | Les mots s'illuminent un à un au scroll |
| Le Shaykh | Images révélées en rideau + parallaxe, compteurs animés |
| Parcours | Défilement horizontal épinglé (vertical sur mobile) |
| Enseignements | Liste avec image flottante qui suit la souris |
| Recherche | Bandeaux défilants d'universités, accélérés par la vitesse du scroll |
| Conférences | Cartes empilées qui reculent, vidéo de fond |
| Livres | Livres en 3D qui pivotent à l'arrivée et suivent la souris |
| Galerie | Mosaïque avec vitesses de parallaxe différentes |
| Partout | Curseur personnalisé, boutons magnétiques, poussière de lumière sur les sections sombres, menu plein écran |

Les animations sont désactivées si l'utilisateur a activé « réduire les animations » dans son système.

## Déploiement

## Mise en ligne sur Cloudflare Pages

1. Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → choisir le dépôt.
2. Réglages de build : **Framework preset** : aucun · **Build command** : `npm run build` · **Build output directory** : `dist` (la version de Node, 22, est lue dans `.node-version`).
3. Formulaire « Être informé » : **Storage & databases** → **KV** → créer un espace `inscriptions`. Puis dans le projet Pages : **Settings** → **Bindings** → **Add** → **KV namespace** → nom de variable `INSCRIPTIONS`. Ajouter aussi, dans **Variables and Secrets**, un secret `ADMIN_TOKEN` (le mot de passe d'administration). Relancer un déploiement.
4. Les inscriptions se consultent sur `/#admin` (mot de passe `ADMIN_TOKEN`) avec export CSV.
5. Chaque enregistrement sur GitHub (dont ceux de la tâche automatique) republie le site tout seul.

## Pages du site

| Page | Fichier |
| --- | --- |
| Accueil (intro en damier, événements, enseignements, conférences, actualités, contact) | `index.html` |
| Le Shaykh (deux portes) | `le-shaykh.html` |
| Qui est le Shaykh ? (parcours + biographie importée) | `qui-est-le-shaykh.html` |
| Sa chaîne de transmission (silsila animée, importée ; maîtres entre Ibn Machich et le Prophète : `scripts/silsila-suite.json`) | `chaine-de-transmission.html` |
| Sa lignée chérifienne (animée) | `lignee-cherifienne.html` |
| Conférences en vidéo | `conferences.html` — renseigner l'attribut `data-youtube` de chaque carte (adresse YouTube ou identifiant) pour activer la vidéo |
| Projet Merkez | `projet-merkez.html` |
| Articles des enseignements (à rédiger) | `article-*.html` |

L'en-tête, le menu et le pied de page sont communs : ils se modifient une seule fois dans `partials/`.

## Formulaire « Être informé » (prénom, nom, ville, téléphone, e-mail)

- Sur le site publié (Cloudflare Pages), les réponses sont rangées par `functions/api/inscription.js` dans l'espace KV `INSCRIPTIONS` ; le panneau `#admin` les affiche après saisie du mot de passe `ADMIN_TOKEN`.
- Dans l'aperçu Claude, elles sont enregistrées dans la base de la page et se consultent à l'adresse `…#admin` (réservée à l'administrateur).

## Articles importés automatiquement

Les articles de https://karkariya.fr sont repris sans copier-coller :

- **Actualités** (`actualites.html`, `actualite-*.html`) : événements, conférences, actions humanitaires, vie de la tariqa. Les cours, tafsir, témoignages, réfutations… sont écartés (règles dans `retenu()`, `scripts/importer-actualites.mjs`).
- **Enseignements** (`enseignements.html`, `enseignement-*.html`) : rubrique « Moudhakara ». Les trois cartes de l'accueil sont fixées par `ENS_ACCUEIL`.
- **Chaîne de transmission** (`chaine-de-transmission.html`) : la silsila est relue dans l'article d'origine et mise en scène jusqu'au Prophète ﷺ.
- `npm run actualites` lance l'import à la main ; `npm run build` le relance avant chaque mise en ligne (si le site d'origine est injoignable, les pages existantes sont conservées).
- `.github/workflows/actualites.yml` relance l'import toutes les 6 heures sur GitHub et enregistre les nouveautés dans le dépôt ; Cloudflare Pages republie alors le site tout seul. Rien à configurer, à part avoir relié le dépôt à Cloudflare Pages.
- Autre site source : variables `ACTUALITES_SOURCE` / `ACTUALITES_CHEMIN`.
