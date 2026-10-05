/**
 * North Dakota speeding fees and points, straight from the Century Code.
 *
 *   Fees:   NDCC 39-06.1-06, subsections 4 (limit 65 or less), 6 (limit posted above 65),
 *           7 (school zone) and 8 (highway construction zone, workers present).
 *   Points: NDCC 39-06.1-10, subsection 3, items (1) and (2).
 *   In lieu of points: NDCC 39-06.1-10.1 (violations worth 5 points or fewer).
 *   Suspension: 12 points or more (NDCC 39-06.1-10); under 18, canceled at 6.
 *
 * Re-read 2026-10-05 from https://ndlegis.gov/cencode/t39c06-1.pdf. The guides
 * north-dakota-speeding-ticket-cost and north-dakota-speeding-ticket-points print the same
 * numbers; tests/nd-speeding.test.ts reproduces every row of their tables.
 * Pure functions only: used by the server-rendered table and the in-browser calculator.
 */

export type Zone = 'regular' | 'school' | 'work';

/** Points where the posted limit is 65 or less: [lowest mph over, points]. */
const POINTS_65_OR_LESS: [number, number][] = [[1, 0], [11, 1], [16, 3], [21, 5], [26, 9], [36, 12], [46, 15]];
/** Points where the limit is posted above 65. */
const POINTS_ABOVE_65: [number, number][] = [[1, 0], [6, 1], [11, 3], [16, 5], [21, 7], [26, 10], [31, 12], [36, 15]];

export function speedingPoints(limit: number, over: number): number {
  if (over <= 0) return 0;
  const table = limit > 65 ? POINTS_ABOVE_65 : POINTS_65_OR_LESS;
  let points = 0;
  for (const [from, p] of table) if (over >= from) points = p;
  return points;
}

/** The regular fee: $3 a mph ($5 where the limit is above 65), $20 minimum, plus $20 at 16 or more over. */
export function regularFee(limit: number, over: number): number {
  if (over <= 0) return 0;
  const perMph = limit > 65 ? 5 : 3;
  return Math.max(20, perMph * over) + (over >= 16 ? 20 : 0);
}

export function speedingFee(limit: number, over: number, zone: Zone = 'regular'): number {
  if (over <= 0) return 0;
  const regular = regularFee(limit, over);
  // School and work zones: the zone formula, "unless a greater fee would be applicable under this section".
  if (zone === 'school') return Math.max(40 + Math.max(0, over - 10), regular);
  if (zone === 'work') return Math.max(150 + 2 * Math.max(0, over - 10), regular);
  return regular;
}

export interface Assessment {
  over: number;
  fee: number;
  points: number;
  /** A course can be elected in lieu of points: the ticket carries 1 to 5 points. */
  inLieu: boolean;
  /** 12 points or more from this ticket alone. */
  suspends: boolean;
  next: string;
}

export function assess(limit: number, speed: number, zone: Zone = 'regular'): Assessment {
  const over = Math.max(0, Math.round(speed) - Math.round(limit));
  const fee = speedingFee(limit, over, zone);
  const points = speedingPoints(limit, over);
  const inLieu = points >= 1 && points <= 5;
  const suspends = points >= 12;
  let next: string;
  if (over === 0) next = 'That speed is not over the limit.';
  else if (points === 0) next = 'No points. Pay the fee; a course would not change anything on your record.';
  else if (inLieu) next = 'To keep the points off, tell the court you elect a driver training course when you post bond, then send NDDOT the certificate within 30 days.';
  else if (!suspends) next = 'Too many points to keep off. Pay or contest it, then a defensive driving course can take 3 points off your total.';
  else next = 'This ticket alone reaches 12 points, which suspends your license. The 3-point reduction only applies after the suspension is served.';
  return { over, fee, points, inLieu, suspends, next };
}
