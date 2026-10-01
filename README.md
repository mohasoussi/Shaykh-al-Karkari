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
