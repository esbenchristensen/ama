"use client";

import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useI18n } from "@/components/I18nProvider";
import { localeCookie, localeMeta, locales, replaceLocale } from "@/lib/i18n";

function LanguageSwitcherControl() {
  const { locale, dict } = useI18n();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div
      className="inline-flex h-11 items-center rounded-full border border-line p-1"
      role="group"
      aria-label={dict.ui.language}
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
            aria-current={active ? "true" : undefined}
            onClick={() => {
              document.cookie = `${localeCookie}=${item};path=/;max-age=31536000;samesite=lax`;
            }}
            className={`inline-flex h-9 min-w-11 items-center justify-center rounded-full px-3 text-sm font-semibold transition-colors ${
              active ? "bg-ama-red text-white" : "text-muted hover:text-fg"
            }`}
          >
            {localeMeta[item].short}
          </a>
        );
      })}
    </div>
  );
}

export function LanguageSwitcher() {
  return (
    <Suspense fallback={<div className="h-11 w-[5.75rem] rounded-full border border-line" />}>
      <LanguageSwitcherControl />
    </Suspense>
  );
}
