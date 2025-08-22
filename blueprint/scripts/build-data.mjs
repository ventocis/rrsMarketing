// /blueprint/scripts/build-data.mjs
// Build-time: parse CSV → JSON, derive states, validate, and write sitemap.xml.


import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { parse as parseCsv } from 'csv-parse/sync';
import YAML from 'yaml';


const ROOT = process.cwd();
const BP = p => path.join(ROOT, 'blueprint', p);
const SRC = p => path.join(ROOT, 'src', p);
const PUB = p => path.join(ROOT, 'public', p);


const ensureDir = async (dir) => mkdir(dir, { recursive: true });


const loadSiteUrl = async () => {
  try {
    const y = await readFile(BP('site.yaml'), 'utf8');
    const site = YAML.parse(y);
    const domain = site?.brand?.domain?.replace(/\/+$/, '') || 'roadreadysafety.com';
    const proto = domain.startsWith('http') ? '' : 'https://';
    return `${proto}${domain}`;
  } catch {
    return 'https://roadreadysafety.com';
  }
};


const toNumberOrNull = (v) => {
  if (v === undefined || v === null || v === '') return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : NaN;
};


const toBoolean = (v) => {
  if (v === undefined || v === null || v === '') return false;
  return v.toLowerCase() === 'true';
};


const validateRows = (rows) => {
  const errs = [];
  const seen = new Set();
  const allowedProviders = new Set(['Partner', 'InHouse']);


  rows.forEach((r, i) => {
    const row = i + 2; // csv header is row 1
    // slug
    if (!r.slug) errs.push(`[row ${row}] slug is required`);
    if (r.slug && seen.has(r.slug)) errs.push(`[row ${row}] duplicate slug "${r.slug}"`);
    seen.add(r.slug);


    // provider_type
    if (!allowedProviders.has(r.provider_type))
      errs.push(`[row ${row}] provider_type must be 'Partner' or 'InHouse' (got "${r.provider_type}")`);


    // affiliate link
    if (r.provider_type === 'Partner' && !r.affiliate_link)
      errs.push(`[row ${row}] Partner course requires affiliate_link`);


    // numeric checks (if provided)
    const price = toNumberOrNull(r.price_usd);
    if (r.price_usd !== '' && price !== null && Number.isNaN(price))
      errs.push(`[row ${row}] price_usd must be numeric`);


    const dur = toNumberOrNull(r.duration_hours);
    if (r.duration_hours !== '' && dur !== null && Number.isNaN(dur))
      errs.push(`[row ${row}] duration_hours must be numeric`);
  });


  if (errs.length) {
    console.error(`\n❌ Data validation failed:\n- ` + errs.join('\n- '));
    process.exit(1);
  }
};


const parseBlogPost = (content, filename) => {
  const lines = content.split('\n');
  const frontmatterEnd = lines.findIndex(line => line.trim() === '---');
  
  if (frontmatterEnd === -1) {
    console.warn(`Warning: No frontmatter found in ${filename}`);
    return null;
  }
  
  const frontmatterLines = lines.slice(1, frontmatterEnd);
  const contentLines = lines.slice(frontmatterEnd + 1);
  
  try {
    const frontmatter = YAML.parse(frontmatterLines.join('\n'));
    return {
      ...frontmatter,
      content: contentLines.join('\n').trim()
    };
  } catch (error) {
    console.warn(`Warning: Invalid frontmatter in ${filename}: ${error.message}`);
    return null;
  }
};


const buildBlogData = async () => {
  try {
    const blogDir = BP('blog');
    const files = await readdir(blogDir);
    const markdownFiles = files.filter(f => f.endsWith('.md'));
    
    const posts = [];
    
    for (const file of markdownFiles) {
      const content = await readFile(path.join(blogDir, file), 'utf8');
      const post = parseBlogPost(content, file);
      
      if (post && post.title && post.slug && post.date) {
        posts.push(post);
      }
    }
    
    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    return posts;
  } catch (error) {
    console.warn(`Warning: Could not build blog data: ${error.message}`);
    return [];
  }
};


const build = async () => {
  const siteUrl = await loadSiteUrl();

  // 1) Read CSV
  const csv = await readFile(BP('data/courses.csv'), 'utf8');
  const records = parseCsv(csv, { columns: true, skip_empty_lines: true, bom: true });


  // 2) Normalize + basic shaping
  const courses = records.map(r => {
    // Trim all fields
    Object.keys(r).forEach(k => r[k] = typeof r[k] === 'string' ? r[k].trim() : r[k]);


    // Ensure required derived booleans/fields
    const isPartner = r.provider_type === 'Partner';
    
    // Process boolean benefit fields
    const benefits = {
      stateApproved: toBoolean(r.stateApproved),
      mobileFriendly: toBoolean(r.mobileFriendly),
      instantCertificate: toBoolean(r.instantCertificate),
      satisfactionGuarantee: toBoolean(r.satisfactionGuarantee),
      shortestAllowed: toBoolean(r.shortestAllowed),
      secureCheckout: toBoolean(r.secureCheckout)
    };
    
    return {
      ...r,
      isPartner,
      price_usd: r.price_usd ?? '',
      duration_hours: r.duration_hours ?? '',
      ...benefits
    };
  });


  // 3) Validate
  validateRows(courses);

  // 4) Derive states from courses (to avoid drift)
  const statesSet = new Set(courses.map(c => c.state).filter(Boolean));
  const states = [...statesSet].sort().map(code => ({ code, name: code })); // you can map to full names later

  // 5) Build blog data
  const blogPosts = await buildBlogData();

  // 6) Write JSON outputs
  await ensureDir(SRC('data'));
  await writeFile(SRC('data/courses.json'), JSON.stringify(courses, null, 2));
  await writeFile(SRC('data/states.json'), JSON.stringify(states, null, 2));
  await writeFile(SRC('data/blog.json'), JSON.stringify({ posts: blogPosts }, null, 2));
  console.log(`✓ Wrote src/data/courses.json, src/data/states.json, and src/data/blog.json`);

  // 7) Generate sitemap.xml
  const urls = [
    `${siteUrl}/`,
    `${siteUrl}/support`,
    `${siteUrl}/privacy`,
    `${siteUrl}/terms`,
    `${siteUrl}/partners`,
    `${siteUrl}/blog`,
    ...blogPosts.map(p => `${siteUrl}/blog/${p.slug}`),
    ...courses.map(c => `${siteUrl}/courses/${c.slug}`)
  ];
  const now = new Date().toISOString().slice(0, 10);
  const xml =
`<?xml version="1.0" encoding="UTF-8"?> 
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq></url>`).join('\n')}
</urlset>
`;
  await ensureDir(PUB(''));
  await writeFile(PUB('sitemap.xml'), xml);
  console.log(`✓ Wrote public/sitemap.xml`);
};


build().catch(err => {
  console.error(err);
  process.exit(1);
});