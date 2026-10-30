export type SkillLevel = "debutant" | "intermediaire" | "avance";

export interface Skill {
  name: string;
  /**
   * Niveau facultatif. Laisse vide tant que l'information n'est pas validée :
   * le niveau n'est affiché que s'il est renseigné.
   */
  level?: SkillLevel;
}

export type SkillIconName = "code" | "smartphone" | "film" | "sparkles" | "layout";

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: SkillIconName;
  skills: Skill[];
}

export type ProjectCategory =
  | "web"
  | "applications"
  | "motion"
  | "ia"
  | "branding";

export type ProjectStatus =
  | "en-developpement"
  | "prototype"
  | "en-ligne"
  | "personnel";

export interface ProjectVideo {
  /** "embed" : URL d'intégration (YouTube, Vimeo…). "file" : chemin vers un .mp4 dans /public. */
  type: "embed" | "file";
  url: string;
}

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  /** Description courte affichée sur la carte. */
  summary: string;
  /** Paragraphes de la fiche détaillée. */
  description: string[];
  /** Fonctionnalités réelles du projet (à renseigner / valider). */
  features?: string[];
  /** Technologies réellement utilisées. Laisse vide si non confirmé : rien ne sera affiché. */
  technologies: string[];
  status: ProjectStatus;
  year?: number;
  /** Image de couverture dans /public/images (ex : "/images/projects/event-global.jpg"). */
  cover?: string;
  coverAlt?: string;
  /** Teinte (0-360) utilisée pour la couverture graphique de remplacement. */
  hue: number;
  url?: string;
  demoUrl?: string;
  video?: ProjectVideo;
  /** Miniature pour les projets vidéo. */
  thumbnail?: string;
  /** Emplacement réservé en attendant le vrai contenu. */
  placeholder?: boolean;
}

export type ExperienceType =
  | "professionnelle"
  | "freelance"
  | "personnel"
  | "formation";

export interface Experience {
  id: string;
  type: ExperienceType;
  role: string;
  organization: string;
  period: string;
  location?: string;
  missions?: string[];
  skills?: string[];
  achievements?: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: "globe" | "smartphone" | "film" | "sparkles" | "compass";
  /** Valeur pré-sélectionnée dans le formulaire de contact. */
  projectType: string;
}

export interface SocialLink {
  id: "email" | "whatsapp" | "linkedin" | "github" | "tiktok";
  label: string;
  href: string;
}
