"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { useI18n } from "@/components/I18nProvider";
import { Shell } from "@/components/Shell";
import { nextSessions, site, weekdayIds, type WeekdayId } from "@/content/site";
import type { Dictionary } from "@/content/dictionary";

type ClassId = keyof Dictionary["schedule"]["classes"];

function todayWeekdayId(): WeekdayId {
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "Europe/Copenhagen",
  }).format(new Date());
  const map: Record<string, WeekdayId> = {
    Mon: "mon",
    Tue: "tue",
    Wed: "wed",
    Thu: "thu",
    Fri: "fri",
    Sat: "sat",
    Sun: "sun",
  };
  return map[weekday] ?? "mon";
}

export function MemberBoard() {
  const { dict, locale } = useI18n();
  const { schedule, newsTeaser, ui } = dict;
  const today = todayWeekdayId();
  const [selectedDay, setSelectedDay] = useState<WeekdayId>(today);
  const sessions = nextSessions.filter((session) => session.day === selectedDay);
  const dayName = schedule.weekdays[selectedDay];
  const emptyTitle =
    selectedDay === today
      ? schedule.emptyToday
      : schedule.emptyDay.replace(
          "{day}",
          locale === "da" ? dayName.toLowerCase() : dayName,
        );

  return (
    <section id="tider" className="section-y">
      <Shell>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[2rem] bg-surface px-6 py-8 sm:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ama-red">
              {schedule.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-4xl text-fg sm:text-5xl">
              {schedule.title}
            </h2>
            <p className="mt-3 text-base text-muted">{schedule.lead}</p>

            <div className="mt-6 grid grid-cols-7 gap-1.5" role="group" aria-label={ui.pickDay}>
              {weekdayIds.map((day) => {
                const selected = day === selectedDay;
                const label = schedule.weekdays[day];
                return (
                  <button
                    key={day}
                    type="button"
                    aria-pressed={selected}
                    aria-label={day === today ? `${label}, ${ui.today}` : label}
                    onClick={() => setSelectedDay(day)}
                    className={`rounded-full px-1 py-2 text-center text-xs font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ama-red sm:text-sm ${
                      selected
                        ? "bg-ama-red text-white"
                        : "bg-bg text-muted hover:text-fg"
                    }`}
                  >
                    {schedule.weekdaysShort[day]}
                  </button>
                );
              })}
            </div>

            {sessions.length > 0 ? (
              <ul className="mt-6 space-y-3">
                {sessions.map((session) => (
                  <li
                    key={`${session.day}-${session.time}-${session.classId}`}
                    className="flex items-baseline justify-between gap-4 rounded-2xl bg-bg px-4 py-3"
                  >
                    <div>
                      <p className="font-display text-xl text-fg">
                        {schedule.classes[session.classId as ClassId]}
                      </p>
                      <p className="text-sm text-muted">{session.time}</p>
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-faint">
                      {schedule.spots[session.spots]}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-6 rounded-2xl bg-bg px-4 py-8 text-center">
                <p className="font-display text-xl text-fg">{emptyTitle}</p>
                <p className="mt-2 text-base text-muted">{schedule.emptyHint}</p>
              </div>
            )}

            <div className="mt-6">
              <Button href={site.conventus.book} variant="ghost">
                {schedule.cta}
              </Button>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-[2rem] bg-surface px-6 py-8 sm:px-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ama-red">
                {newsTeaser.eyebrow}
              </p>
              <h2 className="mt-2 font-display text-4xl text-fg sm:text-5xl">
                {newsTeaser.title}
              </h2>
            </div>
            <article className="mt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-faint">
                {newsTeaser.item.date}
              </p>
              <h3 className="mt-3 font-display text-3xl text-fg">
                {newsTeaser.item.headline}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted">
                {newsTeaser.item.body}
              </p>
              <a
                href={site.conventus.login}
                className="mt-6 inline-block text-sm font-semibold text-ama-red"
              >
                {ui.loginMember}
              </a>
            </article>
          </div>
        </div>
      </Shell>
    </section>
  );
}
