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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
          {/* Left column - content */}
          <div className="max-w-[65ch]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {items.map((item, i) => (
                <div 
                  key={i} 
                  className="bg-white rounded-[12px] border border-[#e5e5e5] p-6 hover:shadow-md transition-shadow"
                  style={{ boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)' }}
                >
                  {/* Card Title */}
                  <h3 className="text-xl font-medium text-[#262626] mb-3 tracking-[-0.02em]" style={{ lineHeight: '30px' }}>
                    {item.title}
                  </h3>
                  {/* Card Body */}
                  <p className="text-base leading-[22px] text-[#616d7b]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right column - illustration only */}
          <div className="hidden lg:block">
            <div className="relative">
              <img 
                src="/assets/illustrations/report.svg" 
                alt="Why drivers choose Road Ready - reporting and compliance features"
                className="h-48 md:h-64 lg:h-72 mx-auto lg:ml-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
