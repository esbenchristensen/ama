"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { PlayGlyph } from "@/components/home/PlayBadge";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60);
  return `${minutes}:${rest.toString().padStart(2, "0")}`;
}

function PauseGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M7 5.5h3.4v13H7zM13.6 5.5H17v13h-3.4z" fill="currentColor" />
    </svg>
  );
}

function MuteGlyph({ muted, className }: { muted: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M4.5 9.5h3.2L12 6.2v11.6L7.7 14.5H4.5V9.5Z"
        fill="currentColor"
      />
      {muted ? (
        <path
          d="m16 9 5 6M21 9l-5 6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M15.4 9.2a4.2 4.2 0 0 1 0 5.6M17.8 7a7 7 0 0 1 0 10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export function VideoLightbox({
  src,
  poster,
  title,
  titleId,
  label,
  onClose,
}: {
  src: string;
  poster?: string;
  title: string;
  titleId: string;
  label?: string;
  onClose: () => void;
}) {
  const { dict } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimer = useRef<number>(0);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [controls, setControls] = useState(true);

  const showControls = useCallback(() => {
    setControls(true);
    window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      if (!videoRef.current?.paused) setControls(false);
    }, 2200);
  }, []);

  useEffect(() => {
    showControls();
    return () => window.clearTimeout(hideTimer.current);
  }, [showControls]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
    } else {
      video.pause();
    }
    showControls();
  }, [showControls]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    showControls();
  }, [showControls]);

  const seekTo = useCallback(
    (ratio: number) => {
      const video = videoRef.current;
      if (!video || !Number.isFinite(video.duration)) return;
      video.currentTime = Math.min(
        video.duration,
        Math.max(0, ratio * video.duration),
      );
    },
    [],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === " " || event.key === "k") {
        event.preventDefault();
        togglePlay();
      }
      if (event.key === "m") toggleMute();
      if (event.key === "ArrowRight") {
        const video = videoRef.current;
        if (video) video.currentTime = Math.min(video.duration, video.currentTime + 5);
      }
      if (event.key === "ArrowLeft") {
        const video = videoRef.current;
        if (video) video.currentTime = Math.max(0, video.currentTime - 5);
      }
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose, toggleMute, togglePlay]);

  const progress = duration > 0 ? current / duration : 0;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/78 p-4 backdrop-blur-md"
      onClick={onClose}
      onMouseMove={showControls}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="ama-ring relative w-full max-w-5xl rounded-[1.75rem]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-[1.75rem] bg-black">
          <h2 id={titleId} className="sr-only">
            {title}
          </h2>
          <video
            ref={videoRef}
            key={src}
            className="max-h-[78dvh] w-full bg-black"
            autoPlay
            playsInline
            preload="metadata"
            poster={poster}
            onClick={togglePlay}
            onPlay={() => setPlaying(true)}
            onPause={() => {
              setPlaying(false);
              setControls(true);
            }}
            onTimeUpdate={(event) => setCurrent(event.currentTarget.currentTime)}
            onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
            onEnded={() => {
              setPlaying(false);
              setControls(true);
            }}
          >
            <source src={src} type="video/mp4" />
          </video>

          <div
            className={`pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/70 transition-opacity duration-300 ${
              controls ? "opacity-100" : "opacity-0"
            }`}
          />

          <div
            className={`absolute left-4 top-4 z-10 flex items-center gap-2 transition-opacity duration-300 ${
              controls ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={togglePlay}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-ama-red text-white shadow-[0_10px_24px_rgba(0,0,0,0.4)] ring-2 ring-white/20 transition hover:bg-ama-red-hover"
              aria-label={playing ? dict.ui.pause : dict.ui.play}
            >
              {playing ? (
                <PauseGlyph className="h-5 w-5" />
              ) : (
                <PlayGlyph className="ml-0.5 h-5 w-5" />
              )}
            </button>
            <p className="hidden rounded-full bg-black/45 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm sm:block">
              {label ?? "Aalborg Martial Arts"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-sm transition hover:bg-white hover:text-black ${
              controls ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-label={dict.ui.closeVideo}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
              <path
                d="M7 7l10 10M17 7 7 17"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div
            className={`absolute inset-x-0 bottom-0 z-10 px-4 pb-4 pt-10 transition-opacity duration-300 ${
              controls ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="min-w-[2.5rem] text-xs font-semibold tabular-nums text-white/80">
                {formatTime(current)}
              </span>
              <label className="relative block min-w-0 flex-1">
                <span className="sr-only">{dict.ui.seek}</span>
                <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white/20" />
                <span
                  className="absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-full bg-ama-red"
                  style={{ width: `${progress * 100}%` }}
                />
                <input
                  type="range"
                  min={0}
                  max={1000}
                  value={Math.round(progress * 1000)}
                  onChange={(event) => seekTo(Number(event.target.value) / 1000)}
                  className="ama-seek relative z-10 h-5 w-full cursor-pointer appearance-none bg-transparent"
                />
              </label>
              <span className="min-w-[2.5rem] text-right text-xs font-semibold tabular-nums text-white/80">
                {formatTime(duration)}
              </span>
              <button
                type="button"
                onClick={toggleMute}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-sm hover:bg-white hover:text-black"
                aria-label={muted ? dict.ui.unmute : dict.ui.mute}
              >
                <MuteGlyph muted={muted} className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
