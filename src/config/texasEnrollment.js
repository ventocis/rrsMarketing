/**
 * Texas enrollment / "Start Course" URL.
 * - When VITE_TEXAS_ENROLLMENT_URL is set (e.g. QA build), use it for all Texas CTAs.
 * - Otherwise use the internal course page (prod: goes to /courses/tx-defensive → affiliate_link).
 */
const url = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_TEXAS_ENROLLMENT_URL
  ? String(import.meta.env.VITE_TEXAS_ENROLLMENT_URL).trim()
  : '';
export const TEXAS_ENROLLMENT_URL = url || '/courses/tx-defensive';
