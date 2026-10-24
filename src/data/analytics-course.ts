/**
 * Course value for analytics: which course a page belongs to, sent to GA4 as `content_group`
 * and as a `course` parameter (Layout.astro pushes it to the dataLayer before GTM loads).
 * Values are the portal SKU slugs (tx-bdi, tx-ade, nd-ddc, nd-ipr, mo-dip, ...), a state-level
 * "<st>-general" for state hubs and articles, or "none".
 *
 * To add a course: add one line to COURSE_PATHS (a course landing page) or STATE_PREFIXES
 * (a new state). First match wins, so keep specific paths above their state prefix.
 * The checkout app keeps the same SKU values in its own analytics config (rrsUi).
 * Spec: Jackson change request 2026-10-24.
 */

/** Pages clearly about one course: exact path, or a prefix ending in "/" (covers everything below it). */
export const COURSE_PATHS: Array<[path: string, course: string]> = [
  ['/adult-drivers-ed/texas', 'tx-ade'],
  ['/adult-drivers-ed/texas/', 'tx-ade'],
  ['/north-dakota/insurance-premium-reduction', 'nd-ipr'],
  ['/north-dakota/insurance-premium-reduction/', 'nd-ipr'],
  // Texas pages that sell or compare the Texas defensive driving course itself.
  ['/texas/best-defensive-driving-course', 'tx-bdi'],
  ['/texas/cost', 'tx-bdi'],
  ['/texas/providers', 'tx-bdi'],
  ['/texas/audio-course', 'tx-bdi'],
  ['/texas/refund', 'tx-bdi'],
  ['/texas/road-ready-safety-reviews', 'tx-bdi'],
  ['/texas/defensive-driving-practice-test', 'tx-bdi'],
  ['/texas/spanish', 'tx-bdi'],
  ['/texas/vs/', 'tx-bdi'],
];

/** State hubs and state articles: the hub path and everything below it. */
export const STATE_PREFIXES: Array<[prefix: string, course: string]> = [
  ['/texas', 'tx-general'],
  ['/north-dakota', 'nd-general'],
  ['/missouri', 'mo-general'],
  ['/ohio', 'oh-general'],
  ['/idaho', 'id-general'],
  ['/new-york', 'ny-general'],
  ['/virginia', 'va-general'],
];

export const NO_COURSE = 'none';

/** Course value for a URL path, e.g. "/texas/lost-ticket" -> "tx-general". */
export function courseForPath(pathname: string): string {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  for (const [p, course] of COURSE_PATHS) {
    if (p.endsWith('/') ? path.startsWith(p) : path === p) return course;
  }
  for (const [prefix, course] of STATE_PREFIXES) {
    if (path === prefix || path.startsWith(prefix + '/')) return course;
  }
  return NO_COURSE;
}
