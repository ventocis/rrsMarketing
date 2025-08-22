import React from 'react';
import Card from './Card.jsx';
import Button from './Button.jsx';
import { usd, hours, truncate } from '../lib/format.js';
import resultsCopy from '../../blueprint/copy/results.json';

const labels = {
  learnMore: resultsCopy?.grid?.card?.cta_learn || 'Learn more',
  signUp: resultsCopy?.grid?.card?.cta_signup || 'Sign up',
};

export default function CourseResultCard({ course }) {
  return (
    <Card
      title={<span className="font-semibold">{course.course_name}</span>}
      body={null}
    >
      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        {course.duration_hours && (
          <span className="rounded-md bg-gray-100 text-gray-700 px-2 py-1">{hours(course.duration_hours)}</span>
        )}
        {course.language && (
          <span className="rounded-md bg-gray-100 text-gray-700 px-2 py-1">{Array.isArray(course.language) ? course.language[0] : course.language}</span>
        )}
        {course.price_usd && (
          <span className="rounded-md bg-gray-100 text-gray-700 px-2 py-1">{usd(course.price_usd)}</span>
        )}
      </div>
      <div className="text-gray-600 leading-relaxed mt-2 text-sm">{truncate(course.blurb || course.description, 140)}</div>
      {course.provider_type === 'Partner' && course.provider_name && (
        <span className="mt-3 inline-flex max-w-max self-start items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 leading-none">
          Provided by {course.provider_name}
        </span>
      )}
      <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center">
        <Button variant="secondary" href={`/courses/${course.slug}`}>{labels.learnMore}</Button>
        {course.provider_type === 'Partner' ? (
          <Button variant="primary" href={course.affiliate_link} target="_blank" rel="noopener sponsored">{labels.signUp}</Button>
        ) : (
          <Button variant="primary" href={`/courses/${course.slug}#enroll`}>{labels.signUp}</Button>
        )}
      </div>
    </Card>
  );
}
