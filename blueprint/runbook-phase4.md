# Phase 4 — Final Functionality & Content Wrap-Up (Revised)

**Goal:** Close content/functional gaps with zero logic changes. No runtime fetches. All copy comes from /blueprint. No dist/ commits.

## Guardrails (unchanged)

- Do not change finder logic or the data builder.
- Keep partner CTA rules and pill behavior intact.
- Legal/Support pages render markdown via DocPage.
- Keep Flowbite React usage to primitives: Button, Select, TextInput, Card, Badge, Accordion.

## 4.1 Doc Pages: spacing / bold / self-links (Support, Privacy, Terms)

**Branch:** `phase4-docs-polish`  
**Files:** `src/components/DocPage.jsx`, `/blueprint/legal/support.md`  
**Why:** Headings should not be self-links; typography must be consistent; no stray bold/emojis.

### Implementation

- **DocPage.jsx:** ensure markdown is wrapped in `prose prose-slate max-w-none`.
- Keep `rehype-slug`; remove `rehype-autolink-headings`.
- Remove any emoji/stray bold in `support.md`.
- "Need help?" card (right sidebar) shows:
  - Email: info@roadreadysafety.com (mailto link)
  - Phone: (888) 885-5707 (Mon–Fri, 9–5)

### Acceptance / QA

- `/support`, `/privacy`, `/terms` show H1/H2 hierarchy, clean spacing, no heading anchors, no random bold/emojis, no console warnings.

## 4.2 TicketSchool partner explanation (FAQ + course page)

**Branch:** `phase4-partner-explain`  
**Files:** `/blueprint/copy/faq.json`, `src/components/PartnerNote.jsx`, course page component  
**Why:** Clarify that some courses are provided by TicketSchool.

### Implementation

- Add FAQ item in `/blueprint/copy/faq.json`:
  - **Q:** "Who is TicketSchool?"
  - **A:** "TicketSchool is a state-approved provider we partner with. For these courses, checkout happens on TicketSchool's secure site (new tab). Completion reporting/certificates follow the rules on the course page."
- Add `<PartnerNote/>` only when `provider_type === "Partner"` with copy above.
- Keep CTAs exactly per existing rules: `target="_blank" rel="noopener sponsored"`.

### Acceptance / QA

- Partner courses show note; in-house courses do not. FAQ renders the new item.

## 4.3 Expand FAQ content (common customer questions)

**Branch:** `phase4-faq-expand`  
**Files:** `/blueprint/copy/faq.json`  
**Why:** Cover top support queries to reduce confusion.

### Implementation (add 5–8)

- "How do I log back in?"
- "When do I get my certificate?"
- "Is my completion reported to the court/DMV?"
- "Refund policy?"
- "Device/browser support?"
- "How long does the course take?"
- "What if I made a mistake choosing my state/course?"

### Acceptance / QA

- `/faq` shows new questions; no hardcoded copy in components.

## 4.4 Add unDraw illustrations (static) for Home sections

**Branch:** `phase4-illustrations`  
**Files:** `/public/assets/illustrations/*`, Hero, UspSection, HowSection  
**Why:** Stripe-like visuals, without touching copy or layout logic.

### Exact visuals (pre-selected)

- **Hero (right):** `product-explainer.svg` (fallback `web-app.svg`)
- **What Sets Us Apart (right):** `report.svg` (fallback `terms.svg`)
- **How It Works (right):** `add-tasks.svg` (fallback `lightbulb-moment.svg`)

### Implementation

- Download from unDraw with brand blue; save to `/public/assets/illustrations/`.
- Right column only; keep text left unchanged.
- Optional subtle texture behind art (low-opacity grid/dots) scoped to the right column container.
- Provide meaningful alt.

### Acceptance / QA

- Visuals render responsively, don't push or reflow copy; Lighthouse a11y OK.

## 4.5 Course Preview (slideshow) — styled component

**Branch:** `phase4-course-preview`  
**Files:** `src/components/CoursePreview.jsx`, course page, `/public/assets/course-previews/<slug>/*`  
**Why:** Let users see the course UI before purchasing.

### Implementation (no new libraries)

- Create `CoursePreview` with site-consistent shell:
  - Outer: `rounded-2xl border border-slate-200 bg-white shadow-sm p-4`
  - Inside: image area with fixed aspect (e.g., `aspect-[16/10]`), `object-cover`, `rounded`; below it, small dot indicators and Prev/Next buttons using Flowbite Button.
- Source images from `/public/assets/course-previews/<slug>/01.jpg`, `02.jpg`, `03.jpg`…
- If no images for slug → do not render the component.
- Keyboard accessible; arrow keys navigate; images `loading="lazy"`, meaningful alt.

### Placement & title

- On course page, section title: "Course preview", placed **below the top course summary** (title/benefits/price/CTA) and **above the detailed accordions**.

### Acceptance / QA

- Gallery renders when images exist; otherwise hidden.
- No layout jumps; mobile works.

## 4.6 Brand & Trust: logos, payment marks, social, footer link

**Branch:** `phase4-brand-trust`  
**Files:** `src/Header.jsx`, `src/Footer.jsx`, `src/sections/Trust.jsx`, `/public/assets/logo.svg`, `/public/assets/payments/*.svg`, `/public/assets/social/*.svg`  
**Why:** Brand consistency and credibility.

### Implementation

- **Header & footer logo:** `/public/assets/logo.svg` with `alt="Road Ready Safety"` linking to `/`.
- **Payment marks row in Trust:** add monochrome SVGs `visa.svg`, `mastercard.svg`, `amex.svg`, `discover.svg`. (Keep visual weight small; equal height ~20–24px; `aria-label` per brand.)
- **Social links footer:** add Facebook & YouTube icons (SVG) with real or placeholder links.
- **Footer link:** "Become a partner" → `/partners` (styled like other footer links).

### Acceptance / QA

- Trust section shows payment marks row; header/footer show logo; social links appear; "Become a partner" visible in footer.

## 4.7 Partners Page (Coming Soon)

**Branch:** `phase4-partners-page`  
**Files:** `/blueprint/legal/partners.md`, `src/pages/Partners.jsx`, router  
**Why:** Footer link must resolve somewhere.

### Implementation

- `/blueprint/legal/partners.md` content:
  ```
  # Become a partner
  
  We're building our partner program. Coming soon. For inquiries: info@roadreadysafety.com.
  ```
- Render via DocPage like other legal pages.

### Acceptance / QA

- `/partners` route exists, renders simple "coming soon", included in sitemap.

## 4.8 Blog (Drive Smart) — footer-only nav for now

**Branch:** `phase4-blog`  
**Files:** `/blueprint/blog/*.md`, `/blueprint/pages.yaml`, `blueprint/scripts/build-data.mjs` (extend), `src/pages/BlogIndex.jsx`, `src/pages/BlogPost.jsx`, footer  
**Why:** SEO content surface; don't clutter header.

### Implementation

- Blog posts as markdown with frontmatter (title, slug, date, description).
- Builder emits `/src/data/blog.json` + include routes in `sitemap.xml`.
- Routes: `/blog` (index), `/blog/:slug` (post).
- **Footer:** add "Drive Smart Blog" link only (no header link yet).

### Acceptance / QA

- Static blog index + post pages render; sitemap includes posts; footer link works.
