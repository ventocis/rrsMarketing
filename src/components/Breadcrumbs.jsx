import React from 'react';
import { Link } from 'react-router-dom';

export default function Breadcrumbs({ state, courseType, lang, courseTypeLabel }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
      <ol className="inline-flex items-center space-x-1">
        <li>
          <Link to="/" className="hover:underline">Home</Link>
        </li>
        <li>/</li>
        <li>
          <Link to={`/find/${state}/multi?lang=${lang || 'any'}`} className="hover:underline">{state}</Link>
        </li>
        <li>/</li>
        <li aria-current="page" className="text-gray-700 font-semibold">{courseTypeLabel}</li>
      </ol>
    </nav>
  );
}
