import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/profile";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    // Le plan du site n'est déclaré que si le domaine est connu.
    ...(siteUrl && { sitemap: `${siteUrl}/sitemap.xml` }),
  };
}
