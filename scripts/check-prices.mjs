#!/usr/bin/env node
/**
 * Price-literal checker. Runs in `npm test` (and on its own: `npm run check:prices`).
 *
 * Every price the site publishes lives in a data file (src/data/texas-course.ts, src/data/ade-texas.json,
 * src/data/courses/<state>.json) and reaches pages through imports or {{TOKENS}} (src/data/prices.ts).
 * This script fails when any of those prices is typed by hand anywhere else under src/ or public/, so a
 * price change stays a one-line edit. It reads the data files, so the set of literals follows the prices.
 *
 * Allowlist: things that look like our price but are not it — competitor figures on the noindex
 * /texas/vs pages, customer review quotes, the TDLR provider list, statutory "$25 minimum" sentences, and
 * court fees that happen to equal our all-in total. Each entry says why. Add to it only for copy that is
 * genuinely not our price; if it IS our price, import the label or use a token instead.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.cwd();
const tx = await import("../src/data/texas-course.ts");
const json = (p) => JSON.parse(readFileSync(join(root, p), "utf-8"));
const ade = json("src/data/ade-texas.json");
const courses = readdirSync(join(root, "src/data/courses"))
  .filter((f) => f.endsWith(".json"))
  .map((f) => ({
    file: `src/data/courses/${f}`,
    price: json(`src/data/courses/${f}`).course?.priceUsd,
  }))
  .filter((c) => c.price);

/** Files allowed to hold the numbers: the sources of truth and the token map. */
const DATA_FILES = new Set([
  "src/data/texas-course.ts",
  "src/data/prices.ts",
  "src/data/ade-texas.json",
  ...courses.map((c) => c.file),
]);

/** One entry per literal: the dollar string as typed, and what it is. */
const literals = [
  { label: tx.TEXAS_PRICE_LABEL, what: "Texas course price" },
  { label: tx.TEXAS_PRICE_CENTS_LABEL, what: "Texas course price (cents)" },
  { label: tx.TEXAS_AUDIO_PRICE_LABEL, what: "Texas audio add-on" },
  { label: tx.TEXAS_AUTOPLAY_PRICE_LABEL, what: "Texas autoplay add-on" },
  { label: tx.TEXAS_AUDIO_TOTAL_LABEL, what: "Texas course + audio total" },
  { label: tx.TEXAS_ALL_IN_LABEL, what: "Texas all-in dismissal total" },
  {
    label: tx.TEXAS_LEGAL_MINIMUM_LABEL,
    what: "Texas statutory floor as a price claim",
  },
  { label: tx.TEXAS_PROMO_PRICE_LABEL, what: "Texas promo-code price" },
  { label: `$${ade.course.priceUsd}`, what: "Texas ADE price" },
  ...courses.map((c) => ({ label: `$${c.price}`, what: `${c.file} price` })),
];

// Two prices can share a label (today the promo price equals the floor); the first entry's rules apply.
const seen = new Set();
const uniqueLiterals = literals.filter(
  (l) => !seen.has(l.label) && seen.add(l.label),
);

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** "$28" must not match "$284", "$28.5", "$28,000" or "$28.00" when the cents label is its own entry. */
const literalRe = (label) =>
  new RegExp(`${esc(label)}(?!\\d|,\\d|\\.\\d)`, "g");

/**
 * Allowlist. `file` is a path prefix (relative to the repo). `line` is a regex the offending line must match;
 * omit it to allow the whole file. `only` limits the entry to some literals (by their `what`).
 */
