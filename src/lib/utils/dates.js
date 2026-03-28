export function parseIsoDate(isoStr) {
  const [y, m, d] = isoStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatDateLong(isoStr) {
  const dt = parseIsoDate(isoStr);
  const formatted = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(dt);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

export function formatPeriod(startIso, endIso) {
  const s = parseIsoDate(startIso);
  const e = parseIsoDate(endIso);
  const month = new Intl.DateTimeFormat("fr-FR", { month: "long" }).format(s);
  return `${s.getDate()}\u2013${e.getDate()} ${month} ${s.getFullYear()}`;
}

export function getTodayDayNum(days) {
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  for (const day of days) {
    if (day.isoDate === todayStr) return day.day;
  }
  return null;
}
