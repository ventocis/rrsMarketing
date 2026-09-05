// Statistics computed at build time from our own court research, so the
// numbers on the Texas Traffic Ticket Report can never drift from the data
// behind them. Nothing here is typed by hand.
//
// Two datasets: texas-courts.json (all 1,742 Texas municipal and justice
// courts) and court-faq-data.json (the subset we have researched procedure
// for). Every rate below is reported against the number of courts where the
// answer is actually known, and the page states that denominator — a
// percentage of "all Texas courts" would be a different and wrong claim.
import courtsData from '../data/texas-courts.json';
import faqData from '../data/court-faq-data.json';

const courts = (courtsData as any).courts as Array<{
  slug: string; county: string; courtType: string; courtName: string;
  phone: string[]; address: string[]; website: string[]; email: string[];
}>;
const research = faqData as Record<string, any>;
const bySlug = new Map(courts.map(c => [c.slug, c]));

/** Free-text fees like "$144" or "between $144 and $169" → the upper number. */
function parseFee(raw: unknown): number | null {
  const nums = String(raw ?? '').match(/\$\s?([0-9][0-9,]*)/g) ?? [];
  const vals = nums
    .map(n => parseInt(n.replace(/[^0-9]/g, ''), 10))
    .filter(n => n >= 20 && n <= 500);
  return vals.length ? Math.max(...vals) : null;
}

/** The submission methods are free text from ~90 different clerks. */
function normalizeMethod(raw: unknown): string | null {
  const s = String(raw ?? '').toLowerCase();
  if (!s) return null;
  if (s.includes('email')) return 'Email';
  if (/online|portal|upload|e-court|zoom/.test(s)) return 'Online';
  if (s.includes('mail')) return 'Mail';
  if (s.includes('fax')) return 'Fax';
  if (/drop|night/.test(s)) return 'Drop box';
  if (s.includes('phone')) return 'Phone';
  if (/person|in_person|counsel|arraign|courtroom/.test(s)) return 'In person';
  if (/writ|form|plea|oral/.test(s)) return 'In writing';
  return null;
}

const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : Math.round((s[m - 1] + s[m]) / 2);
};
const pct = (n: number, d: number) => (d ? Math.round((n / d) * 100) : 0);

// ---- fees -------------------------------------------------------------
const feeEntries = Object.entries(research)
  .filter(([, v]) => v?.feeKnown)
  .map(([slug, v]) => [slug, parseFee(v.fee)] as const)
  .filter((e): e is readonly [string, number] => e[1] !== null);

const feeVals = feeEntries.map(e => e[1]);
const sortedFees = [...feeEntries].sort((a, b) => a[1] - b[1]);
const courtLabel = (slug: string) => {
  const c = bySlug.get(slug);
  if (!c) return slug;
  return c.courtType === 'Municipal'
    ? `${c.courtName} Municipal Court`
    : `${c.county} County JP, ${c.courtName}`;
};

// ---- methods ----------------------------------------------------------
const methodCounts = new Map<string, number>();
let courtsWithMethod = 0;
for (const v of Object.values(research)) {
  const set = new Set(
    ((v?.submissionMethods as unknown[]) ?? []).map(normalizeMethod).filter(Boolean) as string[],
  );
  if (set.size) courtsWithMethod++;
  for (const m of set) methodCounts.set(m, (methodCounts.get(m) ?? 0) + 1);
}

// ---- boolean requirements --------------------------------------------
function boolRate(key: string) {
  const vals = Object.values(research).map(v => v?.[key]).filter(v => typeof v === 'boolean') as boolean[];
  const yes = vals.filter(Boolean).length;
  return { yes, no: vals.length - yes, known: vals.length, pctYes: pct(yes, vals.length), pctNo: pct(vals.length - yes, vals.length) };
}

export const courtStats = {
  totalCourts: courts.length,
  municipal: courts.filter(c => c.courtType === 'Municipal').length,
  justice: courts.filter(c => c.courtType === 'Justice of the Peace').length,
  counties: new Set(courts.map(c => c.county)).size,
  researched: Object.keys(research).length,
  researchedPct: pct(Object.keys(research).length, courts.length),

  fee: {
    known: feeVals.length,
    min: Math.min(...feeVals),
    max: Math.max(...feeVals),
    median: median(feeVals),
    mean: Math.round((feeVals.reduce((a, b) => a + b, 0) / feeVals.length) * 100) / 100,
    exactly144: feeVals.filter(v => v === 144).length,
    pctExactly144: pct(feeVals.filter(v => v === 144).length, feeVals.length),
    below: feeVals.filter(v => v < 144).length,
    above: feeVals.filter(v => v > 144).length,
    cheapest: sortedFees.slice(0, 4).map(([slug, fee]) => ({ court: courtLabel(slug), fee, slug })),
    priciest: sortedFees.slice(-4).reverse().map(([slug, fee]) => ({ court: courtLabel(slug), fee, slug })),
    /** State-fixed share of a $144 bill: $62 state + $14 local + the $10 capped DSC fee. */
    stateFixed: 86,
  },

  email: boolRate('emailAccepted'),
  type3a: boolRate('requiresType3A'),
  notary: boolRate('requiresNotarizedAffidavit'),

  methods: {
    known: courtsWithMethod,
    rows: [...methodCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([method, count]) => ({ method, count, pct: pct(count, courtsWithMethod) })),
  },

  contact: {
    withPhone: courts.filter(c => c.phone?.length).length,
    withWebsite: courts.filter(c => c.website?.length).length,
    withEmail: courts.filter(c => c.email?.length).length,
  },
};

export type CourtStats = typeof courtStats;
