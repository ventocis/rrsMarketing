import React from 'react';
export default function ShieldIcon({ className = '' }) {
  return (
    <svg className={`h-5 w-5 text-blue-600 ${className}`} aria-hidden="true" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 2.5l7 3v4.5c0 5.25-3.5 8.25-7 9-3.5-.75-7-3.75-7-9V5.5l7-3z" />
    </svg>
  );
}
