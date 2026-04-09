import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// VITE_SITE_URL is baked in at build time. Always falls back to prod URL.
const siteUrl = (process.env.VITE_SITE_URL || 'https://roadreadysafety.com').replace(/\/$/, '');

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
  ],
});
