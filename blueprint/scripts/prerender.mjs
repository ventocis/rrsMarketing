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

function writeHtml(outDir, html) {
  mkdirp.sync(outDir);
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
}

function renderWithTemplate({ title, desc, canonical, bodyHtml, jsonLd, ogTitle, ogUrl }) {
  const resolvedOgTitle = ogTitle ?? title;
  const resolvedOgUrl = ogUrl ?? canonical;
  return TPL
    .replaceAll("{{TITLE}}", escapeHtml(title))
    .replaceAll("{{DESC}}", escapeHtml(desc || "Road Ready Safety"))
    .replaceAll("{{CANONICAL}}", canonical)
    .replaceAll("{{OG_TITLE}}", escapeHtml(resolvedOgTitle))
    .replaceAll("{{OG_URL}}", resolvedOgUrl)
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
  buildCourtPages();
  console.log("Prerender complete.");
}
main().catch(e=>{console.error(e);process.exit(1)});
