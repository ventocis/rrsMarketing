# Phase 2 Runbook — UI/UX Polish & Conversion Boost

**Goal**  
Transform the site from “functional” to “exceptional” while **keeping all existing rules**:
- Stack: React + Vite (.jsx only), Tailwind v3, Flowbite React (primitives only).
- No TypeScript, no path aliases, no barrel files, no runtime external fetches.
- Static SPA build to `/dist` (S3/CloudFront).
- **Source of truth** = `/blueprint` (copy/data/ui/rules). Do not hardcode copy.

**Workflow (each task)**  
1) Follow `/blueprint/runbook.md` norms: do one task at a time.  
2) Run `npm run build && npm run preview:static`.  
3) Show file diffs + a 2–3 bullet summary. **Stop for approval.**  
4) A11y pass (labels, focus, alt, logical headings).  
5) No dev-only features; SPA fallback ok in preview.  
6) Add `// sref: <id>` where design refs inform styling.

**Definition of Done (per task)**  
- Readability: `max-w-[65ch]` for body text where applicable, balanced spacing.  
- Scannability: clear H1/H2/H3 hierarchy; concise bullets for lists.  
- Conversion: visible primary CTA; secondary where helpful.  
- A11y: keyboard focus, accessible accordions, form labels above inputs.  
- No runtime network calls; Flowbite CSS imported once (via `index.css`).  
- Build + preview succeed.

---

## Completed (carry over)
- [x] **Task 1 — Typography & Layout Defaults**  
  Applied global section spacing, content width (`max-w-[65ch]`), heading hierarchy, alternating section backgrounds.
- [x] **Task 2 — CTA & Button System**  
  Global `<Button>` with `variant: primary|secondary|link`, `size: sm|md|lg`; refactored CTAs in Hero/Finder/Trust/FAQ/Footer.

> For Tasks 1–2: only verify in later tasks if a section needs alignment; do not redo.

---

## Task 3 — Hero Polish (visual hierarchy)
**Objective:** Increase clarity and impact without changing Finder logic.  
**Do:**  
- Add subtle hero background (soft gradient or texture), responsive padding `py-20 lg:py-28`.  
- Ensure H1 uses `text-4xl md:text-5xl font-bold`, subhead uses `text-lg md:text-xl text-gray-600`.  
- Keep a **single** primary CTA under headline using global `<Button variant="primary" size="lg">`.  
- Add a gentle scroll cue (e.g., down-chevron) with `aria-hidden="true"`.  
**Files:** `src/HeroFinder.jsx` (wrapper only), optional `src/components/HeroShell.jsx`.  
**QA:** Headline readable at ~65ch, one obvious CTA, Finder visually grouped, no extra CTAs.

---

## Task 4 — Finder Polish (form UX)
**Objective:** Reduce friction on form completion.  
**Do:**  
- Labels above inputs; helper text below (muted `text-gray-500 text-sm`).  
- Flowbite `Select` + `Button` only; full-width on mobile, 2-col on lg.  
- Replace any placeholder-as-label patterns.  
- Keep submit as `<Button variant="primary">`.  
**Files:** `src/HeroFinder.jsx`.  
**QA:** Inputs properly labeled, good spacing, keyboard focus visible.

---

## Task 5 — USP Section (card grid)
**Objective:** Fast scanning of 3–6 benefits.  
**Do:**  
- Create `src/components/Card.jsx` (soft shadow, `rounded-2xl p-6`), equal-height via `grid` + `items-stretch`.  
- Each card: icon (optional), short heading, one supporting sentence (from `/blueprint/copy/home.json`).  
- Section background `bg-gray-50` (alternating rhythm).  
**Files:** `src/sections/UspSection.jsx`, `src/components/Card.jsx`.  
**QA:** All copy from blueprint; grid responsive; hover affordance subtle.

---

## Task 6 — How It Works (steps)
**Objective:** 3–4 concise steps with strong clarity.  
**Do:**  
- Numbered badges (`rounded-full h-10 w-10 flex items-center justify-center bg-blue-600 text-white`).  
- Step heading as action verb; one-sentence explanation.  
- CTA after steps using global `<Button>` (secondary or primary per blueprint).  
**Files:** `src/sections/HowSection.jsx`.  
**QA:** Steps scan quickly; clear follow-up CTA.

---

## Task 7 — Trust Section (assurance & proof)
**Objective:** Increase confidence near decision points.  
**Do:**  
- Small grid of assurance items (e.g., “Accepted where required”, “Secure checkout”).  
- Optional logo strip placeholder (images in `/public/` only).  
- CTA “Need help? Contact Support” using `<Button variant="secondary">`.  
**Files:** `src/sections/TrustSection.jsx`.  
**QA:** Trust sits near Finder/CTAs; mobile-friendly.

---

## Task 8 — FAQ (accessible accordion)
**Objective:** Reduce objections with accessible pattern.  
**Do:**  
- Use Flowbite `Accordion` with headings-as-buttons; ensure roles/aria are correct.  
- Pull Q&A from `/blueprint/copy/faq.json`.  
- Add “See full FAQ →” `<Button variant="link">`.  
**Files:** `src/sections/FaqSection.jsx`.  
**QA checkpoint:** Keyboard accessible; focus outlines visible; content matches blueprint.

---

## Task 9 — Footer Polish
**Objective:** Clarity and quick navigation.  
**Do:**  
- Group links with short headings; legal links styled as `link` buttons.  
- Ensure `/support`, `/privacy`, `/terms` routes exist (Task 9 static pages from main runbook).  
**Files:** `src/sections/Footer.jsx`.  
**QA:** Tab order logical; hover/focus states consistent.

---

## Task 10 — Visual Enhancements & Motion
**Objective:** Subtle delight without distraction.  
**Do:**  
- Add small hover transitions to cards/buttons (`transition`, `hover:-translate-y-0.5`, `hover:shadow`).  
- Optional fade/slide in on section enter (basic CSS/utility only; no new libs).  
**QA:** Animations reduced-motion friendly; no layout shifts.

---

## Task 11 — Responsive + A11y + Consistency Pass (Final QA)
**Objective:** Ship a coherent, accessible, static site.  
**Do:**  
- Mobile/desktop checks on all sections (grids collapse, forms full-width on mobile).  
- Verify color contrast; headings order H1→H2→H3; focus states everywhere.  
- Confirm **all copy** comes from `/blueprint`; no hardcoded text.  
- Run `npm run build && npm run preview:static`.  
**Deliver:** Diffs + short summary, then request approval to merge.

---

**Commit format:**  
- `feat(ui): …` new UI component/section  
- `fix(ui): …` UI bug fix  
- `chore: …` non-UI changes (docs, config)  
- `docs(runbook): …` runbook updates

**Notes**  
- Use Tailwind + Flowbite primitives only.  
- Images go in `/public/`; reference via `/assets/...` or `/images/...`.  
- Add `// sref: <id>` when a design screenshot influences a component.  

---

After creating `blueprint/runbooks/phase2.md`, run a build to ensure nothing breaks, then commit:
`docs(runbook): add Phase 2 UI/UX polish plan (Tasks 1–11), mark 1–2 complete`
Stop and wait for my approval before starting Task 3.
