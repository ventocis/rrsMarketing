# Phase 5 — UX/UI Enhancement Pass (Revised & Safeguarded)

**Goal:** Elevate visuals with zero logic changes. Keep all copy/data flows intact.

## Guardrails (unchanged)

- Don't change finder logic/partner flows.
- No runtime fetches. All assets static.
- No Carousel lib; only approved Flowbite primitives.

## 5.1 Home two-column layout (safe, incremental)

**Branch:** `phase5-home-layout`  
**Files:** Hero, UspSection, HowSection  
**Why:** Avoid confusion: left = existing text/components unchanged; right = visuals only.

### Implementation (micro-steps)

**A. Reserve right column:** convert each section to a two-column grid on desktop:
```jsx
grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-12
```
- Left column = current content unchanged; right column = empty placeholder.

**B. Insert visuals:** add the exact SVGs chosen in Phase 4.4 to the right placeholder (img or inline SVG), with `h-48 md:h-64 lg:h-72`, `mx-auto lg:ml-auto`.

**C. Add subtle texture to right column container only (optional), with low opacity.**

**D. Responsive check:** on mobile, stack (visual under text), ensure no CLS.

**E. QA:** compare with home before/after; confirm no copy/flows changed.

### Acceptance / QA

- Layout consistent across all 3 sections; no content moved/removed; visuals align right without overlapping; mobile stacking is clean.

## 5.2 Results filters polish (design only)

**Branch:** `phase5-results-filters`  
**Files:** ResultsPage, FiltersBar  
**Why:** Improve readability without logic changes.

### Implementation

- Compact form controls:
  ```jsx
  rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm bg-white
  ```
- Use full state names in selector (chips remain abbreviations).
- Remove "Change state or reason" link entirely.
- Maintain a11y labels and focus rings.

### Acceptance / QA

- Filters look lighter/cleaner; state shows full names; navigation/logic unchanged.

## 5.3 Course page redesign (Amazon-like) — defer

**Branch:** to be created later  
**Note:** We will return to this after we lock the home layout. Keep a placeholder task in runbook: "Revisit in Phase 5.3."

## 5.4 A11y & Perf pass

**Branch:** `phase5-a11y-perf`  
**Files:** global  
**Implementation**

- Confirm landmarks (`<main>`, `<nav>`, `<footer>`), heading order.
- All images have width/height to avoid CLS; lazy-load where appropriate.
- Keyboard access for preview gallery and filter controls.

### Acceptance / QA

- Lighthouse a11y ≥ 95; no layout shifts flagged.
