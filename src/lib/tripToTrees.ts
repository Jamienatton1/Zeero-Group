/**
 * TRIP_TO_TREES_CONFIG
 * Single source of truth for emission factors and tree conversion rates.
 * Swap this out for an API response later without touching the UI.
 */
export const TRIP_TO_TREES_CONFIG = {
  /** kg CO2e absorbed/offset per tree planted */
  kgCo2ePerTree: 150,
  /** price per tree, USD */
  pricePerTree: 3.5,
  /** kg CO2e per passenger per km */
  travelModes: [
    { value: "plane_economy", label: "Plane – Economy", factor: 0.255 },
    { value: "plane_premium", label: "Plane – Premium Economy", factor: 0.38 },
    { value: "plane_business", label: "Plane – Business", factor: 0.64 },
    { value: "plane_first", label: "Plane – First Class", factor: 1.02 },
    { value: "rail", label: "Rail", factor: 0.041 },
    { value: "coach", label: "Coach", factor: 0.089 },
    { value: "car", label: "Car", factor: 0.171 },
    { value: "electric_car", label: "Electric Car", factor: 0.05 },
    { value: "ferry", label: "Ferry", factor: 0.19 },
  ],
  /** kg CO2e per guest per night */
  accommodationTypes: [
    { value: "none", label: "No accommodation", factor: 0 },
    { value: "hotel", label: "Hotel", factor: 14.4 },
    { value: "luxury_hotel", label: "Luxury Hotel / Resort", factor: 24.6 },
    { value: "rental", label: "Rental / Apartment", factor: 8.5 },
    { value: "lodge", label: "Lodge / Camp", factor: 12 },
    { value: "cruise", label: "Cruise", factor: 250 },
  ],
  /** Mock location catalogue with rough coordinates for distance estimates */
  locations: [
    { value: "LON", label: "London, United Kingdom", lat: 51.5072, lon: -0.1276 },
    { value: "MAN", label: "Manchester, United Kingdom", lat: 53.4808, lon: -2.2426 },
    { value: "EDI", label: "Edinburgh, United Kingdom", lat: 55.9533, lon: -3.1883 },
    { value: "DUB", label: "Dublin, Ireland", lat: 53.3498, lon: -6.2603 },
    { value: "PAR", label: "Paris, France", lat: 48.8566, lon: 2.3522 },
    { value: "AMS", label: "Amsterdam, Netherlands", lat: 52.3676, lon: 4.9041 },
    { value: "BER", label: "Berlin, Germany", lat: 52.52, lon: 13.405 },
    { value: "MAD", label: "Madrid, Spain", lat: 40.4168, lon: -3.7038 },
    { value: "ROM", label: "Rome, Italy", lat: 41.9028, lon: 12.4964 },
    { value: "MLA", label: "Valletta, Malta", lat: 35.8989, lon: 14.5146 },
    { value: "IST", label: "Istanbul, Türkiye", lat: 41.0082, lon: 28.9784 },
    { value: "DXB", label: "Dubai, United Arab Emirates", lat: 25.2048, lon: 55.2708 },
    { value: "NBO", label: "Nairobi, Kenya", lat: -1.2921, lon: 36.8219 },
    { value: "CPT", label: "Cape Town, South Africa", lat: -33.9249, lon: 18.4241 },
    { value: "NYC", label: "New York, United States", lat: 40.7128, lon: -74.006 },
    { value: "LAX", label: "Los Angeles, United States", lat: 34.0522, lon: -118.2437 },
    { value: "MIA", label: "Miami, United States", lat: 25.7617, lon: -80.1918 },
    { value: "MEX", label: "Mexico City, Mexico", lat: 19.4326, lon: -99.1332 },
    { value: "GRU", label: "São Paulo, Brazil", lat: -23.5505, lon: -46.6333 },
    { value: "SIN", label: "Singapore", lat: 1.3521, lon: 103.8198 },
    { value: "BKK", label: "Bangkok, Thailand", lat: 13.7563, lon: 100.5018 },
    { value: "HND", label: "Tokyo, Japan", lat: 35.6762, lon: 139.6503 },
    { value: "SYD", label: "Sydney, Australia", lat: -33.8688, lon: 151.2093 },
    { value: "AKL", label: "Auckland, New Zealand", lat: -36.8485, lon: 174.7633 },
  ],
} as const;

export type TripLocation = (typeof TRIP_TO_TREES_CONFIG)["locations"][number];

/** Great-circle distance in km */
export function distanceKm(
  a: { lat: number; lon: number },
  b: { lat: number; lon: number },
): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
}

export interface TripInput {
  mode: string;
  returnTrip: boolean;
  from?: string;
  to?: string;
  nights: number;
  accommodation: string;
  travellers: number;
}

export interface TripResult {
  valid: boolean;
  distanceKm: number;
  travelKg: number;
  stayKg: number;
  totalKg: number;
  trees: number;
  cost: number;
}

export function calculateTrip(input: TripInput): TripResult {
  const empty: TripResult = {
    valid: false,
    distanceKm: 0,
    travelKg: 0,
    stayKg: 0,
    totalKg: 0,
    trees: 0,
    cost: 0,
  };

  const mode = TRIP_TO_TREES_CONFIG.travelModes.find((m) => m.value === input.mode);
  const from = TRIP_TO_TREES_CONFIG.locations.find((l) => l.value === input.from);
  const to = TRIP_TO_TREES_CONFIG.locations.find((l) => l.value === input.to);
  const stay = TRIP_TO_TREES_CONFIG.accommodationTypes.find(
    (a) => a.value === input.accommodation,
  );
  const travellers = Math.max(0, Math.floor(input.travellers || 0));

  if (!mode || !from || !to || from.value === to.value || travellers < 1) return empty;

  const oneWay = distanceKm(from, to);
  const km = input.returnTrip ? oneWay * 2 : oneWay;
  const travelKg = km * mode.factor * travellers;
  const stayKg = (stay?.factor ?? 0) * Math.max(0, input.nights) * travellers;
  const totalKg = travelKg + stayKg;
  const trees = Math.ceil(totalKg / TRIP_TO_TREES_CONFIG.kgCo2ePerTree);

  return {
    valid: trees > 0,
    distanceKm: Math.round(km),
    travelKg: Math.round(travelKg * 10) / 10,
    stayKg: Math.round(stayKg * 10) / 10,
    totalKg: Math.round(totalKg * 10) / 10,
    trees,
    cost: Math.round(trees * TRIP_TO_TREES_CONFIG.pricePerTree * 100) / 100,
  };
}

export const formatKg = (kg: number) =>
  `${kg.toLocaleString("en-GB", { maximumFractionDigits: 1 })} kg CO2e`;

export const formatUsd = (v: number) =>
  `US$${v.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
