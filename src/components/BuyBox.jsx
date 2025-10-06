import React, { useState } from 'react';
import Button from './Button.jsx';
import LockIcon from './icons/LockIcon.jsx';
import CourseBullets from './CourseBullets.jsx';

export default function BuyBox({ 
  course, 
  price, 
  provider, 
  isPartner, 
  affiliateLink 
}) {
  const [showGuarantee, setShowGuarantee] = useState(false);
  
  const isTexasDefensive = course.slug === 'tx-defensive';
  const ctaLabel = isPartner ? 'Enroll now' : 'Sign up';
  const ctaHref = isPartner ? affiliateLink : `#enroll`;
  const ctaProps = isPartner 
    ? { target: '_blank', rel: 'noopener sponsored' }
    : {};

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 lg:p-8 space-y-3">
      {/* Course Title (optional for context) */}
              <h3 className="text-base font-semibold text-gray-900">
        {isTexasDefensive ? 'Texas Driver Safety Course (6-Hour)' : course.course_name}
      </h3>

      {/* Provider Pill */}
      <div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {provider}
        </span>
      </div>

      {/* Price */}
      <div>
        <div className="text-3xl font-bold text-gray-900">
          {price}
        </div>
      </div>

      {/* Primary CTA */}
      <div>
        <div className={isTexasDefensive ? "hidden md:block" : ""}>
          <Button
            href={ctaHref}
            variant="primary"
            size="lg"
            className="w-full text-base"
            {...ctaProps}
            aria-label={`${ctaLabel} for ${course.course_name}`}
            data-rr={isTexasDefensive ? "cta-enroll" : undefined}
          >
            {ctaLabel}
          </Button>
        </div>
      </div>

      {/* Course Bullets - Texas specific */}
      <div>
        {isTexasDefensive ? (
          <div className="text-center">
            <div className="text-sm text-muted-foreground">State-approved • Any device • Satisfaction guarantee • Secure checkout</div>
          </div>
        ) : (
          <CourseBullets course={course} />
        )}
      </div>
      
      {/* Satisfaction Guarantee - Hidden for Texas */}
      {!isTexasDefensive && (
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
      )}
      
      {/* Trust Micro-row - Hidden for Texas */}
      {!isTexasDefensive && (
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
      )}
      
      {/* Partner Disclaimer */}
      {isPartner && (
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-800">
            {isTexasDefensive
              ? 'Secure checkout on TicketSchool. Road Ready is a trusted affiliate.'
              : 'You\'ll enroll and complete this course on TicketSchool\'s secure site. Road Ready is a trusted affiliate.'
            }
          </p>
        </div>
      )}
      
      {/* Provider Info - Hidden for Texas */}
      {!isTexasDefensive && (
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Provider:</span> {provider}
          </p>
        </div>
      )}
    </div>
  );
}
