// /blueprint/scripts/build-data.mjs
// Build-time: parse CSV → JSON, derive states, validate, and write sitemap.xml.


import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import fs from 'node:fs';
import path from 'node:path';
import { parse as parseCsv } from 'csv-parse/sync';
import YAML from 'yaml';
import XLSX from 'xlsx';


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
  const firstDash = lines.findIndex(line => line.trim() === '---');
  
  if (firstDash === -1) {
    console.warn(`Warning: No frontmatter found in ${filename}`);
    return null;
  }
  
  // Find the second '---' to mark the end of frontmatter
  const secondDash = lines.findIndex((line, index) => index > firstDash && line.trim() === '---');
  
  if (secondDash === -1) {
    console.warn(`Warning: No closing frontmatter delimiter found in ${filename}`);
    return null;
  }
  
  const frontmatterLines = lines.slice(firstDash + 1, secondDash);
  const contentLines = lines.slice(secondDash + 1);
  
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
    const posts = [];
    
    // Recursively find all .md files in blog directory and subdirectories
    const findMarkdownFiles = async (dir) => {
      const items = await readdir(dir, { withFileTypes: true });
      const files = [];
      
      for (const item of items) {
        const fullPath = path.join(dir, item.name);
        if (item.isDirectory()) {
          const subFiles = await findMarkdownFiles(fullPath);
          files.push(...subFiles);
        } else if (item.isFile() && item.name.endsWith('.md')) {
          files.push(fullPath);
        }
      }
      
      return files;
    };
    
    const markdownFiles = await findMarkdownFiles(blogDir);
    
    for (const filePath of markdownFiles) {
      const content = await readFile(filePath, 'utf8');
      const filename = path.basename(filePath);
      const post = parseBlogPost(content, filename);
      
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


const generateSlug = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};


const buildCourtData = async () => {
  try {
    const excelPath = '/Users/jacksonmaitner/Downloads/Courts Directory By County.xlsx';
    
    // Check if file exists
    if (!fs.existsSync(excelPath)) {
      console.warn(`Warning: Excel file not found at ${excelPath}`);
      return [];
    }
    
    // Read Excel file
    const workbook = XLSX.readFile(excelPath);
    
    // Check if MergedData sheet exists
    if (!workbook.SheetNames.includes('MergedData')) {
      console.warn(`Warning: MergedData sheet not found in Excel file. Available sheets: ${workbook.SheetNames.join(', ')}`);
      return [];
    }
    
    // Read MergedData sheet
    const worksheet = workbook.Sheets['MergedData'];
    const data = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
    
    // Process all rows and group by county + courtType + courtName
    // First, collect all valid rows
    const validRows = data
      .map((row, index) => {
        const county = String(row['County'] || row['county'] || '').trim();
        const courtType = String(row['Court Type'] || row['Court Type'] || row['courtType'] || row['CourtType'] || '').trim();
        const courtName = String(row['Court'] || row['Court name'] || row['Court Name'] || row['courtName'] || row['CourtName'] || '').trim();
        
        // Skip rows with missing required fields
        if (!county || !courtType || !courtName) {
          console.warn(`Skipping row ${index + 2}: Missing required field (County: ${county ? '✓' : '✗'}, Court Type: ${courtType ? '✓' : '✗'}, Court Name: ${courtName ? '✓' : '✗'})`);
          return null;
        }
        
        return {
          county,
          courtType,
          courtName,
          prefix: String(row['Prefix'] || '').trim(),
          firstName: String(row['First Name'] || row['First Name'] || row['firstName'] || row['FirstName'] || '').trim(),
          middleName: String(row['Middle Name'] || row['Middle Name'] || row['middleName'] || row['MiddleName'] || '').trim(),
          lastName: String(row['Last Name'] || row['Last Name'] || row['lastName'] || row['LastName'] || '').trim(),
          suffix: String(row['Suffix'] || '').trim(),
          title: String(row['Title'] || '').trim(),
          address: String(row['Address'] || '').trim(),
          city: String(row['City'] || '').trim(),
          zipCode: String(row['Zip Code'] || row['Zip code'] || row['zipCode'] || row['ZipCode'] || row['Zip'] || '').trim(),
          phone: String(row['Phone'] || row['phone'] || '').trim(),
          email: String(row['Email'] || row['email'] || '').trim(),
          website: String(row['Website'] || '').trim(),
          hyperlink: String(row['Hyperlink'] || '').trim()
        };
      })
      .filter(row => row !== null);
    
    // Group by county + courtType + courtName
    const courtMap = new Map();
    
    validRows.forEach(row => {
      const key = `${row.county}|${row.courtType}|${row.courtName}`;
      
      if (!courtMap.has(key)) {
        // Generate slug
        const countySlug = generateSlug(row.county);
        const courtTypeSlug = generateSlug(row.courtType);
        const courtNameSlug = generateSlug(row.courtName);
        const slug = [countySlug, courtTypeSlug, courtNameSlug].filter(Boolean).join('-');
        
        courtMap.set(key, {
          slug,
          county: row.county,
          courtType: row.courtType,
          courtName: row.courtName,
          judges: [],
          phones: new Set(),
          addresses: new Set(),
          websites: new Set(),
          emails: new Set()
        });
      }
      
      const court = courtMap.get(key);
      
      // Add judge
      const nameParts = [row.prefix, row.firstName, row.middleName, row.lastName, row.suffix].filter(Boolean);
      const fullName = nameParts.join(' ');
      const judgeName = row.title ? `${row.title} ${fullName}` : fullName;
      if (judgeName.trim()) {
        court.judges.push(judgeName.trim());
      }
      
      // Add unique contact info
      if (row.phone) court.phones.add(row.phone);
      if (row.email) court.emails.add(row.email);
      
      const website = row.website && row.website !== 'Website Not Found' ? row.website : '';
      if (website) court.websites.add(website);
      
      const fullAddress = [row.address, row.city, row.zipCode].filter(Boolean).join(', ');
      if (fullAddress) court.addresses.add(fullAddress);
    });
    
    // Convert to final format
    const courts = Array.from(courtMap.values())
      .map(court => ({
        slug: court.slug,
        county: court.county,
        courtType: court.courtType,
        courtName: court.courtName,
        judges: court.judges,
        phone: Array.from(court.phones),
        address: Array.from(court.addresses),
        website: Array.from(court.websites),
        email: Array.from(court.emails)
      }));
    
    return courts;
  } catch (error) {
    console.warn(`Warning: Could not build court data: ${error.message}`);
    return [];
  }
};


