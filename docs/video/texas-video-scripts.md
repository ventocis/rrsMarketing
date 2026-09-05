# Texas video scripts — batch 3

Three assets, in the order they pay off. Every claim below is already sourced on the
page the video will sit on; nothing here is new legal ground.

House rules that apply to all of them: **no competitor names, no competitor prices.**
Say "some providers" and "other courses." The $28 price is all-in — do not say
"plus fees," because there aren't any.

Shoot notes: vertical 9:16 for the shorts (they double as YouTube Shorts, Reels and
TikTok); horizontal 16:9 for the screen tour. Burned-in captions on everything —
most of this audience is watching muted, standing in a parking lot holding a ticket.

---

## 1. Course screen tour — the highest-value asset

**Why first.** The single largest measured drop-off is people who reach checkout and
never finish. They cannot see what they are buying. A tour that shows the actual
screens answers "is this a real course or a scam" better than any paragraph can.

**Length:** 90–120 seconds. **Format:** 16:9 screen capture, voiceover.
**Placement:** `/texas/what-the-course-looks-like` (replaces nothing — sits above the
existing video), `/texas`, `/texas/fastest-defensive-driving-course`, `/texas/pricing`.

**Script**

> You're about to pay for a six-hour course you've never seen. Here's all of it, in
> ninety seconds.
>
> *(sign-up screen)* You start here. Name, email, the county your ticket is in.
> That's it — no card yet.
>
> *(course home)* This is the course. Six modules. Texas sets the six hours and the
> content; every approved provider teaches the same material. What changes between
> providers is the price and how much the screen fights you.
>
> *(a lesson)* A lesson looks like this. Read it, or hit play and listen. You can
> leave any time — it picks up exactly where you stopped, on any device. People
> finish this on a phone, in pieces, over three or four evenings.
>
> *(timer)* This clock is the state's, not ours. Texas requires the time, and it
> requires breaks — the course will make you take them. Nobody can sell you a
> legitimate two-hour version of this.
>
> *(quiz)* Short quiz at the end of each module. You can retake them. Nobody fails
> this course by accident.
>
> *(final screen, certificate)* When the last module closes, your certificate is
> right here — the court copy and the insurance copy, both, immediately. Not mailed.
> Not an upsell. Included.
>
> *(price)* Twenty-eight dollars, all of it. Road Ready Safety, TDLR provider
> CP1234.

**On-screen text beats:** "No card to start" · "6 hours — set by the State of Texas"
· "Works on your phone" · "Certificate included, instantly" · "$28. That's the whole
price."

---

## 2. County shorts — 30 to 40 seconds each

**Why.** 1,742 court pages now rank and get impressions; almost none hold attention.
One short per major county, embedded on every court page in that county, turns a
directory listing into an answer. Start with the ten counties carrying the most
court-page impressions, then extend.

**Format:** 9:16, 30–40s, talking head or simple motion text. **One template, ten
fills.** Read the county's real numbers off its court pages before recording — the
fee and the request method genuinely differ, and getting them wrong is worse than
having no video.

**Template**

> Got a ticket in **[COUNTY]** County?
>
> Your court is **[COURT NAME]**. Not the county courthouse — *that* one. Ticket says
> which.
>
> Three things, in this order.
>
> One: ask them for defensive driving **before the date on your ticket.** [COUNTY]
> takes it **[in person / by mail / online]**, and the fee is **[$X]**.
>
> Two: wait for the court to say yes. Taking the course first is the mistake that
> gets certificates rejected.
>
> Three: finish the course and send the certificate plus your Type 3A record back
> inside ninety days.
>
> Ticket dismissed. Nothing on your record, nothing for insurance to find.
>
> Full [COUNTY] court details — phone, address, forms — link below.

**First ten counties:** Harris, Dallas, Tarrant, Bexar, Travis, Collin, Denton,
Fort Bend, Williamson, Montgomery. Then the East Texas group that over-indexes
against thin competition: Smith, McLennan, Potter, Lubbock, Wichita.

---

## 3. "Don't pay it online" — 45 to 60 seconds

**Why.** The most expensive mistake this audience makes, and the one nobody warns
them about, because the court's own website makes paying the easiest button on the
page. This is also the most shareable thing on the list.

**Format:** 9:16, 45–60s. **Placement:** `/texas/already-paid-ticket`,
`/texas/ticket-dismissal`, `/texas/fight-or-dismiss`, `/texas`, and the court pages.

**Script**

> The court's website has a big button that says Pay Ticket. Do not press it.
>
> In Texas, paying a traffic ticket is not paying a bill. It's a guilty plea. The
> moment it clears, you're convicted — and the conviction goes on your driving
> record, where your insurance company finds it at renewal.
>
> That's the part that costs money. The fine was two hundred dollars. Three years of
> a rated premium is usually more, sometimes several times more.
>
> Here's what to press instead. Before the date on your ticket, ask the court for
> defensive driving. Most Texas courts have a form. Many now take it by email or
> through their own portal. You plead no contest, you pay the court's fee, you take
> a six-hour course, you send back the certificate.
>
> The charge is dismissed. Nothing on your record. Nothing for the insurance company
> to rate.
>
> Same money, roughly. Completely different outcome.
>
> If you already paid — there's a narrow window, and it's on our site.

**On-screen text beats:** "Paying = pleading guilty" · "Conviction → your record →
your premium" · "Ask for defensive driving instead" · "Before the date on the ticket"

---

## After recording

1. Add each video to `src/data/videos.ts` with its **real** length and upload date —
   pull them from the watch page, don't type them from memory. Every duration in the
   catalogue was wrong before this batch, some by 40%.
2. Set `canonical` to the one page that should own the video's schema.
3. Embed anywhere else with `<YouTubeCard id="..." blurb="..." />` — schema is
   suppressed automatically off the canonical page.
