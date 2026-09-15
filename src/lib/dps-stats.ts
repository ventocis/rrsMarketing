// Statistics computed at build time from the DPS driver-license wait-time report, so the
// figures on the wait-time pages can never drift from the dataset behind them. Nothing
// here is typed by hand.
//
// Source: https://www.dps.texas.gov/apps/Viewer/Document/Vue/WAITTIMES — DPS publishes,
// per office and per transaction type, the estimated days to the next available
// appointment and the average in-office wait, refreshed daily from the previous business
// day. Ours is a dated snapshot, and every page that uses it must say the date.
//
// Two transactions matter to an adult getting a first Texas license:
//   originalDays   — the "Original" appointment, the first-license transaction
//   driveTestDays  — the "Non CDL Drive Test", the road test the course does NOT waive
//
// Every rate is reported against the number of offices where the answer is actually
// known, and the pages state that denominator.
import raw from '../data/dps-wait-times.json';
import { itd } from '../data/ade-eligibility';

type Office = {
  office: string;
  originalDays?: number;
  originalWait?: string;
  driveTestDays?: number;
  driveTestWait?: string;
};

const offices = (raw as { offices: Office[] }).offices;

const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  if (!s.length) return 0;
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m]! : Math.round((s[m - 1]! + s[m]!) / 2);
};

const driveTest = offices.filter((o) => typeof o.driveTestDays === 'number');
const original = offices.filter((o) => typeof o.originalDays === 'number');
const driveDays = driveTest.map((o) => o.driveTestDays!);
const origDays = original.map((o) => o.originalDays!);

/** In-office wait "HH:MM" → minutes. */
const toMinutes = (w?: string) => {
  const m = /^(\d+):(\d+)$/.exec(w ?? '');
  return m ? parseInt(m[1]!, 10) * 60 + parseInt(m[2]!, 10) : null;
};

const worst = (n: number) =>
  [...driveTest].sort((a, b) => b.driveTestDays! - a.driveTestDays!).slice(0, n);
const best = (n: number) =>
  [...driveTest].sort((a, b) => a.driveTestDays! - b.driveTestDays!).slice(0, n);

const inOfficeWaits = offices
  .map((o) => toMinutes(o.driveTestWait) ?? toMinutes(o.originalWait))
  .filter((x): x is number => x !== null);

export const dpsStats = {
  capturedOn: (raw as any)._capturedOn as string,
  dpsAsOf: (raw as any)._dpsAsOf as string,
  source: (raw as any)._source as string,
  coverage: (raw as any)._coverage as string,

  officeCount: offices.length,

  driveTest: {
    measured: driveTest.length,
    median: median(driveDays),
    max: Math.max(...driveDays),
    maxOffice: worst(1)[0]!.office,
    min: Math.min(...driveDays),
    over14: driveDays.filter((d) => d > 14).length,
    over30: driveDays.filter((d) => d > 30).length,
    over60: driveDays.filter((d) => d > 60).length,
    /** Offices whose queue is longer than an ITD certificate stays valid. */
    overItd: driveDays.filter((d) => d > itd.certValidDays).length,
    worst: worst(12).map((o) => ({ office: o.office, days: o.driveTestDays! })),
    best: best(12).map((o) => ({ office: o.office, days: o.driveTestDays! })),
  },

  original: {
    measured: original.length,
    median: median(origDays),
    max: Math.max(...origDays),
    min: Math.min(...origDays),
    over30: origDays.filter((d) => d > 30).length,
  },

  /** Offices where the road test is quicker to get than the first-license appointment. */
  driveFasterThanOriginal: offices.filter(
    (o) =>
      typeof o.driveTestDays === 'number' &&
      typeof o.originalDays === 'number' &&
      o.driveTestDays < o.originalDays,
  ).length,

  inOffice: {
    measured: inOfficeWaits.length,
    medianMinutes: median(inOfficeWaits),
    maxMinutes: Math.max(...inOfficeWaits),
  },

  /** Offices reporting no non-commercial road test at all. */
  noDriveTest: offices.length - driveTest.length,

  all: offices,
} as const;

/** Percentage of a denominator, rounded — pages must print the denominator too. */
export const pct = (n: number, d: number) => Math.round((n / d) * 100);
