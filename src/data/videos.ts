// Verified catalog of Road Ready Safety's YouTube videos.
//
// Every field here was read from YouTube itself (watch-page metadata + oEmbed)
// on 2026-09-04, so VideoObject schema never drifts from the real video again.
// Before this file existed, durations and upload dates were typed by hand on
// each page: all nine shorts were wrong (some by 40%), and one 3:57 video was
// declared as 2:00.
//
// `canonical` is the single page whose VideoObject schema Google should index
// for that video. Embedding the same video elsewhere is fine and useful for
// readers — those copies render the player but emit no schema, so one video
// never appears as twenty competing VideoObjects.

export interface VideoMeta {
  id: string;           // YouTube video ID
  title: string;        // exact YouTube title
  description: string;  // schema description
  seconds: number;      // verified length
  uploadDate: string;   // verified publish date (YYYY-MM-DD)
  canonical: string;    // path that owns this video's schema
}

export const VIDEOS: Record<string, VideoMeta> = {
  '9VvjiOhSRSA': {
    id: '9VvjiOhSRSA',
    title: 'How to Submit Your Texas Defensive Driving Certificate to the Court',
    description: 'Exactly how to submit or upload your defensive driving certificate of completion to the court — what to send, where to find your TDLR number, and how to confirm it was accepted.',
    seconds: 48, uploadDate: '2026-06-15', canonical: '/support/how-to-submit',
  },
  'uFsR2Rx47sU': {
    id: 'uFsR2Rx47sU',
    title: 'The Texas 12-Month Defensive Driving Rule, Explained (2026)',
    description: 'You can dismiss a ticket with defensive driving once every 12 months in Texas. How the rolling clock works and what to do if you already used it.',
    seconds: 36, uploadDate: '2026-06-17', canonical: '/texas/12-month-rule',
  },
  'GDdhttCVEkY': {
    id: 'GDdhttCVEkY',
    title: 'Dismiss Your Texas Speeding Ticket In 4 Steps!',
    description: 'The 4 steps to dismiss a Texas speeding ticket with a defensive driving course — request it in time, take the course, get your Type 3A record, and submit both to the court.',
    seconds: 57, uploadDate: '2026-06-15', canonical: '/texas/speeding-ticket',
  },
  'kKQrQe0GUCs': {
    id: 'kKQrQe0GUCs',
    title: 'How Much Is a Texas Speeding Ticket, Really? (2026)',
    description: 'A Texas speeding ticket is the fine plus court costs — and the hidden cost is the insurance increase a conviction brings for about three years.',
    seconds: 65, uploadDate: '2026-06-17', canonical: '/texas/how-much-is-a-speeding-ticket',
  },
  'jjZUVQVAXhE': {
    id: 'jjZUVQVAXhE',
    title: 'How to Choose a Texas Driver Safety Course Without Getting Overcharged',
    description: 'How to pick a TDLR-approved Texas driver safety course, verify the provider license number, and avoid paying more than the course is worth.',
    seconds: 127, uploadDate: '2026-03-29', canonical: '/texas/tdlr-approved',
  },
  'Y6sT-z7uFWQ': {
    id: 'Y6sT-z7uFWQ',
    title: 'What Texas Defensive Driving Course Actually Costs All In',
    description: 'The full cost of dismissing a Texas ticket with defensive driving: the court fee, the course, and the Type 3A driving record — and which of those are set by the court rather than the provider.',
    seconds: 176, uploadDate: '2026-05-15', canonical: '/texas/cost',
  },
  'NaURcc6kmu8': {
    id: 'NaURcc6kmu8',
    title: "A $200 Texas Speeding Ticket Can Cost You $1,000+ — Here's Why",
    description: 'A Texas moving-violation conviction stays on your record and rates your insurance for about three years, which is what makes a cheap ticket expensive.',
    seconds: 146, uploadDate: '2026-03-30', canonical: '/texas/ticket-insurance-impact',
  },
  'WVJ0ORmWv1Q': {
    id: 'WVJ0ORmWv1Q',
    title: 'Texas DSC Course: What to Know Before You Sign Up',
    description: 'What a Texas driver safety course actually looks like from the inside: the six hours, the required breaks, the quizzes, and how the certificate arrives.',
    seconds: 237, uploadDate: '2026-04-15', canonical: '/texas/what-the-course-looks-like',
  },
  'oAj_tRcdgq0': {
    id: 'oAj_tRcdgq0',
    title: 'How to Submit Your Texas Driver Safety Course Certificate',
    description: 'What to do with your Texas driver safety course certificate once you finish: which copy goes to the court, what goes to your insurer, and the deadline that matters.',
    seconds: 103, uploadDate: '2026-05-16', canonical: '/texas/defensive-driving-certificate',
  },
  'FYfE_HmhKac': {
    id: 'FYfE_HmhKac',
    title: 'How to Look Up Your Texas Traffic Ticket Online (2026)',
    description: 'How to find your Texas traffic ticket online when you have lost the paper citation — which court to search, and what to do when the ticket has not been filed yet.',
    seconds: 53, uploadDate: '2026-06-17', canonical: '/texas/look-up-your-ticket',
  },
  '0ctV91T4DKo': {
    id: '0ctV91T4DKo',
    title: 'Texas Driver Safety Course vs Deferred Disposition — Which One Should You Choose',
    description: 'Defensive driving dismissal and deferred disposition both keep a Texas ticket off your record — but they differ in cost, length, and risk. How to pick.',
    seconds: 146, uploadDate: '2026-03-29', canonical: '/texas/defensive-driving-vs-deferred-disposition',
  },
  'zmF7aTm1R5A': {
    id: 'zmF7aTm1R5A',
    title: 'Online vs. Classroom Defensive Driving in Texas (2026)',
    description: 'Texas approves both online and classroom driver safety courses, and courts accept either. What actually differs between them.',
    seconds: 38, uploadDate: '2026-06-17', canonical: '/texas/online-vs-classroom',
  },
  '60P2iJ_avLA': {
    id: '60P2iJ_avLA',
    title: 'CDL Holders & Defensive Driving in Texas: The Rules (2026)',
    description: 'Federal law bars masking a CDL holder’s conviction, so defensive driving cannot dismiss a ticket you got while holding a commercial license. What the rule actually says.',
    seconds: 55, uploadDate: '2026-06-17', canonical: '/texas/cdl-defensive-driving',
  },
  'py-eyHLLcXY': {
    id: 'py-eyHLLcXY',
    title: 'Texas School Zone Speeding Ticket: Can You Dismiss It? (2026)',
    description: 'School-zone speeding tickets in Texas are eligible for defensive driving dismissal, but the court fee is higher. What to expect.',
    seconds: 46, uploadDate: '2026-06-17', canonical: '/texas/school-zone-ticket',
  },
  'ltb0_xv0FPE': {
    id: 'ltb0_xv0FPE',
    title: 'Texas Type 3A Driving Record: What It Is & How to Get One (2026)',
    description: 'The Type 3A driving record is the second document Texas courts require with your defensive driving certificate. Where to order it and what it costs.',
    seconds: 43, uploadDate: '2026-06-17', canonical: '/texas/type-3a-driving-record',
  },
  'pQC3u8qUx_M': {
    id: 'pQC3u8qUx_M',
    title: "What Happens If You Don't Pay a Texas Traffic Ticket",
    description: 'Ignoring a Texas traffic ticket leads to a failure-to-appear charge, a warrant, and an OmniBase hold that blocks your registration renewal. The sequence, and how to stop it.',
    seconds: 114, uploadDate: '2026-03-29', canonical: '/texas/ticket-warrant',
  },
  'cekLW9oUtw4': {
    id: 'cekLW9oUtw4',
    title: 'Texas Defensive Driving Courses Are Legally $25 — So Why Did You Pay $64?',
    description: 'Texas law sets a $25 floor on driver safety course pricing and no ceiling. Where the rest of a $64 price goes.',
    seconds: 215, uploadDate: '2026-05-15', canonical: '/texas/transparency',
  },
  '93jfA8YAEOU': {
    id: '93jfA8YAEOU',
    title: 'Texas Defensive Driving Course: Stop Paying Hidden Fees (What to Know)',
    description: 'The add-on fees Texas driver safety providers charge at checkout — certificate delivery, processing, court copies — and which of them are genuinely optional.',
    seconds: 408, uploadDate: '2026-03-07', canonical: '/texas/providers',
  },
  'LfEKvzl7_W8': {
    id: 'LfEKvzl7_W8',
    title: 'The Texas Ticket Secret No One Tells You About',
    description: 'Every legal way to keep a Texas traffic ticket off your record — defensive driving dismissal, deferred disposition, compliance dismissals, and trial — compared honestly.',
    seconds: 325, uploadDate: '2026-06-05', canonical: '/texas/ways-to-dismiss-ticket',
  },
  'DqvegnSkl2E': {
    id: 'DqvegnSkl2E',
    title: "Speeding 25+ Over in Texas? Why Defensive Driving Won't Help (2026)",
    description: 'Texas excludes speeding 25 mph or more over the limit from defensive driving dismissal by statute. What is left when the course is off the table.',
    seconds: 57, uploadDate: '2026-06-17', canonical: '/texas/speeding-25-over',
  },
  'lKhv6FiHoIk': {
    id: 'lKhv6FiHoIk',
    title: 'How to Request Permission for a Texas Driver Safety Course (Step-by-Step Guide)',
    description: 'Step by step: how to ask a Texas court for permission to take a driving safety course, what to send with the request, and what the court sends back.',
    seconds: 244, uploadDate: '2025-10-24', canonical: '/texas/request-defensive-driving',
  },
};

/** "3:57" / "1:02:03" for display. */
export function clockDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return h ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

/** ISO 8601 duration for schema.org, e.g. "PT3M57S". */
export function isoDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `PT${h ? h + 'H' : ''}${m ? m + 'M' : ''}${s ? s + 'S' : ''}`;
}

/** True when this path is the video's schema home (trailing slash tolerant). */
export function isCanonicalFor(id: string, pathname: string): boolean {
  const v = VIDEOS[id];
  if (!v) return false;
  const norm = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p);
  return norm(pathname) === norm(v.canonical);
}
