import React from 'react';
import uspData from '../blueprint/copy/home.json';

export default function UspSection() {
  const heading = uspData.usp.heading;
  const items = uspData.usp.items;
  return (
    <section className="bg-[#F9FAFB] py-16 lg:py-24 border-b border-[#e5e5e5]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-[1152px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section with badge, heading, and subtitle - centered above content */}
        <div className="flex flex-col gap-6 items-center mb-12">
          {/* Blue badge */}
          <div className="bg-[#e5f6fe] inline-flex items-center px-4 py-2 rounded-full">
            <span className="text-sm font-semibold text-[#0351b4] leading-5">Why Choose Us</span>
          </div>
          
          {/* Section Heading - matches FAQ styling */}
          <h2 className="text-[28px] lg:text-[36px] font-bold text-center text-[#1e2832] tracking-[-0.02em] lg:tracking-[-0.9px] leading-[150%] lg:leading-[40px]">
            {heading}
          </h2>
          
          {/* Subtitle */}
          <p className="text-base text-center text-[#616d7b] leading-6">
            Everything you need to complete your course with confidence.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {items.map((item, i) => {
              // Choose icon based on card title
              let iconSvg = null;
              if (item.title.toLowerCase().includes('schedule') || item.title.toLowerCase().includes('learn')) {
                // Clock icon for "Learn on your schedule"
                iconSvg = (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                );
              } else if (item.title.toLowerCase().includes('guarantee') || item.title.toLowerCase().includes('satisfaction')) {
                // Check-circle icon for "Satisfaction guarantee"
                iconSvg = (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                );
              } else if (item.title.toLowerCase().includes('shortest') || item.title.toLowerCase().includes('course')) {
                // Zap icon for "Shortest course allowed by law"
                iconSvg = (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                );
              } else if (item.title.toLowerCase().includes('device') || item.title.toLowerCase().includes('works')) {
                // Smartphone icon for "Works on any device"
                iconSvg = (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                );
              }

              return (
                <div 
                  key={i} 
                  className="bg-white rounded-[12px] border border-[#e5e5e5] p-8 hover:shadow-md transition-shadow relative"
                  style={{ boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)' }}
                >
                  {/* Icon in top right */}
                  {iconSvg && (
                    <div className="absolute top-8 right-8 text-[#0667D1]">
                      {iconSvg}
                    </div>
                  )}
                  
                  {/* Card Title */}
                  <h3 className="text-xl font-medium text-[#262626] mb-3 tracking-[-0.02em] pr-8" style={{ lineHeight: '30px' }}>
                    {item.title}
                  </h3>
                  {/* Card Body */}
                  <p className="text-base leading-[22px] text-[#616d7b]">
                    {item.body}
                  </p>
            </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