const build = async () => {
  const siteUrl = await loadSiteUrl();

  // 1) Read CSV
  const csv = await readFile(BP('data/courses.csv'), 'utf8');
  const records = parseCsv(csv, { columns: true, skip_empty_lines: true, bom: true });

  // 1b) Load existing qa_link values if courses.json exists
  let existingQaLinks = {};
  try {
    const existing = JSON.parse(await readFile(SRC('data/courses.json'), 'utf8'));
    if (Array.isArray(existing)) {
      existing.forEach(c => {
        if (c.slug && c.qa_link) existingQaLinks[c.slug] = c.qa_link;
      });
    }
  } catch {
    // File doesn't exist or can't be parsed, that's fine
  }

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

    // Hardcode QA-specific links for courses that need them
    const qaLinkMap = {
      'tx-defensive': 'https://app.qa.roadreadysafety.com/public/checkout?sku=tx-bdi'
    };

    return {
      ...r,
      isPartner,
      price_usd: r.price_usd ?? '',
      duration_hours: r.duration_hours ?? '',
      // Include qa_link from hardcoded map or from existing file
      ...(qaLinkMap[r.slug] || existingQaLinks[r.slug]) && { qa_link: qaLinkMap[r.slug] || existingQaLinks[r.slug] },
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

  // 6) Build court data
  const courts = await buildCourtData();

  // 7) Write JSON outputs
  await ensureDir(SRC('data'));
  await writeFile(SRC('data/courses.json'), JSON.stringify(courses, null, 2));
  await writeFile(SRC('data/states.json'), JSON.stringify(states, null, 2));
  await writeFile(SRC('data/blog.json'), JSON.stringify({ posts: blogPosts }, null, 2));
  await writeFile(SRC('data/texas-courts.json'), JSON.stringify({ courts }, null, 2));
  console.log(`✓ Wrote src/data/courses.json, src/data/states.json, src/data/blog.json, and src/data/texas-courts.json`);

  // 8) Generate sitemap.xml
  const urls = [
    `${siteUrl}/`,
    `${siteUrl}/support`,
    `${siteUrl}/privacy`,
    `${siteUrl}/terms`,
    `${siteUrl}/partners`,
    `${siteUrl}/blog`,
    `${siteUrl}/courses/fl-bdi`,
    `${siteUrl}/courses/mi-bdic`,
    `${siteUrl}/faq`,
    ...blogPosts.map(p => `${siteUrl}/blog/${p.slug}`),
    ...courses.map(c => `${siteUrl}/courses/${c.slug}`),
    ...courts.map(c => `${siteUrl}/texas/courts/${c.slug}`)
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
  
  // 9) Mirror sitemap to dist/ for static builds
  const distPath = path.resolve(ROOT, 'dist');
  if (fs.existsSync(distPath)) {
    await writeFile(path.join(distPath, 'sitemap.xml'), xml);
    console.log(`✓ Mirrored sitemap.xml to dist/`);
  }
  
  console.log(`✓ Wrote public/sitemap.xml`);
};


build().catch(err => {
  console.error(err);
  process.exit(1);
});