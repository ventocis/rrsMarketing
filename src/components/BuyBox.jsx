import React, { useState } from 'react';
import Button from './Button.jsx';
import LockIcon from './icons/LockIcon.jsx';
import CourseBullets from './CourseBullets.jsx';
import { PORTAL_URL } from '../config/urls.js';

export default function BuyBox({ 
  course, 
  price, 
  provider, 
  isPartner, 
  affiliateLink 
}) {
  const [showGuarantee, setShowGuarantee] = useState(false);
  
  const ctaLabel = isPartner ? 'Enroll now' : 'Sign up';
  const ctaHref = isPartner ? affiliateLink : PORTAL_URL;
  const ctaProps = isPartner 
    ? { target: '_blank', rel: 'noopener sponsored' }
    : {};

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 lg:p-8">
      {/* Course Title (optional for context) */}
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {course.course_name}
        </h3>
      
      {/* Provider Pill */}
      <div className="mb-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {provider}
        </span>
      </div>
      
      {/* Price */}
      <div className="mb-6">
        <div className="text-3xl font-bold text-gray-900">
          {price}
        </div>
      </div>
      
      {/* Primary CTA */}
      <div className="mb-6">
        <Button
          href={ctaHref}
          variant="primary"
          size="lg"
          className="w-full"
          {...ctaProps}
          aria-label={`${ctaLabel} for ${course.course_name}`}
        >
          {ctaLabel}
        </Button>
      </div>
      
      {/* Course Bullets */}
      <div className="mb-6">
        <CourseBullets course={course} />
      </div>
      
      {/* Satisfaction Guarantee */}
      <div className="mb-6">
        <button
          onClick={() => setShowGuarantee(!showGuarantee)}
          className="flex items-center gap-2 text-sm text-amber-700 hover:text-amber-800 transition-colors"
        >
          <span className="font-medium">Satisfaction Guarantee</span>
          <svg 
            className={`h-4 w-4 transition-transform ${showGuarantee ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {showGuarantee && (
          <div className="mt-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800 leading-relaxed">
              {isPartner 
                ? `${provider} stands behind their courses with a satisfaction guarantee. If you're not completely satisfied with your course experience, contact ${provider} for a full refund.`
                : 'We stand behind our courses with a satisfaction guarantee. If you\'re not completely satisfied with your course experience, contact us for a full refund.'
              }
            </p>
          </div>
        )}
      </div>
      
      {/* Trust Micro-row */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <LockIcon className="h-4 w-4 text-slate-500" />
          <span>Secure checkout</span>
          {!isPartner && (
            <>
              <span className="text-gray-400">•</span>
              <span>Stripe</span>
            </>
          )}
        </div>
      </div>
      
      {/* Partner Disclaimer */}
      {isPartner && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            You'll enroll and complete this course on TicketSchool's secure site. 
            Road Ready is a trusted affiliate.
          </p>
        </div>
      )}
      
      {/* Provider Info */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Provider:</span> {provider}
        </p>
      </div>
    </div>
  );
}
