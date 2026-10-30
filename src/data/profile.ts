/**
 * ============================================================
 *  PROFIL : le fichier principal à personnaliser
 * ============================================================
 *
 *  Les valeurs marquées « TEMPORAIRE » sont des repères à remplacer.
 *  Un champ laissé vide ("") est simplement masqué sur le site :
 *  rien n'est inventé à sa place.
 */
export const profile = {
  /** TEMPORAIRE : remplace par ton nom affiché. */
  displayName: "Ton Nom",
  /** TEMPORAIRE : ton titre professionnel. */
  jobTitle: "Créatif digital",

  /** Ville et pays (ex : "Lomé, Togo"). Vide = masqué. */
  location: "",

  /** E-mail professionnel. Vide = masqué. */
  email: "",
  /** Numéro WhatsApp au format international, chiffres uniquement (ex : "22890000000"). */
  whatsapp: "",
  linkedin: "", // URL complète
  github: "", // URL complète
  tiktok: "", // URL complète (ou autre réseau professionnel)

  /** Indicateur de disponibilité du hero. `enabled: false` pour le masquer. */
  availability: {
    enabled: true,
    label: "Disponible pour de nouveaux projets",
  },

  /** Photo ou portrait, dans /public/images (ex : "/images/portrait.jpg"). Vide = composition graphique. */
  photo: "",
  photoAlt: "Portrait",

  /**
   * CV au format PDF, dans /public/cv (ex : "/cv/cv.pdf").
   * Le bouton n'apparaît que si le fichier existe réellement.
   */
  cv: "/cv/cv.pdf",

  hero: {
    eyebrow: "CRÉATIF DIGITAL · DÉVELOPPEMENT · MOTION DESIGN",
    /**
     * Titre composé ligne par ligne (chaque tableau = une ligne, sans retour automatique).
     * Les segments `accent: true` sont mis en valeur : couleur d'accent + largeur de police animée.
     * Garde des lignes courtes (≈ 13 caractères maximum) pour qu'elles tiennent sur mobile.
     */
    title: [
      [{ text: "Je transforme" }],
      [{ text: "les " }, { text: "idées", accent: true }, { text: " en" }],
      [{ text: "expériences", accent: true }],
      [{ text: "digitales.", accent: true }],
    ],
    /** Version texte du titre (SEO, lecteurs d'écran). */
    titleText: "Je transforme les idées en expériences digitales.",
    description:
      "Je conçois des expériences numériques, des interfaces web et des contenus visuels qui associent créativité, technologie et intelligence artificielle.",
    primaryCta: "Découvrir mes projets",
    secondaryCta: "Me contacter",
  },

  about: {
    title: "Derrière chaque projet, une idée à concrétiser.",
    paragraphs: [
      "J'aime concevoir, expérimenter et résoudre des problèmes. Mon point de départ est presque toujours le même : une idée encore floue, que je transforme en produit numérique qui fonctionne et que l'on a envie d'utiliser.",
      "Je passe du code à l'image animée selon ce que le projet demande : une interface web, une application, un film court ou un workflow assisté par l'intelligence artificielle.",
    ],
    domains: [
      "Développement d'applications et de sites web",
      "Motion design et création audiovisuelle",
      "Intelligence artificielle appliquée à la création",
      "Conception de projets numériques",
      "Identité visuelle et communication digitale",
    ],
  },

  contact: {
    title: "Tu as un projet en tête ? Construisons-le ensemble.",
    intro:
      "Décris ton idée en quelques lignes : où tu en es, ce que tu veux obtenir, les délais si tu en as. Je reviens vers toi par e-mail.",
  },

  seo: {
    /** Titre de l'onglet et du partage. */
    title: "Portfolio · Créatif digital, développement web et motion design",
    description:
      "Portfolio d'un créatif digital : sites web, applications, motion design et contenus assistés par l'intelligence artificielle.",
    /** Image de partage dans /public/images (1200×630). Vide = image générée automatiquement. */
    ogImage: "",
  },
};

/** Domaine public du site, défini par la variable d'environnement NEXT_PUBLIC_SITE_URL. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "")
  .trim()
  .replace(/\/$/, "");
