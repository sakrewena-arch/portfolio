import "server-only";
import fs from "node:fs";
import path from "node:path";
import { profile, siteUrl } from "@/data/profile";
import { options } from "@/data/site";
import { projects } from "@/data/projects";
import type { SocialLink } from "@/types";

/** Vrai si le fichier public existe réellement (évite les liens morts). */
export function publicFileExists(publicPath: string) {
  if (!publicPath) return false;
  try {
    const clean = publicPath.replace(/^\/+/, "");
    return fs.existsSync(path.join(process.cwd(), "public", clean));
  } catch {
    return false;
  }
}

/** Coordonnées renseignées uniquement : les champs vides sont ignorés. */
export function getSocialLinks(): SocialLink[] {
  const links: SocialLink[] = [];
  if (profile.email)
    links.push({ id: "email", label: "E-mail", href: `mailto:${profile.email}` });
  if (profile.whatsapp)
    links.push({
      id: "whatsapp",
      label: "WhatsApp",
      href: `https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`,
    });
  if (profile.linkedin)
    links.push({ id: "linkedin", label: "LinkedIn", href: profile.linkedin });
  if (profile.github)
    links.push({ id: "github", label: "GitHub", href: profile.github });
  if (profile.tiktok)
    links.push({ id: "tiktok", label: "TikTok", href: profile.tiktok });
  return links;
}

export function getVisibleProjects() {
  return options.showPlaceholders
    ? projects
    : projects.filter((p) => !p.placeholder);
}

export function absoluteUrl(pathname = "/") {
  return siteUrl ? `${siteUrl}${pathname}` : pathname;
}
