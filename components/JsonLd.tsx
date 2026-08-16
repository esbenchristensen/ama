import { buildJsonLd } from "@/lib/json-ld";

export function JsonLd() {
  const data = buildJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
