#!/usr/bin/env node
/**
 * Claims checker for the per-state course sites.
 *
 * Scans the built HTML under dist/<state route>/ for phrases the state's rules forbid us to
 * publish (each course data file lists them under claims.banned) and for the Texas licence
 * strings that must never appear outside Texas pages. Exits 1 on any hit.
 *
 * Usage:  npm run build:qa && node scripts/check-claims.mjs
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

const dist = join(process.cwd(), 'dist');
const coursesDir = join(process.cwd(), 'src/data/courses');

const GLOBAL_BANNED = ['CP#1234', 'TDLR'];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');
}

let failures = 0;
const courseFiles = readdirSync(coursesDir).filter((f) => f.endsWith('.json'));

for (const file of courseFiles) {
  const course = JSON.parse(readFileSync(join(coursesDir, file), 'utf-8'));
  const route = course.state.route.replace(/^\//, '');
  const dir = join(dist, route);
  if (!existsSync(dir)) {
    console.log(`· ${course.state.name}: no pages in dist (state off in this build)`);
    continue;
  }
  const banned = [...GLOBAL_BANNED, ...(course.claims?.banned ?? [])];
  // The site-wide Terms document legitimately names every state's regulator and programs
  // (Part 3), so it is excluded; every other page in the state's tree is checked.
  const pages = walk(dir).filter((p) => !p.endsWith('/terms/index.html'));
  let hits = 0;
  for (const page of pages) {
    const text = stripTags(readFileSync(page, 'utf-8'));
    for (const phrase of banned) {
      const re = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      const m = text.match(re);
      if (m) {
        hits++;
        const i = m.index ?? 0;
        console.error(`✗ ${page.replace(dist, 'dist')}: "${phrase}" → …${text.slice(Math.max(0, i - 60), i + 80)}…`);
      }
    }
  }
  if (hits) failures += hits;
  console.log(`${hits ? '✗' : '✓'} ${course.state.name}: ${pages.length} pages, ${hits} banned-phrase hit(s)`);
}

if (failures) {
  console.error(`\n${failures} banned phrase(s) found. Fix the copy before deploying.`);
  process.exit(1);
}
console.log('\nClaims check passed.');
