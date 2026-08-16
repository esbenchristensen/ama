import Image from "next/image";
import { Shell } from "@/components/Shell";
import { doors } from "@/content/site";

export function DoorGrid() {
  return (
    <section
      id="hold"
      className="section-y"
      aria-labelledby="hold-heading"
    >
      <Shell>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ama-red">
            {doors.eyebrow}
          </p>
          <h2
            id="hold-heading"
            className="mt-2 font-display text-4xl text-fg sm:text-5xl lg:text-6xl"
          >
            {doors.title}
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">{doors.lead}</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {doors.items.map((door, i) => (
            <a
              key={door.id}
              id={door.id}
              href={door.href}
              className="group relative min-h-56 scroll-mt-28 overflow-hidden rounded-[1.75rem] sm:min-h-72"
            >
              <Image
                src={door.image}
                alt={`${door.title} hos Aalborg Martial Arts`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 520px"
              />
              <div className="overlay-photo transition-opacity group-hover:opacity-80" />
              <span className="absolute left-6 top-6 font-display text-2xl text-white/45">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative flex h-full min-h-56 flex-col justify-end p-5 sm:min-h-72 sm:p-6">
                <h3 className="font-display text-3xl text-white sm:text-4xl">
                  {door.title}
                </h3>
                <p className="mt-2 max-w-sm text-base text-white/70">{door.description}</p>
              </div>
            </a>
          ))}
        </div>
      </Shell>
    </section>
  );
}
