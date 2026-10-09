// Single source of truth for the Texas 6-hour Driving Safety Course (DSC) facts that
// appear in titles, schema and copy. Change a number here, not in a page.
//
// The price must stay at or above the statutory floor in Tex. Educ. Code §1001.352
// ($25, HB 3012, eff. Sept. 1, 2025). The portal checkout (sku tx-bdi) is the system
// of record for what is actually charged; keep this in step with it.
export const TEXAS_COURSE = {
  sku: 'tx-bdi',
  name: 'Texas 6-Hour Defensive Driving Course',
  /** Whole-dollar price charged at checkout, all-in, certificate included. */
  price: 28,
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
   * app.roadreadysafety.com/public/checkout on 2026-10-07 ("Audio - Read to Me", $4.99).
   * QA uses different test skus, so the link reads VITE_TEXAS_AUDIO_SKUS first.
   */
  audioSku: 'tx-bdi-audio',
  audioPrice: 4.99,
  /**
   * Autoplay add-on, sold alongside audio (QA checkout "Autoplay", $4.99, sku autoplay1 on 2026-10-07).
   * Jackson set the /texas audio card to the course + audio + autoplay total on 2026-10-07.
   * Production checkout had no autoplay product yet that day; add its sku to the link
   * (VITE_TEXAS_AUDIO_SKUS / audioSku default) once it exists, so checkout matches this price.
   */
  autoplayPrice: 4.99,
  /**
   * Is the autoplay add-on sold on production yet? false = audio-only offer: the /texas "+ Audio" card shows
   * course + audio ($32.99), hides the autoplay bullets, and the checkout link adds only the audio sku.
   * Jackson, 2026-10-08: audio only until autoplay merges into prod (planned Monday). Flip to true then, and
   * set autoplaySku to the production autoplay sku; the price, copy and checkout link all follow this flag.
   */
  autoplayLive: false,
  /** Production autoplay sku (unknown until it ships). QA overrides with VITE_TEXAS_AUTOPLAY_SKU. */
  autoplaySku: '',
} as const;

/** "$28" */
export const TEXAS_PRICE_LABEL = `$${TEXAS_COURSE.price}`;

/** "$32.99" today (course + audio); "$37.98" once autoplayLive is true (course + audio + autoplay). */
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
