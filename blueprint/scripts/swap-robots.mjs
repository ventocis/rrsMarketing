/**
 * swap-robots.mjs [allow|block]
 * Writes robots.txt into dist/ according to mode.
 */
import fs from "node:fs";
import path from "node:path";
const mode = process.argv[2] || "block";
const dist = path.resolve("dist");
const body = mode==="allow"
  ? `User-agent: *\nAllow: /\nSitemap: https://roadreadysafety.com/sitemap.xml\n`
  : `User-agent: *\nDisallow: /\n`;
fs.writeFileSync(path.join(dist, "robots.txt"), body, "utf8");
console.log("robots.txt ->", mode);
