import type { TripData, Day, ComputedStats, RawDay, RawStop, Stop, StopLink } from "$lib/types";

export function computeStats(data: TripData): ComputedStats {
  const days = data.days;
  const kilometres = days.reduce((sum, d) => sum + (d.distanceKm || 0), 0);
  const comtes = new Set(days.flatMap((d) => d.counties)).size;

  return {
    jours: days.length,
    voyageurs: data.trip.stats.voyageurs,
    kilometres: `~${kilometres}`,
    comtes,
  };
}

const LINK_FIELDS = ["gmaps", "web", "tripadvisor", "routard", "alltrails", "trailMap"] as const;

function normalizeStopLinks(stop: RawStop): Stop {
  const links: StopLink[] = [];
  for (const field of LINK_FIELDS) {
    const url = stop[field];
    if (url) links.push({ type: field, url });
  }
  return {
    name: stop.name,
    desc: stop.desc,
    icon: stop.icon,
    iconClass: stop.iconClass,
    photo: stop.photo,
    lat: stop.lat,
    lng: stop.lng,
    parking: stop.parking,
    links,
  };
}

export function normalizeDay(raw: RawDay): Day {
  const budget = raw.budget
    ? {
        ...raw.budget,
        total: raw.budget.entries
          ? raw.budget.entries.reduce((sum, e) => sum + (e.amount || 0), 0)
          : 0,
      }
    : undefined;

  return {
    ...raw,
    stops: raw.stops.map((s) => normalizeStopLinks(s)),
    budget,
  };
}
