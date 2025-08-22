import React from 'react';
import Button from './Button.jsx';
import LockIcon from './icons/LockIcon.jsx';

export default function BuyBox({ 
  course, 
  price, 
  provider, 
  isPartner, 
  affiliateLink 
}) {
  const ctaLabel = isPartner ? 'Enroll now' : 'Sign up';
  const ctaHref = isPartner ? affiliateLink : `#enroll`;
  const ctaProps = isPartner 
    ? { target: '_blank', rel: 'noopener sponsored' }
    : {};

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-6 lg:p-8">
      {/* Course Title (optional for context) */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {course.title}
      </h3>
      
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
          aria-label={`${ctaLabel} for ${course.title}`}
        >
          {ctaLabel}
        </Button>
      </div>
      
      {/* Guarantee Line */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          Satisfaction guarantee available.
        </p>
      </div>
      
      {/* Trust Micro-row */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <LockIcon className="h-4 w-4 text-slate-500" />
          <span>Secure checkout</span>
          <span className="text-gray-400">•</span>
          <span>Stripe</span>
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
