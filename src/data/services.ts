import type { Service } from "@/types";

/** Services proposés. Aucun tarif ni garantie de résultat : à ajouter seulement si tu le souhaites. */
export const services: Service[] = [
  {
    id: "sites-web",
    title: "Création de sites web",
    description: "Sites modernes, responsives et performants.",
    icon: "globe",
    projectType: "Site web",
  },
  {
    id: "applications",
    title: "Développement d'applications",
    description: "Conception d'applications et intégration de services backend.",
    icon: "smartphone",
    projectType: "Application",
  },
  {
    id: "motion",
    title: "Motion design",
    description:
      "Création de vidéos animées, de publicités et de contenus pour les réseaux sociaux.",
    icon: "film",
    projectType: "Motion design",
  },
  {
    id: "contenus-ia",
    title: "Création de contenus assistée par IA",
    description:
      "Conception de workflows créatifs et production de contenus visuels.",
    icon: "sparkles",
    projectType: "Contenu assisté par IA",
  },
  {
    id: "produits-numeriques",
    title: "Conception de produits numériques",
    description:
      "Accompagnement de l'idée initiale jusqu'au prototype fonctionnel.",
    icon: "compass",
    projectType: "Produit numérique",
  },
];

/** Types de projet proposés dans le formulaire de contact. */
export const projectTypes = [
  ...services.map((s) => s.projectType),
  "Autre",
] as const;
