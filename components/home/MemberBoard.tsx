"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { useI18n } from "@/components/I18nProvider";
import { Shell } from "@/components/Shell";
import {
  beginnerClassIds,
  nextSessions,
  site,
  weekdayIds,
  type WeekdayId,
} from "@/content/site";
import type { Dictionary } from "@/content/dictionary";

type ClassId = keyof Dictionary["schedule"]["classes"];
type Session = (typeof nextSessions)[number];

const beginnerIds: ReadonlySet<string> = new Set(beginnerClassIds);

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

function copenhagenMinutes() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Copenhagen",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
  return hour * 60 + minute;
}

function parseMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function nextBeginnerSession(): Session | null {
  const today = todayWeekdayId();
  const now = copenhagenMinutes();
  const start = weekdayIds.indexOf(today);

  for (let offset = 0; offset < 7; offset += 1) {
    const day = weekdayIds[(start + offset) % 7];
    const match = nextSessions.find((session) => {
      if (session.day !== day || !beginnerIds.has(session.classId)) return false;
      if (offset === 0 && parseMinutes(session.time) <= now) return false;
      return true;
    });
    if (match) return match;
  }

  return null;
}

export function MemberBoard() {
  const { dict, locale } = useI18n();
  const { schedule, ui } = dict;
  const today = todayWeekdayId();
  const [selectedDay, setSelectedDay] = useState<WeekdayId>(today);
  const nextBeginner = nextBeginnerSession();
  const sessions = nextSessions.filter((session) => session.day === selectedDay);
  const dayName = schedule.weekdays[selectedDay];
  const emptyTitle =
    selectedDay === today
      ? schedule.emptyToday
      : schedule.emptyDay.replace(
          "{day}",
          locale === "da" ? dayName.toLowerCase() : dayName,
        );
  const nextDayName = nextBeginner
    ? nextBeginner.day === today
      ? ui.today
      : schedule.weekdays[nextBeginner.day]
    : "";

  return (
    <section id="tider" className="section-y">
      <Shell>
        <div className="rounded-[2rem] bg-surface px-6 py-8 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ama-red">
                {schedule.eyebrow}
              </p>
              <h2 className="mt-2 font-display text-4xl text-fg sm:text-5xl">
                {schedule.title}
              </h2>
              <p className="mt-3 text-base text-muted">{schedule.lead}</p>
            </div>
            {nextBeginner ? (
              <p className="rounded-2xl bg-bg px-5 py-4 lg:min-w-72">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ama-red">
                  {schedule.nextLabel}
                </span>
                <span className="mt-1 block font-display text-2xl text-fg sm:text-3xl">
                  {nextDayName} {nextBeginner.time}
                </span>
                <span className="mt-1 block text-base text-muted">
                  {schedule.classes[nextBeginner.classId as ClassId]}
                </span>
              </p>
            ) : null}
          </div>

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
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
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
            <Button href={site.conventus.trial}>{schedule.cta}</Button>
          </div>
        </div>
      </Shell>
    </section>
  );
}
