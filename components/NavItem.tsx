import Image from "next/image";
import { Icon, type IconName } from "@/components/icons";

export function NavItem({
  icon,
  label,
  hint,
  href,
  image,
  imageFit = "cover",
  onClick,
}: {
  icon: IconName;
  label: string;
  hint?: string;
  href: string;
  image?: string;
  imageFit?: "cover" | "contain";
  onClick?: () => void;
}) {
  if (image) {
    return (
      <a
        href={href}
        onClick={onClick}
        className="group relative block min-h-48 overflow-hidden rounded-[1.5rem] bg-[#111] sm:min-h-56"
      >
        <Image
          src={image}
          alt=""
          fill
          className={`${
            imageFit === "contain" ? "object-contain object-top" : "object-cover"
          } transition-transform duration-500 group-hover:scale-105`}
          sizes="(max-width: 768px) 100vw, 320px"
        />
        <span className="overlay-photo transition-opacity group-hover:opacity-80" />
        <span className="relative flex h-full min-h-48 flex-col justify-end p-4 sm:min-h-56 sm:p-5">
          <span className="font-display text-2xl leading-none text-white sm:text-3xl">
            {label}
          </span>
          {hint ? (
            <span className="mt-2 block text-base leading-snug text-white/70">
              {hint}
            </span>
          ) : null}
        </span>
      </a>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick}
      className="flex items-start gap-3 rounded-2xl px-3 py-3 transition-colors hover:bg-bg"
    >
      <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ama-red/12 text-ama-red">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-base font-semibold text-fg">{label}</span>
        {hint ? (
          <span className="mt-0.5 block text-base leading-snug text-muted">{hint}</span>
        ) : null}
      </span>
    </a>
  );
}
