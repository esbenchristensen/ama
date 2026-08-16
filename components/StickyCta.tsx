"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import { useI18n } from "@/components/I18nProvider";
import { site } from "@/content/site";

export function StickyCta() {
  const { dict } = useI18n();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const primary = document.querySelector("[data-cta-primary]");
    const footer = document.querySelector("footer");
    let primaryIn = Boolean(primary);
    let footerIn = false;

    const update = () => {
      setVisible(!primaryIn && !footerIn);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === footer) footerIn = entry.isIntersecting;
          else primaryIn = entry.isIntersecting;
        }
        update();
      },
      { threshold: 0.12 },
    );

    if (primary) observer.observe(primary);
    else primaryIn = false;
    if (footer) observer.observe(footer);
    update();

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg/95 px-4 pt-3 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      aria-hidden={!visible}
    >
      <Button href={site.conventus.trial} className="w-full py-3.5" tabIndex={visible ? 0 : -1}>
        {dict.hero.cta}
      </Button>
    </div>
  );
}
