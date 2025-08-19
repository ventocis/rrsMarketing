import React from 'react';
export default function BadgeCheckIcon({ className = '' }) {
  return (
    <svg className={`h-5 w-5 text-blue-600 ${className}`} aria-hidden="true" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 2l2.09 4.24L17 7.27l-3.41 3.32L14.18 17 10 14.27 5.82 17l.59-6.41L3 7.27l4.91-.63L10 2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 10.5l2 2 3-3" />
    </svg>
  );
}
