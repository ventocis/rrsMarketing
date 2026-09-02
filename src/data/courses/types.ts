/**
 * Shape of a per-state course data file (src/data/courses/<key>.json).
 *
 * One file is the single source of truth for a state's marketing site: every number on every
 * page traces back to the portal uploader sheet for that course. Copy lives here too, so the
 * four state sites stay uniform and a change to one section is a data edit, not a template edit.
 */

export interface CourseModule {
  n: number;
  title: string;
  blurb: string;
  /** Marks the final exam entry so the curriculum grid can style it. */
  isFinal?: boolean;
}

export interface Badge {
  icon: string;
  title: string;
  body: string;
}

export interface Audience {
  label: string;
  status: string;
  tone: 'primary' | 'info' | 'muted';
  heading: string;
  /** Three short facts, ten words or fewer each. */
  bullets?: string[];
  body?: string;
  cta?: boolean;
}

export interface Step {
  n: number;
  title: string;
  body: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface CompareRow {
  name: string;
  price: string;
  fees: string;
  certificate: string;
  note?: string;
  us?: boolean;
}

export interface Benefit {
  headline: string;
  body: string;
  cite?: string;
}

export interface NavItem {
  href: string;
  label: string;
}

export interface HelpItem {
  q: string;
  steps: string[];
  note?: string;
}

export interface CourseData {
  _note?: string;
  state: {
    code: string;
    name: string;
    route: string;
    agency: string;
    agencyShort: string;
    agencyUrl: string;
    timezone: string;
  };
  provider: {
    legalName: string;
    dba: string;
    /** Empty until the state approves. Gates production, noindex and sitemap. */
    approvalNumber: string;
    approvalLabel: string;
    approvalPendingLabel: string;
    supportEmail: string;
    supportPhone: string;
    supportPhoneHref: string;
    supportHours: string;
  };
  course: {
    key: string;
    sku: string;
    name: string;
    shortName: string;
    hours: number;
    priceUsd: string;
    /** Days to finish once started, or null when the state sets no window. */
    completionDays: number | null;
    completionNote: string;
    modules: CourseModule[];
    knowledgeChecks: { count: number; passNote: string } | null;
  };
  exam: {
    questions: number;
    passPercent: number;
    passCount: number;
    /** null = unlimited */
    attempts: number | null;
    cooldownHours: number | null;
    showAnswers: boolean;
    failNote: string;
  };
  identityChecks: string | null;
  seo: {
    title: string;
    description: string;
    keywords: string;
    credential: string;
    courseDescription: string;
  };
  banner: string;
  nav: NavItem[];
  hero: {
    eyebrow: string;
    headline: string;
    subhead: string;
    ctaLabel: string;
    secondaryCta: { label: string; href: string };
    microcopy: string;
    mockProgressLabel: string;
    mockContinueLabel: string;
    mockCalloutTitle: string;
    mockCalloutBody: string;
  };
  badges: Badge[];
  trustBand: string[];
  pricing: {
    heading: string;
    included: string[];
    notCharged: string[];
    lineItems: { label: string; value: string; good: boolean }[];
    totalLabel: string;
    refundNote: string;
  };
  audiences: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: Audience[];
  };
  curriculum: { heading: string; intro: string; highlights: { v: string; l: string }[] };
  steps: {
    heading: string;
    intro: string;
    withUsCount: number;
    withUsLabel: string;
    afterLabel: string;
    items: Step[];
  };
  deadline: { eyebrow: string; heading: string; body: string; cite: string } | null;
  compare: {
    heading: string;
    intro: string;
    rows: CompareRow[];
    footnote: string;
    verifiedDate: string;
  } | null;
  benefits: Benefit[];
  faqs: Faq[];
  finalCta: { heading: string; body: string; bullets: string[] };
  reviewsHeading: string;
  help: HelpItem[];
  footer: { blurb: string; disclaimer: string };
  claims: { banned: string[] };
  blog: { title: string; intro: string };
}
