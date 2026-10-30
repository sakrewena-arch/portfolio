import type { Project, ProjectCategory, ProjectStatus } from "@/types";

/**
 * ============================================================
 *  PROJETS
 * ============================================================
 *
 *  - `status` décrit l'état réel du projet. Ne mets "en-ligne" que si c'est vrai.
 *  - `technologies` : liste uniquement ce qui est réellement utilisé. Vide = rien d'affiché.
 *  - `cover` : chemin d'une vraie image dans /public/images. Sans image, une couverture
 *    graphique générée est affichée à la place.
 *  - `url` / `demoUrl` : n'ajoute un lien que s'il est valide.
 *  - Aucun chiffre (utilisateurs, revenus, clients) n'est affiché : n'en ajoute pas sans preuve.
 */
export const projects: Project[] = [
  {
    slug: "event-global",
    name: "Event Global",
    category: "web",
    summary:
      "Une plateforme pour découvrir des événements, des compétitions, des concerts et des cagnottes.",
    description: [
      "Event Global est un projet personnel en cours de développement : une plateforme web qui rassemble au même endroit les événements, les compétitions, les concerts et les cagnottes.",
      "L'idée est de simplifier la découverte : un visiteur trouve ce qui se passe près de lui et peut s'y associer sans passer d'un service à l'autre.",
    ],
    // À compléter avec les fonctionnalités réellement développées.
    features: [
      "Découverte d'événements, de compétitions et de concerts",
      "Cagnottes associées aux événements",
    ],
    // Technologies envisagées : à valider selon la version présentée.
    technologies: ["Next.js", "Supabase"],
    status: "en-developpement",
    hue: 262,
    coverAlt: "Couverture graphique du projet Event Global",
  },
  {
    slug: "domora",
    name: "Domora",
    category: "web",
    summary:
      "Une marketplace immobilière pour chercher et publier des locations, et suivre la relation locative.",
    description: [
      "Domora est un projet personnel de marketplace immobilière : une plateforme de recherche et de publication de locations.",
      "Elle réunit la gestion des annonces, le contact entre propriétaires et locataires, et des fonctionnalités de suivi locatif.",
    ],
    features: [
      "Recherche et publication d'annonces de location",
      "Gestion des annonces",
      "Contact entre propriétaires et locataires",
      "Suivi locatif",
    ],
    // À renseigner selon l'utilisation réelle dans la version présentée.
    technologies: [],
    status: "personnel",
    hue: 196,
    coverAlt: "Couverture graphique du projet Domora",
  },
  {
    slug: "26kado",
    name: "26Kado",
    category: "web",
    summary: "Un projet web personnel, présenté ici avec ses fonctionnalités réelles.",
    description: [
      "26Kado est un projet web personnel.",
      "Cette fiche est prête à accueillir la description réelle du site et ses fonctionnalités : renseigne-les dans src/data/projects.ts.",
    ],
    technologies: [],
    status: "personnel",
    hue: 330,
    // Ajoute l'adresse publique uniquement si elle est toujours valide :
    // url: "https://...",
    coverAlt: "Couverture graphique du projet 26Kado",
  },
  {
    slug: "rewardly",
    name: "Rewardly",
    category: "web",
    summary:
      "Une plateforme qui met en relation des utilisateurs et des entreprises autour de tâches, de tests et d'opportunités de promotion.",
    description: [
      "Rewardly est un projet personnel de plateforme numérique qui met en relation des utilisateurs et des entreprises.",
      "Les entreprises y proposent des tâches, des tests et des opportunités de promotion ; les utilisateurs y participent.",
    ],
    features: [
      "Mise en relation entre utilisateurs et entreprises",
      "Tâches, tests et opportunités de promotion",
    ],
    technologies: [],
    status: "personnel",
    hue: 38,
    coverAlt: "Couverture graphique du projet Rewardly",
  },
  {
    slug: "motion-1",
    name: "Motion design, projet 1",
    category: "motion",
    summary:
      "Emplacement réservé pour une vidéo ou une animation graphique : miniature, vidéo intégrée et description.",
    description: [
      "Cet emplacement accueillera une réalisation de motion design.",
      "Ajoute la vidéo (`video`), la miniature (`thumbnail`) et la description dans src/data/projects.ts, puis retire `placeholder: true`.",
    ],
    technologies: [],
    status: "personnel",
    hue: 12,
    placeholder: true,
    coverAlt: "Emplacement réservé pour un projet de motion design",
    // video: { type: "embed", url: "https://www.youtube.com/embed/..." },
    // thumbnail: "/images/projects/motion-1.jpg",
  },
  {
    slug: "motion-2",
    name: "Motion design, projet 2",
    category: "motion",
    summary:
      "Second emplacement réservé pour une animation graphique ou un contenu court.",
    description: [
      "Cet emplacement accueillera une seconde réalisation de motion design.",
      "Même principe : vidéo, miniature et description à renseigner dans src/data/projects.ts.",
    ],
    technologies: [],
    status: "personnel",
    hue: 150,
    placeholder: true,
    coverAlt: "Emplacement réservé pour un projet de motion design",
  },
];

export const categoryLabels: Record<ProjectCategory, string> = {
  web: "Développement web",
  applications: "Applications",
  motion: "Motion design",
  ia: "Intelligence artificielle",
  branding: "Design et branding",
};

export const statusLabels: Record<ProjectStatus, string> = {
  "en-developpement": "Projet personnel en développement",
  prototype: "Prototype",
  "en-ligne": "En ligne",
  personnel: "Projet personnel",
};

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
