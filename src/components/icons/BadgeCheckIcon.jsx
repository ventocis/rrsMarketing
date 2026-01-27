import React from 'react';
export default function BadgeCheckIcon({ className = "h-5 w-5 text-blue-600", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"
         className={className} aria-hidden="true" {...props}>
      <path d="M12 3l2.1 1.1 2.4-.2 1.4 2 2.3.8-.4 2.4 1.5 2-1.5 2 .4 2.4-2.3.8-1.4 2-2.4-.2L12 21l-2.1-1.1-2.4.2-1.4-2-2.3-.8.4-2.4L2.7 12l1.5-2-.4-2.4 2.3-.8 1.4-2 2.4.2L12 3z" />
      <path d="M9.5 12.5l2 2 3.5-3.5" />
    </svg>
  );
}
