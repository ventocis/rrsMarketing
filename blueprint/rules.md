**Only `.jsx`** (no `.tsx`)

**No path aliases** (`@/…`) and **no barrel files**

Imports **without file extensions**

All content from `/blueprint` only; no external fetch

Partner CTAs must open `target="_blank" rel="noopener sponsored"`

No external fetch at runtime (GitHub, CDNs, APIs). All assets live in /public or /blueprint.  
Design refs (srefs) are images shipped with the site; any GitHub link is for humans only.  
Do not import remote fonts from 3rd-party CDNs; self-host or use system stack.

\- design-refs.json is documentation only; do not import it in the app.  
\- Store ref images under /public/design-refs; no external fetch at runtime.  
\- When a component follows a reference, add a code comment: // sref: \<id\>.  
\- Do not copy code from GPL/unlicensed repos; use screenshots and recreate with Flowbite primitives.

