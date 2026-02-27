import React from 'react';
import Button from './Button.jsx';
import { usd, hours } from '../lib/format.js';
import { PORTAL_URL, IS_QA } from '../config/urls.js';

export default function StickyEnrollBar({ course }) {
  if (!course || (!course.price_usd && !course.duration_hours)) return null;
  const isPartner = course.provider_type === 'Partner';
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3">
        <div className="text-sm">
          <div className="font-semibold text-gray-900">{usd(course.price_usd)}</div>
          <div className="text-gray-600">{hours(course.duration_hours)}</div>
        </div>
        <Button
          size="md"
          variant="primary"
          href={IS_QA && course.qa_link ? course.qa_link : isPartner ? course.affiliate_link : PORTAL_URL}
          target={isPartner && !(IS_QA && course.qa_link) ? '_blank' : undefined}
          rel={isPartner && !(IS_QA && course.qa_link) ? 'noopener sponsored' : undefined}
        >
          Start now
        </Button>
      </div>
    </div>
  );
}
