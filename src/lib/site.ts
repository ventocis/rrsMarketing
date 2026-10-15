/**
 * Which site this build is for, and the one rule for "may a search engine index it".
 *
 * Production is the env pair VITE_ENABLE_ANALYTICS=true AND VITE_IS_QA!=true, the same test
 * src/lib/courseFlags.ts and src/lib/ade.ts already use, so nothing here needs .env.production
 * (a CODEOWNERS-protected file). QA sets VITE_ENABLE_ANALYTICS=true for its own GTM container,
 * which is why the older analytics-only gate let qa.roadreadysafety.com ship index,follow pages,
 * a full robots.txt and a 2,107-URL sitemap of qa. URLs. Bing indexed them (2026-10-14).
 *
 * Everything that decides indexing reads isProductionSite: the robots meta (Layout.astro),
 * robots.txt, sitemap.xml and the llms.txt / sitemap strip in astro.config.mjs. Canonicals always
 * point at production so any copy of a page that does get crawled consolidates to the real one.
 */
export const PROD_SITE_URL = 'https://roadreadysafety.com';

export const isProductionSite =
  import.meta.env.VITE_ENABLE_ANALYTICS === 'true' && import.meta.env.VITE_IS_QA !== 'true';

/** The host this build is served from (production, QA or local). For links that must stay on this host. */
export const siteUrl = (import.meta.env.VITE_SITE_URL || PROD_SITE_URL).replace(/\/$/, '');
