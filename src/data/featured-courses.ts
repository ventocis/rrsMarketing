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
}

export const FEATURED_COURSES: FeaturedCourse[] = [
  {
    id: 'tx-bdi',
    badge: 'Most popular',
    credential: 'TDLR-approved · CP#1234',
    name: 'Texas Defensive Driving Course',
    facts: '6 hours online · $28 all-in · certificate included',
    price: '28',
    enrollFallback: '/courses/tx-defensive',
    learnMoreHref: '/texas',
  },
];
