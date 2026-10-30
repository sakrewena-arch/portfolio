/** Helpers sûrs côté client comme côté serveur (aucun import Node). */

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

/** Convertit une URL YouTube/Vimeo classique en URL d'intégration. */
export function toEmbedUrl(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com") && u.searchParams.get("v"))
      return `https://www.youtube-nocookie.com/embed/${u.searchParams.get("v")}`;
    if (u.hostname === "youtu.be")
      return `https://www.youtube-nocookie.com/embed${u.pathname}`;
    if (u.hostname.includes("youtube.com") && u.pathname.startsWith("/embed/"))
      return `https://www.youtube-nocookie.com${u.pathname}`;
    if (u.hostname.includes("vimeo.com") && !u.hostname.startsWith("player"))
      return `https://player.vimeo.com/video${u.pathname}`;
    return url;
  } catch {
    return url;
  }
}
