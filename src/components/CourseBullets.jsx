import React from 'react';
import CheckCircleIcon from './icons/CheckCircleIcon.jsx';

export default function CourseBullets({ benefits = [] }) {
  // Default benefits if none provided
  const defaultBenefits = [
    'State approved',
    'Mobile friendly', 
    'Electronic certificate available',
    'Electronic state reporting where required'
  ];
  
  const displayBenefits = benefits.length > 0 ? benefits : defaultBenefits;

  return (
    <ul className="space-y-2 mt-4">
      {displayBenefits.map((benefit, index) => (
        <li key={index} className="flex items-start gap-3">
          <CheckCircleIcon className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <span className="text-gray-700 leading-relaxed">{benefit}</span>
        </li>
      ))}
    </ul>
  );
}
