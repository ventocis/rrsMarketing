Home renders all sections; “Courses” scrolls to finder

Finder → FL picks in-house route; TX opens TicketSchool in new tab

Course page shows partner pill only when provider \= ticket-school

Legal pages load; footer has Privacy/Terms links

No console errors; only `.jsx` files present

`npm run build` outputs `dist/` and routes work with S3 fallback to `index.html`

`courses.csv` row → page `/courses/{slug}` exists.

Partner course shows **partner pill** and **provider note**; CTA opens new tab with `rel="sponsored"`.

In-house course hides partner pill and uses internal CTA.

Finder shows only states present in `courses.csv`.

Features section hides when `show_modules=false`.  
Finder:

FL \+ Court → shows two BDI results (EN \+ ES) grid.

Selecting language reduces to one card and clicking goes to the correct course page.

TX \+ Court → goes straight to the only Defensive Driving course (no results page).

Results page:

Not visible in header/nav.

Provider pill shows for TicketSchool.

Partner CTAs open in new tab with rel="noopener sponsored".

Data: build fails on duplicate slug, invalid provider\_type, non-numeric price/duration (when present), or missing affiliate\_link for Partner.

SEO: /robots.txt and /sitemap.xml exist in dist/.

Affiliate: all Partner CTAs open in a new tab with rel="noopener sponsored"; disclosure appears in footer/support.

Finder: 1 result → direct; \>1 → results grid; 0 → empty state.

No external runtime fetches (static friendly).  
**Flowbite** CSS loaded once; components render without FOUC.

**Sitemap** contains one URL per course (`/courses/{slug}`).  
