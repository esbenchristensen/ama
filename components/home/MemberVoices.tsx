"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { PlayBadge } from "@/components/home/PlayBadge";
import { Shell } from "@/components/Shell";
import type { Dictionary } from "@/content/dictionary";
import { videoMedia } from "@/content/site";

type Voice = Dictionary["voices"]["items"][number];

const liveVideos = new Set<HTMLVideoElement>();

function pauseOthers(except: HTMLVideoElement | null) {
  for (const video of liveVideos) {
    if (video !== except) video.pause();
  }
}

function srcOf(video: HTMLVideoElement) {
  return video.getAttribute("src") ?? video.currentSrc;
}

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
  const soundOnRef = useRef(soundOn);
  const stopRef = useRef(onStop);
  const [visible, setVisible] = useState(false);
  const [pending, setPending] = useState(false);
  const media = videoMedia[item.src];
  const poster = media?.poster;
  const preview = media?.preview ?? item.src;
  const full = item.src;

  useEffect(() => {
    soundOnRef.current = soundOn;
    stopRef.current = onStop;
  }, [soundOn, onStop]);

  useEffect(() => {
    const node = articleRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.2) {
          setVisible(true);
          return;
        }
        setVisible(false);
        setPending(false);
        if (soundOnRef.current) stopRef.current();
      },
      { threshold: [0, 0.2, 0.5] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    liveVideos.add(video);
    return () => {
      liveVideos.delete(video);
      video.pause();
    };
  }, [visible]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!visible) {
      video.pause();
      return;
    }
    if (soundOn) return;
    video.muted = true;
    video.loop = true;
    if (srcOf(video) !== preview) video.src = preview;
    void video.play().catch(() => {});
  }, [visible, soundOn, preview]);

  function handleToggle() {
    const video = videoRef.current;
    if (!video) {
      onToggle();
      return;
    }

    if (soundOn) {
      video.pause();
      video.muted = true;
      video.loop = true;
      if (srcOf(video) !== preview) video.src = preview;
      if (visible) void video.play().catch(() => {});
      setPending(false);
      onStop();
      return;
    }

    pauseOthers(video);
    video.muted = false;
    video.loop = false;
    if (srcOf(video) !== full) video.src = full;
    setPending(true);
    void video.play().catch(() => {
      setPending(false);
      onStop();
    });
    onToggle();
  }

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
          className="absolute inset-0 h-full w-full object-cover"
          muted={!soundOn}
          loop={!soundOn}
          playsInline
          preload="metadata"
          poster={poster}
          onPlaying={() => setPending(false)}
          onWaiting={() => {
            if (soundOnRef.current) setPending(true);
          }}
          onEnded={() => {
            if (soundOnRef.current) {
              setPending(false);
              stopRef.current();
            }
          }}
          aria-hidden
        />
      ) : null}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/15" />
      <button
        type="button"
        onClick={handleToggle}
        className="absolute inset-0 z-10 border-0 bg-transparent p-0"
        aria-label={`${soundOn ? pauseLabel : playLabel}: ${item.name}`}
      >
        {soundOn ? null : <PlayBadge size="lg" position="center" />}
      </button>
      {pending ? (
        <span className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/25 border-t-white motion-safe:animate-spin" />
      ) : null}
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

        <div className="mt-8 -mr-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pr-4 pb-1 [scrollbar-width:none] sm:mr-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pr-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
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
