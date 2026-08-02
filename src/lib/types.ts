export interface LatLng {
  lat: number;
  lng: number;
}

export interface Parking {
  location: string;
  cost: string;
  tip?: string;
  gmaps?: string;
}

export interface StopLink {
  type: string;
  url: string;
}

export interface Stop {
  name: string;
  desc: string;
  icon: string;
  iconClass: string;
  photo: string | null;
  lat?: number;
  lng?: number;
  parking?: Parking;
  links: StopLink[];
}

export interface ScheduleItem {
  time: string;
  label: string;
  icon: string;
  duration?: string;
}

export interface BudgetEntry {
  label: string;
  amount: number;
}

export interface Budget {
  entries: BudgetEntry[];
  total: number;
  notes?: string;
}

export interface PracticalTipGroup {
  stop: string;
  icon: string;
  tips: string[];
}

export interface Day {
  day: number;
  shortLabel: string;
  counties: string[];
  title: string;
  isoDate: string;
  routeIcon: string;
  routeDesc: string;
  morning: string | null;
  night: string | null;
  nightInfo: string | null;
  distanceKm: number | null;
  driveMinutes: number | null;
  highlight: string | null;
  mapCenter: LatLng;
  mapImg: string | null;
  mapDesc: string | null;
  stops: Stop[];
  schedule?: ScheduleItem[];
  budget?: Budget;
  dayRoute?: [number, number][];
  practicalTips?: PracticalTipGroup[];
  rainyDay?: string;
}

export interface TripStats {
  jours: number;
  voyageurs: number;
  kilometres: string;
  comtes: number;
}

export interface Trip {
  title: string;
  subtitle: string;
  tagline: string;
  family: string;
  startDate: string;
  endDate: string;
  stats: TripStats;
}

export interface Poi {
  name: string;
  desc: string;
  lat: number;
  lng: number;
  web?: string | null;
  gmaps?: string | null;
}

export interface PoiConfig {
  color: string;
  icon: string;
}

export interface Tip {
  icon: string;
  title: string;
  text: string;
}

export interface Blog {
  title: string;
  source: string;
  url: string;
  type: string;
}

export interface TripData {
  trip: Trip;
  days: Day[];
  pois?: Record<string, Poi[]>;
  poiConfig?: Record<string, PoiConfig>;
  tips?: Tip[];
  blogs?: Blog[];
}

export interface ComputedStats {
  jours: number;
  voyageurs: number;
  kilometres: string;
  comtes: number;
}

/** Raw day shape from data.json before normalization. */
export interface RawDay extends Omit<Day, "stops" | "budget"> {
  stops: RawStop[];
  budget?: Omit<Budget, "total"> & { total?: number };
}

/** Raw trip data from data.json before normalization. */
export interface RawTripData extends Omit<TripData, "days"> {
  days: RawDay[];
}

/** Raw stop shape from data.json before normalization. */
export interface RawStop {
  name: string;
  desc: string;
  icon: string;
  iconClass: string;
  photo: string | null;
  gmaps?: string | null;
  web?: string | null;
  tripadvisor?: string | null;
  routard?: string | null;
  alltrails?: string | null;
  trailMap?: string | null;
  lat?: number;
  lng?: number;
  parking?: Parking;
}
