import type { APIRoute } from 'astro';

// Allow indexing only when analytics (prod) are enabled — all other envs get noindex
const isProd = import.meta.env.VITE_ENABLE_ANALYTICS === 'true';
const siteUrl = import.meta.env.VITE_SITE_URL || 'https://roadreadysafety.com';

export const GET: APIRoute = () => {
  const content = isProd
    ? `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`
    : `User-agent: *\nDisallow: /\n`;

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
