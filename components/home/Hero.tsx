"use client";

import { Button } from "@/components/Button";
import { useI18n } from "@/components/I18nProvider";
import { HeroStage } from "@/components/home/HeroStage";
import { Shell } from "@/components/Shell";
import { geo, site } from "@/content/site";

function Stars() {
  return (
    <span className="flex gap-0.5 text-ama-red" aria-hidden>
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current">
          <path d="M10 1.6 12.4 7l5.9.5-4.5 3.8 1.4 5.7L10 14.3 4.8 17l1.4-5.7L1.7 7.5 7.6 7 10 1.6Z" />
        </svg>
      ))}
    </span>
  );
}

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
            <div
              id="hero-cta"
              data-cta-primary
              className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Button href={site.conventus.trial} className="w-full px-6 py-3.5 text-base sm:w-auto">
                {hero.cta}
              </Button>
              <Button href={href("/#tryghed")} variant="ghost" className="w-full px-6 py-3.5 text-base sm:w-auto">
                {hero.secondary}
              </Button>
            </div>
            <div className="mt-8 flex flex-col gap-2">
              <a
                href={geo.reviews}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 text-fg transition-colors hover:text-ama-red"
              >
                <span className="font-display text-2xl leading-none">{hero.rating}</span>
                <Stars />
                <span className="text-base text-muted">{hero.ratingMeta}</span>
              </a>
              <p className="text-base text-muted">{hero.proof}</p>
            </div>
          </div>

          <HeroStage />
        </div>
      </Shell>
    </section>
  );
}
