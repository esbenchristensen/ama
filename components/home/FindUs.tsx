import Image from "next/image";
import { Button } from "@/components/Button";
import { Shell } from "@/components/Shell";
import { findUs, geo, site } from "@/content/site";

export function FindUs() {
  return (
    <section
      id="om"
      className="section-y"
      aria-labelledby="om-heading"
    >
      <Shell>
        <div className="grid items-stretch gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-surface px-6 py-8 sm:px-8 sm:py-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ama-red">
              {findUs.eyebrow}
            </p>
            <h2
              id="om-heading"
              className="mt-2 font-display text-4xl text-fg sm:text-5xl"
            >
              {findUs.title}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted">{findUs.body}</p>
            <address className="mt-8 not-italic">
              <p className="font-display text-3xl text-fg">{site.address.line1}</p>
              <p className="mt-1 text-muted">{site.address.line2}</p>
            </address>
            <p className="mt-3 text-base text-faint">{findUs.reception}</p>
            <div className="mt-7">
              <Button href={`mailto:${site.email}`} variant="ghost">
                Skriv til os
              </Button>
            </div>
          </div>

          <div className="relative min-h-80 overflow-hidden rounded-[2rem] sm:min-h-[28rem]">
            <Image
              src="/media/nordkraft.png"
              alt="Nordkraft i Aalborg, hvor Aalborg Martial Arts træner"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 680px"
            />
            <div className="overlay-nordkraft" />
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-3">
              <p className="font-display text-3xl text-white sm:text-4xl">Nordkraft</p>
              <a
                className="rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-black"
                href={geo.maps}
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Maps
              </a>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
