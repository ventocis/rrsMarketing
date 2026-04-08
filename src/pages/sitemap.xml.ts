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

// Texas courts routes
const texasCourtsRoutes = ['/texas/courts'];
const courtSlugRoutes = ((courtsData as any).courts as Array<{ slug: string }>).map(c => `/texas/courts/${c.slug}`);

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
