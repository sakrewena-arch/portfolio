import type { Experience } from "@/types";

/**
 * Parcours : AJOUTE ICI tes expériences réelles, de la plus récente à la plus ancienne.
 * Types : "professionnelle" | "freelance" | "personnel" | "formation".
 *
 * Tant que la liste est vide, le site présente tes projets personnels et tes activités
 * créatives, clairement identifiés comme tels. Rien n'est inventé.
 *
 * Modèle à copier :
 *
 * {
 *   id: "mon-experience",
 *   type: "freelance",
 *   role: "Intitulé du rôle",
 *   organization: "Entreprise ou projet",
 *   period: "2024 – aujourd'hui",
 *   location: "Ville",                       // facultatif
 *   missions: ["Mission 1", "Mission 2"],    // facultatif
 *   skills: ["Next.js", "Figma"],            // facultatif
 *   achievements: ["Réalisation concrète"],  // facultatif
 * },
 */
export const experiences: Experience[] = [];

export const experienceTypeLabels: Record<Experience["type"], string> = {
  professionnelle: "Expérience professionnelle",
  freelance: "Freelance",
  personnel: "Projet personnel",
  formation: "Formation et apprentissage",
};

/** Activités créatives affichées tant qu'aucune expérience n'est renseignée. */
export const creativeActivities = [
  {
    title: "Conception et développement de plateformes web",
    detail:
      "Event Global, Domora, 26Kado et Rewardly : quatre projets personnels, de l'idée à l'interface.",
  },
  {
    title: "Motion design et montage vidéo",
    detail: "Animations graphiques et contenus courts pour les réseaux sociaux.",
  },
  {
    title: "Création assistée par intelligence artificielle",
    detail: "Workflows de génération d'images et de vidéos, automatisation créative.",
  },
];
