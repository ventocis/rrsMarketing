import React, { useMemo } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import courses from './data/courses.json';
import { usd, hours, truncate } from './lib/format.js';
import resultsCopy from '../blueprint/copy/results.json';
import FiltersBar from './components/FiltersBar.jsx';

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
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{heroTitle}</h1>
          <p className="text-lg text-gray-700 mb-4">{heroSub}</p>
        </div>
        <FiltersBar
          state={state}
          courseType={courseType}
          language={lang}
          sort={sort}
          languageOptions={languageOptions}
          onChange={handleFilterChange}
        />
      </section>
      <section className="max-w-4xl mx-auto px-4 mb-8">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 py-12">{resultsCopy.grid.empty}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map(course => (
              <div key={course.slug} className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
                <div>
                  <h2 className="font-bold text-lg mb-1">{course.course_name}</h2>
                  <p className="text-gray-700 mb-2 text-sm">{truncate(course.blurb, 100)}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{hours(course.duration_hours)}</span>
                    <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{course.language}</span>
                    {course.price_usd && <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">{usd(course.price_usd)}</span>}
                  </div>
                  {course.provider_type === 'Partner' && (
                    <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold mb-2">{course.partner_badge || resultsCopy.grid.card.provider_pill_partner}</span>
                  )}
                </div>
                <div className="mt-4 flex gap-2">
                  <Link to={`/courses/${course.slug}`} className="flex-1">
                    <button className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded font-semibold text-sm hover:bg-gray-300 transition">{resultsCopy.grid.card.cta_learn}</button>
                  </Link>
                  {course.provider_type === 'Partner' ? (
                    <a
                      href={course.affiliate_link}
                      target="_blank"
                      rel="noopener sponsored"
                      className="flex-1"
                    >
                      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded font-semibold text-sm hover:bg-blue-700 transition">{resultsCopy.grid.card.cta_signup}</button>
                    </a>
                  ) : (
                    <Link to={`/courses/${course.slug}#enroll`} className="flex-1">
                      <button className="w-full bg-blue-600 text-white px-4 py-2 rounded font-semibold text-sm hover:bg-blue-700 transition">{resultsCopy.grid.card.cta_signup}</button>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
