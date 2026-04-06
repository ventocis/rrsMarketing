/**
 * Build-time static HTML generator for key routes + blog posts.
 * Non-destructive: writes into dist/ alongside the SPA.
 * Requires: gray-matter, marked, mkdirp, fast-glob, node>=18
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import globby from "fast-glob";
import { fileURLToPath } from "node:url";
import { mkdirp } from "mkdirp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../../");
const DIST = path.resolve(ROOT, "dist");
const CONTENT_DIR = path.resolve(ROOT, "content/blog");
const TPL = fs.readFileSync(path.resolve(ROOT, "blueprint/static-templates/base.html"), "utf8");
const ORG = JSON.parse(fs.readFileSync(path.resolve(ROOT, "blueprint/static-templates/org.json"), "utf8"));

// Extract SPA asset tags from the built index.html so prerendered pages can boot the full React app
const SPA_INDEX = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
const SPA_ASSETS = (() => {
  const scripts = [...SPA_INDEX.matchAll(/<script[^>]*src="[^"]*"[^>]*><\/script>/g)].map(m => m[0]);
  const styles = [...SPA_INDEX.matchAll(/<link[^>]*rel="stylesheet"[^>]*>/g)].map(m => m[0]);
  // Extract preconnects and font stylesheet links (deduplicated)
  const preconnects = [...SPA_INDEX.matchAll(/<link[^>]*rel="preconnect"[^>]*>/g)].map(m => m[0]);
  const fonts = [...SPA_INDEX.matchAll(/<link[^>]*href="https:\/\/fonts\.googleapis\.com\/css2[^"]*"[^>]*>/g)].map(m => m[0]);
  // Deduplicate all head tags
  const headTags = [...new Set([...preconnects, ...fonts, ...styles])];
  return { scripts, headTags };
})();

function writeHtml(outDir, html) {
  mkdirp.sync(outDir);
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
}

function renderWithTemplate({ title, desc, canonical, bodyHtml, jsonLd, ogTitle, ogUrl, robots = "index, follow" }) {
  const resolvedOgTitle = ogTitle ?? title;
  const resolvedOgUrl = ogUrl ?? canonical;
  return TPL
    .replaceAll("{{TITLE}}", escapeHtml(title))
    .replaceAll("{{DESC}}", escapeHtml(desc || "Road Ready Safety"))
    .replaceAll("{{CANONICAL}}", canonical)
    .replaceAll("{{OG_TITLE}}", escapeHtml(resolvedOgTitle))
    .replaceAll("{{OG_URL}}", resolvedOgUrl)
    .replaceAll("{{ROBOTS}}", robots)
    .replace("{{JSONLD}}", JSON.stringify(jsonLd))
    .replace("{{BODY}}", bodyHtml);
}

function escapeHtml(s=""){return s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;")}

function breadcrumb(items){
  return {
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    "itemListElement": items.map((it, i)=>({
      "@type":"ListItem","position":i+1,"name":it.name,"item":it.url
    }))
  };
}

// --- 1) Blog index ---
async function buildBlogIndex(posts){
  const list = posts.slice().sort((a,b)=> (b.meta.date||"").localeCompare(a.meta.date||""));
  const items = list.map(p=>`<li><a href="/blog/${p.meta.slug}">${escapeHtml(p.meta.title)}</a> <span class="meta">— ${escapeHtml(p.meta.date||"")}</span><br><small>${escapeHtml(p.meta.description||"")}</small></li>`).join("");
  const body = `<article><h1>Road Ready Safety Blog</h1><ul>${items}</ul></article>`;
  const jsonLd = [ORG, breadcrumb([
    {name:"Home", url:"https://roadreadysafety.com/"},
    {name:"Blog", url:"https://roadreadysafety.com/blog"}
  ])];
  const html = renderWithTemplate({
    title:"Road Ready Safety Blog",
    desc:"Best-fit briefs for Florida BDI & Michigan BDIC: deadlines, eligibility, and submission steps.",
    canonical:"https://roadreadysafety.com/blog",
    bodyHtml:body,
    jsonLd
  });
  writeHtml(path.join(DIST, "blog"), html);
}

// --- 2) Blog posts ---
async function buildBlogPosts(){
  const mdFiles = await globby("**/*.md", { cwd: CONTENT_DIR, absolute:true });
  const posts = mdFiles.map(fp=>{
    const raw = fs.readFileSync(fp, "utf8");
    const { data:meta, content } = matter(raw);
    const html = marked.parse(content);
    const body = `<article><h1>${escapeHtml(meta.title)}</h1><div class="meta">${escapeHtml(meta.date||"")}</div>${html}</article>`;
    const jsonLd = [ORG, breadcrumb([
      {name:"Home", url:"https://roadreadysafety.com/"},
      {name:"Blog", url:"https://roadreadysafety.com/blog"},
      {name: meta.title, url:`https://roadreadysafety.com/blog/${meta.slug}`}
    ])];
    const out = path.join(DIST, "blog", meta.slug);
    const page = renderWithTemplate({
      title: meta.title + " | Road Ready Safety",
      desc: meta.description || "Road Ready Safety",
      canonical: `https://roadreadysafety.com/blog/${meta.slug}`,
      bodyHtml: body,
      jsonLd
    });
    writeHtml(out, page);
    return { meta };
  });
  return posts;
}

