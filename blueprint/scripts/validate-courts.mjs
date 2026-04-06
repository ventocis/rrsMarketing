/**
 * Validate static build output for Texas court pages.
 * Run from repo root: node blueprint/scripts/validate-courts.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const COURTS_JSON = path.join(ROOT, "src", "data", "texas-courts.json");
const DIST_COURTS = path.join(ROOT, "dist", "texas", "courts");

/** Strip script and style blocks for text / structure checks */
function stripScriptsAndStyles(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
}

/** True if this looks like a Vite SPA shell (root mount only, no prerendered article body). */
function isBareSpaShell(html) {
  const lower = html.toLowerCase();
  if (!lower.includes('id="root"') && !lower.includes("id='root'")) {
    return false;
  }
  const stripped = stripScriptsAndStyles(html);
  if (stripped.includes("<article")) return false;
  if (stripped.includes("seo-fallback")) return false;
  const text = stripped.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text.length < 120;
}

function listDistCourtPages() {
  if (!fs.existsSync(DIST_COURTS)) {
    return [];
  }
  const out = [];
  for (const ent of fs.readdirSync(DIST_COURTS, { withFileTypes: true })) {
    if (!ent.isDirectory()) continue;
    const slug = ent.name;
    const indexPath = path.join(DIST_COURTS, slug, "index.html");
    if (fs.existsSync(indexPath)) {
      out.push({ slug, indexPath });
    }
  }
  return out;
}

function main() {
  if (!fs.existsSync(COURTS_JSON)) {
    console.error(`Missing ${COURTS_JSON}`);
    process.exit(1);
  }

  const { courts } = JSON.parse(fs.readFileSync(COURTS_JSON, "utf8"));
  if (!Array.isArray(courts)) {
    console.error("texas-courts.json: expected { courts: [...] }");
    process.exit(1);
  }

  const totalCourts = courts.length;
  const distPages = listDistCourtPages();
  const distBySlug = new Map(distPages.map((p) => [p.slug, p]));

  const missing = [];
  const slugMissingInHtml = [];
  const bareShells = [];
  let filesChecked = 0;

  for (const court of courts) {
    const slug = court.slug;
    if (!slug) {
      missing.push("(record without slug)");
      continue;
    }
    const page = distBySlug.get(slug);
    if (!page) {
      missing.push(slug);
      continue;
    }

    const html = fs.readFileSync(page.indexPath, "utf8");
    filesChecked += 1;
    if (!html.includes(slug)) {
      slugMissingInHtml.push(slug);
    }
    if (isBareSpaShell(html)) {
      bareShells.push(slug);
    }
  }

  console.log("--- Court static output validation ---\n");
  console.log(`Total courts in JSON:     ${totalCourts}`);
  console.log(`Total pages in dist/:     ${distPages.length} (under dist/texas/courts/<slug>/index.html)`);

  if (missing.length) {
    console.log(`\nMissing from dist (${missing.length}):`);
    for (const s of missing) console.log(`  - ${s}`);
  } else {
    console.log("\nMissing from dist:        none");
  }

  if (filesChecked === 0) {
    console.log("\nSlug / shell checks:      skipped (no court HTML in dist/)");
  } else if (slugMissingInHtml.length) {
    console.log(`\nSlug not found in HTML (${slugMissingInHtml.length}):`);
    for (const s of slugMissingInHtml) console.log(`  - ${s}`);
  } else {
    console.log(`Slug present in HTML:     OK (${filesChecked} files)`);
  }

  if (filesChecked === 0) {
    /* already reported above */
  } else if (bareShells.length) {
    console.log(`\nBare SPA shells (${bareShells.length}):`);
    for (const s of bareShells) console.log(`  - ${s}`);
  } else {
    console.log("Bare SPA shells:          none");
  }

  const extraInDist = distPages.filter((p) => !courts.some((c) => c.slug === p.slug));
  if (extraInDist.length) {
    console.log(`\nExtra dirs in dist/ (not in JSON) (${extraInDist.length}):`);
    for (const p of extraInDist) console.log(`  - ${p.slug}`);
  }

  const pass =
    missing.length === 0 &&
    slugMissingInHtml.length === 0 &&
    bareShells.length === 0;

  console.log(`\n--- ${pass ? "PASS" : "FAIL"} ---\n`);
  process.exit(pass ? 0 : 1);
}

main();
