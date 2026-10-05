/**
 * North Dakota guide topics. Drives the grouped guides index (/north-dakota/blog), the
 * "part of" link at the top of each guide (up to its hub) and the hubs' link lists.
 * Every slug in nd.json must appear exactly once; the build fails otherwise.
 */
import { postsFor } from './index';

export interface NdTopic {
  id: string;
  /** Heading on the guides index. */
  label: string;
  /** Where the guide's "part of" link points, and the anchor text used for it. */
  hub: { href: string; anchor: string };
  slugs: string[];
}

export const ndTopics: NdTopic[] = [
  {
    id: 'speeding',
    label: 'Speeding tickets',
    hub: { href: '/north-dakota/speeding-ticket', anchor: 'North Dakota speeding tickets' },
    slugs: ['north-dakota-speeding-ticket-cost', 'north-dakota-speeding-ticket-points', 'north-dakota-speed-limits', 'north-dakota-school-zone-work-zone-speeding'],
  },
  {
    id: 'tickets',
    label: 'Paying, contesting or electing a course',
    hub: { href: '/north-dakota/traffic-ticket', anchor: 'handling a North Dakota traffic ticket' },
    slugs: ['should-i-pay-my-north-dakota-ticket', 'how-to-pay-north-dakota-traffic-ticket-online', 'north-dakota-traffic-ticket-hearing', 'in-lieu-of-points-north-dakota-court-election', 'north-dakota-in-lieu-of-points-30-day-deadline', 'which-tickets-qualify-in-lieu-of-points-north-dakota', 'out-of-state-ticket-north-dakota-points'],
  },
  {
    id: 'cities',
    label: 'City and county courts',
    hub: { href: '/north-dakota/traffic-ticket', anchor: 'North Dakota traffic tickets, court by court' },
    slugs: ['fargo-traffic-ticket', 'bismarck-traffic-ticket', 'grand-forks-traffic-ticket', 'minot-traffic-ticket', 'west-fargo-traffic-ticket', 'mandan-traffic-ticket', 'williston-traffic-ticket'],
  },
  {
    id: 'violations',
    label: 'Violations: fines and points',
    hub: { href: '/north-dakota/blog/north-dakota-points-by-violation', anchor: 'North Dakota traffic violations, fines and points' },
    slugs: ['north-dakota-points-by-violation', 'north-dakota-careless-driving-ticket', 'north-dakota-reckless-driving-points', 'north-dakota-stop-sign-red-light-ticket', 'north-dakota-school-bus-ticket', 'north-dakota-texting-while-driving-ticket', 'north-dakota-seat-belt-ticket', 'north-dakota-no-insurance-ticket-points', 'north-dakota-move-over-law-ticket', 'north-dakota-exhibition-driving-racing-ticket', 'north-dakota-tickets-with-no-points'],
  },
  {
    id: 'record',
    label: 'Points and your driving record',
    hub: { href: '/north-dakota/blog/check-points-north-dakota-driving-record', anchor: 'your North Dakota driving record' },
    slugs: ['check-points-north-dakota-driving-record', 'how-long-points-stay-on-north-dakota-license', 'north-dakota-points-suspension-three-point-reduction', 'north-dakota-point-reduction-vs-in-lieu-of-points'],
  },
  {
    id: 'license',
    label: 'Suspension and reinstatement',
    hub: { href: '/north-dakota/blog/north-dakota-license-reinstatement', anchor: 'North Dakota license reinstatement' },
    slugs: ['north-dakota-license-reinstatement', 'north-dakota-license-suspended-for-points', 'north-dakota-under-18-points-license-cancellation', 'north-dakota-temporary-restricted-license'],
  },
  {
    id: 'course',
    label: 'The defensive driving course',
    hub: { href: '/north-dakota', anchor: 'the North Dakota defensive driving course' },
    slugs: ['north-dakota-defensive-driving-course-points', 'online-traffic-school-north-dakota', 'north-dakota-defensive-driving-course-what-to-expect', 'how-often-can-you-take-defensive-driving-north-dakota', 'send-defensive-driving-certificate-to-nddot', 'does-defensive-driving-lower-insurance-north-dakota'],
  },
];

export function topicFor(slug: string): NdTopic | undefined {
  return ndTopics.find((t) => t.slugs.includes(slug));
}

/** Build-time guard: every ND post sits in exactly one topic, and no topic names a missing post. */
export function checkNdTopics(): void {
  const posts = postsFor('ND').map((p) => p.slug);
  const listed = ndTopics.flatMap((t) => t.slugs);
  const missing = posts.filter((s) => !listed.includes(s));
  const unknown = listed.filter((s) => !posts.includes(s));
  const dupes = listed.filter((s, i) => listed.indexOf(s) !== i);
  if (missing.length || unknown.length || dupes.length) {
    throw new Error(`nd-topics: missing ${missing.join(', ')} | unknown ${unknown.join(', ')} | duplicated ${dupes.join(', ')}`);
  }
}
