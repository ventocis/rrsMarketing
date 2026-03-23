/**
 * swap-robots.mjs [allow|block]
 * Writes robots.txt into dist/ according to mode.
 * allow = production (full crawler permissions + AI bots + block scrapers)
 * block = QA/staging (all crawlers disallowed)
 */
import fs from "node:fs";
import path from "node:path";
const mode = process.argv[2] || "block";
const dist = path.resolve("dist");

const allowBody = `# Standard crawlers
User-agent: *
Allow: /

# OpenAI
User-agent: GPTBot
Allow: /
Crawl-delay: 5

User-agent: OAI-SearchBot
Allow: /

# Perplexity
User-agent: PerplexityBot
Allow: /

# Google AI
User-agent: Google-Extended
Allow: /

# Microsoft / Bing AI
User-agent: Bingbot
Allow: /

# Anthropic / Claude
User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

# Block low-value scrapers
User-agent: Bytespider
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MJ12bot
Disallow: /

# Sitemap
Sitemap: https://roadreadysafety.com/sitemap.xml
`;

const blockBody = `# QA / staging environment — block all crawlers
User-agent: *
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: OAI-SearchBot
Disallow: /

User-agent: PerplexityBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Bingbot
Disallow: /

User-agent: Googlebot
Disallow: /
`;

fs.writeFileSync(path.join(dist, "robots.txt"), mode === "allow" ? allowBody : blockBody, "utf8");
console.log("robots.txt ->", mode);
