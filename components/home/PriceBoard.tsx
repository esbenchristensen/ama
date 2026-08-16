"use client";

import { useI18n } from "@/components/I18nProvider";
import { Shell } from "@/components/Shell";
import { pricingTiers } from "@/content/site";

export function PriceBoard() {
  const { dict } = useI18n();
  const { pricing } = dict;
  const tiers = pricing.tiers.map((tier) => ({
    ...tier,
    price: pricingTiers.find((item) => item.id === tier.id)?.price ?? 0,
  }));
  const [senior, ...rest] = tiers;

  return (
    <section
      id="priser"
      className="section-y"
      aria-labelledby="priser-heading"
    >
      <Shell>
        <div className="overflow-hidden rounded-[2rem] bg-surface px-5 py-9 sm:px-8 sm:py-12 lg:px-12 lg:py-14">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ama-red">
              {pricing.eyebrow}
            </p>
            <h2
              id="priser-heading"
              className="mt-2 font-display text-4xl text-fg sm:text-5xl lg:text-6xl"
            >
              {pricing.title}
            </h2>
            <p className="mt-3 text-base text-muted">{pricing.trialLine}</p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)]">
            <div className="ama-ring rounded-[1.75rem]">
              <div className="flex min-h-[18rem] flex-col justify-between bg-ama-red px-7 py-8 text-white sm:min-h-[22rem] sm:px-9 sm:py-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  {senior.label} · {senior.age}
                </p>
                <div>
                  <p className="font-display text-[7.5rem] leading-[0.78] sm:text-[9rem]">
                    {senior.price}
                  </p>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                    {pricing.perMonth}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {rest.map((tier) => (
                <div
                  key={tier.id}
                  className="flex flex-col justify-between rounded-[1.75rem] bg-bg px-6 py-7 sm:min-h-[10.5rem]"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
                    {tier.label} · {tier.age}
                  </p>
                  <div className="mt-6 flex items-end justify-between gap-4">
                    <p className="font-display text-6xl leading-none text-fg sm:text-7xl">
                      {tier.price}
                    </p>
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
                      {pricing.perMonthShort}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ul className="mt-10 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {pricing.included.map((line) => (
              <li key={line} className="flex gap-3 text-base leading-relaxed text-fg/80">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ama-red"
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </Shell>
    </section>
  );
}
