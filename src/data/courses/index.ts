/**
 * Registry of per-state course sites. Add a state by dropping its JSON here and importing it.
 * Pages under src/pages/[state]/ are generated only for courses that pass isEnabled(), so a
 * state that is off (or unapproved in production) emits nothing at all.
 */
import type { CourseData } from './types';
import { isEnabled, isInSitemap } from '../../lib/courseFlags';
import ohBdi from './oh-bdi.json';

export const allCourses: CourseData[] = [ohBdi as CourseData];

export const enabledCourses: CourseData[] = allCourses.filter((c) => isEnabled(c));

export const sitemapCourses: CourseData[] = allCourses.filter((c) => isInSitemap(c));

/** Route param ("ohio") for a course. */
export function stateParam(course: CourseData): string {
  return course.state.route.replace(/^\//, '');
}

export function courseByParam(param: string): CourseData | undefined {
  return enabledCourses.find((c) => stateParam(c) === param);
}

/** Static sub-routes every state site has, relative to the state route. */
export const STATE_SUBROUTES = ['', '/pricing', '/how-it-works', '/faq', '/helpcenter', '/terms', '/refund', '/accessibility', '/blog'];
