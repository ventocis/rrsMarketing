# Phase 3 Runbook — Results & Finder Polish

**Scope (only these pages):**
- Results route: `/find/:state/:courseType`
- Finder (HeroFinder) on Home `/`

**Keep existing rules:**
- Source of truth = `/blueprint`. No hardcoded copy.
- Stack: React + Vite (.jsx), Tailwind v3, Flowbite React primitives.
- Reuse global components from Phase 2 (Button, Card, typography). Do **not** redefine.
- Data: `/src/data/courses.json`, `/src/data/states.json`, `/blueprint/data/finder-map.json`
- Helpers: `/src/lib/format.js` (`usd`, `hours`, `truncate`)
- Partner CTA: `target="_blank" rel="noopener sponsored"`. In-house CTA: `#enroll`.

**Workflow per task:**
- One task at a time → diff → 2–3 bullet summary → stop for approval.
- A11y (labels, focus, roles), build & static preview must pass.

---

## Task 1 — Results page shell + heading
**Goal:** Make `/find/:state/:courseType` clean, readable, and clearly scoped to the selected state/course type.

**Do:**
- Page shell: `max-w-6xl mx-auto px-4 py-16 md:py-20`.
- Title (H1): “{STATE} — {CourseTypeLabel}” (`text-3xl md:text-4xl font-bold text-center`).
- Subhead from blueprint (if present) or simple guidance from `/blueprint/copy/results.json`.
- Keep typography defaults from Phase 2; no global changes.

**Files:** Update the existing results route component (file currently handling `/find/:state/:courseType`).

**QA:** H1/H2 levels correct; mobile spacing OK.

---

## Task 2 — Filters bar (language + **state switcher** + sort)
**Goal:** Let users switch **state**, **language**, and **sort** without leaving the page; reflect in URL query params.

**Do:**
- Create `src/components/FiltersBar.jsx`:
  - Inputs: `state`, `courseType`, `language`, `sort`.
  - Emits: onChange handlers that `navigate()` to `/find/${state}/${courseType}?lang=${lang}&sort=${sort}`.
  - Controls:
    - **State Select** (from `/src/data/states.json`): labeled “State”.
    - **Language Select** (“Any”, “English”, “Spanish” if present in course data): labeled “Language”.
    - **Sort Select** (optional): “Recommended” (default), “Price (low)”, “Duration (short)”.
  - Use Flowbite `<Select>`; labels above inputs; `sr-only` only if a visible label exists elsewhere.
- Place FiltersBar below the H1/subhead.

**A11y:** Each select has a visible `<label>`; keyboard focus visible.

**URL model:** read/write `lang` and `sort` search params; keep `state`/`courseType` in path.

---

## Task 3 — Results list (cards) polish
**Goal:** Improve scannability and conversion on the card grid.

**Do:**
- Cards grid: `grid grid-cols-1 md:grid-cols-2 gap-6 mt-8`.
- Reuse global `Card` component for each course result; inside:
  - Title (`font-semibold`), `truncate()` description.
  - Badges row (Flowbite/utility): duration `hours()`, language, price `usd()`.
  - Partner pill (`Provided by {provider}`) when `provider_type === "Partner"`.
  - CTAs row:
    - **Learn more** → `/courses/{slug}` (internal).
    - **Sign up**:
      - Partner → `affiliate_link` `target="_blank" rel="noopener sponsored"`.
      - In-house → `/courses/{slug}#enroll`.
  - All text from blueprint/course object; no hardcoding.

**QA:** Buttons use global `<Button>`; pill shown only for partners; grid responsive.

---

## Task 4 — Filtering & sorting logic
**Goal:** Make the results reflect language + sort, and be predictable.

**Do:**
- Filter pipeline:
  - Base set: from `courses.json` filtered by `state` and `course_type ∈ map[reason]` **OR** explicit `courseType` when provided.
  - If `lang` param set and ≠ “any”, filter courses where `language === lang` (fallback to item’s language array if structured).
- Sorting:
  - `recommended` (default): leave as-is or by provider weight if present.
  - `price-low`: numeric ascending by `price_usd`.
  - `duration-short`: ascending by `duration_hours` (missing values bottom).
- Edge cases:
  - **0 results:** render an empty state with guidance + back-to-finder `<Button variant="secondary">Find another course</Button>`.
  - **1 result:** keep showing the card (do **not** auto-redirect here; the redirect behavior is part of Finder submit, not Results view).

**QA:** URL changes re-render results; no full reloads.

---

## Task 5 — Breadcrumb + back affordance
**Goal:** Reduce disorientation; quick path back to change inputs.

**Do:**
- Breadcrumb above H1: `Home / {State} / {CourseTypeLabel}`. All links internal.
- A smaller **“Change state or reason”** link next to the H1 (or under it) that jumps to Finder on Home (`/#find-course`).

**A11y:** Breadcrumb uses `<nav aria-label="Breadcrumb">`.

---

## Task 6 — Finder enhancements (on Home)
**Goal:** Make Finder faster and more forgiving.

**Do:**
- Labels above fields; helper text muted (`text-sm text-gray-500`).
- **Popular states** (optional) as chips above the State select:
  - If implemented: a horizontal scroll row of 5–8 abbreviations (e.g., FL, TX, CA...), clicking sets the State select.
  - Chips: `rounded-full px-3 py-1 bg-gray-100 hover:bg-gray-200`.
- **Advanced options** disclosure:
  - Collapsible region for optional “Course” and “Language”.
  - Default collapsed to reduce cognitive load.
- Submission:
  - Use existing logic with `/blueprint/data/finder-map.json`.
  - If finder yields 1 result → navigate to `/courses/{slug}`.
  - If >1 → navigate to `/find/{state}/{courseType}?lang=${lang|any}`.

**QA:** Keyboard accessible chips; labels readable; no logic regressions.

---

## Task 7 — Empty-state component
**Goal:** Friendly guidance when no courses match.

**Do:**
- New component `src/components/EmptyState.jsx`
  - Neutral icon (inline SVG), short message, and `<Button variant="secondary" href="/#find-course">Try another state</Button>`.
- Used by Results page when list is empty.

---

## Task 8 — Final QA & build
**Goal:** Ship confidently.

**Do:**
- A11y: visible focus, correct heading order, labeled inputs.
- URL behavior:
  - Changing state in FiltersBar updates path + reloads results in place.
  - Changing language/sort updates query params only.
- Partner CTAs have `rel="noopener sponsored"`.
- `npm run build && npm run preview:static` (SPA fallback OK).

**Deliver:**
- File diffs and 2–3 bullet summary.
- Stop for approval.

---

**Commit message template per task**
- `feat(results): add FiltersBar with state/lang/sort (URL-sync)`
- `feat(results): polish cards grid and partner CTAs`
- `feat(finder): chips for popular states + advanced options`
- `feat(ui): EmptyState for zero matches`
- `docs(runbook): phase 3 updates`
