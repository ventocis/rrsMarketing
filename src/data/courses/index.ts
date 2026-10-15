/**
 * Registry of per-state course sites. Add a state by dropping its JSON here and importing it.
 * Pages under src/pages/[state]/ are generated only for courses that pass isEnabled(), so a
 * state that is off (or unapproved in production) emits nothing at all.
 */
import type { CourseData } from './types';
import { isEnabled, isInSitemap } from '../../lib/courseFlags';
import ohBdi from './oh-bdi.json';
import ndDdc from './nd-ddc.json';
import idDdc from './id-ddc.json';
import moDip from './mo-dip.json';
import ndIpr from './nd-ipr.json';

export const allCourses: CourseData[] = [ohBdi as CourseData, ndDdc as CourseData, idDdc as CourseData, moDip as CourseData, ndIpr as CourseData];

export const enabledCourses: CourseData[] = allCourses.filter((c) => isEnabled(c));

export const sitemapCourses: CourseData[] = allCourses.filter((c) => isInSitemap(c));

/** Route param ("ohio") for a course. */
export function stateParam(course: CourseData): string {
  return course.state.route.replace(/^\//, '');
}

/**
 * Courses whose route is one segment (/ohio, /north-dakota, ...), i.e. the ones the shared
 * `src/pages/[state]/*` templates can generate. A course nested under another route
 * (nd-ipr at /north-dakota/insurance-premium-reduction) has its own page files; a slash is not
 * allowed in a non-rest route param, so it must stay out of these getStaticPaths lists.
 */
export const stateRouteCourses: CourseData[] = enabledCourses.filter((c) => !stateParam(c).includes('/'));

export function courseByParam(param: string): CourseData | undefined {
  return enabledCourses.find((c) => stateParam(c) === param);
}

/** The guides index for a course: its own `${route}/blog`, or the library it shares (course.guidesRoute). */
export function guidesRouteFor(course: CourseData): string {
  return course.guidesRoute ?? `${course.state.route}/blog`;
}

/** Static sub-routes every state site has, relative to the state route. */
export const STATE_SUBROUTES = ['', '/pricing', '/how-it-works', '/faq', '/helpcenter', '/refund', '/accessibility', '/blog'];
