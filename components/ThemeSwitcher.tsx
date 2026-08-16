"use client";

import { useSyncExternalStore } from "react";
import { useI18n } from "@/components/I18nProvider";

type Pref = "dark" | "light";

const THEME_EVENT = "ama-theme-change";

function readPref(): Pref {
  return localStorage.getItem("ama-theme") === "light" ? "light" : "dark";
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(THEME_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(THEME_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function apply(pref: Pref) {
  document.documentElement.dataset.theme = pref;
  document.documentElement.dataset.themePref = pref;
  localStorage.setItem("ama-theme", pref);
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function ThemeSwitcher({ className = "" }: { className?: string }) {
  const { dict } = useI18n();
  const pref = useSyncExternalStore(subscribe, readPref, () => "dark");
  const label = pref === "light" ? dict.ui.light : dict.ui.dark;

  return (
    <button
      type="button"
      onClick={() => apply(pref === "dark" ? "light" : "dark")}
      className={`inline-flex h-11 items-center rounded-full border border-line px-4 text-base font-semibold text-muted transition-colors hover:border-fg hover:text-fg ${className}`}
      aria-label={`${dict.ui.themeNow}: ${label}`}
      title={dict.ui.themeTitle}
    >
      {label}
    </button>
  );
}
