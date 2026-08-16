"use client";

import Image from "next/image";
import { Button } from "@/components/Button";
import { useI18n } from "@/components/I18nProvider";
import { Shell } from "@/components/Shell";
import { site } from "@/content/site";

export function SponsorRow() {
  const { dict, href } = useI18n();
  const { sponsors } = dict;

  return (
    <section
      id="sponsorer"
      className="section-y"
      aria-labelledby="sponsorer-heading"
    >
      <Shell>
        <div className="overflow-hidden rounded-[2rem] bg-surface px-5 py-9 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ama-red">
                {sponsors.eyebrow}
              </p>
              <h2
                id="sponsorer-heading"
                className="mt-2 font-display text-4xl text-fg sm:text-5xl lg:text-6xl"
              >
                {sponsors.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {sponsors.lead}
              </p>
              <p className="mt-3 text-base font-semibold text-fg">{sponsors.thanks}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={href(sponsors.ctaHref)}>{sponsors.cta}</Button>
              <Button href={`mailto:${site.email}`} variant="ghost">
                {sponsors.write}
              </Button>
            </div>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {sponsors.items.map((sponsor) => {
              const external = sponsor.href.startsWith("http");
              return (
                <li key={sponsor.name}>
                  <a
                    href={href(sponsor.href)}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex h-full min-h-56 flex-col justify-between rounded-[1.75rem] bg-bg px-6 py-7 transition-colors hover:bg-ama-red sm:min-h-64 sm:px-8 sm:py-8"
                  >
                    <span className="flex items-center gap-3">
                      <span className="inline-flex h-11 w-14 shrink-0 items-center justify-center rounded-xl bg-white px-1.5">
                        <Image
                          src={sponsor.logo}
                          alt=""
                          width={80}
                          height={44}
                          className="h-8 w-auto max-w-full object-contain"
                        />
                      </span>
                      <p className="font-display text-3xl leading-none text-fg group-hover:text-white sm:text-4xl">
                        {sponsor.name}
                      </p>
                    </span>
                    <p className="mt-8 max-w-sm text-base leading-relaxed text-muted group-hover:text-white/80">
                      {sponsor.body}
                    </p>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Shell>
    </section>
  );
}
