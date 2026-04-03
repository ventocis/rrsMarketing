/**
 * Texas enrollment / "Start Course" URL from `VITE_TEXAS_ENROLLMENT_URL` (build-time).
 * When unset or empty, use the internal course page (prod: /courses/tx-defensive → affiliate flow).
 */
const fromEnv = String(import.meta.env.VITE_TEXAS_ENROLLMENT_URL ?? '').trim();
export const TEXAS_ENROLLMENT_URL = fromEnv || '/courses/tx-defensive';
