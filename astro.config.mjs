import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// VITE_SITE_URL is baked in at build time. Always falls back to prod URL.
const siteUrl = (process.env.VITE_SITE_URL || 'https://roadreadysafety.com').replace(/\/$/, '');

export default defineConfig({
  site: siteUrl,
  output: 'static',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
  ],
});
