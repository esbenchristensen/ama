"use client";

import { Button } from "@/components/Button";
import { useI18n } from "@/components/I18nProvider";
import { Shell } from "@/components/Shell";

export default function NotFound() {
  const { dict, href } = useI18n();

  return (
    <section className="flex min-h-[calc(100dvh-8rem)] items-center py-16">
      <Shell>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ama-red">
          404
        </p>
        <h1 className="mt-3 font-display text-5xl leading-none text-fg sm:text-6xl">
          {dict.comingSoon.title}
        </h1>
        <div className="mt-8">
          <Button href={href("/")}>{dict.comingSoon.home}</Button>
        </div>
      </Shell>
    </section>
  );
}
