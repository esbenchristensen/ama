"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { PlayBadge } from "@/components/home/PlayBadge";
import { Shell } from "@/components/Shell";
import type { Dictionary } from "@/content/dictionary";
import { videoMedia } from "@/content/site";

type Voice = Dictionary["voices"]["items"][number];

const AUTO_ID = "kristoffer";

function VoiceCard({
  item,
  playing,
  playLabel,
  pauseLabel,
  onToggle,
  onStop,
}: {
  item: Voice;
  playing: boolean;
  playLabel: string;
  pauseLabel: string;
  onToggle: () => void;
  onStop: () => void;
}) {
  const articleRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const stopRef = useRef(onStop);
  const [loaded, setLoaded] = useState(false);
  const poster = videoMedia[item.src]?.poster;
  stopRef.current = onStop;

  useEffect(() => {
    if (playing) setLoaded(true);
  }, [playing]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !loaded) return;
    if (playing) {
      video.muted = false;
      if (video.ended) video.currentTime = 0;
      void video.play().catch(() => {
        stopRef.current();
      });
      return;
    }
    video.pause();
  }, [loaded, playing]);

  useEffect(() => {
    const node = articleRef.current;
    if (!node || !playing) return;
    let visible = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
          return;
        }
        if (visible) stopRef.current();
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [playing]);

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
      {loaded ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          playsInline
          preload="none"
          poster={poster}
          onEnded={() => stopRef.current()}
          aria-hidden
        >
          <source src={item.src} type="video/mp4" />
        </video>
      ) : null}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/15" />
      <button
        type="button"
        onClick={onToggle}
        className="absolute inset-0 z-10 border-0 bg-transparent p-0"
        aria-label={`${playing ? pauseLabel : playLabel}: ${item.name}`}
      >
        {playing ? null : <PlayBadge size="lg" position="center" />}
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
  const sectionRef = useRef<HTMLElement>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlayingId((current) => current ?? AUTO_ID);
          return;
        }
        setPlayingId(null);
      },
      { threshold: 0.18 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
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
              playing={playingId === item.id}
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
