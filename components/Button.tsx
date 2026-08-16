import type { ComponentProps } from "react";

type Variant = "primary" | "ghost" | "outline" | "white";

const variants: Record<Variant, string> = {
  primary:
    "bg-ama-red text-white hover:bg-ama-red-hover border border-transparent",
  ghost:
    "bg-transparent text-fg border border-line hover:border-fg hover:bg-fg hover:text-bg",
  outline:
    "bg-transparent text-ama-red border border-ama-red hover:bg-ama-red hover:text-white",
  white:
    "bg-white text-black hover:bg-white/90 border border-transparent",
};

type ButtonProps = ComponentProps<"a"> & {
  variant?: Variant;
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-base font-semibold tracking-wide transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
