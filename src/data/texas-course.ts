// Single source of truth for the Texas 6-hour Driving Safety Course (DSC) facts that
// appear in titles, schema and copy. Change a number here, not in a page.
//
// The price must stay at or above the statutory floor in Tex. Educ. Code §1001.352
// ($25, HB 3012, eff. Sept. 1, 2025). The portal checkout (sku tx-bdi) is the system
// of record for what is actually charged; keep this in step with it.
export const TEXAS_COURSE = {
  sku: 'tx-bdi',
  name: 'Texas 6-Hour Defensive Driving Course',
  /**
   * Whole-dollar price charged at checkout, all-in, certificate included. Jackson, 2026-10-29: $25 (was $28 since
   * 2026-10-14). Promote the site only after the portal tx-bdi price is $25 and the $3-off codes are off.
   */
  price: 25,
  /** Statutory minimum course price (Tex. Educ. Code §1001.352). */
  legalMinimumPrice: 25,
  /** TDLR course provider number. */
  providerNumber: 'CP1234',
  /**
   * TDLR's own record of our license, one click. TDLR's current Driving Safety Provider Search reads `?lic=` and
   * filters to that license (checked 2026-10-08: "ROAD READY SAFETY, CP1234", 1 of 480). Do NOT link the old
   * DESSearch provider search: it returns "No matches" for CP1234 (licenses issued since ~2023 are missing there).
   * The page renders in JavaScript; the machine-readable source is TDLR's feed, verifyDataUrl.
   */
  verifyUrl: 'https://www.tdlr.texas.gov/driver/safety/providers/search/?lic=CP1234',
  verifyDataUrl: 'https://www.tdlr.texas.gov/OEPSearch/api/drivingsafety/providers/',
  /** State-mandated course length in hours (TDLR Course of Organized Instruction; 16 TAC §84.500). */
  hours: 6,
  /**
   * Optional audio narration add-on, sold at checkout. Production sku and price read off
   * app.roadreadysafety.com/public/checkout on 2026-10-07 ("Audio - Read to Me").
   * QA uses different test skus, so the link reads VITE_TEXAS_AUDIO_SKUS first.
   */
  audioSku: 'tx-bdi-audio',
  audioPrice: 4.99,
  /**
   * Autoplay add-on, sold alongside audio (QA checkout "Autoplay", same price as audio, sku autoplay1 on 2026-10-07).
   * Jackson set the /texas audio card to the course + audio + autoplay total on 2026-10-07.
   * Production checkout had no autoplay product yet that day; add its sku to the link
   * (VITE_TEXAS_AUDIO_SKUS / audioSku default) once it exists, so checkout matches this price.
   */
  autoplayPrice: 4.99,
  /**
   * Is the autoplay add-on sold on production yet? false = audio-only offer: the /texas "+ Audio" card shows
   * course + audio, hides the autoplay bullets, and the checkout link adds only the audio sku.
   * Jackson, 2026-10-08: audio only until autoplay merges into prod (planned Monday). Flip to true then, and
   * set autoplaySku to the production autoplay sku; the price, copy and checkout link all follow this flag.
   */
  autoplayLive: false,
  /** Production autoplay sku (unknown until it ships). QA overrides with VITE_TEXAS_AUTOPLAY_SKU. */
  autoplaySku: '',
  /**
   * Autoplay ships inside the audio add-on (Jackson, 2026-10-16: "the /texas audio upsell now has autoplay").
   * Production checkout on 2026-10-16 still sells one add-on, "Audio - Read to Me" at audioPrice, and no
   * autoplay product, so this flag only restores the autoplay bullets and the hands-free "fit" line on the
   * audio card; the price and the checkout link stay course + audio. autoplayLive stays for the day autoplay
   * becomes its own sku and price.
   */
  autoplayIncluded: true,
  /**
   * Dollars off with the promo code the TexasLayout banner advertises (showPromo, off by default).
   * The banner shows price - promoDiscount; keep that at or above legalMinimumPrice.
   * 0 since the price moved to the $25 floor (2026-10-29): any discount would charge below §1001.352.
   */
  promoCode: 'TAKE3',
  promoDiscount: 0,
  /**
   * Inputs for the "all-in to dismiss a ticket" arithmetic (court fee + course + driving record).
   * Neither is our price: typicalCourtFee is what most Texas courts charge to grant the course
   * ($169 in a school zone), type3aRecordFee is what DPS charges online for the certified Type 3A record.
   */
  typicalCourtFee: 144,
  type3aRecordFee: 12,
} as const;

