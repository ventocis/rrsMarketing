import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Brand colors — use semantic names, never hardcode hex in components.
        // Update values in src/styles/global.css (:root CSS vars), not here.
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          deep: 'var(--color-primary-deep)',
          navy: 'var(--color-primary-navy)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          muted: 'var(--color-surface-muted)',
          dark: 'var(--color-surface-dark)',
        },
        text: {
          DEFAULT: 'var(--color-text)',
          body: 'var(--color-text-body)',
          muted: 'var(--color-text-muted)',
          subtle: 'var(--color-text-subtle)',
          inverse: 'var(--color-text-inverse)',
        },
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
        info: {
          DEFAULT: 'var(--color-info-bg)',
          border: 'var(--color-info-border)',
          text: 'var(--color-info-text)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
          bg: 'var(--color-success-bg)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
          bg: 'var(--color-error-bg)',
        },
        announcement: {
          DEFAULT: 'var(--color-announcement)',
          tx: 'var(--color-announcement-tx)',
        },
      },
      fontFamily: {
        sans: ["'DM Sans'", 'sans-serif'],
        heading: ["'Outfit'", 'sans-serif'],
        body: ["'Inter'", 'sans-serif'],
      },
      // Prose theme for policy pages and blog posts (state course sites). Uses the brand
      // tokens above so long-form text matches the rest of the site in every environment.
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--color-text-body)',
            '--tw-prose-headings': 'var(--color-text)',
            '--tw-prose-lead': 'var(--color-text-body)',
            '--tw-prose-links': 'var(--color-primary-deep)',
            '--tw-prose-bold': 'var(--color-text)',
            '--tw-prose-counters': 'var(--color-text-muted)',
            '--tw-prose-bullets': 'var(--color-text-subtle)',
            '--tw-prose-hr': 'var(--color-border)',
            '--tw-prose-quotes': 'var(--color-text)',
            '--tw-prose-quote-borders': 'var(--color-primary)',
            '--tw-prose-captions': 'var(--color-text-muted)',
            '--tw-prose-code': 'var(--color-text)',
            '--tw-prose-th-borders': 'var(--color-border)',
            '--tw-prose-td-borders': 'var(--color-border)',
            fontFamily: "'DM Sans', sans-serif",
            maxWidth: 'none',
            'h1, h2, h3, h4': {
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: '-0.02em',
              fontWeight: '700',
            },
            h2: { fontSize: '1.375rem', marginTop: '2.25em', paddingBottom: '0.4em', borderBottom: '1px solid var(--color-border)' },
            h3: { fontSize: '1.125rem', marginTop: '1.75em' },
            a: { textDecoration: 'underline', textUnderlineOffset: '2px' },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
          },
        },
      },
    },
  },
  plugins: [typography],
};
