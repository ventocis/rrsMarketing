import type { APIRoute } from 'astro';
import coursesData from '../data/courses.json';
import blogData from '../data/blog.json';
import courtsData from '../data/texas-courts.json';

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
  '/texas/eligibility-tracker',
];

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

// Texas courts routes — only the 80 enhanced court pages with full DSC content
// Non-enhanced courts (~1,662 pages) are excluded to focus crawl budget on high-quality pages
const texasCourtsRoutes = ['/texas/courts'];
const enhancedCourtSlugs = new Set([
  // Batch 1 — original 5
  'harris-municipal-houston', 'travis-municipal-austin', 'dallas-municipal-dallas',
  'bexar-municipal-san-antonio', 'dallas-municipal-garland',
  // Batch 2 — 24 courts (v1 run)
  'tarrant-municipal-fort-worth', 'el-paso-municipal-el-paso', 'tarrant-municipal-arlington',
  'nueces-municipal-corpus-christi', 'collin-municipal-plano', 'lubbock-municipal-lubbock',
  'webb-municipal-laredo', 'dallas-municipal-irving', 'collin-municipal-frisco',
  'collin-municipal-mckinney', 'potter-municipal-amarillo', 'dallas-municipal-grand-prairie',
  'bell-municipal-killeen', 'cameron-municipal-brownsville', 'harris-municipal-pasadena',
  'dallas-municipal-mesquite', 'hidalgo-municipal-mcallen', 'denton-municipal-denton',
  'mclennan-municipal-waco', 'dallas-municipal-carrollton', 'midland-municipal-midland',
  'taylor-municipal-abilene', 'jefferson-municipal-beaumont', 'williamson-municipal-round-rock',
  // Batch 3 — 25 courts (v2 run)
  'brazoria-municipal-pearland', 'dallas-municipal-richardson', 'ector-municipal-odessa',
  'denton-municipal-lewisville', 'collin-municipal-allen', 'galveston-municipal-league-city',
  'fort-bend-municipal-sugar-land', 'smith-municipal-tyler', 'brazos-municipal-college-station',
  'hays-municipal-san-marcos', 'wichita-municipal-wichita-falls', 'gregg-municipal-longview',
  'denton-municipal-flower-mound', 'montgomery-municipal-conroe', 'williamson-municipal-cedar-park',
  'comal-municipal-new-braunfels', 'hidalgo-municipal-edinburg', 'harris-municipal-baytown',
  'bell-municipal-temple', 'hidalgo-municipal-pharr', 'hidalgo-municipal-mission',
  'cameron-municipal-harlingen', 'williamson-municipal-georgetown', 'travis-municipal-pflugerville',
  'victoria-municipal-victoria',
  // Batch 4 — 25 courts (v3 run)
  'tom-green-municipal-san-angelo', 'brazos-municipal-bryan', 'fort-bend-municipal-missouri-city',
  'tarrant-municipal-mansfield', 'williamson-municipal-leander', 'hays-municipal-kyle',
  'tarrant-municipal-north-richland-hills', 'dallas-municipal-rowlett', 'tarrant-municipal-euless',
  'collin-municipal-wylie', 'rockwall-municipal-rockwall', 'tarrant-municipal-grapevine',
  'tarrant-municipal-bedford', 'dallas-municipal-desoto', 'dallas-municipal-cedar-hill',
  'johnson-municipal-burleson', 'galveston-municipal-galveston', 'galveston-municipal-texas-city',
  'guadalupe-municipal-schertz', 'tarrant-municipal-haltom-city', 'tarrant-municipal-hurst',
  'dallas-municipal-duncanville', 'ellis-municipal-waxahachie', 'parker-municipal-weatherford',
  'jefferson-municipal-port-arthur',
  // Harris County JP courts (covered by isEnhanced county/type check)
  'harris-justice-of-the-peace-precinct-1',
]);
const courtSlugRoutes = ((courtsData as any).courts as Array<{ slug: string }>)
  .filter(c => enhancedCourtSlugs.has(c.slug))
  .map(c => `/texas/courts/${c.slug}`);

const allRoutes = [...staticRoutes, ...courseRoutes, ...courseRequirementsRoutes, ...blogRoutes, ...findRoutes, ...texasCourtsRoutes, ...courtSlugRoutes];

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
