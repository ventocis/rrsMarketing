# The /texas sales video — placement, measurement and rollback

> ## ⛔ ARCHIVED — NOT SHIPPING (decided 2026-09-05)
>
> Jackson decided not to put this on the site for now. The component and this plan live on
> the branch **`sales-video-texas`**; they have been removed from `Astro` so they do not ride
> along into `main`.
>
> **The video file is deliberately not in that branch.** The source of truth is
> `~/Downloads/RRS Videos/Sales Video/Road Ready Safety - Why This Course (text course) v3.mp4`.
> A 14 MB MP4 was committed to `Astro` by accident (see the note at the end of this file);
> keeping it out of the archive avoids compounding that.
>
> **To revive it:** check out `sales-video-texas`, copy that MP4 to
> `public/assets/video/why-this-course.mp4`, and set `VITE_TEXAS_SALES_VIDEO=true` in
> `.env.qa`. Everything else is already wired.

---

**Asset:** `Road Ready Safety - Why This Course (text course) v3.mp4` — 61 s, 1920×1080,
H.264 + AAC, 14.1 MB, faststart, with captions burned into the picture.
**Component:** `src/components/SalesVideo.astro`
**Flag:** `VITE_TEXAS_SALES_VIDEO` (`'true'` shows it; absent or anything else hides it)

---

## 1. Where it sits, and why

Between the hero and the pricing section (`#pricing`).

The video's argument runs problem → agitate → "we built the opposite" → benefits →
certificate included → flat price → guarantee. That is precisely the "why you and not the
cheaper one" objection, and that objection lands *after* the headline promise and *before*
the buy box. So it goes between them.

Three placements were rejected:

| Rejected | Why |
|---|---|
| Inside the hero, replacing the phone mockup | The hero holds the LCP element and the primary CTA. On mobile the mockup is `hidden lg:flex`, so a video there would push the CTA below the fold. Highest risk to the thing we must not break. |
| Inside the pricing section | Competes with the buy button at the exact moment of decision. |
| In "What to Expect" | Where the YouTube course-tour card used to live. Two videos on one page split attention; the tour card has since been removed. |

A secondary benefit: the September diagnosis found a ~5,700 px CTA-free stretch on `/texas`.
This band puts a CTA in the middle of it.

## 2. Why it is self-hosted rather than on YouTube

This is the money page. A YouTube embed brings YouTube branding, a "Watch on YouTube"
affordance and end-screen suggestions to the one page whose only job is enrollment. The site
already serves static assets from S3/CloudFront, so a plain `<video>` costs nothing extra.

The course-tour video stays on YouTube where it still appears elsewhere — that one is a
discovery asset and benefits from YouTube's reach. Different job, different host.

## 3. Why it does not slow the page down

Measured on the local dev server:

| | |
|---|---|
| Bytes before anyone clicks play | **55 KB** (the poster) |
| Bytes for the video itself | 14.1 MB, downloaded **only on click** |
| Layout shift contributed | **0** — the box is `aspect-ratio: 16/9` with an explicit `width`/`height` |
| JS added | ~40 lines inline, no player library, no framework island |

`preload="none"` is doing the work. Confirmed in the network panel: loading `/texas` requests
the poster and **not** the MP4. The MP4 is faststart (moov atom first), so once
someone does click, playback starts from a range request rather than a full download.

**Follow-up worth doing before this gets heavy traffic:** re-encode with ffmpeg to a ~1.2 Mbps
1080p (~9 MB) and a ~700 kbps 720p (~5 MB) and offer both. `avconvert`, the only encoder on
this Mac, produced a *larger* file, so this needs a real ffmpeg pass. Not a launch blocker,
because click-to-play means nobody pays those bytes unless they asked for the video.

## 3a. Captions

The MP4 carries captions burned into the picture, so the component ships **no `<track>`
element**. An early build added the WebVTT file as a caption track and the browser rendered a
second set of subtitles on top of the baked-in ones. The VTT has been removed from
`public/assets/video/` for the same reason.

Consequence worth knowing: burned-in captions cannot be switched off by the viewer. If that
becomes a problem, the fix is a caption-free cut of the video plus the WebVTT track restored —
not both at once. The VTT text would also make a good on-page transcript for search and
screen readers if you ever want one.

## 4. Measurement

Events pushed to the GTM dataLayer (GTM-WR3LFPW5 → GA4 G-F8S6Y64XWJ):

| Event | Parameters |
|---|---|
| `video_start` | `video_id`, `video_duration` |
| `video_progress` | `video_id`, `video_percent` (25 / 50 / 75) |
| `video_complete` | `video_id`, `video_percent: 100` |
| `enroll_click` | `video_watched` (`yes`/`no`), `video_percent_watched`, `cta_location` |

`enroll_click` fires on **every** link to `/public/checkout` on the page, not just the one in
the video band, and carries whether that session watched. That is what makes watcher vs
non-watcher comparison possible.

