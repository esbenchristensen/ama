"use client";

import { Button } from "@/components/Button";
import { useI18n } from "@/components/I18nProvider";
import { Shell } from "@/components/Shell";
import { site } from "@/content/site";

export function ComingSoon({ topic }: { topic?: string }) {
  const { dict, href } = useI18n();
  const title = topic ?? dict.comingSoon.title;

  return (
    <section className="relative flex min-h-[calc(100dvh-8rem)] items-center overflow-hidden py-16 sm:py-20">
      <p
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-8 text-center font-display text-[clamp(4rem,18vw,11rem)] leading-none uppercase text-fg/5"
      >
        {dict.comingSoon.watermark}
      </p>
      <Shell className="relative">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ama-red">
            {dict.comingSoon.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-5xl leading-none text-fg sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-muted">{dict.comingSoon.body}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={site.conventus.trial}>{dict.hero.cta}</Button>
            <Button href={href("/")} variant="ghost">
              {dict.comingSoon.home}
            </Button>
          </div>
        </div>
      </Shell>
    </section>
  );
}