const ALLOW = [
  {
    file: "src/pages/texas/vs/",
    why: 'noindex comparison pages: competitor prices and "both start at" copy; our own figure is imported',
  },
  {
    file: "src/data/texas-reviews.json",
    why: "customer review quotes, verbatim",
  },
  {
    file: "src/data/tdlr-providers.json",
    why: "TDLR provider list: competitor trade names",
  },
  {
    file: "src/data/court-faq-data.json",
    line: /"fee": "\$184"/,
    why: "a court fee that equals our all-in total",
  },
  {
    file: "src/pages/texas/courts/[slug].astro",
    line: /Court fee: \$184\.|text-text">\$184<\/span>|\$209/,
    why: "New Braunfels charges $184 ($209 school zone): a court fee, not our total",
  },
  {
    file: "src/data/blog/nd.json",
    line: /\$5 to \$39\.95|\$18\.95 to \$39\.95|Safety Institute/,
    why: "competitor prices on the NDDOT list",
  },
  {
    file: "src/data/blog/nd.json",
    only: "Texas statutory floor as a price claim",
    line: /"value": "\$25"/,
    why: "the $25 reinstatement fee key fact",
  },
  {
    file: "src/data/blog/mo.json",
    line: /\$24\.99 \(old price\)/,
    why: "the Missouri Safety Center list still shows our old $24.99 in the named price comparison; our price is a token",
  },
  {
    file: "src/pages/texas/best-defensive-driving-course.astro",
    line: /provider: '(?!Road Ready)|\$25\.00 (plus|for the text course)|advertise \$25\.00/,
    why: "competitor totals and certificate fees in the named price comparison; our own row imports its labels",
  },
  {
    file: "src/pages/texas/best-defensive-driving-course.astro",
    only: "Texas statutory floor as a price claim",
    line: /“\$25”|\$25 becomes/,
    why: 'how an advertised "$25" course grows at checkout',
  },
  // The $25 floor is a statute, not a claim, when the line says so.
  {
    file: "src/",
    only: "Texas statutory floor as a price claim",
    line: /minimum|mínimo|floor|legal|statut|§|HB 3012|law allows|law sets|by law|1001\.352/i,
    why: "statutory floor stated as a statute",
  },
  {
    file: "src/pages/texas/courts/[slug].astro",
    only: "Texas statutory floor as a price claim",
    why: 'court research copy: school-zone surcharges, fee ranges, "about $25" provider fees; our price is a token',
  },
  {
    file: "src/pages/texas/providers.astro",
    only: "Texas statutory floor as a price claim",
    why: 'how providers advertise "$25" (the page about look-alike listings)',
  },
  {
    file: "src/pages/texas/tdlr-approved.astro",
    only: "Texas statutory floor as a price claim",
    why: 'how providers register "$25" trade names',
  },
  // $25 that is a fine, a fee or a surcharge, not a course price.
  {
    file: "src/",
    only: "Texas statutory floor as a price claim",
    line: /fine|fee|fund|surcharge|reinstatement|bond|penalt|higher|add-on|\$25(\.00)?\s*(–|-|to)\s*\$|\$\d+\s*(–|-|to)\s*\$25|point|\+\s*\$25|add(s|ed|itional)? \$25|deposit|extra|more|on top/i,
    why: "a fine, fee or surcharge of $25",
  },
  {
    file: "src/pages/new-york/",
    only: "Texas statutory floor as a price claim",
    why: "New York course price ranges",
  },
  {
    file: "src/data/videos.ts",
    only: "Texas statutory floor as a price claim",
    why: "video titles about the $25 floor",
  },
];

const SKIP_DIRS = new Set(["node_modules", "dist", "dist-prod", ".astro"]);
const TEXT_EXT =
  /\.(astro|ts|tsx|js|mjs|jsx|json|md|mdx|txt|xml|html|css|yml|yaml)$/;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (TEXT_EXT.test(name)) out.push(p);
  }
  return out;
}

function allowed(rel, line, what) {
  return ALLOW.some(
    (a) =>
      rel.startsWith(a.file) &&
      (!a.only || a.only === what) &&
      (!a.line || a.line.test(line)),
  );
}

const files = [...walk(join(root, "src")), ...walk(join(root, "public"))];
const hits = [];
for (const file of files) {
  const rel = relative(root, file);
  if (DATA_FILES.has(rel)) continue;
  const text = readFileSync(file, "utf-8");
  if (!text.includes("$")) continue;
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    for (const { label, what } of uniqueLiterals) {
      const re = literalRe(label);
      if (!re.test(line)) continue;
      if (allowed(rel, line, what)) continue;
      const at = line.indexOf(label);
      hits.push({
        rel,
        n: i + 1,
        what,
        label,
        excerpt: line.slice(Math.max(0, at - 70), at + 70).trim(),
      });
    }
  });
}

if (hits.length) {
  for (const h of hits)
    console.error(`✗ ${h.rel}:${h.n}  ${h.label} (${h.what})  …${h.excerpt}…`);
  console.error(
    `\n${hits.length} hand-typed price literal(s). Import the label from src/data/texas-course.ts (or the state's data file), or use a {{TOKEN}} from src/data/prices.ts.`,
  );
  process.exit(1);
}
console.log(
  `Price check passed: ${uniqueLiterals.length} literals, ${files.length} files, none typed by hand outside the data files.`,
);
