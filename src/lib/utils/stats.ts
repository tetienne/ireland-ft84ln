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

function parseDistanceKm(distance: string | null): number | undefined {
  if (!distance) return undefined;
  const match = distance.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : undefined;
}

function parseDriveMinutes(driveTime: string | null): number | undefined {
  if (!driveTime) return undefined;
  const hm = driveTime.match(/(\d+)h(\d+)/);
  if (hm) return parseInt(hm[1], 10) * 60 + parseInt(hm[2], 10);
  const hOnly = driveTime.match(/(\d+)h\b/);
  if (hOnly) return parseInt(hOnly[1], 10) * 60;
  const mOnly = driveTime.match(/(\d+)\s*min/);
  if (mOnly) return parseInt(mOnly[1], 10);
  return undefined;
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
    distanceKm: parseDistanceKm(raw.distance),
    driveMinutes: parseDriveMinutes(raw.driveTime),
    stops: raw.stops.map((s) => normalizeStopLinks(s)),
    budget,
  };
}
