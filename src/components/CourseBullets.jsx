import React from 'react';

export default function CourseBullets({ course }) {
  // Map boolean fields to bullet text
  const benefitMap = [
    { field: 'stateApproved', text: 'State approved' },
    { field: 'mobileFriendly', text: 'Works on any device' },
    { field: 'satisfactionGuarantee', text: 'Satisfaction guarantee available' },
    { field: 'shortestAllowed', text: 'Shortest course allowed by law' },
    { field: 'secureCheckout', text: 'Secure checkout' }
  ];

  // Filter to only show benefits that are true
  const activeBenefits = benefitMap.filter(benefit => course[benefit.field]);

  // If no benefits are set, show default benefits
  if (activeBenefits.length === 0) {
    const defaultBenefits = [
      'State approved',
      'Works on any device',
      'Satisfaction guarantee available'
    ];
    
    return (
      <ul className="space-y-2 mt-4" role="list">
        {defaultBenefits.map((benefit, index) => (
          <li key={index} className="flex items-center gap-2 mb-2">
            <span className="text-blue-600 font-bold">✓</span>
            <span className="text-gray-700 leading-snug">{benefit}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2 mt-4" role="list">
      {activeBenefits.map((benefit, index) => (
        <li key={index} className="flex items-center gap-2 mb-2">
          <span className="text-blue-600 font-bold">✓</span>
          <span className="text-gray-700 leading-snug">{benefit.text}</span>
        </li>
      ))}
    </ul>
  );
}
