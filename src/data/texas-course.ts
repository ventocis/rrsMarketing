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
  /** State-mandated course length in hours (TDLR Course of Organized Instruction; 16 TAC §84.500). */
  hours: 6,
} as const;

/** "$28" */
export const TEXAS_PRICE_LABEL = `$${TEXAS_COURSE.price}`;
