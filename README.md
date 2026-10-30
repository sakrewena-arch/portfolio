# Portfolio

Portfolio personnel : Next.js (App Router), TypeScript, Tailwind CSS 4, Motion, Lucide.
Mode sombre par défaut, mode clair complet, formulaire de contact fonctionnel (Resend), SEO, prêt pour Vercel.

## Démarrage local (Windows PowerShell)

Prérequis : Node.js 20.9 ou plus récent (la version LTS actuelle convient).

```powershell
cd C:\chemin\vers\portfolio
npm install
Copy-Item .env.example .env.local
npm run dev
```

Le site est alors disponible sur http://localhost:3000.

Autres commandes :

```powershell
npm run lint                 # ESLint
npx tsc --noEmit             # vérification TypeScript
npm run build                # build de production
npm run start                # lance le build de production
```

## Où modifier le contenu

Tout le contenu est centralisé dans `src/data/`. Tu n'as pas besoin d'ouvrir les composants.

| Fichier | Contenu |
| --- | --- |
| `src/data/profile.ts` | Nom, titre, ville, e-mail, WhatsApp, réseaux, disponibilité, photo, CV, textes du hero, de « À propos » et du contact, SEO |
| `src/data/skills.ts` | Catégories et compétences (niveau facultatif) |
| `src/data/projects.ts` | Projets : statut, technologies, images, liens, vidéo |
| `src/data/experiences.ts` | Expériences (vide par défaut, avec un modèle à copier) |
| `src/data/services.ts` | Services et types de projet du formulaire |
| `src/data/site.ts` | Sections affichées, navigation, curseur, emplacements réservés |

Règles de fonctionnement :

