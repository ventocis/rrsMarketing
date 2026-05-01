/**
 * IndexNow Submission Script — Road Ready Safety
 *
 * Notifies Bing (and all IndexNow-participating engines) of new/updated pages.
 * PRODUCTION ONLY — never run this against a QA or staging environment.
 * Submitting non-production URLs to IndexNow causes Bing to attempt to crawl
 * pages that shouldn't be indexed, and wastes your submission quota.
 *
 * Run manually after a production deploy:
 *
 *   npm run indexnow              — all pages (courts + marketing + blog + courses)
 *   npm run indexnow -- courts    — 80 enhanced court pages only
 *   npm run indexnow -- marketing — static marketing pages only
 *   npm run indexnow -- blog      — all 53 blog posts only
 *   npm run indexnow -- courses   — course + requirements pages only
 *
 * Prerequisites:
 *   1. Deploy must be live at roadreadysafety.com
 *   2. Verify key file: curl https://roadreadysafety.com/6550a12bb60949a3a21d8f456b136059.txt
 *
 * IndexNow API docs: https://www.indexnow.org/documentation
 */

import fs from 'fs';

// Load .env.local if present
if (fs.existsSync('.env.local')) {
  fs.readFileSync('.env.local', 'utf8').split('\n').forEach(line => {
    const [k, ...v] = line.split('=');
    if (k?.trim() && v.length && !process.env[k.trim()]) {
      process.env[k.trim()] = v.join('=').trim();
    }
  });
}

// ─── Guard: refuse to run against non-production hosts ───────────────────────
const KEY = process.env.INDEXNOW_KEY || '6550a12bb60949a3a21d8f456b136059';
const HOST = 'roadreadysafety.com';
const BASE = `https://${HOST}`;
const KEY_LOCATION = `${BASE}/${KEY}.txt`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/IndexNow';

// ─── 80 Enhanced court page slugs ────────────────────────────────────────────
const BATCH1_SLUGS = [
  'harris-municipal-houston',
  'travis-municipal-austin',
  'dallas-municipal-dallas',
  'bexar-municipal-san-antonio',
  'dallas-municipal-garland',
  'harris-justice-of-the-peace-precinct-1',
];

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

const COURT_URLS = [
  ...BATCH1_SLUGS, ...BATCH2_SLUGS, ...BATCH3_SLUGS, ...BATCH4_SLUGS,
].map(slug => `${BASE}/texas/courts/${slug}`);

// ─── Static marketing pages ───────────────────────────────────────────────────
const MARKETING_URLS = [
  `${BASE}/`,
  `${BASE}/texas`,
  `${BASE}/texas/courts`,
  `${BASE}/texas/faq`,
  `${BASE}/texas/pricing`,
  `${BASE}/texas/cost`,
  `${BASE}/texas/eligibility-tracker`,
  `${BASE}/texas/helpcenter`,
  `${BASE}/texas/contactus`,
  `${BASE}/texas/refund`,
  `${BASE}/texas/terms`,
  `${BASE}/texas/accessibility`,
  `${BASE}/faq`,
  `${BASE}/partners`,
  `${BASE}/privacy`,
  `${BASE}/terms`,
  `${BASE}/support`,
  `${BASE}/support/how-to-submit`,
  `${BASE}/blog`,
];

// ─── Blog posts ───────────────────────────────────────────────────────────────
const BLOG_SLUGS = [
  'easiest-michigan-bdic-course-60-days',
  'how-michigan-bdic-keeps-points-off-record',
  'michigan-bdic-eligibility-sos-letter',
  'michigan-bdic-when-60-day-starts',
  'can-insurers-see-ticket-if-pass-michigan-bdic',
  'what-violations-qualify-michigan-bdic',
  'fail-or-out-of-time-michigan-bdic',
  'best-michigan-bdic-mobile-tablet',
  'out-of-state-driver-michigan-ticket-bdic',
  'michigan-bdic-certificate-auto-reported',
  'which-online-driving-courses-are-recognized-by-states',
  'best-course-court-vs-insurance-discounts',
  'difference-between-florida-bdi-and-michigan-bdic',
  'best-online-course-court-vs-insurance-fl-mi',
  'which-courses-are-recognized-by-state-agencies-multi-state',
  'which-course-if-i-drive-25k-miles-year',
  'remove-points-vs-prevent-points-fl-mi',
  'best-course-first-time-vs-repeat-offense',
  'which-course-works-best-on-phone',
  'ada-accessible-options-online-driver-improvement',
  'best-florida-bdi-for-busy-parents-evening',
  'best-michigan-bdic-for-college-students',
  'best-bdi-for-snowbirds-out-of-state-insurance-florida',
  'best-bdic-for-rideshare-drivers',
  'florida-bdi-for-texting-while-driving',
  'florida-bdi-for-20-plus-over-eligibility',
  'michigan-bdic-for-lane-change-or-careless-driving',
  'school-zone-or-construction-zone-tickets-what-course-works',
  'best-bdi-course-in-miami-elect-with-miami-dade-clerk',
  'best-bdi-course-in-tampa-hillsborough-steps',
  'best-bdi-course-in-orlando-orange-county-steps',
  'best-bdic-course-in-detroit-sos-timeline',
  'best-bdic-course-in-grand-rapids-60-day-tips',
  'best-online-bdi-provider-comparison-framework',
  'bdi-bdic-pricing-what-to-expect',
  'refund-if-not-eligible-court-or-sos',
  'road-ready-vs-diy-who-submits-certificate',
  'already-paid-ticket-can-i-elect-bdi-florida',
  'course-window-expired-recover-or-reenroll',
  'do-i-need-to-tell-insurance-about-bdi-bdic',
  'best-florida-bdi-course-for-speeding-ticket',
  'florida-bdi-first-30-days-after-citation',
  'fastest-florida-bdi-same-day-certificate',
  'best-florida-bdi-with-clerk-submission-guidance',
  'how-many-times-can-i-elect-bdi-florida',
  'florida-bdi-deadlines-60-or-90-days',
  'can-florida-bdi-lower-fine-or-insurance',
  'whos-eligible-for-florida-bdi',
  'missed-florida-bdi-deadline-can-i-avoid-points',
  'best-florida-bdi-for-red-light-school-bus-work-zone',
  'driving-tips-summer',
  'traffic-ticket-myths',
  'defensive-driving-benefits',
];

