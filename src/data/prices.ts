/**
 * Every price the site publishes, in one place, as {{TOKENS}} for content that cannot import.
 *
 * .astro / .ts / .tsx code imports the labels from src/data/texas-course.ts (Texas), src/data/ade-texas.json
 * (adult driver ed) and src/data/courses/<state>.json (other states) directly. JSON copy, markdown and the
 * court-page SEO strings cannot import, so they carry a token and the page that renders them calls
 * fillPrices() / fillPricesDeep() at build time. The same idea as {{FEE_MIN}} / {{FEE_MAX}} in
 * src/pages/texas/[i18n].astro.
 *
 * To change a price, edit the data file. Never type a dollar figure into a page: scripts/check-prices.mjs
 * (npm test) fails the build when a known price literal appears in src/ outside the data files.
 */
import {
  TEXAS_PRICE_LABEL,
  TEXAS_PRICE_CENTS_LABEL,
  TEXAS_LEGAL_MINIMUM_LABEL,
  TEXAS_AUDIO_PRICE_LABEL,
  TEXAS_AUTOPLAY_PRICE_LABEL,
  TEXAS_AUDIO_TOTAL_LABEL,
  TEXAS_ALL_IN_LABEL,
} from './texas-course';
import ade from './ade-texas.json';
import nd from './courses/nd-ddc.json';
import ndIpr from './courses/nd-ipr.json';
import mo from './courses/mo-dip.json';
import id from './courses/id-ddc.json';
import oh from './courses/oh-bdi.json';

export const PRICE_TOKENS: Record<string, string> = {
  /** "$28": the Texas 6-hour course, all-in. */
  TX_PRICE: TEXAS_PRICE_LABEL,
  /** "$28.00" */
  TX_PRICE_CENTS: TEXAS_PRICE_CENTS_LABEL,
  /** "$25": the statutory floor, for "the legal minimum is …" sentences only. */
  TX_LEGAL_MIN: TEXAS_LEGAL_MINIMUM_LABEL,
  /** "$4.99": the audio add-on. */
  TX_AUDIO_PRICE: TEXAS_AUDIO_PRICE_LABEL,
  /** "$4.99": the autoplay add-on. */
  TX_AUTOPLAY_PRICE: TEXAS_AUTOPLAY_PRICE_LABEL,
  /** Course + audio (+ autoplay once it is live). */
  TX_AUDIO_TOTAL: TEXAS_AUDIO_TOTAL_LABEL,
  /** "$184": typical court fee + course + Type 3A record. */
  TX_ALL_IN: TEXAS_ALL_IN_LABEL,
  /** "$39.95": Texas adult driver education. */
  ADE_PRICE: `$${ade.course.priceUsd}`,
  /** "$24.99" */
  ND_PRICE: `$${nd.course.priceUsd}`,
  /** "$24.99": the North Dakota insurance premium reduction course (nd-ipr). */
  ND_IPR_PRICE: `$${ndIpr.course.priceUsd}`,
  /** "$19.95" */
  MO_PRICE: `$${mo.course.priceUsd}`,
  /** "$24.99" */
  ID_PRICE: `$${id.course.priceUsd}`,
  /** "$69.95" */
  OH_PRICE: `$${oh.course.priceUsd}`,
};

const TOKEN_RE = /\{\{(TX_PRICE_CENTS|TX_PRICE|TX_LEGAL_MIN|TX_AUDIO_PRICE|TX_AUTOPLAY_PRICE|TX_AUDIO_TOTAL|TX_ALL_IN|ADE_PRICE|ND_IPR_PRICE|ND_PRICE|MO_PRICE|ID_PRICE|OH_PRICE)\}\}/g;

/** Replace every {{PRICE_TOKEN}} in a string. Unknown tokens are left alone. */
export function fillPrices(s: string): string {
  return s.replace(TOKEN_RE, (_, k: string) => PRICE_TOKENS[k]);
}

/** Replace every {{PRICE_TOKEN}} in every string of a JSON-shaped value (data files, translations). */
export function fillPricesDeep<T>(value: T): T {
  return JSON.parse(fillPrices(JSON.stringify(value))) as T;
}
