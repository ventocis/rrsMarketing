import React, { useMemo } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import courses from './data/courses.json';
import { usd, hours, truncate } from './lib/format.js';
import resultsCopy from '../blueprint/copy/results.json';
import FiltersBar from './components/FiltersBar.jsx';
import Card from './components/Card.jsx';
import CourseResultCard from './components/CourseResultCard.jsx';
import Breadcrumbs from './components/Breadcrumbs.jsx';
import EmptyState from './components/EmptyState.jsx';

export default function ResultsPage() {
  const { state, courseType } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const lang = searchParams.get('lang') || 'any';
  const sort = searchParams.get('sort') || 'recommended';

  // Filter courses by state, courseType, and language
  const filtered = useMemo(() =>
    courses.filter(c =>
      c.state === state &&
      (courseType === 'multi' || c.course_type === courseType) &&
      (lang === 'any' || c.language === lang)
    ),
    [state, courseType, lang]
  );

  // Unique languages for filter
  const languageOptions = Array.from(new Set(filtered.map(c => c.language)));

  // Hero title
  const heroTitle = resultsCopy.hero.titlePattern
    .replace('{STATE}', state)
    .replace('{COURSE_TYPE}', courseType === 'multi' ? 'Courses' : courseType);
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
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <Breadcrumbs state={state} courseType={courseType} lang={lang} courseTypeLabel={courseTypeLabel} />
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{heroTitle}</h1>
          <p className="text-lg text-gray-700 mb-4">{heroSub}</p>
          <div className="mb-6">
            <Link to="/#find-course" className="inline-block">
              <button type="button" className="text-blue-600 hover:text-blue-700 underline text-sm font-medium">Change state or reason</button>
            </Link>
          </div>
        </div>
        <FiltersBar
          state={state}
          courseType={courseType}
          language={lang}
          sort={sort}
          languageOptions={languageOptions}
          onChange={handleFilterChange}
        />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
