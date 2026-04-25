import type { APIRoute } from 'astro';

// Allow indexing only when analytics (prod) are enabled — all other envs get noindex
const isProd = import.meta.env.VITE_ENABLE_ANALYTICS === 'true';
const siteUrl = import.meta.env.VITE_SITE_URL || 'https://roadreadysafety.com';

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

const nonProdRobots = `User-agent: *
Disallow: /
`;

export const GET: APIRoute = () => {
  return new Response(isProd ? prodRobots : nonProdRobots, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
