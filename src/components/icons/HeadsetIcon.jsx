import React from 'react';
export default function HeadsetIcon({ className = '' }) {
  return (
    <svg className={`h-5 w-5 text-blue-600 ${className}`} aria-hidden="true" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 13v-2a6 6 0 1112 0v2m-1 3a2 2 0 002-2v-1a2 2 0 00-2-2h-1m-6 5a2 2 0 01-2-2v-1a2 2 0 012-2h1" />
    </svg>
  );
}
