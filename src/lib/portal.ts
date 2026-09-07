/**
 * Portal URLs. VITE_PORTAL_URL is baked in at build time (https://app.qa.roadreadysafety.com on
 * QA, https://app.roadreadysafety.com on production), so a link built from it follows the build.
 *
 * The Terms of Service and Student Policies document is hosted by the portal, not by this site.
 * Every "Terms" link on the marketing site points here; there is no /terms page in this repo.
 */
export const portalUrl: string = (
  import.meta.env.VITE_PORTAL_URL || 'https://app.roadreadysafety.com'
).replace(/\/$/, '');

export const termsUrl: string = `${portalUrl}/terms`;
