import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";
import { comingSoon } from "@/content/site";

type Search = Promise<{ side?: string | string[] }>;

function topicFrom(raw: string | string[] | undefined) {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value || value.length === 0 || value.length > 60) return undefined;
  return value;
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Search;
}): Promise<Metadata> {
  const topic = topicFrom((await searchParams).side);
  return {
    title: topic ? `${topic} kommer snart` : comingSoon.eyebrow,
    description: comingSoon.body,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function ComingSoonPage({
  searchParams,
}: {
  searchParams: Search;
}) {
  const topic = topicFrom((await searchParams).side);
  return <ComingSoon topic={topic} />;
}