// --- 3) Static hubs + FAQ (simple hand-authored bodies) ---
function staticSection(title, desc, canonical, bodyHtml, crumbs){
  const jsonLd = [ORG, breadcrumb(crumbs)];
  const page = renderWithTemplate({ title, desc, canonical, bodyHtml, jsonLd });
  return page;
}

function buildFlorida(){
  const body = `
<article>
  <h1>Florida Basic Driver Improvement (BDI) – Steps & Deadlines</h1>
  <p>If you received a non-criminal moving violation in Florida and you don't hold a CDL, you may elect a Basic Driver Improvement (BDI) course within 30 days to keep points off your record. Complete an FLHSMV-approved course and follow your county clerk's submission rules.</p>
  <h2>What to do</h2>
  <ol>
    <li>Elect BDI with your county Clerk of Court within 30 days of the citation.</li>
    <li>Complete an approved online BDI course.</li>
    <li>Submit or verify your certificate with the same clerk by the deadline (often 60–90 days from citation).</li>
  </ol>
  <p><strong>Official sources:</strong> FLHSMV Driver Improvement Schools; Traffic Citations; Find Your Clerk.</p>
</article>`;
  const html = staticSection(
    "Florida Basic Driver Improvement (BDI) – Road Ready Safety",
    "Exact steps, deadlines, and official links for Florida BDI.",
    "https://roadreadysafety.com/courses/fl-bdi",
    body,
    [
      {name:"Home", url:"https://roadreadysafety.com/"},
      {name:"Florida BDI", url:"https://roadreadysafety.com/courses/fl-bdi"}
    ]
  );
  writeHtml(path.join(DIST, "courses", "fl-bdi"), html);
}

function buildMichigan(){
  const body = `
<article>
  <h1>Michigan Basic Driver Improvement Course (BDIC) – 60-Day Guide</h1>
  <p>If the Michigan Department of State (SOS) notifies you that you're eligible, you have 60 days to enroll, complete, and pass BDIC with an approved sponsor. Passing prevents points from being added and keeps the ticket from insurers.</p>
  <h2>What to do</h2>
  <ol>
    <li>Watch for your SOS eligibility notice (email/mail).</li>
    <li>Enroll with an approved sponsor and pass within 60 days.</li>
    <li>Keep your receipt; sponsors report to SOS.</li>
  </ol>
  <p><strong>Official sources:</strong> Michigan SOS BDIC eligibility and FAQ.</p>
</article>`;
  const html = staticSection(
    "Michigan Basic Driver Improvement Course (BDIC) – Road Ready Safety",
    "How Michigan's 60-day BDIC works, with official SOS links.",
    "https://roadreadysafety.com/courses/mi-bdic",
    body,
    [
      {name:"Home", url:"https://roadreadysafety.com/"},
      {name:"Michigan BDIC", url:"https://roadreadysafety.com/courses/mi-bdic"}
    ]
  );
  writeHtml(path.join(DIST, "courses", "mi-bdic"), html);
}

function buildFaq(){
  const body = `
<article>
  <h1>Driver Improvement FAQ – Florida BDI & Michigan BDIC</h1>
  <p>Quick answers about election timing, eligibility, deadlines, and certificate submission—with official links.</p>
</article>`;
  const html = staticSection(
    "FAQ – Road Ready Safety",
    "Answers about Florida BDI and Michigan BDIC with official sources.",
    "https://roadreadysafety.com/faq",
    body,
    [
      {name:"Home", url:"https://roadreadysafety.com/"},
      {name:"FAQ", url:"https://roadreadysafety.com/faq"}
    ]
  );
  writeHtml(path.join(DIST, "faq"), html);
}

