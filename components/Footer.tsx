"use client";

import { Button } from "@/components/Button";
import { useI18n } from "@/components/I18nProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import { Shell } from "@/components/Shell";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { site } from "@/content/site";

export function Footer() {
  const { dict, href } = useI18n();

  return (
    <footer className="relative z-10 pt-16 pb-8 sm:pt-24">
      <Shell>
        <div className="overflow-hidden rounded-[2rem] bg-surface">
          <div className="grid gap-10 px-6 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1.1fr_2fr]">
            <div>
              <Logo className="h-11 sm:h-12" />
              <p className="mt-5 max-w-xs text-base leading-relaxed text-muted">
                {dict.site.footerBlurb}
              </p>
              <address className="mt-6 not-italic text-base text-muted">
                <p>{site.address.line1}</p>
                <p>{site.address.line2}</p>
                <p className="mt-2">
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-fg">
                    {site.phone}
                  </a>
                </p>
              </address>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button href={site.conventus.trial}>{dict.hero.cta}</Button>
                <Button href={site.conventus.login} variant="ghost">
                  {dict.ui.login}
                </Button>
              </div>
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              {dict.megaNav.map((group) => (
                <div key={group.id}>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-ama-red">
                    {group.label}
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {group.items.map((link) => (
                      <li key={`${group.id}-${link.label}`}>
                        <a
                          href={href(link.href)}
                          className="text-base text-muted transition-colors hover:text-fg"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-line px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="text-base text-faint">
              © {new Date().getFullYear()} {site.name} · {site.cvr}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <LanguageSwitcher placement="up" />
              <a
                href={site.facebook}
                className="text-base text-muted hover:text-fg"
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.ui.facebook}
              </a>
              <a
                href={site.instagram}
                className="text-base text-muted hover:text-fg"
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.ui.instagram}
              </a>
              <a href={`mailto:${site.email}`} className="text-base text-muted hover:text-fg">
                {site.email}
              </a>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </Shell>
    </footer>
  );
}