/** Whole-dollar price label, e.g. "$25". */
export const TEXAS_PRICE_LABEL = `$${TEXAS_COURSE.price}`;

/** Price label with cents, e.g. "$25.00", for the places that typeset the cents separately. */
export const TEXAS_PRICE_CENTS_LABEL = `$${TEXAS_COURSE.price.toFixed(2)}`;

/** Statutory floor label, e.g. "$25" (Tex. Educ. Code §1001.352). */
export const TEXAS_LEGAL_MINIMUM_LABEL = `$${TEXAS_COURSE.legalMinimumPrice}`;

/** Audio add-on label, e.g. "$4.99". */
export const TEXAS_AUDIO_PRICE_LABEL = `$${TEXAS_COURSE.audioPrice.toFixed(2)}`;

/** Autoplay add-on label, e.g. "$4.99". */
export const TEXAS_AUTOPLAY_PRICE_LABEL = `$${TEXAS_COURSE.autoplayPrice.toFixed(2)}`;

/** Banner price with the promo code applied, e.g. "$25". */
export const TEXAS_PROMO_PRICE_LABEL = `$${TEXAS_COURSE.price - TEXAS_COURSE.promoDiscount}`;

/** Court fee + course + Type 3A record, for a given court fee. */
export const texasAllIn = (courtFee: number): number => courtFee + TEXAS_COURSE.price + TEXAS_COURSE.type3aRecordFee;

/** All-in cost to dismiss at the typical court fee, e.g. 181. */
export const TEXAS_ALL_IN_TOTAL = texasAllIn(TEXAS_COURSE.typicalCourtFee);

/** "$181" at today's numbers. */
export const TEXAS_ALL_IN_LABEL = `$${TEXAS_ALL_IN_TOTAL}`;

/**
 * Gates the "lowest price Texas law allows" wording in the /texas title banner and meta description.
 * Jackson, 2026-10-14: off until the Texas lawyer clears the claim, even though price === legalMinimumPrice.
 * Flip back to `TEXAS_COURSE.price === TEXAS_COURSE.legalMinimumPrice` once cleared.
 */
export const TEXAS_AT_LEGAL_MINIMUM = false;

/** Course + audio today; course + audio + autoplay once autoplayLive is true. Two decimals, e.g. "$29.99". */
export const TEXAS_AUDIO_TOTAL_LABEL = `$${(TEXAS_COURSE.price + TEXAS_COURSE.audioPrice + (TEXAS_COURSE.autoplayLive ? TEXAS_COURSE.autoplayPrice : 0)).toFixed(2)}`;

/**
 * Checkout link with the audio add-on already in the cart. The portal reads every `sku` query value into the
 * cart (rrsUi useSkuCheckout), so `?sku=tx-bdi&sku=tx-bdi-audio` opens checkout at the audio total with the
 * add-on ticked. VITE_TEXAS_AUDIO_SKUS is a comma list so QA can pass its own test skus.
 */
export function texasAudioCheckoutUrl(enrollUrl: string): string {
  const list = (v: unknown) => String(v || '').split(',').map((s) => s.trim()).filter(Boolean);
  const skus = [
    ...list(import.meta.env.VITE_TEXAS_AUDIO_SKUS || TEXAS_COURSE.audioSku),
    ...(TEXAS_COURSE.autoplayLive ? list(import.meta.env.VITE_TEXAS_AUTOPLAY_SKU || TEXAS_COURSE.autoplaySku) : []),
  ];
  if (!enrollUrl.includes('sku=')) return enrollUrl;
  return enrollUrl + skus.map((s) => `&sku=${encodeURIComponent(s)}`).join('');
}
