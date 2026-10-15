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

const GLOBAL_BANNED = ['CP#1234', 'CP1234', 'TDLR'];
/** Routes under a state path that use the site-wide Header/Footer (the North Dakota course chooser). */
const SITE_CHROME_PAGES = ['/north-dakota/which-course'];

function walk(dir, out = [], skip = new Set()) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (skip.has(p)) continue;
    if (statSync(p).isDirectory()) walk(p, out, skip);
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
const allCourses = courseFiles.map((f) => JSON.parse(readFileSync(join(coursesDir, f), 'utf-8')));
const routeDir = (c) => join(dist, c.state.route.replace(/^\//, ''));

for (const course of allCourses) {
  const route = course.state.route.replace(/^\//, '');
  const dir = join(dist, route);
  if (!existsSync(dir)) {
    console.log(`· ${course.state.name}: no pages in dist (state off in this build)`);
    continue;
  }
  const banned = [...GLOBAL_BANNED, ...(course.claims?.banned ?? [])];
  // A course nested under this one's route (nd-ipr under /north-dakota) has its own banned list; skip its pages here.
  const nested = new Set(allCourses.filter((c) => c !== course && c.state.route.startsWith(`${course.state.route}/`)).map(routeDir));
  // Pages under a state route that render in the site-wide chrome (Header/Footer, like /courses) rather than
  // CourseLayout: the site footer carries the Texas licence line on purpose, so they are not state course pages.
  for (const p of SITE_CHROME_PAGES) if (p.startsWith(`${course.state.route}/`)) nested.add(join(dist, p.replace(/^\//, '')));
  const pages = walk(dir, [], nested);
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
