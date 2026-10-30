/**
 * Configuration générale du site : navigation, sections affichées, options.
 */
export const navigation = [
  { id: "accueil", label: "Accueil" },
  { id: "a-propos", label: "À propos" },
  { id: "competences", label: "Compétences" },
  { id: "projets", label: "Projets" },
  { id: "experiences", label: "Expériences" },
  { id: "contact", label: "Contact" },
] as const;

export const sections = {
  /** Mets une section à `false` pour la masquer (et la retirer de la navigation). */
  about: true,
  skills: true,
  projects: true,
  experiences: true,
  services: true,
  contact: true,
} as const;

export const options = {
  /** Curseur personnalisé (ordinateur uniquement, jamais sur appareil tactile). */
  customCursor: true,
  /** Affiche les emplacements réservés (projets sans contenu final). Mets `false` pour les masquer. */
  showPlaceholders: true,
} as const;
