import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Svg(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    />
  );
}

export const icons = {
  user: (props: IconProps) => (
    <Svg {...props}>
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="8" r="4" />
    </Svg>
  ),
  users: (props: IconProps) => (
    <Svg {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </Svg>
  ),
  flame: (props: IconProps) => (
    <Svg {...props}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1.5-3.5S8 5.5 9 4c2 2 6 4 6 8a5 5 0 1 1-10 0c0-1.5.5-2.5 1.5-3.5" />
    </Svg>
  ),
  trophy: (props: IconProps) => (
    <Svg {...props}>
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M17 6h2a2 2 0 0 1 0 4h-2" />
      <path d="M7 6H5a2 2 0 0 0 0 4h2" />
    </Svg>
  ),
  steps: (props: IconProps) => (
    <Svg {...props}>
      <path d="M4 17h4v4H4z" />
      <path d="M10 11h4v10h-4z" />
      <path d="M16 5h4v16h-4z" />
    </Svg>
  ),
  help: (props: IconProps) => (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 3.2 2.4c-.7.3-1.2.9-1.2 1.6V14" />
      <path d="M12 17h.01" />
    </Svg>
  ),
  tag: (props: IconProps) => (
    <Svg {...props}>
      <path d="M12 3H5a2 2 0 0 0-2 2v7l9.6 9.6a2 2 0 0 0 2.8 0L21.6 15a2 2 0 0 0 0-2.8L12 3Z" />
      <circle cx="7.5" cy="7.5" r="1" />
    </Svg>
  ),
  pin: (props: IconProps) => (
    <Svg {...props}>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Svg>
  ),
  medal: (props: IconProps) => (
    <Svg {...props}>
      <circle cx="12" cy="14" r="5" />
      <path d="m8 4 4 4 4-4" />
    </Svg>
  ),
  handshake: (props: IconProps) => (
    <Svg {...props}>
      <path d="M8 13 5 10l4-4 3 3 3-3 4 4-3 3" />
      <path d="m12 9 2.5 2.5" />
      <path d="M8 13v5" />
      <path d="M16 13v5" />
    </Svg>
  ),
  calendar: (props: IconProps) => (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
    </Svg>
  ),
} as const;

export type IconName = keyof typeof icons;

export function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName;
  className?: string;
}) {
  const Glyph = icons[name];
  return <Glyph className={className} />;
}
