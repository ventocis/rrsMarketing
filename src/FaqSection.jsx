import React from 'react';
import { Accordion } from 'flowbite-react';
import Button from './components/Button.jsx';
import faqData from '../blueprint/copy/faq.json';
// sref: faq-section.v1

export default function FaqSection() {
  const heading = faqData.heading;
  const items = faqData.items.slice(0, 8); // Show 8 items to match design
  return (
    <section className="bg-[#F9FAFB] py-16 lg:py-28 border-b border-[#e5e5e5]">
      <div className="max-w-[768px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section with badge, heading, and subtitle */}
        <div className="flex flex-col gap-6 items-center mb-12">
          {/* Got Questions badge */}
          <div className="bg-[#e5f6fe] inline-flex items-center px-4 py-2 rounded-full">
            <span className="text-sm font-semibold text-[#0351b4] leading-5">Got Questions?</span>
          </div>
          
          {/* Section Heading - matches design system but keeps current font */}
          <h2 className="text-[28px] lg:text-[36px] font-bold text-center text-[#1e2832] tracking-[-0.02em] lg:tracking-[-0.9px] leading-[150%] lg:leading-[40px]">
            {heading}
          </h2>
          
          {/* Subtitle */}
          <p className="text-base text-center text-[#616d7b] leading-6 max-w-[672px]">
            Commonly Asked Questions
          </p>
        </div>
        
        {/* FAQ Accordion - design system styling */}
        <div className="flex flex-col gap-4 mb-12">
          <Accordion alwaysOpen={false} className="!border-0 !divide-y-0 space-y-4">
            {items.map((item, i) => (
              <Accordion.Panel key={i}>
                <Accordion.Title className="bg-white border border-[#e4e6ea] rounded-[16px] px-6 py-5 text-base font-semibold text-[#1e2832] tracking-[-0.4px] leading-6 hover:bg-gray-50 transition-colors !first:rounded-t-[16px] !last:rounded-b-[16px]">
                  {item.q}
                </Accordion.Title>
                <Accordion.Content className="bg-white border-x border-b border-[#e4e6ea] rounded-b-[16px] px-6 py-4 !first:rounded-t-[16px] !last:rounded-b-[16px]">
                  <div className="text-base leading-6 text-[#616d7b]">
                    {Array.isArray(item.a) ? item.a.map((paragraph, index) => (
                      <div key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                    )) : (
                      <div dangerouslySetInnerHTML={{ __html: item.a }} />
                    )}
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
            ))}
          </Accordion>
        </div>
        
        {/* Still have questions section */}
        <div className="bg-white border border-[#e4e6ea] rounded-[20px] p-8 flex flex-col gap-3 items-center">
          <h3 className="text-xl font-semibold text-center text-[#1e2832] tracking-[-0.5px] leading-7">
            Still have questions?
          </h3>
          <p className="text-base text-center text-[#616d7b] leading-6 max-w-[672px]">
            Our support team is here to help.
          </p>
          <Button 
            href="/support" 
            variant="custom"
            className="mt-3 border border-[#03449e] bg-transparent hover:bg-[#03449e] hover:text-white text-[#03449e] text-base font-semibold py-3 px-8 rounded-[16px] min-h-[48px] flex items-center justify-center gap-2 transition-colors"
          >
            Contact Support
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>
        </div>
      </div>
    </section>
  );
}
