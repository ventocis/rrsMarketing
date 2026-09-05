// What Texas auto insurers actually publish about defensive-driving discounts.
//
// Every `published` quote below was read from the insurer's own website on the
// date in `verified`. Nothing here is inferred, and nothing comes from a
// third-party "discounts by insurer" listicle — those are where the internet's
// bad numbers come from. Where an insurer does not publish a figure, this file
// says so; it does not fill the gap with a guess.
//
// Road Ready Safety is not affiliated with, endorsed by, or acting for any
// insurer named here. Discount availability, amount and terms are set solely by
// the insurer and can change without notice.

export interface Insurer {
  slug: string;
  name: string;
  /** Exact wording from the insurer's own page. */
  published: string;
  sourceUrl: string;
  sourceLabel: string;
  verified: string;              // YYYY-MM-DD the quote was read
  /** Published age condition, or null when the insurer publishes none. */
  ageGate: string | null;
  /** Does the insurer say a court-ordered course counts? */
  courtOrdered: 'excluded' | 'not stated';
  /** Published discount size, or null. */
  amount: string | null;
  /** How the insurer says to get the certificate to them. */
  submit: string;
  /** The one thing this insurer's customers most need to know. */
  headline: string;
}

export const INSURERS: Insurer[] = [
  {
    slug: 'geico',
    name: 'GEICO',
    published: 'To qualify for the discount, you must be at least 50 years of age and have completed the course on a voluntary basis (not as a result of an order of a court or other governmental entity).',
    sourceUrl: 'https://www.geico.com/save/discounts/defensive-driver-discounts/',
    sourceLabel: 'GEICO — Defensive Driver Discounts',
    verified: '2026-09-04',
    ageGate: 'At least 50 years old',
    courtOrdered: 'excluded',
    amount: 'Up to 10% on applicable coverages',
    submit: 'Log in to your policy on geico.com and upload the completion certificate; some course providers report completions to GEICO directly.',
    headline: 'GEICO publishes the strictest conditions of any major Texas insurer — and the one most likely to catch out a driver with a ticket.',
  },
  {
    slug: 'state-farm',
    name: 'State Farm',
    published: 'Depending on where you live, taking a driver safety course may help you get car insurance discounts.',
    sourceUrl: 'https://www.statefarm.com/insurance/auto/discounts',
    sourceLabel: 'State Farm — Auto insurance discounts',
    verified: '2026-09-04',
    ageGate: null,
    courtOrdered: 'not stated',
    amount: null,
    submit: 'Through your local State Farm agent, who confirms which courses qualify and adds the discount to the policy.',
    headline: 'State Farm publishes no age limit and no percentage — the terms live with your agent, which makes the phone call worth more here than anywhere else.',
  },
  {
    slug: 'progressive',
    name: 'Progressive',
    published: 'Completing a defensive driving course can help you save on auto insurance if your insurer offers a defensive driver discount. The actual amount of the discount will vary based on your insurer, age, state, and other factors.',
    sourceUrl: 'https://www.progressive.com/answers/defensive-driving-insurance-discount/',
    sourceLabel: 'Progressive — How to get a defensive driving discount',
    verified: '2026-09-04',
    ageGate: null,
    courtOrdered: 'not stated',
    amount: null,
    submit: 'Ask your Progressive agent or contact Progressive directly before enrolling, so you know whether a discount exists on your policy.',
    headline: 'Progressive’s own discounts page does not list a defensive-driving course discount, and its explainer is written conditionally — ask before you assume.',
  },
  {
    slug: 'allstate',
    name: 'Allstate',
    published: 'Allstate offers discounts for drivers who successfully complete a safe driving course at an accredited institution.',
    sourceUrl: 'https://www.allstate.com/auto-insurance/safe-driver-savings',
    sourceLabel: 'Allstate — Safe driver savings',
    verified: '2026-09-04',
    ageGate: null,
    courtOrdered: 'not stated',
    amount: null,
    submit: 'Through your Allstate agent, who confirms the course qualifies and applies the discount.',
    headline: 'Allstate publishes the discount but not its size or conditions, and frames it around teen and senior drivers — so confirm it applies to you specifically.',
  },
  {
    slug: 'farmers',
    name: 'Farmers',
    published: 'For drivers over age 55 who have completed state-approved safe driver training in the last three years.',
    sourceUrl: 'https://www.farmers.com/auto/discounts/',
    sourceLabel: 'Farmers — Car insurance discounts',
    verified: '2026-09-04',
    ageGate: 'Over 55',
    courtOrdered: 'not stated',
    amount: null,
    submit: 'Through your Farmers agent, with the certificate dated inside the last three years.',
    headline: 'Farmers states the age condition plainly: over 55, with training completed in the last three years.',
  },
  {
    slug: 'nationwide',
    name: 'Nationwide',
    published: 'Complete a state-approved safety course and get a discount. (You may have to be 55 or over to be eligible.)',
    sourceUrl: 'https://www.nationwide.com/personal/insurance/auto/discounts/',
    sourceLabel: 'Nationwide — Car insurance discounts',
    verified: '2026-09-04',
    ageGate: 'May require 55 or over',
    courtOrdered: 'not stated',
    amount: null,
    submit: 'Through your Nationwide agent or by contacting Nationwide with the completion certificate.',
    headline: 'Nationwide flags the age condition in its own parenthesis — which means it applies in at least some states, so confirm Texas.',
  },
  {
    slug: 'liberty-mutual',
    name: 'Liberty Mutual',
    published: 'Accident prevention course discounts are available where state laws and regulations allow, and may vary by state and how you purchase.',
    sourceUrl: 'https://www.libertymutual.com/vehicle/auto-insurance/discounts',
    sourceLabel: 'Liberty Mutual — Auto insurance discounts',
    verified: '2026-09-04',
    ageGate: null,
    courtOrdered: 'not stated',
    amount: null,
    submit: 'Contact Liberty Mutual or your agent with the certificate; the discount is applied to specific coverages rather than the whole premium.',
    headline: 'Liberty Mutual makes availability explicitly conditional on state law and on how you bought the policy — two things worth confirming before you enroll.',
  },
  {
    slug: 'usaa',
    name: 'USAA',
    published: 'You may qualify for a discount if you complete an approved defensive driving course.',
    sourceUrl: 'https://www.usaa.com/insurance/vehicles/auto/discounts/',
    sourceLabel: 'USAA — Auto insurance discounts',
    verified: '2026-09-04',
    ageGate: null,
    courtOrdered: 'not stated',
    amount: null,
    submit: 'Contact USAA after you finish — this discount is added to the policy manually rather than automatically.',
    headline: 'USAA does not apply this one automatically. If you finish the course and never call, nothing happens.',
  },
];

export const insurerBySlug = (slug: string) => INSURERS.find(i => i.slug === slug);

/** Insurers that publish an age condition — the finding that matters most. */
export const AGE_GATED = INSURERS.filter(i => i.ageGate);
