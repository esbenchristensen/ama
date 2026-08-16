"use client";

import { useId, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { Shell } from "@/components/Shell";

export function Faq() {
  const { dict } = useI18n();
  const { faq } = dict;
  const [openId, setOpenId] = useState<string | null>(null);
  const baseId = useId();

  return (
    <section id="faq" className="section-y" aria-labelledby="faq-heading">
      <Shell>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ama-red">
            {faq.eyebrow}
          </p>
          <h2
            id="faq-heading"
            className="mt-2 font-display text-4xl text-fg sm:text-5xl lg:text-6xl"
          >
            {faq.title}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            {faq.lead}
          </p>
        </div>

        <div className="mt-8">
          {faq.groups.map((group) => (
            <div key={group.id} className="mt-8 first:mt-0">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ama-red">
                {group.title}
              </h3>
              <ul className="mt-3 divide-y divide-line border-y border-line">
                {group.items.map((item) => {
                  const open = openId === item.id;
                  const panelId = `${baseId}-${item.id}`;
                  const buttonId = `${panelId}-button`;

                  return (
                    <li key={item.id}>
                      <h4 className="m-0">
                        <button
                          type="button"
                          id={buttonId}
                          className="flex w-full items-start justify-between gap-4 py-4 text-left"
                          aria-expanded={open}
                          aria-controls={panelId}
                          onClick={() => setOpenId(open ? null : item.id)}
                        >
                          <span className="text-base font-medium leading-snug text-fg">
                            {item.q}
                          </span>
                          <span
                            className="mt-0.5 shrink-0 text-lg leading-none text-ama-red"
                            aria-hidden
                          >
                            {open ? "-" : "+"}
                          </span>
                        </button>
                      </h4>
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        hidden={!open}
                        className="pb-5"
                      >
                        <p className="max-w-xl text-base leading-relaxed text-muted">{item.a}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </Shell>
    </section>
  );
}
