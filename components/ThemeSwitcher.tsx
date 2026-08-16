"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/components/I18nProvider";

type Pref = "dark" | "light" | "system";

function resolveTheme(pref: Pref) {
  if (pref === "system") {
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }
  return pref;
}

function apply(pref: Pref) {
  const theme = resolveTheme(pref);
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.themePref = pref;
  localStorage.setItem("ama-theme", pref);
}

const cycle: Pref[] = ["dark", "light", "system"];

export function ThemeSwitcher({ className = "" }: { className?: string }) {
  const { dict } = useI18n();
  const labels: Record<Pref, string> = {
    dark: dict.ui.dark,
    light: dict.ui.light,
    system: dict.ui.system,
  };
  const [pref, setPref] = useState<Pref>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("ama-theme");
    const next: Pref =
      stored === "light" || stored === "system" || stored === "dark"
        ? stored
        : "dark";
    setPref(next);
    apply(next);

    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      const current = (localStorage.getItem("ama-theme") as Pref) || "dark";
      if (current === "system") apply("system");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        const next = cycle[(cycle.indexOf(pref) + 1) % cycle.length];
        setPref(next);
        apply(next);
      }}
      className={`inline-flex h-11 items-center rounded-full border border-line px-4 text-base font-semibold text-muted transition-colors hover:border-fg hover:text-fg ${className}`}
      aria-label={`${dict.ui.themeNow}: ${labels[pref]}`}
      title={dict.ui.themeTitle}
    >
      {labels[pref]}
    </button>
  );
}
