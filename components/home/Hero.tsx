"use client";

import Image from "next/image";
import { Button } from "@/components/Button";
import { useI18n } from "@/components/I18nProvider";
import { HeroStage } from "@/components/home/HeroStage";
import { Shell } from "@/components/Shell";
import { site } from "@/content/site";

export function Hero() {
  const { dict, href } = useI18n();
  const { hero } = dict;

  return (
    <section className="flex min-h-0 flex-1 flex-col justify-center py-6 sm:py-8">
      <Shell className="flex w-full flex-1 flex-col justify-center">
        <div className="grid flex-1 items-center gap-6 md:grid-cols-[minmax(22rem,1.1fr)_minmax(0,1fr)] md:gap-8 lg:gap-10">
          <div className="flex min-w-0 flex-col justify-center">
            <p className="inline-flex w-fit self-start rounded-full bg-ama-red/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-ama-red">
              {hero.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-[3.25rem] leading-[0.96] text-fg sm:mt-5 sm:text-7xl md:text-[clamp(3.1rem,6vw,5.75rem)] lg:text-[6rem]">
              <span className="block whitespace-nowrap">{hero.title}</span>
              <span className="mt-1 block whitespace-nowrap text-ama-red">
                {hero.titleAccent}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-fg/75">
              {dict.site.tagline}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
              <Button href={site.conventus.trial} className="w-full px-6 py-3.5 text-base sm:w-auto">
                {hero.cta}
              </Button>
              <Button href={href("/#tryghed")} variant="ghost" className="w-full px-6 py-3.5 text-base sm:w-auto">
                {hero.secondary}
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["/media/guard.jpg", "/media/fairtex.jpg", "/media/kick-ring.jpg"].map(
                  (src) => (
                    <span
                      key={src}
                      className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-bg"
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        quality={40}
                        className="object-cover"
                        sizes="36px"
                      />
                    </span>
                  ),
                )}
              </div>
              <p className="text-base text-muted">{hero.proof}</p>
            </div>
          </div>

          <HeroStage />
        </div>
      </Shell>
    </section>
  );
}
