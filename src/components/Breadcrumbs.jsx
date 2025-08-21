import React from 'react';
import { Link } from 'react-router-dom';
import { stateNames } from '../utils/states.js';

export default function Breadcrumbs({ state, courseType, lang, courseTypeLabel }) {
  const stateFull = stateNames[state] || state;
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
      <ol className="inline-flex items-center space-x-1">
        <li>
          <Link to="/" className="hover:underline">Home</Link>
        </li>
        <li>/</li>
        <li>
          <Link to={`/find/${state}/multi?lang=${lang || 'any'}`} className="hover:underline">{stateFull}</Link>
        </li>
        <li>/</li>
        <li aria-current="page" className="text-gray-700 font-semibold">{courseTypeLabel}</li>
      </ol>
    </nav>
  );
}

// Simple breadcrumbs for static/legal pages
export function SimpleBreadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
      <ol className="inline-flex items-center space-x-1">
        <li>
          <Link to="/" className="hover:underline">Home</Link>
        </li>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li>/</li>
            {index === items.length - 1 ? (
              <li aria-current="page" className="text-gray-700 font-semibold">{item.label}</li>
            ) : (
              <li>
                <Link to={item.href} className="hover:underline">{item.label}</Link>
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}
