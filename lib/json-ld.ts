import type { Dictionary } from "@/content/dictionary";
import { geo, origin, pricingTiers, site } from "@/content/site";
import { localeMeta, type Locale } from "@/lib/i18n";

export function buildJsonLd(locale: Locale, dict: Dictionary) {
  const clubId = `${origin}/${locale}#club`;
  const websiteId = `${origin}/${locale}#website`;
  const faqId = `${origin}/${locale}#faq`;
  const pageUrl = `${origin}/${locale}`;
  const language = localeMeta[locale].og.replace("_", "-");

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: pageUrl,
        name: site.name,
        alternateName: site.shortName,
        description: dict.seo.description,
        inLanguage: language,
        publisher: { "@id": clubId },
      },
      {
        "@type": ["SportsClub", "SportsActivityLocation", "LocalBusiness"],
        "@id": clubId,
        name: site.name,
        alternateName: site.shortName,
        description: dict.seo.description,
        url: pageUrl,
        email: site.email,
        image: `${origin}/opengraph-image`,
        logo: `${origin}/brand/logo-white.png`,
        sameAs: [site.facebook],
        priceRange: "49-249 DKK",
        currenciesAccepted: "DKK",
        areaServed: {
          "@type": "City",
          name: "Aalborg",
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.line1,
          addressLocality: "Aalborg",
          postalCode: "9000",
          addressCountry: "DK",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: geo.latitude,
          longitude: geo.longitude,
        },
        hasMap: geo.maps,
        sport: ["Kickboxing", "Muay Thai", "Boxing", "Mixed Martial Arts"],
        knowsAbout: [...dict.seo.keywords],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: dict.pricing.title,
          itemListElement: dict.pricing.tiers.map((tier) => {
            const price = pricingTiers.find((item) => item.id === tier.id)?.price ?? 0;
            return {
              "@type": "Offer",
              name: `${tier.label} ${tier.age}`,
              price: String(price),
              priceCurrency: "DKK",
              url: `${pageUrl}#priser`,
              description: dict.pricing.offerDescription.replace("{age}", tier.age),
              availability: "https://schema.org/InStock",
            };
          }),
        },
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        url: `${pageUrl}#faq`,
        inLanguage: language,
        mainEntity: dict.faq.groups.flatMap((group) =>
          group.items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        ),
      },
    ],
  };
}
