import React from 'react';
import Button from './components/Button.jsx';
import ShieldIcon from './components/icons/ShieldIcon.jsx';
import BadgeCheckIcon from './components/icons/BadgeCheckIcon.jsx';
import CertificateIcon from './components/icons/CertificateIcon.jsx';
import DeviceIcon from './components/icons/DeviceIcon.jsx';
import trustData from '../blueprint/copy/home.json';
// sref: trust-section.v1

const iconMap = [
  <ShieldIcon key="shield" />, // Secure checkout
  <BadgeCheckIcon key="badge" />, // Accepted where required
  <CertificateIcon key="certificate" />, // Certificate delivery - using certificate icon
  <DeviceIcon key="device" /> // Responsive support
];

// Star icon component
const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0L10.1631 5.52786L16 6.11146L11.8541 9.94428L12.9443 16L8 12.5279L3.05569 16L4.1459 9.94428L0 6.11146L5.83686 5.52786L8 0Z" fill="#FE915C"/>
  </svg>
);

export default function TrustSection() {
  const heading = trustData.trust.heading;
  const items = trustData.trust.items;
  return (
    <section className="bg-white py-16 lg:py-24 border-b border-[#e5e5e5]">
      <div className="max-w-[1152px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section with badge, heading, and subtitle */}
        <div className="flex flex-col gap-6 items-center mb-12">
          {/* 5 Stars */}
          <div className="inline-flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
          
          {/* Section Heading - matches FAQ styling */}
          <h2 className="text-[28px] lg:text-[36px] font-bold text-center text-[#1e2832] tracking-[-0.02em] lg:tracking-[-0.9px] leading-[150%] lg:leading-[40px]">
            {heading}
          </h2>
          
          {/* Subtitle */}
          <p className="text-base text-center text-[#616d7b] leading-6">
            100% online, 100% secure.
          </p>
        </div>
        
        {/* Cards grid - 2x2 layout matching design system */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <div 
              key={i} 
              className="bg-[#F9FAFB] rounded-[20px] border border-[#e5e5e5] p-6 hover:shadow-md transition-shadow"
              style={{ boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)' }}
            >
              <div className="h-full flex items-start gap-4">
                {/* Icon container - design system colors */}
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e5f6fe]">
                  <div className="h-5 w-5 text-[#0667D1]">
                    {iconMap[i]}
                  </div>
                </span>
                <div className="space-y-1">
                  {/* Card Title - design system styling */}
                  <h3 className="text-xl font-medium text-[#262626] mb-1 tracking-[-0.02em]" style={{ lineHeight: '30px' }}>
                    {item.title}
                  </h3>
                  {/* Card Body - design system colors */}
                  <p className="text-base leading-[22px] text-[#616d7b]">
                    {item.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 flex flex-col items-center">
          <Button 
            href="/support" 
            variant="custom"
            className="bg-transparent border border-[#e5e5e5] hover:border-[#0667D1] text-[#0667D1] hover:text-[#0556b3] text-sm font-semibold py-3 px-6 rounded-[16px] min-h-[44px] flex items-center justify-center transition-colors"
          >
            Need help? Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
}
