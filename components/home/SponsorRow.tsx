"use client";

import Image from "next/image";
import { useI18n } from "@/components/I18nProvider";
import { Shell } from "@/components/Shell";

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
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ama-red">
              {sponsors.eyebrow}
            </p>
            <h2
              id="sponsorer-heading"
              className="mt-2 font-display text-4xl text-fg sm:text-5xl"
            >
              {sponsors.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">
              {sponsors.lead}
            </p>
          </div>
          <a
            href={href(sponsors.ctaHref)}
            className="text-sm font-semibold text-ama-red"
          >
            {sponsors.cta}
          </a>
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {sponsors.items.map((sponsor) => {
            const external = sponsor.href.startsWith("http");
            return (
              <li key={sponsor.name}>
                <a
                  href={href(sponsor.href)}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="flex h-24 items-center justify-center rounded-[1.5rem] bg-surface px-5 transition-colors hover:bg-bg"
                >
                  <span className="inline-flex h-12 w-full max-w-[9rem] items-center justify-center rounded-xl bg-white px-3">
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={144}
                      height={48}
                      className="h-8 w-auto max-w-full object-contain"
                    />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </Shell>
    </section>
  );
}
