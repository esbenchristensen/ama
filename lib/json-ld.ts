import { faq, geo, origin, pricing, seo, site } from "@/content/site";

export function buildJsonLd() {
  const clubId = `${origin}/#club`;
  const websiteId = `${origin}/#website`;
  const faqId = `${origin}/#faq`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: origin,
        name: site.name,
        alternateName: site.shortName,
        description: seo.description,
        inLanguage: "da-DK",
        publisher: { "@id": clubId },
      },
      {
        "@type": ["SportsClub", "SportsActivityLocation", "LocalBusiness"],
        "@id": clubId,
        name: site.name,
        alternateName: site.shortName,
        description: seo.description,
        url: origin,
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
        knowsAbout: [
          "Kickboxing",
          "Muay Thai",
          "Boksning",
          "MMA",
          "K1",
          "Kamphold",
          "Landshold",
          "Kampsport for begyndere",
          "Kampsport for øvede",
          "Kick'n Burn",
          "Børnekampsport",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Medlemskab",
          itemListElement: pricing.tiers.map((tier) => ({
            "@type": "Offer",
            name: `${tier.label} ${tier.age}`,
            price: String(tier.price),
            priceCurrency: "DKK",
            url: `${origin}/#priser`,
            description: `Ubegrænset træning i aldersgruppen ${tier.age}. Ingen binding.`,
            availability: "https://schema.org/InStock",
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": faqId,
        url: `${origin}/#faq`,
        mainEntity: faq.groups.flatMap((group) =>
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
