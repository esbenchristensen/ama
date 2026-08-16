"use client";

import { useId, useState } from "react";
import { PlayBadge, VideoLightbox } from "@/components/home/VideoLightbox";
import { Shell } from "@/components/Shell";
import { voices } from "@/content/site";

type Voice = (typeof voices.items)[number];

function VoiceCard({
  item,
  featured = false,
  onOpen,
}: {
  item: Voice;
  featured?: boolean;
  onOpen: (item: Voice) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={`group relative block w-full overflow-hidden rounded-[1.75rem] border-0 bg-black p-0 text-left ${
        featured
          ? "min-h-[28rem] sm:min-h-[32rem] lg:min-h-full"
          : "min-h-[22rem] sm:min-h-[24rem] lg:min-h-[17.5rem]"
      }`}
      aria-label={`Afspil video med ${item.name}`}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      >
        <source src={item.src} type="video/mp4" />
      </video>
      <span className="overlay-photo-soft" />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />
      <PlayBadge size={featured ? "lg" : "md"} position="center" />
      <span className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
        <span className="block font-display text-2xl leading-none text-white sm:text-3xl">
          {item.name}
        </span>
        <span className="mt-2 block text-base text-white/75">
          {item.sport} · {item.level}
        </span>
      </span>
    </button>
  );
}

export function MemberVoices() {
  const titleId = useId();
  const [open, setOpen] = useState<Voice | null>(null);
  const [featured, ...rest] = voices.items;

  return (
    <section
      id="stemmer"
      className="section-y"
      aria-labelledby="stemmer-heading"
    >
      <Shell>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ama-red">
            {voices.eyebrow}
          </p>
          <h2
            id="stemmer-heading"
            className="mt-2 font-display text-4xl text-fg sm:text-5xl lg:text-6xl"
          >
            {voices.title}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            {voices.lead}
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-stretch">
          <VoiceCard item={featured} featured onOpen={setOpen} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {rest.map((item) => (
              <VoiceCard key={item.src} item={item} onOpen={setOpen} />
            ))}
          </div>
        </div>
      </Shell>

      {open ? (
        <VideoLightbox
          src={open.src}
          title={`${open.name}, ${open.sport}, ${open.level}`}
          titleId={titleId}
          label={open.name}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </section>
  );
}
