import React from 'react';
export default function DeviceIcon({ className = '' }) {
  return (
    <svg className={`h-5 w-5 text-blue-600 ${className}`} aria-hidden="true" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={1.5}>
      <rect x="3" y="5" width="14" height="10" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 17h4" />
    </svg>
  );
}
