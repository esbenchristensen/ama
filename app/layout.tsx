import type { Metadata } from "next";
import { Anton, Black_Ops_One, DM_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ThemeScript } from "@/components/ThemeScript";
import { origin, seo, site } from "@/content/site";
import "./globals.css";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const logo = Black_Ops_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-logo",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: {
    default: seo.title,
    template: `%s · ${site.shortName}`,
  },
  description: seo.description,
  applicationName: site.name,
  keywords: [...seo.keywords],
  authors: [{ name: site.name, url: origin }],
  creator: site.name,
  publisher: site.name,
  category: "sports",
  alternates: {
    canonical: "/",
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
    locale: "da_DK",
    url: "/",
    siteName: site.name,
    title: seo.title,
    description: seo.description,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="da"
      data-theme="dark"
      data-theme-pref="dark"
      className={`${display.variable} ${logo.variable} ${body.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col bg-bg text-fg">
        <div className="grain" aria-hidden />
        <Header />
        <main className="relative z-10 flex-1 overflow-x-clip">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
