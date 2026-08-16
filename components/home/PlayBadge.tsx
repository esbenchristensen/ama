export function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M7.4 4.15c0-1.18 1.26-1.93 2.3-1.37l12.1 6.55a1.58 1.58 0 0 1 0 2.74l-12.1 6.55c-1.04.56-2.3-.19-2.3-1.37V4.15Z"
      />
    </svg>
  );
}

export function PlayBadge({
  size = "md",
  position = "top-left",
}: {
  size?: "sm" | "md" | "lg";
  position?: "top-left" | "center";
}) {
  const dim = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-16 w-16" : "h-11 w-11";
  const place =
    position === "center"
      ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      : "left-3.5 top-3.5";
  return (
    <span className={`pointer-events-none absolute z-10 ${place} text-white`}>
      <PlayGlyph
        className={`${dim} drop-shadow-[0_6px_16px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:scale-110`}
      />
    </span>
  );
}
