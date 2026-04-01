import type { Day } from "$lib/types";

export function parseIsoDate(isoStr: string): Date {
  const [y, m, d] = isoStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatDateLong(isoStr: string): string {
  return parseIsoDate(isoStr).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatPeriod(startIso: string, endIso: string): string {
  const s = parseIsoDate(startIso);
  const e = parseIsoDate(endIso);
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "long" };
  return `${s.toLocaleDateString("fr-FR", opts)} – ${e.toLocaleDateString("fr-FR", { ...opts, year: "numeric" })}`;
}

export function getTodayDayNum(days: Day[]): number | null {
  const today = new Date().toISOString().slice(0, 10);
  const match = days.find((d) => d.isoDate === today);
  return match ? match.day : null;
}
