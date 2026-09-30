/**
 * Environment gating for the per-state course sites (/ohio, /north-dakota, /idaho, /missouri).
 *
 * Modeled on the Texas ADE guard (src/pages/adult-drivers-ed/texas/index.astro):
 *
 *   Production   → a state renders when provider.approvalNumber is filled in its course data
 *                  file. That is the only production gate.
 *   QA / local   → a state renders when it is approved OR its code is in
 *                  VITE_STATE_COURSES_ENABLED, so unapproved states can be previewed.
 *
 * Production is identified by the existing env pair VITE_ENABLE_ANALYTICS=true and
 * VITE_IS_QA!=true, so nothing here needs .env.production (a CODEOWNERS-protected file).
 * Until 2026-09-30 production also required the state's code in VITE_STATE_COURSES_ENABLED,
 * which lives in .env.production; North Dakota's approval sat in source for a day while its
 * page stayed dark because that file had never been updated. The approval number is the
 * gate that carries the legal meaning, so it is now the only one production checks. A
 * developer's .env.local flag still cannot ship an unapproved state to production.
 *
 * Why this matters: every one of these states bars advertising a course before it is approved
 * (e.g. Ohio OAC 4501-21-08(C): "No person shall advertise in any manner a course of adult ...
 * remedial driving instruction prior to being approved."). While the approval number is empty,
 * pages are noindex in every environment and omitted from the sitemap. Both lift by themselves
 * once the number is filled in.
 */

export interface CourseGateInput {
  state: { code: string };
  provider: { approvalNumber: string };
  course: { sku: string };
}

const enabledList = (import.meta.env.VITE_STATE_COURSES_ENABLED || '')
  .split(',')
  .map((s: string) => s.trim().toLowerCase())
  .filter(Boolean);

export const isProdSite =
  import.meta.env.VITE_ENABLE_ANALYTICS === 'true' && import.meta.env.VITE_IS_QA !== 'true';

export function isFlagOn(course: CourseGateInput): boolean {
  return enabledList.includes(course.state.code.toLowerCase());
}

export function isLicensed(course: CourseGateInput): boolean {
  return Boolean(course.provider.approvalNumber && course.provider.approvalNumber.trim());
}

/** Page renders at all. Prod: approval number alone. QA/local: approval OR the preview flag. */
export function isEnabled(course: CourseGateInput): boolean {
  return isProdSite ? isLicensed(course) : isLicensed(course) || isFlagOn(course);
}

/** noindex until approved, in every environment (QA serves a permissive robots.txt). */
export function isNoindex(course: CourseGateInput): boolean {
  return !isLicensed(course);
}

/** Listed in the sitemap only when live AND approved. */
export function isInSitemap(course: CourseGateInput): boolean {
  return isEnabled(course) && isLicensed(course);
}

/**
 * Enrollment URL. A per-course override (VITE_<STATE>_ENROLLMENT_URL) wins; otherwise derive
 * from VITE_PORTAL_URL so QA builds point at the QA portal automatically.
 */
export function enrollUrl(course: CourseGateInput): string {
  const override = (import.meta.env as Record<string, string | undefined>)[
    `VITE_${course.state.code.toUpperCase()}_ENROLLMENT_URL`
  ];
  if (override) return override;
  const portal = (import.meta.env.VITE_PORTAL_URL || 'https://app.roadreadysafety.com').replace(/\/$/, '');
  return `${portal}/public/checkout?sku=${course.course.sku}`;
}

export const loginUrl: string = import.meta.env.VITE_LOGIN_URL || '#';
export const contactUrl: string = import.meta.env.VITE_CONTACT_US_URL || '/support';
export const siteUrl: string = (import.meta.env.VITE_SITE_URL || 'https://roadreadysafety.com').replace(/\/$/, '');
