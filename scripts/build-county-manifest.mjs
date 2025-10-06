import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the Texas course documents directory
const TEXAS_DOCS_PATH = path.join(__dirname, '..', 'public', 'data', 'texas_course_documents');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'data');

// Function to convert county name to kebab-case slug
function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// Function to check if file is a markdown file
function isMarkdownFile(filename) {
  return filename.toLowerCase().endsWith('.md');
}

// Helper function to check if a markdown file is actually RTF content
function isRTFContent(content) {
  const first200 = content.substring(0, 200);
  return first200.startsWith('{\\rtf1') || 
         /\\'[0-9a-f]{2}/.test(first200) ||
         /\\fonttbl|\\colortbl|\\margl|\\pard/.test(first200) ||
         first200.includes('Helvetica') && first200.includes('\\f0');
}

// Function to check if file is an asset (non-markdown)
function isAssetFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  return ['.pdf', '.docx', '.png', '.jpg', '.jpeg', '.webp'].includes(ext);
}

// Function to scan directory and build manifest
function buildCountyManifest() {
  console.log('🔍 Building Texas county manifest...');
  
  if (!fs.existsSync(TEXAS_DOCS_PATH)) {
    console.log('❌ Texas course documents directory not found:', TEXAS_DOCS_PATH);
    return;
  }

  const counties = [];
  const countyIndex = {};

  try {
    const items = fs.readdirSync(TEXAS_DOCS_PATH, { withFileTypes: true });
    
    for (const item of items) {
      // Skip hidden files, .DS_Store, and non-directories
      if (item.name.startsWith('.') || !item.isDirectory()) {
        continue;
      }

      const countyName = item.name;
      const countyPath = path.join(TEXAS_DOCS_PATH, countyName);
      const slug = toKebabCase(countyName);
      
      let mdFile = null;
      const assets = [];

      // Scan county directory for files
      try {
        const countyFiles = fs.readdirSync(countyPath);
        
        // Look for valid markdown files (reject RTF content)
        let validMdFile = null;
        
        // First, check clean.md if it exists
        if (countyFiles.includes('clean.md')) {
          const cleanPath = path.join(countyPath, 'clean.md');
          try {
            const content = fs.readFileSync(cleanPath, 'utf8');
            if (!isRTFContent(content)) {
              validMdFile = `${countyName}/clean.md`;
            }
          } catch (error) {
            console.warn(`⚠️  Could not read clean.md for ${countyName}:`, error.message);
          }
        }
        
        // If no valid clean.md, check other .md files
        if (!validMdFile) {
          for (const file of countyFiles) {
            if (isMarkdownFile(file)) {
              const filePath = path.join(countyPath, file);
              try {
                const content = fs.readFileSync(filePath, 'utf8');
                if (!isRTFContent(content)) {
                  validMdFile = `${countyName}/${file}`;
                  break;
                } else {
                  console.log(`🚫 Rejected RTF content in ${countyName}/${file}`);
                }
              } catch (error) {
                console.warn(`⚠️  Could not read ${file} for ${countyName}:`, error.message);
              }
            }
          }
        }
        
        mdFile = validMdFile;
        
        // Collect assets (exclude .rtf, .doc, .docx from markdown display)
        for (const file of countyFiles) {
          // Skip hidden files, .DS_Store, and markdown files
          if (file.startsWith('.') || isMarkdownFile(file)) {
            continue;
          }

          if (isAssetFile(file)) {
            assets.push(file);
          }
        }
      } catch (error) {
        console.warn(`⚠️  Could not read county directory ${countyName}:`, error.message);
        continue;
      }

      const countyData = {
        county: countyName,
        slug: slug,
        md: mdFile,
        assets: assets,
        needs_cleanup: mdFile === null
      };

      counties.push(countyData);
      countyIndex[slug] = {
        county: countyName,
        md: mdFile,
        assets: assets,
        needs_cleanup: mdFile === null
      };
    }

    // Sort counties alphabetically by name
    counties.sort((a, b) => a.county.localeCompare(b.county));

    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Write counties array
    const countiesPath = path.join(OUTPUT_DIR, 'tx_counties.json');
    fs.writeFileSync(countiesPath, JSON.stringify(counties, null, 2));
    console.log(`✅ Written ${counties.length} counties to ${countiesPath}`);

    // Write county index
    const indexPath = path.join(OUTPUT_DIR, 'tx_county_index.json');
    fs.writeFileSync(indexPath, JSON.stringify(countyIndex, null, 2));
    console.log(`✅ Written county index to ${indexPath}`);

    console.log('🎉 County manifest build complete!');
    
  } catch (error) {
    console.error('❌ Error building county manifest:', error);
    process.exit(1);
  }
}

// Run the build
buildCountyManifest();