const BLOG_URLS = BLOG_SLUGS.map(slug => `${BASE}/blog/${slug}`);

// ─── Course pages ─────────────────────────────────────────────────────────────
const COURSE_SLUGS = [
  'fl-bdi', 'fl-bdi-es', 'fl-tlsae', 'fl-adi', 'fl-idi', 'fl-exam',
  'il-adult-ed', 'la-di', 'mi-bdic', 'mo-dip',
  'ny-ipirp', 'ny-5hr', 'tn-driver-ed',
  'tx-defensive', 'tx-adult-ed', 'va-driver-improvement',
];

const COURSE_URLS = [
  ...COURSE_SLUGS.map(s => `${BASE}/courses/${s}`),
  ...COURSE_SLUGS.map(s => `${BASE}/courses/${s}/requirements`),
];

// ─── Find pages (state/courseType combos with 2+ courses) ────────────────────
const FIND_URLS = [
  `${BASE}/find/FL/BDI`,
];

// ─── Submission ───────────────────────────────────────────────────────────────
async function submitBatch(urls) {
  const CHUNK_SIZE = 500;
  let submitted = 0;
  let errors = 0;

  for (let i = 0; i < urls.length; i += CHUNK_SIZE) {
    const chunk = urls.slice(i, i + CHUNK_SIZE);
    const chunkNum = Math.floor(i / CHUNK_SIZE) + 1;
    const totalChunks = Math.ceil(urls.length / CHUNK_SIZE);

    console.log(`  Chunk ${chunkNum}/${totalChunks}: ${chunk.length} URLs...`);

    try {
      const res = await fetch(INDEXNOW_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: chunk }),
      });

      const msg = {
        200: '✓ OK — URLs accepted',
        202: '✓ Accepted — queued for crawl',
        400: '✗ Bad request — check URL format or key',
        403: '✗ Forbidden — key not yet verified at keyLocation (is the deploy live?)',
        422: '✗ Unprocessable — key file content does not match key param',
        429: '⏳ Rate limited — wait and retry',
      }[res.status] || `? HTTP ${res.status}`;

      console.log(`    ${msg}`);
      if (res.status === 200 || res.status === 202) submitted += chunk.length;
      else {
        errors += chunk.length;
        try { const b = await res.text(); if (b) console.log(`    Body: ${b.slice(0,200)}`); } catch (_) {}
      }
    } catch (err) {
      console.error(`    Network error: ${err.message}`);
      errors += chunk.length;
    }

    if (i + CHUNK_SIZE < urls.length) await new Promise(r => setTimeout(r, 1000));
  }

  return { submitted, errors };
}

async function main() {
  const mode = process.argv[2] || 'all';

  console.log(`\nIndexNow — Road Ready Safety  [PRODUCTION ONLY]`);
  console.log(`Key:      ${KEY}`);
  console.log(`Host:     ${HOST}`);
  console.log(`Key URL:  ${KEY_LOCATION}`);
  console.log('');

  const groups = {
    courts:    { urls: COURT_URLS,    label: `${COURT_URLS.length} court pages` },
    marketing: { urls: MARKETING_URLS, label: `${MARKETING_URLS.length} marketing pages` },
    blog:      { urls: BLOG_URLS,     label: `${BLOG_URLS.length} blog posts` },
    courses:   { urls: [...COURSE_URLS, ...FIND_URLS], label: `${COURSE_URLS.length + FIND_URLS.length} course/find pages` },
  };

  let urlsToSubmit = [];
  if (mode === 'all') {
    urlsToSubmit = [...MARKETING_URLS, ...COURT_URLS, ...BLOG_URLS, ...COURSE_URLS, ...FIND_URLS];
    const total = urlsToSubmit.length;
    console.log(`Mode: all pages (${total} URLs total)`);
    Object.values(groups).forEach(g => console.log(`  • ${g.label}`));
  } else if (groups[mode]) {
    urlsToSubmit = groups[mode].urls;
    console.log(`Mode: ${groups[mode].label}`);
  } else {
    console.error(`Unknown mode "${mode}". Use: all | courts | marketing | blog | courses`);
    process.exit(1);
  }

  console.log('');
  const { submitted, errors } = await submitBatch(urlsToSubmit);

  console.log('');
  console.log(`Done: ${submitted} submitted, ${errors} errors`);
  if (submitted > 0) {
    console.log('\nNext: Bing Webmaster Tools → IndexNow tab → confirm URLs show "Received"');
    console.log(`Verify key: curl https://${HOST}/${KEY}.txt`);
  }
}

main().catch(err => { console.error(err); process.exit(1); });
