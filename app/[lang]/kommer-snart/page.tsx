import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/ComingSoon";
import { getDictionary } from "@/content/dictionary";
import { hasLocale } from "@/lib/i18n";

type Search = Promise<{ side?: string | string[] }>;

function topicFrom(raw: string | string[] | undefined) {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value || value.length === 0 || value.length > 60) return undefined;
  return value;
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Search;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const topic = topicFrom((await searchParams).side);
  const topicLabel =
    topic && topic in dict.comingSoon.topics
      ? dict.comingSoon.topics[topic as keyof typeof dict.comingSoon.topics]
      : topic;

  return {
    title: topicLabel
      ? `${topicLabel} ${dict.comingSoon.topicLead}`
      : dict.comingSoon.eyebrow,
    description: dict.comingSoon.body,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function ComingSoonPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Search;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const topic = topicFrom((await searchParams).side);
  const topicLabel =
    topic && topic in dict.comingSoon.topics
      ? dict.comingSoon.topics[topic as keyof typeof dict.comingSoon.topics]
      : topic;

  return <ComingSoon topic={topicLabel} />;
}
