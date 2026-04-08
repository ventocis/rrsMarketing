import type { APIRoute } from 'astro';
import coursesData from '../data/courses.json';

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
  '/texas-defensive-driving-cost',
];

const courseRoutes = (coursesData as Array<{ slug: string }>).map(c => `/courses/${c.slug}`);

const allRoutes = [...staticRoutes, ...courseRoutes];

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
