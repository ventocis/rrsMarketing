import React from 'react';
export default function HeadsetIcon({ className = "h-5 w-5 text-blue-600", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
         className={className} aria-hidden="true" {...props}>
      <path d="M4 13a8 8 0 0 1 16 0" />
      <path d="M4 13v3a3 3 0 0 0 3 3h1v-6H7a3 3 0 0 0-3 3z" />
      <path d="M20 13v3a3 3 0 0 1-3 3h-1v-6h1a3 3 0 0 1 3 3z" />
    </svg>
  );
}
