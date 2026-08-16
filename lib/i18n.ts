// Add a language here, then register its dictionary in content/dictionary.ts.
export const locales = ["da", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "da";

export const localeCookie = "ama-locale";

export const localeMeta: Record<
  Locale,
  { html: string; og: string; label: string; short: string }
> = {
  da: { html: "da", og: "da_DK", label: "Dansk", short: "DA" },
  en: { html: "en", og: "en_GB", label: "English", short: "EN" },
};

export function hasLocale(value: string | undefined | null): value is Locale {
  return locales.includes(value as Locale);
}

export function localePath(locale: Locale, href: string) {
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return href;
  }

  const hashIndex = href.indexOf("#");
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
  const withoutHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const queryIndex = withoutHash.indexOf("?");
  const search = queryIndex >= 0 ? withoutHash.slice(queryIndex) : "";
  const pathname = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;
  const nextPath = pathname === "/" || pathname === "" ? `/${locale}` : `/${locale}${pathname}`;
  return `${nextPath}${search}${hash}`;
}

export function replaceLocale(pathname: string, locale: Locale) {
  const parts = pathname.split("/");
  if (parts.length > 1 && hasLocale(parts[1])) {
    parts[1] = locale;
    return parts.join("/") || `/${locale}`;
  }
  return `/${locale}${pathname === "/" ? "" : pathname}`;
}

export function preferredLocale(header: string | null, cookie?: string | null): Locale {
  if (hasLocale(cookie)) return cookie;

  const ranked = (header ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.split("-")[0]?.toLowerCase() ?? "", q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    if (hasLocale(tag)) return tag;
  }

  return defaultLocale;
}
