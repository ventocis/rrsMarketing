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
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#616d7b]">
      <ol className="inline-flex items-center space-x-1">
        <li>
          <Link to="/" className="hover:underline text-[#616d7b] hover:text-[#1e2832]">Home</Link>
        </li>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li className="text-[#616d7b]">/</li>
            {index === items.length - 1 ? (
              <li aria-current="page" className="text-[#1e2832] font-semibold">{item.label}</li>
            ) : (
              <li>
                <Link to={item.href} className="hover:underline text-[#616d7b] hover:text-[#1e2832]">{item.label}</Link>
              </li>
            )}
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
}

// Texas court breadcrumbs: Texas → County → Court
export function TexasCourtBreadcrumbs({ county, courtName }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[#616d7b]">
      <ol className="inline-flex items-center space-x-1">
        <li>
          <Link to="/texas" className="hover:underline text-[#616d7b] hover:text-[#1e2832]">Texas</Link>
        </li>
        {county && (
          <>
            <li className="text-[#616d7b]">/</li>
            <li className="text-[#616d7b]">{county} County</li>
          </>
        )}
        {courtName && (
          <>
            <li className="text-[#616d7b]">/</li>
            <li aria-current="page" className="text-[#1e2832] font-semibold">{courtName}</li>
          </>
        )}
      </ol>
    </nav>
  );
}
