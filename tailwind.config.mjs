/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Brand colors — use semantic names, never hardcode hex in components
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          deep: 'var(--color-primary-deep)',
          badge: 'var(--color-primary-badge)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          muted: 'var(--color-surface-muted)',
        },
        text: {
          DEFAULT: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
          subtle: 'var(--color-text-subtle)',
          inverse: 'var(--color-text-inverse)',
        },
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
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
