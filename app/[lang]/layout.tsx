import type { Metadata } from "next";
import { Anton, DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { I18nProvider } from "@/components/I18nProvider";
import { ThemeScript } from "@/components/ThemeScript";
import { getDictionary } from "@/content/dictionary";
import { origin, site } from "@/content/site";
import { hasLocale, localeMeta, locales } from "@/lib/i18n";
import "../globals.css";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const dynamicParams = false;

type LangParams = { params: Promise<{ lang: string }> };

export async function generateMetadata({
  params,
}: LangParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const languages = Object.fromEntries(
    locales.map((locale) => [locale, `/${locale}`]),
  );

  return {
    metadataBase: new URL(origin),
    title: {
      default: dict.seo.title,
      template: `%s · ${site.shortName}`,
    },
    description: dict.seo.description,
    applicationName: site.name,
    keywords: [...dict.seo.keywords],
    authors: [{ name: site.name, url: origin }],
    creator: site.name,
    publisher: site.name,
    category: "sports",
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ...languages,
        "x-default": "/da",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: localeMeta[lang].og,
      url: `/${lang}`,
      siteName: site.name,
      title: dict.seo.title,
      description: dict.seo.description,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.seo.title,
      description: dict.seo.description,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LangParams & { children: React.ReactNode }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html
      lang={localeMeta[lang].html}
      data-theme="dark"
      data-theme-pref="dark"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col bg-bg text-fg">
        <I18nProvider locale={lang} dict={dict}>
          <div className="grain" aria-hidden />
          <Header />
          <main className="relative z-10 flex-1 overflow-x-clip">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
