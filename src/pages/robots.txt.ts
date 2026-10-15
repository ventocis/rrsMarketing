import type { APIRoute } from 'astro';
import { isProductionSite, siteUrl } from '../lib/site';

// Only the production build advertises itself to crawlers (src/lib/site.ts). QA and local builds get
// the non-prod file below.

const prodRobots = `# Road Ready Safety — robots.txt

# Allow all crawlers by default
User-agent: *
Allow: /

# Google
User-agent: Googlebot
Allow: /

# Bing
User-agent: Bingbot
Allow: /

# OpenAI / ChatGPT
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

# Anthropic / Claude
User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

# Perplexity
User-agent: PerplexityBot
Allow: /

# Common Crawl (used by many AI training datasets)
User-agent: CCBot
Allow: /

# Google AI (Gemini, AI Overviews, AI Mode)
User-agent: Google-Extended
Allow: /

# Meta AI
User-agent: FacebookBot
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

// Non-production hosts (qa.roadreadysafety.com): every page carries <meta name="robots" content="noindex, nofollow">
// and the sitemap is empty, so a crawler that fetches a page sees the noindex and drops it. Crawling stays
// allowed on purpose: a Disallow would stop Bing and Google from ever seeing the noindex, so the QA URLs they
// already hold (2026-10-14) would stay indexed. Once the qa. host is out of the index and behind auth, this
// can become Disallow: /.
const nonProdRobots = `# Non-production build. Every page is noindex, nofollow and there is no sitemap.
User-agent: *
Allow: /
`;

export const GET: APIRoute = () => {
  return new Response(isProductionSite ? prodRobots : nonProdRobots, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