- **Champ vide = masqué.** Un e-mail, un lien ou une photo laissé vide n'apparaît pas sur le site.
- **Rien n'est inventé.** Les valeurs marquées `TEMPORAIRE` sont à remplacer (nom, titre).
- **Niveaux de compétence** : ajoute `level: "debutant" | "intermediaire" | "avance"` sur une compétence pour l'afficher. Sans `level`, rien n'est affiché.
- **Projets** : n'affiche que ce que tu renseignes. `technologies: []` masque le bloc, un projet sans `url` n'a pas de bouton « Voir le projet ». Le statut (`en-developpement`, `prototype`, `en-ligne`, `personnel`) apparaît sur la carte.
- **Images de projets** : dépose les fichiers dans `public/images/projects/` et renseigne `cover: "/images/projects/mon-image.jpg"`. Sans image, une couverture graphique générée est affichée (elle ne prétend pas être une capture d'écran).
- **Projets vidéo (motion design)** : renseigne `video: { type: "embed", url: "https://www.youtube.com/watch?v=..." }` (YouTube/Vimeo) ou `{ type: "file", url: "/videos/mon-film.mp4" }`, une `thumbnail`, puis retire `placeholder: true`.
- **CV** : dépose ton PDF dans `public/cv/cv.pdf`. Le bouton « Consulter mon CV » n'apparaît que si le fichier existe.
- **Expériences** : tant que `experiences` est vide, la section présente tes projets personnels et activités créatives, identifiés comme tels.
- **Masquer une section** : mets-la à `false` dans `sections` (`src/data/site.ts`). Elle disparaît aussi de la navigation.

Thème graphique (couleurs) : variables CSS en haut de `src/app/globals.css` (`:root` pour le sombre, `[data-theme="light"]` pour le clair).

## Formulaire de contact

La route `src/app/api/contact/route.ts` valide les données côté serveur (même schéma Zod que le client), puis envoie un e-mail via [Resend](https://resend.com). La clé reste côté serveur.

Protections : champ piège invisible, délai minimal de remplissage, limite de 5 messages par IP toutes les 10 minutes, contrôle de l'origine, taille maximale, échappement HTML.

> La limite de débit est conservée en mémoire : elle est efficace par instance serverless, pas globalement. Pour une protection stricte à fort trafic, ajoute un stockage partagé (par exemple Upstash Redis) ou le pare-feu Vercel.

Si le service n'est pas configuré, le formulaire **n'affiche jamais de faux succès** : il répond par une erreur claire (en développement, elle indique la variable manquante).

### Configurer Resend

1. Crée un compte sur resend.com, puis une clé API (*API Keys*).
2. Dans `.env.local` :
   ```
   RESEND_API_KEY=re_xxxxxxxx
   CONTACT_TO_EMAIL=ton-adresse@exemple.com
   ```
3. Sans domaine vérifié, Resend ne permet d'envoyer qu'à l'adresse de ton propre compte, avec l'expéditeur de test `onboarding@resend.dev`. Pour un usage réel, vérifie ton domaine (*Domains*) puis définis `CONTACT_FROM_EMAIL=Portfolio <contact@ton-domaine.com>`.
4. Relance `npm run dev` après toute modification de `.env.local`.

## Publier sur GitHub

Le dossier est déjà un dépôt Git (initialisé par `create-next-app`).

1. Crée un dépôt **vide** sur github.com (sans README ni .gitignore).
2. Dans PowerShell :
   ```powershell
   git add .
   git commit -m "Portfolio : première version"
   git branch -M main
   git remote add origin https://github.com/TON-COMPTE/TON-DEPOT.git
   git push -u origin main
   ```
3. Vérifie que `.env.local` n'apparaît pas dans le dépôt (il est ignoré ; `.env.example` est bien commité).

## Déployer sur Vercel

1. Sur vercel.com : **Add New… > Project**, puis importe ton dépôt GitHub.
2. Vercel détecte Next.js : garde les réglages par défaut (le fichier `vercel.json` les confirme).
3. Avant de déployer, ouvre **Environment Variables** et ajoute :
   - `RESEND_API_KEY`
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL` (facultatif tant que tu utilises l'expéditeur de test)
   - `NEXT_PUBLIC_SITE_URL` (laisse vide tant que tu n'as pas de domaine)
4. Clique sur **Deploy**.
5. Ajoute ton domaine dans **Settings > Domains**, puis renseigne `NEXT_PUBLIC_SITE_URL` (ex : `https://mon-portfolio.com`) et redéploie : les balises canoniques, le sitemap et les URLs de partage utiliseront alors ce domaine.
6. Teste le formulaire en production avec un vrai message.

Chaque `git push` sur `main` redéploie automatiquement le site.

## SEO

- Métadonnées, Open Graph et Twitter Card dans `src/app/layout.tsx` (valeurs dans `profile.seo`) ; titres et descriptions propres à chaque fiche projet.
- Image de partage : générée automatiquement (`/og`). Pour utiliser la tienne, dépose une image 1200×630 dans `public/images/` et renseigne `profile.seo.ogImage`.
- `robots.txt` et `sitemap.xml` générés ; le sitemap reste vide tant que `NEXT_PUBLIC_SITE_URL` n'est pas défini, pour ne publier aucune URL inventée.
- Données structurées JSON-LD (`Person`) construites uniquement à partir des champs renseignés.
- Icône : `src/app/icon.svg` (remplaçable).

## Accessibilité et performances

- Respect de `prefers-reduced-motion` (animations Motion, CSS et curseur).
- Curseur d'accompagnement réservé aux appareils à souris, désactivable dans `src/data/site.ts`.
- Navigation clavier, lien d'évitement, focus visible, menu mobile avec piège à focus et fermeture par Échap.
- Composants client limités aux éléments interactifs ; polices variables servies localement (aucun appel à un service de polices externe) ; `next/image` pour les images fournies.
- Site statique : toutes les pages sont pré-générées, seule la route de contact est dynamique.

## Structure

```
src/
  app/            layout, page d'accueil, fiche projet, API contact, SEO (robots, sitemap, og), 404, erreur
  components/
    layout/       Navbar, MobileMenu, Footer
    sections/     Hero, About, Skills, Projects, Experience, Services, Contact (+ éléments interactifs)
    ui/           Button, Reveal, ProjectCard, ProjectCover, SectionHeading, ThemeToggle, CustomCursor…
    providers/    MotionProvider
  data/           contenu éditable (profil, compétences, projets, expériences, services, site)
  lib/            validation (Zod), utils, server (accès fichiers, liens)
  types/          types partagés
public/
  images/         tes images (projets, portrait, partage)
  cv/             ton CV au format PDF
```

## Notes techniques

- `cacheComponents` est volontairement désactivé : le site est entièrement statique et n'en a pas besoin.
- Les icônes de marques (LinkedIn, GitHub…) ne sont pas fournies par la version actuelle de Lucide : les réseaux sont affichés en texte avec une flèche.
- `AGENTS.md` est ajouté par `create-next-app` pour les assistants de code : tu peux le conserver ou le supprimer.
