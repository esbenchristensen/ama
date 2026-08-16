"use client";

import { Button } from "@/components/Button";
import { useI18n } from "@/components/I18nProvider";
import { Shell } from "@/components/Shell";
import { site } from "@/content/site";

export function StartSteps() {
  const { dict } = useI18n();
  const { startSteps } = dict;

  return (
    <section id="proeve" className="section-y">
      <Shell>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ama-red">
            {startSteps.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl leading-none text-fg sm:text-5xl lg:text-6xl">
            {startSteps.title}
          </h2>
        </div>

        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {startSteps.items.map((item) => (
            <li key={item.step}>
              <span className="font-display text-2xl text-ama-red sm:text-3xl">
                {String(item.step).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-2xl text-fg">{item.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted">
                {item.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <Button href={site.conventus.trial}>{dict.hero.cta}</Button>
        </div>
      </Shell>
    </section>
  );
}
