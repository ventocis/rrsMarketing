import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { readFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// VITE_SITE_URL is baked in at build time. Always falls back to prod URL.
const siteUrl = (process.env.VITE_SITE_URL || 'https://roadreadysafety.com').replace(/\/$/, '');

// Non-production builds must not publish a sitemap or llms.txt: both advertise every URL on the host,
// and that is how Bing found and indexed qa.roadreadysafety.com (2026-10-14). The decision is read off
// the build itself rather than process.env: Astro loads .env.<mode> for import.meta.env in pages, but
// not into process.env here, so a config-time env test ran the strip on production too. The sitemap
// endpoint (src/pages/sitemap.xml.ts, gated by src/lib/site.ts) emits an empty urlset off production;
// an empty sitemap therefore identifies a non-production build, and both files come out of dist/.
const stripNonProdCrawlFiles = {
  name: 'rrs-strip-nonprod-crawl-files',
  hooks: {
    'astro:build:done': async ({ dir, logger }) => {
      const out = fileURLToPath(dir);
      const sitemap = await readFile(join(out, 'sitemap.xml'), 'utf8').catch(() => '');
      if (sitemap.includes('<loc>')) return; // production: the sitemap lists pages, keep everything
      for (const f of ['sitemap.xml', 'llms.txt']) {
        await rm(join(out, f), { force: true });
        logger.info(`non-production build (empty sitemap): removed ${f}`);
      }
    },
  },
};

export default defineConfig({
  site: siteUrl,
  output: 'static',
  build: {
    // Inline all CSS into each page's <style> tag instead of emitting separate
    // content-hashed .css chunk files. This eliminates the "unstyled page" bug
    // caused by a browser or CDN serving stale HTML that references a CSS chunk
    // hash that no longer exists after a new deploy.
    inlineStylesheets: 'always',
  },
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    stripNonProdCrawlFiles,
  ],
});
