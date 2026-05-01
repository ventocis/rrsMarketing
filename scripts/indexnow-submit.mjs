/**
 * IndexNow Submission Script — Road Ready Safety
 *
 * Notifies Bing (and all IndexNow-participating engines) of new/updated pages.
 * Run manually after a deploy or content update:
 *
 *   npm run indexnow           — submits all 80 enhanced court pages + key marketing pages
 *   npm run indexnow -- courts — submits court pages only
 *   npm run indexnow -- marketing — submits marketing pages only
 *
 * The key file at /6550a12bb60949a3a21d8f456b136059.txt must be live on the
 * production domain before Bing can verify ownership.
 *
 * IndexNow API docs: https://www.indexnow.org/documentation
 */

// Load .env.local if present
import fs from 'fs';
if (fs.existsSync('.env.local')) {
  fs.readFileSync('.env.local', 'utf8').split('\n').forEach(line => {
    const [k, ...v] = line.split('=');
    if (k?.trim() && v.length && !process.env[k.trim()]) {
      process.env[k.trim()] = v.join('=').trim();
    }
  });
}

const KEY = process.env.INDEXNOW_KEY || '6550a12bb60949a3a21d8f456b136059';
const HOST = 'roadreadysafety.com';
const BASE = `https://${HOST}`;
const KEY_LOCATION = `${BASE}/${KEY}.txt`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow';

// ─── All 80 enhanced court page slugs ────────────────────────────────────────
// Batch 1 — original 5
const BATCH1_SLUGS = [
  'harris-municipal-houston',
  'travis-municipal-austin',
  'dallas-municipal-dallas',
  'bexar-municipal-san-antonio',
  'dallas-municipal-garland',
  'harris-justice-of-the-peace-precinct-1',
];

// Batch 2 — v1 run (24 courts)
const BATCH2_SLUGS = [
  'tarrant-municipal-fort-worth',
  'el-paso-municipal-el-paso',
  'tarrant-municipal-arlington',
  'nueces-municipal-corpus-christi',
  'collin-municipal-plano',
  'lubbock-municipal-lubbock',
  'webb-municipal-laredo',
  'dallas-municipal-irving',
  'collin-municipal-frisco',
  'collin-municipal-mckinney',
  'potter-municipal-amarillo',
  'dallas-municipal-grand-prairie',
  'bell-municipal-killeen',
  'cameron-municipal-brownsville',
  'harris-municipal-pasadena',
  'dallas-municipal-mesquite',
  'hidalgo-municipal-mcallen',
  'denton-municipal-denton',
  'mclennan-municipal-waco',
  'dallas-municipal-carrollton',
  'midland-municipal-midland',
  'taylor-municipal-abilene',
  'jefferson-municipal-beaumont',
  'williamson-municipal-round-rock',
];

// Batch 3 — v2 run (25 courts)
const BATCH3_SLUGS = [
  'brazoria-municipal-pearland',
  'dallas-municipal-richardson',
  'ector-municipal-odessa',
  'denton-municipal-lewisville',
  'collin-municipal-allen',
  'galveston-municipal-league-city',
  'fort-bend-municipal-sugar-land',
  'smith-municipal-tyler',
  'brazos-municipal-college-station',
  'hays-municipal-san-marcos',
  'wichita-municipal-wichita-falls',
  'gregg-municipal-longview',
  'denton-municipal-flower-mound',
  'montgomery-municipal-conroe',
  'williamson-municipal-cedar-park',
  'comal-municipal-new-braunfels',
  'hidalgo-municipal-edinburg',
  'harris-municipal-baytown',
  'bell-municipal-temple',
  'hidalgo-municipal-pharr',
  'hidalgo-municipal-mission',
  'cameron-municipal-harlingen',
  'williamson-municipal-georgetown',
  'travis-municipal-pflugerville',
  'victoria-municipal-victoria',
];

// Batch 4 — v3 run (25 courts)
const BATCH4_SLUGS = [
  'tom-green-municipal-san-angelo',
  'brazos-municipal-bryan',
  'fort-bend-municipal-missouri-city',
  'tarrant-municipal-mansfield',
  'williamson-municipal-leander',
  'hays-municipal-kyle',
  'tarrant-municipal-north-richland-hills',
  'dallas-municipal-rowlett',
  'tarrant-municipal-euless',
  'collin-municipal-wylie',
  'rockwall-municipal-rockwall',
  'tarrant-municipal-grapevine',
  'tarrant-municipal-bedford',
  'dallas-municipal-desoto',
  'dallas-municipal-cedar-hill',
  'johnson-municipal-burleson',
  'galveston-municipal-galveston',
  'galveston-municipal-texas-city',
  'guadalupe-municipal-schertz',
  'tarrant-municipal-haltom-city',
  'tarrant-municipal-hurst',
  'dallas-municipal-duncanville',
  'ellis-municipal-waxahachie',
  'parker-municipal-weatherford',
  'jefferson-municipal-port-arthur',
];

