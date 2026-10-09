# Mise en ligne officielle — mode d'emploi

Tout ce qui est technique est déjà prêt dans le dépôt. Il ne reste que quatre gestes dans Cloudflare.

## 1. Acheter le nom de domaine
Domaine visé : **shaykh-alkarkari.com** (modifiable dans `site.config.json`, champ `domaine`).
Le plus simple : l'acheter directement dans Cloudflare (Domain Registration → Register Domains), environ 10 à 15 € par an.
S'il est acheté ailleurs, il faudra changer ses « serveurs de noms » chez le revendeur pour ceux que Cloudflare indique.

## 2. Le rattacher au site
Cloudflare → Workers & Pages → projet du site → **Custom domains** → *Set up a custom domain* :
1. ajouter `www.shaykh-alkarkari.com` ;
2. ajouter aussi `shaykh-alkarkari.com` (sans www) : le site le redirige tout seul vers l'adresse avec www.

Le certificat HTTPS est créé automatiquement (quelques minutes).

## 3. Relancer une mise en ligne
Après le rattachement, relancer un déploiement (Deployments → *Retry deployment*, ou n'importe quelle mise à jour du site).
À ce build, le site détecte que le domaine répond et bascule tout seul : adresses officielles, liens entre langues, plan du site (`/sitemap.xml`), `robots.txt`, aperçus de partage.
Avant cela, ces éléments utilisent l'adresse provisoire `shaykh-al-karkari.pages.dev`.

## 4. Brancher le formulaire « Prochaines rencontres »
Dans le projet Cloudflare Pages → **Settings → Bindings / Variables** :
- *KV namespace binding* : nom de variable **`INSCRIPTIONS`** (créer l'espace KV s'il n'existe pas) ;
- *Variable secrète* : **`ADMIN_TOKEN`** = le mot de passe pour afficher le tableau des inscriptions (lien « Administration » du pied de page).
Sans cela, le formulaire répond « Stockage non configuré ».

## Après la mise en ligne
- **Google Search Console** : ajouter le domaine, envoyer `https://www.shaykh-alkarkari.com/sitemap.xml`.
- **Statistiques** (facultatif) : Cloudflare → Web Analytics (sans cookie).
- **Mentions légales et confidentialité** : pages déjà publiées (pied de page). Pour y faire apparaître une adresse e-mail de contact, renseigner `contact_email` dans `site.config.json` puis relancer `node scripts/legal.mjs`.
- Annoncer la nouvelle adresse sur la page Facebook.
