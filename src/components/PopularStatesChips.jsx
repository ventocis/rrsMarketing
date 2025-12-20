import React from 'react';
import courses from '../data/courses.json';
import states from '../data/states.json';
import { getPopularStates } from '../lib/popularStates.js';

export default function PopularStatesChips({ value, onSelect, courseType }) {
  const codes = getPopularStates({ courses, states, courseType, limit: 8 });
  return (
    <div className="mb-3 -mx-1 overflow-x-auto">
      <div className="text-sm font-medium text-gray-700 mb-2 px-1">Popular</div>
      <div className="flex gap-2 px-1">
        {codes.map(code => (
          <button
            key={code}
            type="button"
            className={`rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              value === code
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
            aria-pressed={value === code}
            tabIndex={0}
            onClick={() => onSelect(code)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(code);
              }
            }}
          >
            {code}
          </button>
        ))}
      </div>
    </div>
  );
}
