import { da } from "@/content/da";
import { en } from "@/content/en";
import { hasLocale } from "@/lib/i18n";
import { notFound } from "next/navigation";

// Add a language: create content/xx.ts as `satisfies Dictionary`,
// add "xx" to locales in lib/i18n.ts, and register it here.
const dictionaries = { da, en } as const;

export type Dictionary = typeof da;

export function getDictionary(locale: string): Dictionary {
  if (!hasLocale(locale)) notFound();
  return dictionaries[locale];
}

export { dictionaries };
