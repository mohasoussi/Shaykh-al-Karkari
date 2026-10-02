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

Le fichier `netlify.toml` est prêt : connecter le dépôt à Netlify suffit.

## Pages du site

| Page | Fichier |
| --- | --- |
| Accueil (intro en damier, événements, enseignements, conférences, actualités, contact) | `index.html` |
| Le Shaykh (deux portes) | `le-shaykh.html` |
| Qui est le Shaykh ? (parcours + biographie importée) | `qui-est-le-shaykh.html` |
| Sa chaîne de transmission (silsila + maîtres, importée) | `chaine-de-transmission.html` |
| Conférences en vidéo | `conferences.html` — renseigner l'attribut `data-youtube` de chaque carte (adresse YouTube ou identifiant) pour activer la vidéo |
| Projet Merkez | `projet-merkez.html` |
| Articles des enseignements (à rédiger) | `article-*.html` |

L'en-tête, le menu et le pied de page sont communs : ils se modifient une seule fois dans `partials/`.

## Formulaire « Être informé » (prénom, nom, ville, téléphone, e-mail)

- Sur le site publié avec Netlify, les réponses arrivent dans **Netlify → Forms → inscription** : liste, export CSV, alertes e-mail. Il n'y a rien d'autre à installer.
- Dans l'aperçu Claude, elles sont enregistrées dans la base de la page et se consultent à l'adresse `…#admin` (réservée à l'administrateur).

## Actualités automatiques

Les articles de https://karkariya.fr/actualites/ sont importés sans copier-coller :

- `npm run actualites` lit le site d'origine (API WordPress, sinon lecture des pages), nettoie le texte, télécharge et allège les images, puis génère `actualites.html`, un `actualite-<nom>.html` par article et les 3 derniers articles de l'accueil.
- `npm run build` relance l'import avant chaque mise en ligne ; si le site d'origine est injoignable, les pages existantes sont conservées.
- `.github/workflows/actualites.yml` déclenche une mise en ligne chaque jour (secret `NETLIFY_BUILD_HOOK`) : un nouvel article publié sur l'ancien site apparaît ici dès le lendemain.
- `npm run actualites -- --vide` remet la page à zéro. Autre site : variables `ACTUALITES_SOURCE` / `ACTUALITES_CHEMIN`.
