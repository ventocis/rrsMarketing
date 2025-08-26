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

function renderWithTemplate({ title, desc, canonical, bodyHtml, jsonLd }) {
  return TPL
    .replaceAll("{{TITLE}}", escapeHtml(title))
    .replaceAll("{{DESC}}", escapeHtml(desc || "Road Ready Safety"))
    .replaceAll("{{CANONICAL}}", canonical)
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
  console.log("Prerender complete.");
}
main().catch(e=>{console.error(e);process.exit(1)});
