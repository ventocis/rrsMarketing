import { TEXAS_COURSE, TEXAS_PRICE_LABEL } from './texas-course';

// Courses promoted on the root homepage, above the state finder.
//
// One entry today because Texas is the only course on sale. When another state
// goes live, add it here and the homepage card becomes a row of cards — no
// markup changes. Only list courses a visitor can actually buy right now.
export interface FeaturedCourse {
  id: string;
  badge: string;          // small pill above the name
  credential: string;     // regulator line, shown next to the badge
  name: string;
  facts: string;          // one line: length · price · what's included
  price: string;          // shown on the primary button
  /** Used only if the checkout URL env var is unset. The env-driven URL is mapped
   *  by course id in FeaturedCourses.astro (Vite needs the literal var name there). */
  enrollFallback: string;
  learnMoreHref: string;
  /** Short line above the buttons on desktop, e.g. "Texas defensive driving · $28 all-in". */
  offerLine: string;
  /** Two or three short reassurance lines shown as a checklist under the headline. */
  heroPoints: string[];
  /** Trust proof shown beside the offer (desktop) or under it (mobile). */
  proof: {
    /** Must be a verbatim, contiguous excerpt of that reviewer's stored quote in
     *  texas-reviews.json — HomeHeroFeatured.astro fails the build if it is not. */
    reviewExcerpt: string;
    reviewerName: string;
    checks: string[];
  };
}

export const FEATURED_COURSES: FeaturedCourse[] = [
  {
    id: 'tx-bdi',
    badge: 'Most popular',
    credential: `TDLR-approved · CP#${TEXAS_COURSE.providerNumber.slice(2)}`,
    name: 'Texas Defensive Driving Course',
    facts: `${TEXAS_COURSE.hours} hours online · ${TEXAS_PRICE_LABEL} all-in · certificate included`,
    price: String(TEXAS_COURSE.price),
    enrollFallback: '/courses/tx-defensive',
    learnMoreHref: '/texas',
    offerLine: `${TEXAS_PRICE_LABEL} all-in · certificate included`,
    heroPoints: [
      'State-approved. Works on your phone.',
      'Get your certificate the moment you finish.',
    ],
    proof: {
      reviewExcerpt: 'Simple. No hidden fees. Seamless experience.',
      reviewerName: 'Ryan Johnson',
      checks: [
        `TDLR-approved · CP#${TEXAS_COURSE.providerNumber.slice(2)}`,
        'Accepted by Texas courts for ticket dismissal',
        'Certificate the moment you finish, no extra fee',
      ],
    },
  },
];
