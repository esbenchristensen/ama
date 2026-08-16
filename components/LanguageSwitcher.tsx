"use client";

import { Suspense, useEffect, useId, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useI18n } from "@/components/I18nProvider";
import {
  localeCookie,
  localeMeta,
  locales,
  replaceLocale,
  type Locale,
} from "@/lib/i18n";

function LocaleFlag({ locale, className = "" }: { locale: Locale; className?: string }) {
  const uid = useId().replace(/:/g, "");

  if (locale === "da") {
    return (
      <svg viewBox="0 0 22 16" className={className} aria-hidden>
        <rect width="22" height="16" fill="#C8102E" />
        <rect x="7" width="3.2" height="16" fill="#fff" />
        <rect y="6.4" width="22" height="3.2" fill="#fff" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden>
      <defs>
        <clipPath id={`${uid}-s`}>
          <rect width="60" height="30" />
        </clipPath>
        <clipPath id={`${uid}-t`}>
          <path d="M30,15 h30 v15 z v-15 h-30 z h-30 v-15 z v15 h30 z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${uid}-s)`}>
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          clipPath={`url(#${uid}-t)`}
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

function LanguageSwitcherControl({
  placement = "down",
}: {
  placement?: "down" | "up";
}) {
  const { locale, dict } = useI18n();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onDoc = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="inline-flex h-11 items-center gap-1.5 rounded-full border border-line px-2.5 text-fg transition-colors hover:border-fg"
        aria-label={dict.ui.language}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <LocaleFlag
          locale={locale}
          className="h-4 w-[1.4rem] rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.12)]"
        />
        <span className="sr-only">{localeMeta[locale].label}</span>
        <svg
          viewBox="0 0 12 12"
          className={`h-3 w-3 text-muted transition ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <path
            d="M2.4 4.2 6 7.8l3.6-3.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <div
          id={menuId}
          role="listbox"
          aria-label={dict.ui.language}
          className={`absolute right-0 z-50 min-w-40 rounded-2xl border border-line bg-surface p-1 shadow-2xl shadow-black/20 ${
            placement === "up" ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          {locales.map((item) => {
            const active = item === locale;
            const search = searchParams.toString();
            const href = `${replaceLocale(pathname, item)}${search ? `?${search}` : ""}`;

            return (
              <a
                key={item}
                href={href}
                hrefLang={item}
                role="option"
                aria-selected={active}
                onClick={() => {
                  document.cookie = `${localeCookie}=${item};path=/;max-age=31536000;samesite=lax`;
                  setOpen(false);
                }}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-base transition-colors ${
                  active ? "bg-bg text-fg" : "text-muted hover:bg-bg hover:text-fg"
                }`}
              >
                <LocaleFlag
                  locale={item}
                  className="h-4 w-[1.4rem] rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.12)]"
                />
                {localeMeta[item].label}
              </a>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function LanguageSwitcher({
  placement = "down",
}: {
  placement?: "down" | "up";
}) {
  return (
    <Suspense fallback={<div className="h-11 w-14 rounded-full border border-line" />}>
      <LanguageSwitcherControl placement={placement} />
    </Suspense>
  );
}
