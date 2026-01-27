import React from 'react';
import Button from './Button.jsx';

export default function EmptyState({ title, body, actionHref, actionLabel, secondaryHref, secondaryLabel }) {
  return (
    <section className="mx-auto max-w-xl text-center rounded-2xl border border-gray-200 bg-white shadow-sm p-8">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="6" />
          <path d="M21 21l-4.2-4.2" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 text-gray-600 leading-relaxed">{body}</p>
      <div className="mt-6 flex items-center justify-center gap-3">
        <Button href={actionHref} variant="primary">{actionLabel}</Button>
        {secondaryHref && secondaryLabel ? (
          <Button href={secondaryHref} variant="secondary">{secondaryLabel}</Button>
        ) : null}
      </div>
    </section>
  );
}
