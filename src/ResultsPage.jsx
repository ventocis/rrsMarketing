import React, { useMemo } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import courses from './data/courses.json';
import finderMap from '../blueprint/data/finder-map.json';
import { usd, hours, truncate } from './lib/format.js';
import resultsCopy from '../blueprint/copy/results.json';
import Card from './components/Card.jsx';
import CourseResultCard from './components/CourseResultCard.jsx';
import Breadcrumbs from './components/Breadcrumbs.jsx';
import EmptyState from './components/EmptyState.jsx';
import { stateNames } from './utils/states.js';

export default function ResultsPage() {
  const { state, courseType } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const lang = searchParams.get('lang') || 'any';
  const sort = searchParams.get('sort') || 'recommended';
  const reason = searchParams.get('reason');

  // Determine which course types to show
  const courseTypesToShow = useMemo(() => {
    if (courseType === 'multi' && reason) {
      // Use the reason to get the correct course types
      return finderMap[reason] || [];
    } else if (courseType === 'multi') {
      // Fallback: show all course types that exist for this state
      const stateCourses = courses.filter(c => c.state === state);
      return Array.from(new Set(stateCourses.map(c => c.course_type)));
    } else {
      return [courseType];
    }
  }, [state, courseType, reason]);

  // Filter courses by state, courseType, and language
  const filtered = useMemo(() =>
    courses.filter(c =>
      c.state === state &&
      courseTypesToShow.includes(c.course_type) &&
      (lang === 'any' || c.language === lang)
    ),
    [state, courseTypesToShow, lang]
  );

  // Unique languages for filter
  const languageOptions = Array.from(new Set(filtered.map(c => c.language)));

  // Hero title
  const stateFull = stateNames[state] || state;
  const heroTitle = `${stateFull} – ${courseType === 'multi' ? 'Courses' : courseType}`;
  const heroSub = resultsCopy.hero.sub;
  const courseTypeLabel = courseType === 'multi' ? 'Courses' : courseType;

  // Empty state copy
  const emptyCopy = resultsCopy.empty || {};
  const emptyTitle = emptyCopy.title || 'No courses found';
  const emptyBody = emptyCopy.body || 'Try a different state or reason. Some options may be unavailable in this state or language.';
  const emptyPrimaryCta = emptyCopy.primaryCta || 'Find another course';
  const emptySecondaryCta = emptyCopy.secondaryCta || 'Back to home';

  // Handle filter changes
  function handleFilterChange({ state: newState, language: newLang, sort: newSort }) {
    const nextState = newState !== undefined ? newState : state;
    const nextLang = newLang !== undefined ? newLang : lang;
    const nextSort = newSort !== undefined ? newSort : sort;
    navigate(`/find/${nextState}/${courseType}?lang=${nextLang}&sort=${nextSort}`);
  }

  return (
    <main className="bg-gray-50 min-h-screen pb-12">
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <Breadcrumbs state={state} courseType={courseType} lang={lang} courseTypeLabel={courseTypeLabel} />
        <div className="mt-8 md:mt-12 mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{heroTitle}</h1>
          <p className="text-lg text-gray-700 mb-4">{heroSub}</p>
        </div>
        {/* FiltersBar hidden - preserving defaults behind the scenes */}
        <div className="mt-8">
          {filtered.length === 0 ? (
            <EmptyState
              title={emptyTitle}
              body={emptyBody}
              actionHref="/#find-course"
              actionLabel={emptyPrimaryCta}
              secondaryHref="/"
              secondaryLabel={emptySecondaryCta}
            />
          ) : (
            <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
              {filtered.map(course => (
                <CourseResultCard key={course.slug} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