**Still to do in GTM/GA4 (not code):** create the four triggers and tags, and register
`video_watched` and `video_percent_watched` as custom dimensions. Without the custom
dimensions the parameters are collected but not reportable.

⚠️ Purchases happen on `app.roadreadysafety.com`. Confirm GA4 cross-domain linking covers
both hosts, or `video_watched` will not survive to the purchase event. Note also that the
portal's CSP blocks all five GTM custom-HTML tags, so **GA4 is the only channel that records
purchases** — do not expect UET or TikTok to corroborate anything here.

## 5. Can we A/B test this? No — and here is the arithmetic

Texas runs roughly 76–100 paid orders a month across all entry points, with about 250
checkout loads a month. Assume `/texas` sees on the order of 2,000 sessions a month at a ~5%
purchase rate.

| Effect we want to detect | Sessions needed per arm | Calendar time |
|---|---|---|
| +50% relative (5% → 7.5%) | ~830 | ~1 month |
| +20% relative (5% → 6.0%) | ~4,700 | ~5 months |
| +10% relative (5% → 5.5%) | ~18,000 | ~1.5 years |

A sales video realistically moves conversion 5–15%. **That is unmeasurable at this traffic
volume in any useful timeframe.** Running a 50/50 split would mostly buy the false comfort of
a p-value while halving exposure to a change we believe in.

### What to do instead

Ship it to 100% behind the flag and judge it on evidence we *can* actually get.

**Well-powered within two weeks** (needs hundreds of sessions, not thousands):

- Play rate = `video_start` ÷ `/texas` sessions. Below ~4% means the poster or placement is wrong, not the video.
- Completion rate = `video_complete` ÷ `video_start`. Below ~40% on a 61-second video means the message loses people; check the 25/50/75 drop-off for where.
- Scroll-depth to `#pricing`, before vs after.

**Directional only, and say so out loud:** enroll-click rate among watchers vs non-watchers.
People who press play are already more interested, so this over-states the video's effect. It
is useful for spotting a disaster, not for proving a lift.

**Guardrails, with explicit rollback triggers:**

| Metric | Roll back if |
|---|---|
| Weekly paid TX orders (Monday scorecard) | Down >20% for two consecutive weeks with no other explanation |
| LCP on `/texas` | Regresses at all — it should not move, since the video is `preload="none"` |
| Bounce rate on `/texas` | Up >15% week over week |

If the video is still in place after four weeks with orders flat-to-up and engagement above
the floors, keep it. That is an honest "no evidence of harm, some evidence of engagement"
call, which is the strongest conclusion this traffic volume supports.

## 6. Rollback

Two paths, fastest first:

1. Set `VITE_TEXAS_SALES_VIDEO=false` (or delete the line) in `.env.qa` / `.env.production`
   and redeploy. One line. `.env.production` is CODEOWNERS-owned, so this needs Sam's review.
2. Revert the `<SalesVideo />` line in `src/pages/texas/index.astro`.

The flag defaults to hidden, so an environment that never sets it renders nothing at all.

## 7. Two copy points worth a decision

- The video says **"It is state-approved"** and **"the shortest course your state allows."**
  Both are generic on purpose — this cut is reusable on `/ohio`, `/idaho`, `/north-dakota`
  and `/missouri`. On `/texas` specifically it is weaker than "TDLR-approved CP#1234", which
  the hero already says. Fine as-is; worth a Texas-specific cut later if it earns its place.
- The video says **"if it is not for you, you get your money back."** The `/texas` hero badge
  and FAQ already say the same thing ("full refund before you complete the course"), so the
  video is consistent with the page. It is *not* consistent with `/texas/refund`, which
  carries the TDLR three-day cancellation, pro-rata schedule and $50 administrative cap. That
  inconsistency predates the video and is worth resolving on its own.

---

## 8. How this got committed by accident (2026-09-05)

Commit `1fbce29` — message *"Remove the course-tour video from /texas"* — was made by a
different session using `git add -A`. That swept in this feature while it was still
mid-edit: the component, the poster, the WebVTT file and a 14 MB MP4, plus the
`<SalesVideo />` render on `/texas`.

Nothing broke. The pushed commit builds cleanly (2,020 pages) and the section renders
nowhere, because `VITE_TEXAS_SALES_VIDEO` was never added to `.env.qa`, `.env.production` or
`.env.example`. But the snapshot it captured was stale: it had the duplicate-caption
`<track>`, the superseded headline, and the earlier poster crop.

**Two things left over:**

1. The 14 MB MP4 is in `Astro`'s history at `1fbce29` permanently. Deleting it going forward
   does not reclaim it — `.git` is ~188 MB. Reclaiming it means rewriting that commit and
   force-pushing a shared branch, which is a coordination decision, not a cleanup task.
2. While it was on the branch, the MP4 was copied into `dist/` on every build and uploaded
   to S3 on every deploy, despite nothing referencing it.

**If video assets come back:** decide whether `public/assets/video/*.mp4` should be
gitignored and uploaded to the bucket out of band. Each new cut committed to git adds
another permanent ~14 MB blob, so this compounds.
