import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.siteUrl.replace(/\/$/, "");
  const routes = ["", "/info"] as const;

  return locales.flatMap((lang) =>
    routes.map((route) => ({
      url: `${base}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
    }))
  );
}
