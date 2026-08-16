"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function LazyPreviewVideo({
  src,
  poster,
  priority = false,
  sizes,
  objectClass = "object-cover",
}: {
  src: string;
  poster: string;
  priority?: boolean;
  sizes: string;
  objectClass?: string;
}) {
  const hostRef = useRef<HTMLSpanElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setLoad(true);
        observer.disconnect();
      },
      { rootMargin: "120px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={hostRef} className="absolute inset-0 block">
      <Image
        src={poster}
        alt=""
        fill
        priority={priority}
        quality={70}
        sizes={sizes}
        className={objectClass}
      />
      {load ? (
        <video
          className={`absolute inset-0 h-full w-full ${objectClass}`}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          aria-hidden
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
    </span>
  );
}
