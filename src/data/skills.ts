import type { SkillCategory } from "@/types";

/**
 * Compétences par catégorie.
 *
 * Pour afficher un niveau sur une compétence, ajoute-le explicitement :
 *   { name: "Next.js", level: "intermediaire" }
 * Niveaux possibles : "debutant" | "intermediaire" | "avance".
 * Sans `level`, aucun niveau n'est affiché.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "web",
    title: "Développement web",
    description: "Sites et interfaces, du code jusqu'à la mise en ligne.",
    icon: "code",
    skills: [
      { name: "Next.js" },
      { name: "React" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "HTML et CSS" },
      { name: "Tailwind CSS" },
      { name: "Supabase" },
      { name: "Git et GitHub" },
      { name: "Déploiement sur Vercel" },
    ],
  },
  {
    id: "applications",
    title: "Développement d'applications",
    description: "Applications multiplateformes connectées à un backend.",
    icon: "smartphone",
    skills: [
      { name: "Flutter et Dart" },
      { name: "Interfaces multiplateformes" },
      { name: "Intégration de bases de données" },
      { name: "Authentification" },
      { name: "Applications connectées à des services backend" },
    ],
  },
  {
    id: "motion",
    title: "Motion design et création visuelle",
    description: "Images animées, montage et formats courts.",
    icon: "film",
    skills: [
      { name: "Motion design" },
      { name: "Animation graphique" },
      { name: "Montage vidéo" },
      { name: "Contenus courts pour les réseaux sociaux" },
      { name: "Publicités vidéo" },
    ],
  },
  {
    id: "ia",
    title: "Intelligence artificielle",
    description: "L'IA comme outil de création et d'automatisation.",
    icon: "sparkles",
    skills: [
      { name: "Workflows assistés par IA" },
      { name: "Génération d'images et de vidéos" },
      { name: "Prompt engineering" },
      { name: "Automatisation de tâches créatives" },
      { name: "Intégration d'outils d'IA dans des projets" },
    ],
  },
  {
    id: "design",
    title: "Design et produit",
    description: "De l'idée au prototype, avec l'utilisateur en tête.",
    icon: "layout",
    skills: [
      { name: "Conception UI/UX" },
      { name: "Prototypage" },
      { name: "Architecture d'interfaces" },
      { name: "Conception de produits numériques" },
      { name: "Responsive design" },
    ],
  },
];
