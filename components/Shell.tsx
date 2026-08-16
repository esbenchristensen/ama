import type { ReactNode } from "react";

export function Shell({
  children,
  className = "",
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 ${
        wide ? "max-w-[1440px]" : "max-w-[1240px]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
