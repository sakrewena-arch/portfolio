import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/profile";
import { getVisibleProjects } from "@/lib/server";

export default function sitemap(): MetadataRoute.Sitemap {
  // Sans domaine configuré, on évite de publier de fausses URLs.
  if (!siteUrl) return [];
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...getVisibleProjects().map((p) => ({
      url: `${siteUrl}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
