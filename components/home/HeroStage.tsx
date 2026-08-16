"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { PlayBadge, VideoLightbox } from "@/components/home/VideoLightbox";

const clips = [
  {
    src: "/media/kristoffer.mp4",
    title: "Træning hos Aalborg Martial Arts i Nordkraft",
  },
  {
    src: "/media/hero-clip-a.mp4",
    title: "Kampsportstræning hos Aalborg Martial Arts",
  },
] as const;

function PreviewClip({ src }: { src: string }) {
  return (
    <video
      className="h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      aria-hidden
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}

export function HeroStage() {
  const titleId = useId();
  const [open, setOpen] = useState<(typeof clips)[number] | null>(null);

  return (
    <>
      <div className="relative mx-auto h-[22rem] w-full max-w-[42rem] sm:h-[26rem] md:h-[90%] md:min-h-[26rem] md:max-h-[40rem]">
        <div className="absolute right-[2%] top-[6%] h-[80%] w-[70%] rotate-6 overflow-hidden rounded-[2.5rem] bg-ama-red ring-2 ring-ama-red">
          <Image
            src="/media/punch-pads.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="40vw"
          />
        </div>

        <button
          type="button"
          onClick={() => setOpen(clips[0])}
          className="ama-ring absolute left-0 top-0 h-[90%] w-[78%] cursor-pointer rounded-[2rem] border-0 bg-transparent p-0 text-left"
          aria-label={`Afspil video med lyd: ${clips[0].title}`}
        >
          <span className="relative block h-full w-full overflow-hidden rounded-[2rem] bg-bg">
            <PreviewClip src={clips[0].src} />
            <span className="overlay-photo-soft" />
            <PlayBadge />
          </span>
        </button>

        <button
          type="button"
          onClick={() => setOpen(clips[1])}
          className="absolute bottom-0 right-0 h-[52%] w-[58%] cursor-pointer overflow-hidden rounded-[1.75rem] border-0 bg-transparent p-0 text-left ring-4 ring-bg"
          aria-label={`Afspil video med lyd: ${clips[1].title}`}
        >
          <PreviewClip src={clips[1].src} />
          <span className="overlay-photo-soft" />
          <PlayBadge size="sm" />
        </button>
      </div>

      {open ? (
        <VideoLightbox
          src={open.src}
          title={open.title}
          titleId={titleId}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </>
  );
}
