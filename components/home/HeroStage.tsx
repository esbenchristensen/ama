"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useId, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { LazyPreviewVideo } from "@/components/home/LazyPreviewVideo";
import { PlayBadge } from "@/components/home/PlayBadge";
import { videoMedia } from "@/content/site";

const VideoLightbox = dynamic(
  () =>
    import("@/components/home/VideoLightbox").then((mod) => ({
      default: mod.VideoLightbox,
    })),
  { ssr: false },
);

export function HeroStage() {
  const { dict } = useI18n();
  const clips = dict.hero.clips;
  const titleId = useId();
  const [open, setOpen] = useState<(typeof clips)[number] | null>(null);
  const first = videoMedia[clips[0].src];
  const second = videoMedia[clips[1].src];

  return (
    <>
      <div className="relative mx-auto h-[24.5rem] w-full max-w-[42rem] sm:h-[26rem] md:h-[90%] md:min-h-[26rem] md:max-h-[40rem]">
        <div className="absolute right-[2%] top-[6%] h-[80%] w-[70%] rotate-6 overflow-hidden rounded-[2.5rem] bg-ama-red ring-2 ring-ama-red">
          <Image
            src="/media/punch-pads.jpg"
            alt=""
            fill
            quality={70}
            sizes="(max-width: 768px) 70vw, 28vw"
            className="object-cover"
          />
        </div>

        <button
          type="button"
          onClick={() => setOpen(clips[0])}
          className="ama-ring absolute left-0 top-0 h-[90%] w-[78%] cursor-pointer rounded-[2rem] border-0 bg-transparent p-0 text-left"
          aria-label={`${dict.ui.playWithSound}: ${clips[0].title}`}
        >
          <span className="relative block h-full w-full overflow-hidden rounded-[2rem] bg-bg">
            <LazyPreviewVideo
              src={first?.preview ?? clips[0].src}
              poster={first?.poster ?? "/media/kristoffer-poster.jpg"}
              priority
              sizes="(max-width: 768px) 78vw, 36vw"
            />
            <span className="overlay-photo-soft" />
            <PlayBadge />
          </span>
        </button>

        <button
          type="button"
          onClick={() => setOpen(clips[1])}
          className="absolute bottom-0 right-0 h-[68%] w-[54%] cursor-pointer overflow-hidden rounded-[1.75rem] border-0 bg-transparent p-0 text-left ring-4 ring-bg sm:h-[58%] sm:w-[56%] md:h-[52%] md:w-[58%]"
          aria-label={`${dict.ui.playWithSound}: ${clips[1].title}`}
        >
          <LazyPreviewVideo
            src={second?.preview ?? clips[1].src}
            poster={second?.poster ?? "/media/hero-clip-a-poster.jpg"}
            sizes="(max-width: 768px) 54vw, 24vw"
            objectClass="object-cover object-[center_18%]"
          />
          <span className="overlay-photo-soft" />
          <PlayBadge size="sm" />
        </button>
      </div>

      {open ? (
        <VideoLightbox
          src={open.src}
          poster={videoMedia[open.src]?.poster}
          title={open.title}
          titleId={titleId}
          onClose={() => setOpen(null)}
        />
      ) : null}
    </>
  );
}
