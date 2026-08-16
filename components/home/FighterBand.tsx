"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import { useI18n } from "@/components/I18nProvider";
import { Shell } from "@/components/Shell";

const ROTATE_MS = 5000;
const pendingNames = new Set(["Navn følger", "Kæmper", "Name follows", "Fighter"]);

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function reducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function splitName(name: string) {
  if (pendingNames.has(name)) {
    return { first: "", last: name };
  }
  const parts = name.trim().split(/\s+/);
  return {
    first: parts.slice(0, -1).join(" "),
    last: parts.at(-1) ?? name,
  };
}

export function FighterBand() {
  const { dict, href } = useI18n();
  const { fighter } = dict;
  const roster = fighter.fighters;
  const count = roster.length;
  const headingId = useId();
  const panelId = useId();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    reducedMotionSnapshot,
    () => false,
  );

  useEffect(() => {
    if (reducedMotion || paused) return;
    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % count);
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [active, paused, reducedMotion]);

  const person = roster[active] ?? roster[0];
  const { first, last } = splitName(person.name);

  function onStageKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => (index + 1) % count);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => (index - 1 + count) % count);
    }
  }

  return (
    <section
      id="kaempere"
      className="section-y"
      aria-labelledby={headingId}
    >
      <Shell>
        <div
          className="relative overflow-hidden rounded-[2rem] bg-[#070707] text-[#f3f2ee]"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => setPaused(false)}
        >
          <div
            className="grid min-h-[32rem] lg:min-h-[38rem] lg:grid-cols-[minmax(16rem,0.82fr)_minmax(0,1.18fr)]"
            role="group"
            aria-label={fighter.pickLabel}
            onKeyDown={onStageKeyDown}
          >
            <div className="relative z-20 flex flex-col px-6 pt-6 pb-3 sm:px-8 sm:pt-8 lg:pb-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ama-red">
                {fighter.eyebrow}
              </p>
              <h2
                id={headingId}
                className="mt-2 font-display text-4xl leading-none sm:text-5xl"
              >
                {fighter.headline}
              </h2>
              <p className="mt-3 max-w-sm text-base leading-relaxed text-white/60">
                {fighter.body}
              </p>

              <ol className="-mx-6 mt-5 flex gap-1 overflow-x-auto overscroll-x-contain px-6 pb-1 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:mt-8 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
                {roster.map((member, index) => {
                  const selected = index === active;
                  const label = splitName(member.name);
                  return (
                    <li key={member.image} className="shrink-0 lg:shrink">
                      <button
                        type="button"
                        aria-pressed={selected}
                        aria-controls={panelId}
                        onClick={() => setActive(index)}
                        className={`flex items-baseline gap-2 border-0 bg-transparent px-3 py-2 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ama-red lg:w-full lg:gap-3 lg:px-0 lg:py-1.5 ${
                          selected ? "text-white" : "text-white/35 hover:text-white/70"
                        }`}
                      >
                        <span
                          className={`font-display text-sm ${
                            selected ? "text-ama-red" : "text-white/25"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-display text-lg leading-none uppercase tracking-wide sm:text-xl lg:text-2xl">
                            {label.last}
                          </span>
                          {label.first ? (
                            <span className="mt-0.5 block text-[10px] uppercase tracking-[0.16em] text-current/70 lg:text-[11px]">
                              {label.first}
                            </span>
                          ) : null}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-3 hidden items-center gap-4 lg:mt-8 lg:flex lg:flex-col lg:items-start">
                <a
                  href={href(fighter.ctaHref)}
                  className="text-sm font-semibold text-white/80 underline-offset-4 hover:text-white hover:underline"
                >
                  {fighter.cta}
                </a>
                <p className="text-[11px] uppercase tracking-[0.14em] text-white/35">
                  {fighter.photoCredit}
                </p>
              </div>
            </div>

            <div className="relative min-h-[24rem] sm:min-h-[28rem]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,color-mix(in_srgb,#c47a3a_22%,var(--ama-red)_18%)_0%,transparent_58%)]"
              />

              <p
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-[8%] z-0 text-center font-display text-[clamp(4.5rem,16vw,9.5rem)] leading-[0.78] uppercase text-transparent [text-stroke:1.5px_rgb(243_242_238_/_0.14)] [-webkit-text-stroke:1.5px_rgb(243_242_238_/_0.14)]"
              >
                {last}
              </p>

              <div className="absolute inset-x-[8%] bottom-0 top-8 z-10 sm:inset-x-[12%] sm:top-6">
                <Image
                  key={person.image}
                  src={person.image}
                  alt={person.name}
                  fill
                  quality={80}
                  className="fighter-body object-contain object-bottom"
                  sizes="(max-width: 1024px) 90vw, 520px"
                />
              </div>

              <div
                id={panelId}
                aria-live="polite"
                className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black via-black/80 to-transparent px-6 pb-6 pt-24 sm:px-8"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ama-red">
                  {person.role}
                  <span className="text-white/35"> · {fighter.country}</span>
                </p>
                {first ? (
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                    {first}
                  </p>
                ) : null}
                <p className="font-display text-5xl leading-none uppercase sm:text-6xl lg:text-7xl">
                  {last}
                </p>
                <p className="mt-3 max-w-md text-base text-white/70">
                  {person.titles.length > 0
                    ? person.titles.join(" · ")
                    : person.body}
                </p>
                <div className="mt-4 flex items-center gap-4 lg:hidden">
                  <a
                    href={href(fighter.ctaHref)}
                    className="text-sm font-semibold text-white underline-offset-4 hover:underline"
                  >
                    {fighter.cta}
                  </a>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">
                    {fighter.photoCredit}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
