"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { useI18n } from "@/components/I18nProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import { NavItem } from "@/components/NavItem";
import { Shell } from "@/components/Shell";
import { site } from "@/content/site";

export function Header() {
  const { dict, href } = useI18n();
  const { hero, megaNav, ui } = dict;
  const [hidden, setHidden] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAcc, setMobileAcc] = useState<string | null>("hold");
  const headerRef = useRef<HTMLElement>(null);
  const lastY = useRef(0);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastY.current;
      lastY.current = y;
      if (mobileOpen || mega) {
        setHidden(false);
        return;
      }
      setHidden(goingDown && y > 88);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mega, mobileOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMega(null);
        setMobileOpen(false);
      }
    };
    const onClick = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setMega(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (desktop.matches) setMobileOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  const closeAll = () => {
    setMega(null);
    setMobileOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
      onMouseLeave={() => {
        if (!mobileOpen) setMega(null);
      }}
    >
      <div className="border-b border-line bg-bg/90 backdrop-blur-md">
        <Shell>
          <div className="flex h-20 items-center justify-between gap-3">
            <a href={href("/")} className="shrink-0" aria-label={site.name} onClick={closeAll}>
              <Logo />
            </a>

            <nav
              className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 md:flex lg:gap-1"
              aria-label={ui.mainNav}
            >
              {megaNav.map((item) => {
                const isLink = item.items.length === 1;
                const open = mega === item.id;
                if (isLink) {
                  return (
                    <a
                      key={item.id}
                      href={href(item.href)}
                      className="rounded-full px-3 py-2 text-base font-medium text-muted transition-colors hover:text-fg lg:px-4"
                      onClick={closeAll}
                    >
                      {item.label}
                    </a>
                  );
                }
                return (
                  <div key={item.id} onMouseEnter={() => setMega(item.id)}>
                    <button
                      type="button"
                      className={`rounded-full px-3 py-2 text-base font-medium transition-colors lg:px-4 ${
                        open ? "bg-surface text-fg" : "text-muted hover:text-fg"
                      }`}
                      aria-expanded={open}
                      aria-controls={`${menuId}-${item.id}`}
                      onClick={() => setMega(open ? null : item.id)}
                    >
                      {item.label}
                    </button>
                  </div>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-2">
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>
              <div className="hidden items-center gap-2 lg:flex">
                <Button href={site.conventus.login} variant="ghost" className="h-11 px-5 py-0">
                  {ui.login}
                </Button>
                <Button href={site.conventus.trial} className="h-11 px-5 py-0">
                  {hero.ctaShort}
                </Button>
              </div>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg md:hidden"
                aria-expanded={mobileOpen}
                aria-controls={`${menuId}-mobile`}
                aria-label={mobileOpen ? ui.closeMenu : ui.openMenu}
                onClick={() => {
                  setMega(null);
                  setMobileOpen((value) => !value);
                }}
              >
                <span className="sr-only">{mobileOpen ? ui.close : ui.menu}</span>
                <span className="relative block h-3.5 w-4">
                  <span
                    className={`absolute left-0 h-0.5 w-4 bg-current transition ${
                      mobileOpen ? "top-1.5 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1.5 h-0.5 w-4 bg-current transition ${
                      mobileOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 h-0.5 w-4 bg-current transition ${
                      mobileOpen ? "top-1.5 -rotate-45" : "top-3"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </Shell>
      </div>

      {mega
        ? megaNav.map((item) =>
            item.id === mega && item.items.length > 1 ? (
              <div
                key={item.id}
                id={`${menuId}-${item.id}`}
                className="absolute inset-x-0 top-full hidden md:block"
              >
                <Shell className="pt-3">
                  <div className="rounded-[1.75rem] border border-line bg-surface p-4 shadow-2xl shadow-black/30 sm:p-5">
                    <div
                      className={`grid gap-3 ${
                        item.items.length >= 4
                          ? "md:grid-cols-2 xl:grid-cols-4"
                          : item.items.length === 3
                            ? "md:grid-cols-3"
                            : "md:grid-cols-2"
                      }`}
                    >
                      {item.items.map((link) => (
                        <NavItem
                          key={link.label}
                          icon={link.icon}
                          label={link.label}
                          hint={link.hint}
                          href={href(link.href)}
                          image={"image" in link ? link.image : undefined}
                          onClick={closeAll}
                        />
                      ))}
                    </div>
                  </div>
                </Shell>
              </div>
            ) : null,
          )
        : null}

      {mobileOpen ? (
        <div
          id={`${menuId}-mobile`}
          className="fixed inset-x-0 bottom-0 top-20 overflow-y-auto bg-bg md:hidden"
        >
          <Shell className="flex min-h-full flex-col pb-10 pt-4">
            <div className="flex flex-col gap-2">
              <Button href={site.conventus.trial} onClick={closeAll}>
                {hero.cta}
              </Button>
              <Button href={site.conventus.login} variant="ghost" onClick={closeAll}>
                {ui.login}
              </Button>
              <div className="pt-1">
                <LanguageSwitcher />
              </div>
            </div>

            <nav className="mt-6" aria-label={ui.mobileNav}>
              {megaNav.map((item) => {
                if (item.items.length === 1) {
                  const link = item.items[0];
                  return (
                    <div key={item.id} className="border-b border-line py-2">
                      <NavItem
                        icon={link.icon}
                        label={item.label}
                        hint={link.hint}
                        href={href(link.href)}
                        image={"image" in link ? link.image : undefined}
                        onClick={closeAll}
                      />
                    </div>
                  );
                }
                const open = mobileAcc === item.id;
                return (
                  <div key={item.id} className="border-b border-line">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-4 text-left"
                      aria-expanded={open}
                      onClick={() => setMobileAcc(open ? null : item.id)}
                    >
                      <span className="font-display text-3xl text-fg">{item.label}</span>
                      <span className="text-ama-red">{open ? "-" : "+"}</span>
                    </button>
                    {open ? (
                      <div
                        className="grid gap-3 pb-4 sm:grid-cols-2"
                      >
                        {item.items.map((link) => (
                          <NavItem
                            key={link.label}
                            icon={link.icon}
                            label={link.label}
                            hint={link.hint}
                            href={href(link.href)}
                            image={"image" in link ? link.image : undefined}
                            onClick={closeAll}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>
          </Shell>
        </div>
      ) : null}
    </header>
  );
}
