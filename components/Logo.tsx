import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-white.png"
      alt="Aalborg Martial Arts"
      width={280}
      height={119}
      className={`logo-mark h-10 w-auto sm:h-11 ${className}`}
      priority
    />
  );
}