const ALL_COURT_SLUGS = [...BATCH1_SLUGS, ...BATCH2_SLUGS, ...BATCH3_SLUGS, ...BATCH4_SLUGS];

const COURT_URLS = ALL_COURT_SLUGS.map(slug => `${BASE}/texas/courts/${slug}`);

// ─── Key marketing pages ──────────────────────────────────────────────────────
const MARKETING_URLS = [
  `${BASE}/texas`,
  `${BASE}/texas/courts`,
  `${BASE}/texas/faq`,
  `${BASE}/texas/pricing`,
  `${BASE}/texas/eligibility-tracker`,
  `${BASE}/texas/helpcenter`,
];

// ─── Submission logic ─────────────────────────────────────────────────────────
async function submitBatch(urls, batchLabel) {
  // IndexNow accepts up to 10,000 URLs per request — split into chunks of 500
  // to stay well within rate limits and get per-chunk status feedback
  const CHUNK_SIZE = 500;
  const chunks = [];
  for (let i = 0; i < urls.length; i += CHUNK_SIZE) {
    chunks.push(urls.slice(i, i + CHUNK_SIZE));
  }

  let totalSubmitted = 0;
  let totalErrors = 0;

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const payload = {
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: chunk,
    };

    console.log(`  Chunk ${i + 1}/${chunks.length}: submitting ${chunk.length} URLs...`);

    try {
      const res = await fetch(INDEXNOW_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
      });

      const statusText = res.status === 200 ? '✓ OK — URLs accepted'
        : res.status === 202 ? '✓ Accepted — queued for crawl'
        : res.status === 400 ? '✗ Bad request — check URL format or key'
        : res.status === 403 ? '✗ Forbidden — key not verified at keyLocation URL'
        : res.status === 422 ? '✗ Unprocessable — key does not match keyLocation content'
        : res.status === 429 ? '⏳ Rate limited — too many requests'
        : `? HTTP ${res.status}`;

      console.log(`    ${statusText}`);

      if (res.status === 200 || res.status === 202) {
        totalSubmitted += chunk.length;
      } else {
        totalErrors += chunk.length;
        // Try to read error body
        try {
          const body = await res.text();
          if (body) console.log(`    Response: ${body.slice(0, 200)}`);
        } catch (_) {}
      }
    } catch (err) {
      console.error(`    Network error: ${err.message}`);
      totalErrors += chunk.length;
    }

    // Brief pause between chunks
    if (i < chunks.length - 1) await new Promise(r => setTimeout(r, 1000));
  }

  return { submitted: totalSubmitted, errors: totalErrors };
}

async function main() {
  const mode = process.argv[2] || 'all';

  console.log(`\nIndexNow Submission — Road Ready Safety`);
  console.log(`Key:      ${KEY}`);
  console.log(`Host:     ${HOST}`);
  console.log(`Key URL:  ${KEY_LOCATION}`);
  console.log(`Endpoint: ${INDEXNOW_ENDPOINT}`);
  console.log('');

  let urlsToSubmit = [];
  if (mode === 'courts') {
    urlsToSubmit = COURT_URLS;
    console.log(`Mode: court pages only (${COURT_URLS.length} URLs)`);
  } else if (mode === 'marketing') {
    urlsToSubmit = MARKETING_URLS;
    console.log(`Mode: marketing pages only (${MARKETING_URLS.length} URLs)`);
  } else {
    urlsToSubmit = [...MARKETING_URLS, ...COURT_URLS];
    console.log(`Mode: all pages (${urlsToSubmit.length} URLs — ${MARKETING_URLS.length} marketing + ${COURT_URLS.length} court pages)`);
  }

  console.log('');

  const { submitted, errors } = await submitBatch(urlsToSubmit, mode);

  console.log('');
  console.log(`Done: ${submitted} URLs submitted, ${errors} errors`);
  if (submitted > 0) {
    console.log('');
    console.log('Next steps:');
    console.log('  1. Check Bing Webmaster Tools → IndexNow tab to confirm URLs were received');
    console.log('  2. Allow 24-48h for Bing to crawl and index');
    console.log(`  3. Verify key file is live: curl https://${HOST}/${KEY}.txt`);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
