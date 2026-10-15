/**
 * State-scoped blog posts. One JSON file per state code; posts render inside that state's
 * CourseLayout so a reader never leaves the funnel. Same shape as the global blog.json plus
 * `updated`, `faq` and `sources` for answer-engine friendliness.
 */
import oh from './oh.json';
import nd from './nd.json';
import id from './id.json';
import mo from './mo.json';
import { fillPricesDeep } from '../prices';

export interface StatePost {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  description: string;
  tags?: string[];
  faq?: { q: string; a: string }[];
  sources?: { name: string; url: string }[];
  content: string;
  /** Short <title> for search results, when the headline is too long. Used by the Missouri guides. */
  seoTitle?: string;
  /** The answer in two or three sentences, shown in a box above the article. */
  answer?: string;
  keyFacts?: { label: string; value: string }[];
  /** Slugs of the guides to link at the end. */
  related?: string[];
  /** Slug of the hub this guide belongs to (North Dakota): rendered as a breadcrumb and an 'up' link. */
  hub?: string;
  /** 'hub' pages list every guide that names them as hub. */
  kind?: 'hub';
  /** Who checked the facts on `updated`. */
  reviewedBy?: string;
}

// Course prices appear in the JSON as {{ND_PRICE}}, {{MO_PRICE}}, {{ID_PRICE}}, {{OH_PRICE}} (src/data/prices.ts), filled once here.
const posts = (m: unknown) => fillPricesDeep((m as { posts: StatePost[] }).posts);
const byState: Record<string, StatePost[]> = {
  OH: posts(oh),
  ND: posts(nd),
  ID: posts(id),
  MO: posts(mo),
};

export function postsFor(stateCode: string): StatePost[] {
  // Newest first; posts with the same date keep their order in the file, so a state's main guide can lead.
  return (byState[stateCode.toUpperCase()] ?? []).slice().sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}
