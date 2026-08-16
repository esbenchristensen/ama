import type { MetadataRoute } from "next";
import { origin } from "@/content/site";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `${origin}/${locale}`]),
  );

  return locales.map((locale) => ({
    url: `${origin}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
    alternates: {
      languages: {
        ...languages,
        "x-default": `${origin}/da`,
      },
    },
  }));
}
