/**
 * Texas adult driver ed prices: the one source for every price number on the ADE pages.
 *
 * Rows live in ade-prices.json (built 2026-10-29 from Research's checked table; publish rows only). Our own price
 * is never in that file: it comes from ade-texas.json, the same value the hub's Offer uses. Pages import the
 * computed stats below and never type a count, range, median or date by hand, so /cost, the hub and every summary
 * sentence stay in step.
 *
 * Refresh rule (REPORT §4): recheck every row monthly. A row not rechecked in 45 days shows "price may be
 * outdated"; at 75 days it leaves the table and the stats. Ages are measured at build time.
 */
import data from './ade-prices.json';
import ade from './ade-texas.json';

export interface OnlineRow {
  provider: string;
  license: string;
  format: string;
  advertised: number;
  advertisedNote: string;
  checkout: number | null;
  checkoutNote: string;
  added: string;
  /** Required certificate, handling or processing fee seen or stated. */
  fee?: number | null;
  /** Preselected instant-certificate upgrade in the default cart. */
  preselected?: number | null;
  tier: string;
  checked: string;
  source: string;
  notes: string;
  /** Our own row, built from ade-texas.json. */
  publisher?: boolean;
  /** Not rechecked in STALE_WARN_DAYS. */
  stale?: boolean;
}

export interface InPersonRow {
  provider: string;
  license: string;
  price: number;
  checked: string;
  source: string;
  notes: string;
  stale?: boolean;
}

export const STALE_WARN_DAYS = 45;
export const STALE_DROP_DAYS = 75;

const DAY = 86_400_000;
const now = Date.now();
const ageDays = (iso: string) => Math.floor((now - Date.parse(`${iso}T12:00:00Z`)) / DAY);
const keep = <T extends { checked: string }>(r: T) => ageDays(r.checked) < STALE_DROP_DAYS;
const mark = <T extends { checked: string }>(r: T) => ({ ...r, stale: ageDays(r.checked) >= STALE_WARN_DAYS });

export const checkedOn: string = data.checkedOn;
export const tdlrAdultProviders: number = data.tdlrAdultProviders;
export const providerPagesRead: number = data.providerPagesRead;
export const cartsViewed: number = data.cartsViewed;
export const bundles = data.bundles;
export const schoolRoadTest = data.schoolRoadTest;
export const changelog = data.changelog;

/** Competitors only, cheapest first by advertised price. */
export const competitors: OnlineRow[] = (data.online as OnlineRow[])
  .filter(keep)
  .map(mark)
  .sort((a, b) => a.advertised - b.advertised || a.provider.localeCompare(b.provider));

export const inPerson: InPersonRow[] = (data.inPerson as InPersonRow[])
  .filter(keep)
  .map(mark)
  .sort((a, b) => a.price - b.price || a.provider.localeCompare(b.provider));

/** Our price, from the same config as the hub Offer. */
export const ourPrice: number = Number(ade.course.priceUsd);

/** Our row: checkout walked on data.ourCartCheckedOn (course plus free instant certificate, nothing else). */
export const ourRow: OnlineRow = {
  provider: 'Road Ready Safety',
  license: ade.provider.deLicenseNumber,
  format: 'Online',
  advertised: ourPrice,
  advertisedNote: '',
  checkout: ourPrice,
  checkoutNote: 'default cart',
  added: 'None; instant certificate included',
  tier: 'A',
  checked: data.ourCartCheckedOn,
  source: '/adult-drivers-ed/texas',
  notes: 'Publisher of this page',
  publisher: true,
};

/** The table as shown: competitors plus our row, cheapest first. */
export const tableRows: OnlineRow[] = [...competitors, ourRow].sort(
  (a, b) => a.advertised - b.advertised || Number(Boolean(a.publisher)) - Number(Boolean(b.publisher)),
);

function quantile(sorted: number[], q: number): number {
  const pos = (sorted.length - 1) * q;
  const lo = Math.floor(pos);
  const hi = Math.ceil(pos);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
}
const sortedNums = (xs: number[]) => [...xs].sort((a, b) => a - b);

function summarize(xs: number[]) {
  const s = sortedNums(xs);
  return { n: s.length, min: s[0], max: s[s.length - 1], median: quantile(s, 0.5), q1: quantile(s, 0.25), q3: quantile(s, 0.75) };
}

/** Advertised online prices, all competitors in the table. */
export const online = summarize(competitors.map((r) => r.advertised));
/** Online-only providers (no in-person option). */
export const onlineOnly = summarize(competitors.filter((r) => r.format === 'Online' || r.format === 'Online (app)').map((r) => r.advertised));
/** In-person six-hour classes. */
export const classroom = summarize(inPerson.map((r) => r.price));

/** The carts we viewed (tier A, competitors only): how far the default total ran above the headline. */
const tierA = competitors.filter((r) => r.tier === 'A' && r.checkout != null);
export const cartGap = summarize(tierA.map((r) => Math.round(((r.checkout as number) - r.advertised) * 100) / 100));
export const cartsWithTrial: number = tierA.filter((r) => /roadside/i.test(r.notes)).length;
export const cartsCount: number = tierA.length;
/** Required certificate or processing fees, carts viewed plus provider-stated totals (tiers A and B). */
export const requiredFees = summarize(competitors.filter((r) => (r.tier === 'A' || r.tier === 'B') && r.fee != null).map((r) => r.fee as number));
/** Preselected instant-certificate upgrades in the carts viewed. */
export const preselectedUpgrades = summarize(tierA.filter((r) => r.preselected != null).map((r) => r.preselected as number));

/** Where our price sits among competitors' advertised prices. */
export const advertisedBelowUs: number = competitors.filter((r) => r.advertised < ourPrice).length;
export const advertisedSameAsUs: number = competitors.filter((r) => r.advertised === ourPrice).length;

/** The lowest advertised online price, and how many providers advertise it. */
export const lowest = { price: online.min, count: competitors.filter((r) => r.advertised === online.min).length };

/** DPS license fee plus the middle half of course prices, rounded to the nearest $5 (REPORT §4, #total-to-get-licensed). */
export function totalToLicense(dpsFee: number) {
  const round5 = (x: number) => Math.round(x / 5) * 5;
  return { low: round5(online.q1 + dpsFee), high: round5(online.q3 + dpsFee) };
}

/** "$19.99", "$150" (whole dollars drop the cents). */
export const usd = (x: number) =>
  `$${x.toLocaleString('en-US', { minimumFractionDigits: Number.isInteger(x) ? 0 : 2, maximumFractionDigits: 2 })}`;

/** "October 29, 2026" */
export const longDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/** "123.4" style amounts inside a data cell become "$123.40". */
export const moneyText = (s: string) => s.replace(/\b(\d+)\.(\d{2})\b/g, '$$$1.$2');

/** CSV of the table as published (competitors plus our row). */
export function toCsv(): string {
  const cols = ['provider', 'tdlr_license', 'format', 'advertised_usd', 'advertised_note', 'checkout_total_usd', 'checkout_basis', 'whats_added', 'how_verified', 'date_checked', 'source_url', 'notes'];
  const esc = (v: unknown) => {
    const s = v == null ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = tableRows.map((r) =>
    [
      r.provider, r.license, r.format, r.advertised.toFixed(2), r.advertisedNote,
      r.checkout != null ? r.checkout.toFixed(2) : '', r.checkout != null ? r.checkoutNote : 'not verified',
      r.added, r.tier, r.checked, r.publisher ? `https://roadreadysafety.com${r.source}` : r.source, r.notes,
    ].map(esc).join(','),
  );
  return [cols.join(','), ...lines].join('\n') + '\n';
}
