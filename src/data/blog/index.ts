/**
 * State-scoped blog posts. One JSON file per state code; posts render inside that state's
 * CourseLayout so a reader never leaves the funnel. Same shape as the global blog.json plus
 * `updated`, `faq` and `sources` for answer-engine friendliness.
 */
import oh from './oh.json';
import nd from './nd.json';
import id from './id.json';
import mo from './mo.json';

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
}

const byState: Record<string, StatePost[]> = {
  OH: (oh as { posts: StatePost[] }).posts,
  ND: (nd as { posts: StatePost[] }).posts,
  ID: (id as { posts: StatePost[] }).posts,
  MO: (mo as { posts: StatePost[] }).posts,
};

export function postsFor(stateCode: string): StatePost[] {
  return (byState[stateCode.toUpperCase()] ?? []).slice().sort((a, b) => (a.date < b.date ? 1 : -1));
}
