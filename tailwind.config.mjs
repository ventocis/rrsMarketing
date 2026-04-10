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
        announcement: 'var(--color-announcement)',
      },
      fontFamily: {
        sans: ["'DM Sans'", 'sans-serif'],
        heading: ["'Outfit'", 'sans-serif'],
        body: ["'Inter'", 'sans-serif'],
      },
    },
  },
  plugins: [],
};
