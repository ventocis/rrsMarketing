/**
 * Texas Adult Driver Education (ADE-1317): the license, the gate and the checkout link, in one place.
 *
 * TDLR issued Driver Education Provider license C3705 on 2026-10-13 ("ROAD READY SAFETY, CURRENT,
 * Online Exclusively for Adults", expires 10/12/2027; TDLR Driver Education Provider Search, checked
 * the same day). 16 TAC §84.503(j)(4) requires the provider name and THIS number, never the driving
 * safety number CP1234, on every ADE page and through registration and payment. The portal checkout
 * for sku tx-ade already prints C3705.
 *
 * The gate: 16 TAC §84.80(e) barred advertising, enrollment and payment until the license existed, so
 * every ADE page was a redirect stub on production while ade-texas.json carried no license number.
 * The number is now the switch. Production never sets VITE_ADE_ROUTES_ENABLED (and .env.production is
 * code-owned), so the pages go live on the number alone; QA and local previews can also use the flag.
 */
import ade from '../data/ade-texas.json';
import { portalUrl } from './portal';

export const ADE_LICENSE: string = ade.provider.deLicenseNumber;

/** TDLR's own record of the license, one click (same pattern as TEXAS_COURSE.verifyUrl). */
export const ADE_VERIFY_URL: string = ade.provider.verifyUrl;

export const adeLicensed: boolean = Boolean(ADE_LICENSE);

const isProdSite = import.meta.env.VITE_ENABLE_ANALYTICS === 'true' && import.meta.env.VITE_IS_QA !== 'true';
const flagOn = import.meta.env.VITE_ADE_ROUTES_ENABLED === 'true';

/** Render the ADE routes at all. Production: licensed only. Elsewhere: licensed or flagged. */
export const adeEnabled: boolean = adeLicensed || (flagOn && !isProdSite);

/** Keep ADE pages out of the index (and the sitemap) until the license exists. */
export const adeNoindex: boolean = !adeLicensed;

/**
 * Checkout with the ADE course in the cart. The portal reads `sku` into the cart (rrsUi useSkuCheckout),
 * so the production default needs no env var; QA overrides with VITE_ADE_ENROLLMENT_URL.
 */
export const adeEnrollUrl: string =
  import.meta.env.VITE_ADE_ENROLLMENT_URL || `${portalUrl}/public/checkout?sku=${ade.course.sku}`;

export const adeContactUrl: string = import.meta.env.VITE_CONTACT_US_URL || '/contact';
export const adeLoginUrl: string = import.meta.env.VITE_LOGIN_URL || '#';
