import type { APIRoute } from 'astro';
import coursesData from '../data/courses.json';
import blogData from '../data/blog.json';
import courtsData from '../data/texas-courts.json';
import adeData from '../data/ade-texas.json';
import { sitemapCourses, STATE_SUBROUTES } from '../data/courses/index';
import { postsFor } from '../data/blog/index';

// Generate sitemap at build time from known static routes
const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://roadreadysafety.com').replace(/\/$/, '');

const staticRoutes = [
  '/',
  '/courses',
  '/faq',
  '/blog',
  '/privacy',
  '/terms',
  '/partners',
  '/support/how-to-submit',
  '/texas',
  '/texas/pricing',
  '/texas/faq',
  '/texas/helpcenter',
  '/texas/terms',
  '/texas/refund',
  '/texas/accessibility',
  '/texas/cost',
  '/texas/best-defensive-driving-course',
  '/texas/speeding-ticket',
  '/texas/speeding-25-over',
  '/texas/ticket-law-changes-2025',
  '/texas/tdlr-approved',
  '/texas/ticket-dismissal',
  '/texas/spanish',
  '/texas/fastest-defensive-driving-course',
  '/texas/what-the-course-looks-like',
  '/texas/tyler',
  '/texas/providers',
  '/texas/type-3a-driving-record',
  '/texas/certificate-rejected',
  '/texas/transparency',
  '/texas/cdl-defensive-driving',
  '/texas/12-month-rule',
  '/texas/insurance-discount',
  '/texas/deferred-disposition',
  '/texas/missed-court-date',
  '/texas/already-paid-ticket',
  '/texas/request-defensive-driving',
  '/texas/defensive-driving-certificate',
  '/texas/school-zone-ticket',
  '/texas/construction-zone-ticket',
  '/texas/no-insurance-ticket',
  '/texas/expired-registration-ticket',
  '/texas/expired-license-ticket',
  '/texas/equipment-violation-ticket',
  '/texas/red-light-ticket',
  '/texas/cell-phone-ticket',
  '/texas/seat-belt-ticket',
  '/texas/child-seat-ticket',
  '/texas/motorcycle-ticket',
  '/texas/out-of-state-driver',
  '/texas/under-25-ticket',
  '/texas/minor-traffic-ticket',
  '/texas/ticket-warrant',
  '/texas/court-costs',
  '/texas/dismissal-timeline',
  '/texas/lost-ticket',
  '/texas/online-vs-classroom',
  '/texas/stop-sign-ticket',
  '/texas/defensive-driving-statistics',
  '/texas/defensive-driving-vs-deferred-disposition',
  '/texas/ways-to-dismiss-ticket',
  '/texas/do-tickets-have-points',
  '/texas/show-cause-hearing',
  '/texas/multiple-tickets',
  '/texas/how-much-is-a-speeding-ticket',
  '/texas/fight-or-dismiss',
  '/texas/court-appearance',
  '/texas/municipal-vs-jp-court',
  '/texas/ticket-insurance-impact',
  '/texas/notarized-affidavit',
  '/texas/houston',
  '/texas/dallas',
  '/texas/fort-worth',
  '/texas/san-antonio',
  '/texas/austin',
  '/texas/look-up-your-ticket',
  '/texas/omnibase-hold',
  '/texas/registration-block',
  '/texas/dsc-deadlines-by-court',
  '/texas/dsc-fees-by-court',
  '/texas/eligibility-tracker',
  '/texas/vs',
  '/texas/vs/onlinetxdefensivedriving',
  '/texas/vs/aceable',
  '/texas/vs/defensivedriving',
  '/texas/vs/improv',
  '/texas/vs/comedydriving',
  '/texas/vs/safemotorist',
  // New York cluster
  '/new-york',
  '/new-york/does-defensive-driving-remove-points',
  '/new-york/insurance-discount',
  '/new-york/defensive-driving-pending-ticket',
  '/new-york/nyc-tvb-vs-town-court',
  '/new-york/online-vs-classroom',
  '/new-york/how-often-can-you-take-it',
  '/new-york/course-length',
  '/new-york/is-it-worth-it',
  '/new-york/2026-point-changes',
  '/new-york/cdl-defensive-driving',
  '/new-york/5-hour-pre-licensing',
];

// Adult Driver Education (ADE-1317) cluster — excluded from the sitemap until the
// TDLR Driver Education Provider license is approved and VITE_ADE_ROUTES_ENABLED is true.
// 16 TAC §84.80(e) bars provider-name advertising before approval.
// Listed only when the routes are on AND the DE licence exists. While the licence is
// pending the pages render noindex, so advertising them in the sitemap would contradict that.
const adeEnabled =
  import.meta.env.VITE_ADE_ROUTES_ENABLED === 'true' && Boolean(adeData.provider.deLicenseNumber);
const adeRoutes = adeEnabled
  ? [
      '/adult-drivers-ed/texas',
      '/adult-drivers-ed/texas/helpcenter',
      '/adult-drivers-ed/texas/terms',
      '/adult-drivers-ed/texas/refund',
      '/adult-drivers-ed/texas/accessibility',
      '/adult-drivers-ed/texas/make-up-policy',
      '/adult-drivers-ed/texas/final-exam-policy',
      '/adult-drivers-ed/texas/instructor-of-record',
      '/adult-drivers-ed/texas/public-interest-notice',
    ]
  : [];

// Per-state course sites (/ohio, ...). Listed only when the state is enabled AND approved
// (src/lib/courseFlags.ts). While approval is pending the pages are noindex, so they stay out.
const stateCourseRoutes = sitemapCourses.flatMap((c) => {
  const base = c.state.route;
  const subs = STATE_SUBROUTES.map((s) => `${base}${s}`);
  const posts = postsFor(c.state.code).map((p) => `${base}/blog/${p.slug}`);
  const extras = c.state.code === 'OH' ? [`${base}/12-point-suspension`] : [];
  return [...subs, ...posts, ...extras];
});

const courseRoutes = (coursesData as Array<{ slug: string }>).map(c => `/courses/${c.slug}`);

const courseRequirementsRoutes = (coursesData as Array<{ slug: string }>).map(c => `/courses/${c.slug}/requirements`);

const blogRoutes = ((blogData as any).posts ?? []).map((p: { slug: string }) => `/blog/${p.slug}`);

// Find routes: all state/courseType combos with 2+ courses, plus state/multi for each state
const courses = coursesData as Array<{ slug: string; state: string; course_type: string }>;
const combos = new Map<string, number>();
for (const c of courses) {
  const key = `${c.state}__${c.course_type}`;
  combos.set(key, (combos.get(key) ?? 0) + 1);
}
const findRoutes: string[] = [];
for (const [key, count] of combos) {
  if (count >= 2) {
    const [state, courseType] = key.split('__');
    findRoutes.push(`/find/${state}/${courseType}`);
  }
}
const states = new Set(courses.map(c => c.state));
for (const state of states) {
  findRoutes.push(`/find/${state}/multi`);
}

// Texas courts routes
const texasCourtsRoutes = ['/texas/courts'];
const courtSlugRoutes = ((courtsData as any).courts as Array<{ slug: string }>).map(c => `/texas/courts/${c.slug}`);

const allRoutes = [...staticRoutes, ...adeRoutes, ...stateCourseRoutes, ...courseRoutes, ...courseRequirementsRoutes, ...blogRoutes, ...findRoutes, ...texasCourtsRoutes, ...courtSlugRoutes];

const toEntry = (path: string) =>
  `  <url>\n    <loc>${siteUrl}${path}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`;

export const GET: APIRoute = () => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(toEntry).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
