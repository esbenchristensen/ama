import { getDictionary } from "@/content/dictionary";
import { buildJsonLd } from "@/lib/json-ld";
import type { Locale } from "@/lib/i18n";

export function JsonLd({ locale }: { locale: Locale }) {
  const data = buildJsonLd(locale, getDictionary(locale));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
