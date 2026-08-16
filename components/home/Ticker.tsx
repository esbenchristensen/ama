"use client";

import { useI18n } from "@/components/I18nProvider";

export function Ticker() {
  const { dict } = useI18n();

  return (
    <div className="ticker-bleed overflow-hidden bg-ama-red">
      <div className="marquee">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex items-center">
            {dict.ticker.map((item) => (
              <li
                key={`${copy}-${item}`}
                className="flex items-center gap-5 px-5 py-2.5 font-display text-xl text-white sm:text-2xl"
              >
                {item}
                <span className="text-white/40" aria-hidden>
                  ·
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
