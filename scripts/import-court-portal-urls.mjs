#!/usr/bin/env node
// One-off importer: copies the verified `portal_url` (online citation lookup / payment portal)
// from the CourtResearchTX research files into src/data/texas-courts.json as `portalUrl`.
//
//   node scripts/import-court-portal-urls.mjs ~/Claude/CourtResearchTX
//
// Rules: only http(s) URLs; a court keeps an existing portalUrl unless the research value is
// newer (researched_at) ; never removes a value. Source files are the batch raw.json /
// court-data*.json outputs produced by the court-page research pipeline (May–Sept 2026).
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';

const researchDir = process.argv[2];
if (!researchDir || !existsSync(researchDir)) {
  console.error('usage: node scripts/import-court-portal-urls.mjs <CourtResearchTX dir>');
  process.exit(1);
}
const files = [];
for (const e of readdirSync(researchDir)) {
  const p = join(researchDir, e);
  if (/^court-data.*\.json$/.test(e)) files.push(p);
  if (/^batch/.test(e) && statSync(p).isDirectory()) {
    for (const f of readdirSync(p)) if (f === 'raw.json' || /^court-data.*\.json$/.test(f)) files.push(join(p, f));
  }
}
const best = new Map(); // slug -> { url, when, file }
for (const f of files) {
  let d;
  try { d = JSON.parse(readFileSync(f, 'utf8')); } catch { continue; }
  const arr = Array.isArray(d) ? d : d.courts || Object.values(d);
  for (const c of arr) {
    if (!c || typeof c !== 'object' || !c.slug) continue;
    const raw = c.portal_url;
    if (typeof raw !== 'string') continue;
    const url = raw.trim();
    if (!/^https?:\/\/\S+$/i.test(url)) continue;
    const when = String(c.researched_at || statSync(f).mtime.toISOString()).slice(0, 10);
    const cur = best.get(c.slug);
    if (!cur || when > cur.when) best.set(c.slug, { url, when, file: f });
  }
}
const dataPath = join(process.cwd(), 'src', 'data', 'texas-courts.json');
const data = JSON.parse(readFileSync(dataPath, 'utf8'));
let added = 0, updated = 0;
for (const court of data.courts) {
  const hit = best.get(court.slug);
  if (!hit) continue;
  if (!court.portalUrl) added++;
  else if (court.portalUrl !== hit.url) updated++;
  else continue;
  court.portalUrl = hit.url;
}
writeFileSync(dataPath, JSON.stringify(data, null, 2) + '\n');
console.log(`research files: ${files.length}; courts with a portal URL in research: ${best.size}; added ${added}, updated ${updated}`);