function buildErrorPage() {
  const headTags = SPA_ASSETS.headTags.join("\n  ");
  const scriptTags = SPA_ASSETS.scripts.join("\n  ");
  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Page Not Found | Road Ready Safety</title>
  <meta name="description" content="The page you requested could not be found." />
  <link rel="canonical" href="${SITE_URL}/404.html" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="robots" content="noindex" />
  <meta property="og:title" content="Page Not Found | Road Ready Safety" />
  <meta property="og:description" content="The page you requested could not be found." />
  <meta property="og:url" content="${SITE_URL}/404.html" />
  <meta property="og:type" content="website" />
  ${headTags}
  <style>
    #seo-fallback{font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif;line-height:1.6;margin:0}
    #seo-fallback header,#seo-fallback main,#seo-fallback footer{max-width:880px;margin:0 auto;padding:20px}
    #seo-fallback header a{color:inherit;text-decoration:none}
    #seo-fallback nav a{margin-right:12px}
    #seo-fallback .meta{color:#555;font-size:14px;margin-top:-8px}
    #seo-fallback article h1{font-size:28px;margin:16px 0}
    #seo-fallback article h2{font-size:20px;margin-top:24px}
    #seo-fallback .cta{margin-top:24px;padding:16px;border:1px solid #eee;border-radius:12px}
  </style>
</head>
<body>
  <div id="root"></div>
  <div id="seo-fallback">
    <header>
      <a href="/">Road Ready Safety</a>
      <nav>
        <a href="/courses/fl-bdi">Florida BDI</a>
        <a href="/courses/mi-bdic">Michigan BDIC</a>
        <a href="/faq">FAQ</a>
        <a href="/blog">Blog</a>
      </nav>
    </header>
    <main>
      <article>
        <h1>Page not found</h1>
        <p>Sorry, we could not find that page. The URL may be outdated, mistyped, or no longer available.</p>
      </article>
      <div class="cta">
        <strong>Back to safety resources →</strong>
        <a href="/">Return to homepage</a><br />
        <a href="/texas/courts">Looking for a Texas court page? Browse all courts.</a>
      </div>
    </main>
    <footer>
      <div class="meta">© Road Ready Driver Instruction LLC</div>
    </footer>
  </div>
  ${scriptTags}
</body>
</html>`;
  fs.writeFileSync(path.join(DIST, "404.html"), html, "utf8");
  console.log("✓ Generated /404.html static error page");
}

const ENROLL_URL = "https://roadreadysafety.com/courses/tx-defensive";
const SITE_URL = "https://roadreadysafety.com";

function parseAddressForSchema(addrStr) {
  if (!addrStr || typeof addrStr !== "string") return {};
  const parts = addrStr.split(",").map((p) => p.trim()).filter(Boolean);
  if (parts.length >= 3) {
    return {
      streetAddress: parts.slice(0, -2).join(", "),
      addressLocality: parts[parts.length - 2],
      addressRegion: "TX",
      postalCode: parts[parts.length - 1]
    };
  }
  if (parts.length === 2) {
    return {
      streetAddress: parts[0],
      addressLocality: parts[1],
      addressRegion: "TX"
    };
  }
  if (parts.length === 1) {
    return { streetAddress: parts[0], addressRegion: "TX" };
  }
  return {};
}

function buildCourtPages(){
  const courtsPath = path.join(ROOT, "src", "data", "texas-courts.json");
  if (!fs.existsSync(courtsPath)) {
    console.warn("Warning: texas-courts.json not found, skipping court pages.");
    return;
  }
  const { courts } = JSON.parse(fs.readFileSync(courtsPath, "utf8"));
  if (!Array.isArray(courts) || courts.length === 0) {
    console.warn("Warning: No courts in texas-courts.json, skipping court pages.");
    return;
  }
  for (const court of courts) {
    const slug = court.slug;
    if (!slug) continue;
    const courtName = `${court.county} County ${court.courtType} Court ${court.courtName}`;
    const judges = Array.isArray(court.judges) ? court.judges.join(", ") : "Unavailable";
    const phones = Array.isArray(court.phone) ? court.phone : (court.phone ? [court.phone] : []);
    const phoneStr = phones.length > 0 ? phones.map(p => `<a href="tel:${escapeHtml(p)}">${escapeHtml(p)}</a>`).join(", ") : "Unavailable";
    const addresses = Array.isArray(court.address) ? court.address : (court.address ? [court.address] : []);
    const addressStr = addresses.length > 0 ? addresses.join("; ") : "Unavailable";
    const websites = Array.isArray(court.website) ? court.website : (court.website ? [court.website] : []);
    const websiteStr = websites.length > 0 ? websites.map(w => `<a href="${escapeHtml(w)}" target="_blank" rel="noopener noreferrer">${escapeHtml(w)}</a>`).join(", ") : "Unavailable";
    const emails = Array.isArray(court.email) ? court.email : (court.email ? [court.email] : []);
    const emailStr = emails.length > 0 ? emails.map(e => `<a href="mailto:${escapeHtml(e)}">${escapeHtml(e)}</a>`).join(", ") : "Unavailable";

    const canonical = `${SITE_URL}/texas/courts/${slug}/`;
    const desc = `Complete your Texas Driver Safety Course for ${court.courtName} in ${court.county} County. Follow these step-by-step instructions to dismiss your ticket.`;

    const addrObj = addresses.length > 0 ? parseAddressForSchema(addresses[0]) : {};
    const governmentOffice = {
      "@context": "https://schema.org",
      "@type": "GovernmentOffice",
      "name": courtName,
      ...(Object.keys(addrObj).length > 0 && {
        address: {
          "@type": "PostalAddress",
          ...addrObj
        }
      }),
      ...(phones.length > 0 && { telephone: phones[0] }),
      ...(websites.length > 0 && { url: websites[0] })
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": `${SITE_URL}/` },
        { "@type": "ListItem", "position": 2, "name": "Texas Courts", "item": `${SITE_URL}/texas/courts` },
        { "@type": "ListItem", "position": 3, "name": courtName, "item": canonical }
      ]
    };

    const body = `
<article>
  <nav class="meta" style="margin-bottom:16px"><a href="/">Home</a> &gt; <a href="/texas">Texas</a> &gt; <a href="/texas/courts">Courts</a> &gt; ${escapeHtml(court.county)} County ${escapeHtml(court.courtType)}</nav>
  <h1>${escapeHtml(court.county)} County ${escapeHtml(court.courtType)} Court – ${escapeHtml(court.courtName)}</h1>
  <p>Use this page to see how your court handles Texas Defensive Driving Courses (Driver's Safety Course). Always follow your court's instructions if they differ from what is listed here.</p>

  <h2>Court Information</h2>
  <ul>
    <li><strong>Judge:</strong> ${escapeHtml(judges)}</li>
    <li><strong>Phone:</strong> ${phoneStr}</li>
    <li><strong>Address:</strong> ${escapeHtml(addressStr)}</li>
    <li><strong>Website:</strong> ${websiteStr}</li>
    <li><strong>Email:</strong> ${emailStr}</li>
  </ul>

  <h2>Texas Driver Safety Course Steps</h2>

  <h3>1. Make Sure You're Eligible</h3>
  <p>To qualify for ticket dismissal through a Texas Driver Safety Course (DSC), you must have a valid Texas driver's license, not hold a CDL, have current auto insurance, and not have completed a DSC within the past 12 months. Some violations may be ineligible (e.g., speeding 25+ mph over, 95+ mph, passing a stopped school bus). Eligibility is determined by the court. Always confirm with your court before requesting permission.</p>

  <h3>2. Request Permission From the Court</h3>
  <p>You must receive court approval before taking a Driver Safety Course. Most courts require you to visit their website, search for "Driver Safety Course" or "Defensive Driving," and review the court's specific instructions. You may be asked to complete an affidavit, enter a plea, pay court costs, and submit your request online, by email, by mail, or in person. Each court sets its own fees and submission process.</p>

  <h3>3. Wait for Court Approval</h3>
  <p>Do not start a Driver Safety Course until the court grants permission. Once approved, the court will provide your deadline to complete the course, any additional documents required, and instructions on how and where to submit your completion paperwork.</p>

  <h3>4. Take a TDLR-Approved Driver Safety Course</h3>
  <p>After receiving court approval, enroll with a Texas-approved Driver Safety Course provider, complete the online course, and receive a Certificate of Completion after finishing.</p>

  <h3>5. Get Your Certified Type 3A Driving Record</h3>
  <p>Texas law requires you to submit a certified driving record with your certificate. Visit <a href="https://www.texas.gov/driver-record" target="_blank" rel="noopener noreferrer">texas.gov/driver-record</a>, select "Type 3A Certified Driving Record," and download or print the record once received.</p>

  <h3>6. Submit Your Completion Packet to the Court</h3>
  <p>Before your court deadline, submit your Certificate of Completion, your Type 3A Certified Driving Record, and any additional court-specific documents. Submit everything exactly how your court requires (online portal, email, mail, or in person).</p>

  <div class="cta">
    <strong>Enroll in a Texas-approved Driver Safety Course →</strong> <a href="${ENROLL_URL}">${ENROLL_URL}</a>
  </div>
</article>`;

    const title = `${courtName} Driver Safety Course Instructions`;
    const jsonLd = [ORG, governmentOffice, breadcrumbSchema];
    const html = renderWithTemplate({
      title,
      desc,
      canonical,
      bodyHtml: body,
      jsonLd,
      ogTitle: `${courtName} Driver Safety Course Instructions`,
      ogUrl: canonical
    });
    writeHtml(path.join(DIST, "texas", "courts", slug), html);
  }
  console.log(`✓ Generated ${courts.length} Texas court pages`);
}

/** Static HTML for /texas-defensive-driving-cost (GEO + crawlers). */
function buildTexasDefensiveDrivingCostPage() {
  const canonical = `${SITE_URL}/texas-defensive-driving-cost`;
  const title = "How Much Does Texas Defensive Driving Cost? (2026 Guide)";
  const desc =
    "Most Texas defensive driving courses advertise a low price but add fees at checkout. See the real all-in cost — including fees and certificate delivery.";
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How Much Does Texas Defensive Driving Really Cost in 2026?",
    dateModified: "2026-03-03",
    datePublished: "2026-03-03",
    author: { "@type": "Organization", name: "Road Ready Safety" },
    publisher: {
      "@type": "Organization",
      name: "Road Ready Safety",
      url: "https://roadreadysafety.com"
    }
  };
  const comparisonRows = [
    ["Aware Driver", "CP995", "$25.00", "$3.00", "$0.00", "$28.00", "Paid", "Online", "English"],
    ["DefensiveDriving.com", "CP284", "$25.00", "$3.00", "$0.00", "$28.00", "Mail", "Online", "English"],
    ["I Drive Safely", "CP022", "$29.00", "$0.00", "$0.00", "$29.00", "Free", "Online", "English"],
    ["GetDefensive.com", "CP021", "$30.00", "$0.00", "$0.00", "$30.00", "Free", "Online / In-Person", "Eng / Spanish"],
    ["DrivingQuest", "CP020", "$25.00", "$0.00", "$6.00", "$31.00", "Paid", "Online", "Eng / Spanish"],
    ["J&T Adult Driving School", "CP1158", "$29.99", "$3.99", "$3.99", "$37.97", "Paid", "Online / In-Person", "Eng / Spanish"],
    ["DriversEd.com", "CP019", "$34.00", "$0.00", "$15.00", "$49.00", "Paid", "Online", "English"],
    ["Aceable Defensive Driving", "CP262", "$49.00", "$0.00", "$15.00", "$64.00", "Paid", "Online", "English"],
    ["Excellent Driving School", "CP1010", "$65.00", "$3.99", "$3.99", "$72.98", "Paid", "Online / In-Person", "Eng / Spanish"]
  ];
  const tableBody =
    `<tr style="background:#e5f6fe"><td><strong>Road Ready Safety</strong></td><td class="col-cp">CP1234</td><td>$25.00</td><td>$3.00</td><td>$0.00</td><td><strong>$28.00</strong></td><td>Free instant download</td><td>Online</td><td>English</td></tr>` +
    comparisonRows
      .map(
        (r) =>
          `<tr><td>${escapeHtml(r[0])}</td><td class="col-cp">${escapeHtml(r[1])}</td><td>${escapeHtml(r[2])}</td><td>${escapeHtml(r[3])}</td><td>${escapeHtml(r[4])}</td><td><strong>${escapeHtml(r[5])}</strong></td><td>${escapeHtml(r[6])}</td><td>${escapeHtml(r[7])}</td><td>${escapeHtml(r[8])}</td></tr>`
      )
      .join("");

  const costTableCss = `<style>
.cost-comparison-table{width:100%;border-collapse:collapse;font-size:14px;word-break:break-word}
.cost-comparison-table thead th{background:#f9fafb;border-bottom:1px solid #e4e6ea;text-align:left;font-weight:600}
.cost-comparison-table td,.cost-comparison-table th{padding:0.5rem 0.35rem}
.cost-comparison-table tbody tr{border-bottom:1px solid #eef0f3}
.cost-comparison-table tbody tr:first-child{background:#e5f6fe;border-bottom:1px solid #c5e6fa}
@media (max-width:767px){
.cost-comparison-table{font-size:12px}
.cost-comparison-table td,.cost-comparison-table th{padding:0.35rem 0.2rem}
.cost-comparison-table .col-cp{display:none}
}
</style>`;

  const body = `
${costTableCss}
<article>
  <h1>How Much Does Texas Defensive Driving Really Cost in 2026?</h1>
  <p>A Texas defensive driving course — also called a Texas driver safety course — is required by hundreds of thousands of drivers every year to dismiss a traffic ticket or earn an insurance discount. If you're asking yourself which provider is the cheapest, the fastest, and the most straightforward, here's a side-by-side comparison.</p>
  <p>Most Texas defensive driving courses advertise a base price, but the amount you actually pay at checkout is higher once processing fees and certificate delivery fees are added. As of March 2026, prices among TDLR-approved online providers start at $25 and reach over $70 all-in.</p>
  <p>This page shows manually verified totals pulled from a selection of TDLR-approved providers — last pulled March 3, 2026. There are 250+ approved providers total; this table covers some of the more widely used options. Totals are subject to change — always confirm current pricing at checkout before enrolling.</p>

  <h2>What's included in the "all-in" price?</h2>
  <p>When comparing defensive driving courses in Texas, three costs determine your actual total:</p>
  <ul>
    <li><strong>Base course fee</strong> — what the provider charges for the course itself.</li>
    <li><strong>Processing fee</strong> — Texas law requires all TDLR-approved providers to charge a minimum of $25.00 for a defensive driving course. You may notice some providers show a $25 base price plus a separate $3 fee at checkout — that two-part structure was required by law until September 1, 2025, when it was simplified to a single $25 minimum. Some providers still itemize the $3 separately; others have rolled it into a flat price. Either way, always check your final checkout total before paying — the advertised price and what you actually owe are not always the same number.</li>
    <li><strong>Certificate delivery fee</strong> — after you complete the course, you receive a completion certificate to submit to your court. Some providers charge $7+ to mail a physical certificate, others charge $0 to mail a physical certificate (while charging $5-$10+ for an instant download certificate) and others offer an instant download for free. If you're on a court deadline, a free instant download matters.</li>
  </ul>
  <p>The table below reflects the total of all three costs based on verified checkout totals.</p>

  <h2>All-in price comparison — TDLR-approved online courses</h2>
  <table class="cost-comparison-table">
    <thead>
      <tr><th>Provider</th><th class="col-cp">CP#</th><th>Course Price</th><th>Processing Fee</th><th>Min. Cert. Cost</th><th>Total</th><th>Certificate</th><th>Format</th><th>Language</th></tr>
    </thead>
    <tbody>
      ${tableBody}
    </tbody>
  </table>
  <p>The Certificate column shows how each provider delivers your completion certificate. 'Free instant download' means you can print or email your certificate the same day you finish — no waiting, no extra charge. 'Paid' means the provider charges an additional delivery fee, which may or may not be reflected in the total above depending on the method selected at checkout. 'Mail' means the provider mails a physical certificate, which typically adds several business days and may cost extra. If your court deadline is close, certificate delivery method matters as much as price.</p>
  <p><em>Last verified: March 3, 2026 — Road Ready Safety editorial team, verified against TDLR provider records</em></p>
  <p>Note: Prices shown reflect TDLR-published provider records verified by Road Ready Safety on March 3, 2026. Course fees are set independently by each provider and may change. Verify current pricing at checkout before enrolling.</p>

  <h2>What affects the final price at checkout?</h2>
  <p>A few things to check before you pay:</p>
  <ul>
    <li><strong>Certificate delivery method.</strong> If your court requires you to submit within 90 days and you're cutting it close, paying $7–10 for overnight mail adds up. A free instant PDF download eliminates that cost and that risk.</li>
    <li><strong>How the course fee is itemized.</strong> Texas law sets a $25.00 minimum course fee. Prior to September 2025, a separate $3.00 fee for materials and administration was also required — many providers still itemize this separately at checkout. Check your final order total, not the advertised base price.</li>
    <li><strong>Processing or convenience fees.</strong> Some providers add a "processing fee" or "convenience fee" at checkout that isn't reflected in either the base price or the state fee. Always scroll to the final order summary before entering payment.</li>
  </ul>

  <h2>Frequently asked questions</h2>
  <h3>How much does Texas defensive driving cost?</h3>
  <p>Among TDLR-approved online providers, all-in prices range from $25 to over $70 depending on the provider and certificate delivery method. The most affordable verified option as of March 2026 is Road Ready Safety at $28.00 all-in, which includes the required processing fee and a free instant certificate download.</p>
  <h3>Is there a required minimum fee for a Texas defensive driving course?</h3>
  <p>Yes. Under Texas Education Code §1001.352 (as amended by H.B. 3012, effective September 1, 2025), TDLR-approved providers are required to charge each student a minimum of $25.00 for a driving safety course. Prior to September 2025, a separate minimum $3.00 fee for course materials and administration was also required by law — which is why many providers still show a $25 base + $3 fee structure. Some providers have absorbed this into a flat price; others continue to itemize it at checkout. Either way, the statutory floor is now $25.00 total — meaning courses listed at $28.00 are pricing above the minimum, not meeting a two-part requirement.</p>
  <h3>Can I get my certificate instantly in Texas?</h3>
  <p>Yes — if your provider offers digital certificate delivery. Not all do. Providers that offer free instant PDF download let you submit to your court the same day you finish the course.</p>
  <h3>How do I submit my certificate to my Texas court?</h3>
  <p>Submission methods vary by court. Most accept email, fax, or in-person drop-off. Some courts accept digital PDF certificates; others require a physical copy. Check your court's specific instructions or call your clerk's office directly.</p>

  <h2>Finding a course by format, language, or price range</h2>
  <p>All providers in the table above offer online courses, meaning you can complete the required 6-hour Texas driver safety course from any device without visiting a classroom. Several providers offer bilingual courses in both English and Spanish, including GetDefensive.com, J&amp;T Adult Driving School, and Excellent Driving School.</p>
  <p>If you are looking for an online English-language Texas defensive driving course under $30, Road Ready Safety, Aware Driver, DefensiveDriving.com, and I Drive Safely all meet that criteria based on verified March 2026 totals. Of those, only Road Ready Safety includes a free instant certificate download with no additional delivery fee — making it the lowest-friction option if you need to submit to your court quickly.</p>
  <p>If you need a bilingual course in English and Spanish, options in the table priced under $40 include GetDefensive.com ($30.00) and J&amp;T Adult Driving School ($37.97).</p>

  <p>All prices on this page reflect TDLR-published provider data. Course fees are set by each provider independently and may change. If you notice a discrepancy, <a href="https://app.roadreadysafety.com/contact">contact us</a> and we'll verify and update.</p>
  <p><a href="https://roadreadysafety.com/courses/tx-defensive">Take the $28 Course — Instant Certificate</a></p>
</article>`;

  const html = renderWithTemplate({
    title,
    desc,
    canonical,
    bodyHtml: body,
    jsonLd: [ORG, articleLd],
    ogTitle: title,
    ogUrl: canonical,
    robots: "index, follow"
  });
  writeHtml(path.join(DIST, "texas-defensive-driving-cost"), html);
  console.log("✓ Generated /texas-defensive-driving-cost static HTML");
}

async function main(){
  if (!fs.existsSync(DIST)) {
    console.error("Missing dist/. Run `vite build` first.");
    process.exit(1);
  }
  const posts = await buildBlogPosts();
  await buildBlogIndex(posts);
  buildFlorida();
  buildMichigan();
  buildFaq();
  buildErrorPage();
  buildCourtPages();
  buildTexasDefensiveDrivingCostPage();
  console.log("Prerender complete.");
}
main().catch(e=>{console.error(e);process.exit(1)});
