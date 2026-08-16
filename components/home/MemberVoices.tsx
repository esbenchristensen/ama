"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { PlayBadge } from "@/components/home/PlayBadge";
import { Shell } from "@/components/Shell";
import type { Dictionary } from "@/content/dictionary";
import { videoMedia } from "@/content/site";

type Voice = Dictionary["voices"]["items"][number];

function VoiceCard({
  item,
  soundOn,
  playLabel,
  pauseLabel,
  onToggle,
  onStop,
}: {
  item: Voice;
  soundOn: boolean;
  playLabel: string;
  pauseLabel: string;
  onToggle: () => void;
  onStop: () => void;
}) {
  const articleRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stopRef = useRef(onStop);
  const [visible, setVisible] = useState(false);
  const media = videoMedia[item.src];
  const poster = media?.poster;
  const preview = media?.preview ?? item.src;
  const src = soundOn ? item.src : preview;
  stopRef.current = onStop;

  useEffect(() => {
    const node = articleRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          return;
        }
        setVisible(false);
        if (soundOn) stopRef.current();
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [soundOn]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!visible) {
      video.pause();
      return;
    }
    video.muted = !soundOn;
    if (soundOn && video.ended) video.currentTime = 0;
    void video.play().catch(() => {
      if (soundOn) stopRef.current();
    });
  }, [visible, soundOn, src]);

  return (
    <article
      ref={articleRef}
      className="relative aspect-[9/16] w-[min(72vw,19rem)] shrink-0 snap-start overflow-hidden rounded-[1.75rem] bg-black sm:w-auto"
    >
      {poster ? (
        <Image
          src={poster}
          alt=""
          fill
          quality={70}
          sizes="(max-width: 640px) 72vw, 33vw"
          className="object-cover"
        />
      ) : null}
      {visible ? (
        <video
          ref={videoRef}
          key={src}
          className="absolute inset-0 h-full w-full object-cover"
          muted={!soundOn}
          loop={!soundOn}
          playsInline
          preload="none"
          poster={poster}
          onEnded={soundOn ? () => stopRef.current() : undefined}
          aria-hidden
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/15" />
      <button
        type="button"
        onClick={onToggle}
        className="absolute inset-0 z-10 border-0 bg-transparent p-0"
        aria-label={`${soundOn ? pauseLabel : playLabel}: ${item.name}`}
      >
        {soundOn ? null : <PlayBadge size="lg" position="center" />}
      </button>
      <span className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6">
        <span className="block font-display text-2xl leading-none text-white sm:text-3xl">
          {item.name}
        </span>
        <span className="mt-2 block text-base text-white/75">
          {item.sport} · {item.level}
        </span>
      </span>
    </article>
  );
}

export function MemberVoices() {
  const { dict } = useI18n();
  const { voices } = dict;
  const [playingId, setPlayingId] = useState<string | null>(null);

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

        <div className="mt-8 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
          {voices.items.map((item) => (
            <VoiceCard
              key={item.id}
              item={item}
              soundOn={playingId === item.id}
              playLabel={dict.ui.play}
              pauseLabel={dict.ui.pause}
              onStop={() =>
                setPlayingId((current) => (current === item.id ? null : current))
              }
              onToggle={() =>
                setPlayingId((current) => (current === item.id ? null : item.id))
              }
            />
          ))}
        </div>
      </Shell>
    </section>
  );
}
