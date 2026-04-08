# Starter Guidelines for AI-Generated Sites (SSG / S3 + CloudFront)

## Environment & Configuration
- Use environment variables for all URLs and feature flags — never hardcode them
- Support per-environment config files (`.env`, `.env.qa`, `.env.prod` for example)
- Include a `.env.example` file documenting every variable with placeholder values
- All env vars are baked in at build time — there is no server runtime. Use a naming convention prefix to make this obvious
- Never commit `.env` files — use `.gitignore`

## SEO & Indexability

- Support toggling SEO indexability via env var (disable in non-prod)
- Generate a `sitemap.xml` and `robots.txt` as part of the build

## Styling & Design System

- Define all brand colors as variables (not hardcoded hex values)
- Use semantic color names: `primary`, `success`, `error`, `warning` — not `blue`, `red`
- Create or use reusable typography utilities (heading sizes, paragraph sizes) as CSS classes

## Analytics
- Enable analytics only in production via env var
- Store tracking IDs (GA, Ads) in env vars
- Disable all tracking in dev/test environments

## Build & Deployment
- Build outputs a folder of static files — no server process
- We are optimizing for SEO. We want to use static site generation to generate the site.
- Architectural Rule: Everything is static HTML by default. We are using Astro's Islands Architecture to prevent 'The Hydration Tax.'
- Performance Target: Aim for a 100/100 Lighthouse score on Mobile, specifically targeting zero 'Total Blocking Time.'
