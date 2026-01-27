import React from 'react';
export default function DeviceIcon({ className = "h-5 w-5 text-blue-600", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
         className={className} aria-hidden="true" {...props}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M8 20h8" />
    </svg>
  );
}
