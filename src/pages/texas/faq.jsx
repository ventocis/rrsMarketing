import React, { useState } from 'react';
import Button from '../../components/Button.jsx';
import SEO from '../../components/SEO.jsx';

// Local icon assets for FAQ section
const imgChevronFAQ = "/assets/icons/texas/chevron-faq.svg";
const imgArrowContactSupport = "/assets/icons/texas/arrow-contact-support.svg";

export default function TexasFAQ() {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  return (
    <>
      <SEO 
        title="Frequently Asked Questions - Texas Defensive Driving Course | Road Ready Safety"
        description="Everything you need to know about our Texas defensive driving course. Get answers to common questions about pricing, certificates, court acceptance, and more."
      />
      
      {/* Frequently Asked Questions */}
      <section className="py-[112px] px-4 sm:px-6 lg:px-8 bg-[#f9fafb]">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4 items-center relative h-[140px]">
            <div className="bg-[#e5f6fe] inline-flex items-center px-4 py-2 rounded-full">
              <span className="text-sm font-semibold text-[#0351b4] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Got Questions?</span>
            </div>
            <h2 className="text-[36px] font-bold text-[#1e2832] text-center leading-[40px] tracking-[-0.9px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Frequently Asked Questions
            </h2>
            <p className="text-base text-[#616d7b] text-center leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Everything you need to know about our Texas defensive driving course.
            </p>
          </div>

          {/* FAQ Accordion Items */}
          <div className="flex flex-col gap-4">
            {/* FAQ 2 */}
            <div className="bg-white border border-[#e4e6ea] rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === 'faq2' ? null : 'faq2')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-base font-semibold text-[#1e2832] leading-6 tracking-[-0.4px] text-left" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Is this accepted by all Texas courts?
                </span>
                <img 
                  src={imgChevronFAQ} 
                  alt="" 
                  className={`w-4 h-4 transition-transform ${expandedFAQ === 'faq2' ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedFAQ === 'faq2' && (
                <div className="px-6 pb-5">
                  <p className="text-base text-[#616d7b] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Yes! We are a TDLR-approved provider, and our certificates are accepted by every court in Texas for ticket dismissal.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="bg-white border border-[#e4e6ea] rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === 'faq3' ? null : 'faq3')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-base font-semibold text-[#1e2832] leading-6 tracking-[-0.4px] text-left" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Are there extra fees after completing the course?
                </span>
                <img 
                  src={imgChevronFAQ} 
                  alt="" 
                  className={`w-4 h-4 transition-transform ${expandedFAQ === 'faq3' ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedFAQ === 'faq3' && (
                <div className="px-6 pb-5">
                  <p className="text-base text-[#616d7b] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    No hidden fees. The $25 + $3 is all you pay. However, some courts may require you to submit a copy of your driving record (DPS Type 3A), which has a separate fee paid directly to the DPS.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 4 */}
            <div className="bg-white border border-[#e4e6ea] rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === 'faq4' ? null : 'faq4')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-base font-semibold text-[#1e2832] leading-6 tracking-[-0.4px] text-left" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  How do I get my certificate?
                </span>
                <img 
                  src={imgChevronFAQ} 
                  alt="" 
                  className={`w-4 h-4 transition-transform ${expandedFAQ === 'faq4' ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedFAQ === 'faq4' && (
                <div className="px-6 pb-5">
                  <p className="text-base text-[#616d7b] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Your certificate is available immediately upon course completion. You can download it right away from your account dashboard to submit to your court.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 5 */}
            <div className="bg-white border border-[#e4e6ea] rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === 'faq5' ? null : 'faq5')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-base font-semibold text-[#1e2832] leading-6 tracking-[-0.4px] text-left" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  How long do I have to complete the course?
                </span>
                <img 
                  src={imgChevronFAQ} 
                  alt="" 
                  className={`w-4 h-4 transition-transform ${expandedFAQ === 'faq5' ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedFAQ === 'faq5' && (
                <div className="px-6 pb-5">
                  <p className="text-base text-[#616d7b] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    You have up to 90 days from enrollment to complete the course. However, you must finish before your court's deadline for ticket dismissal.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 6 */}
            <div className="bg-white border border-[#e4e6ea] rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === 'faq6' ? null : 'faq6')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-base font-semibold text-[#1e2832] leading-6 tracking-[-0.4px] text-left" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Can I take the course on my phone?
                </span>
                <img 
                  src={imgChevronFAQ} 
                  alt="" 
                  className={`w-4 h-4 transition-transform ${expandedFAQ === 'faq6' ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedFAQ === 'faq6' && (
                <div className="px-6 pb-5">
                  <p className="text-base text-[#616d7b] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Yes! The course is fully mobile-friendly. You can take it on any device — phone, tablet, or computer. Your progress automatically saves, so you can switch devices anytime.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 7 */}
            <div className="bg-white border border-[#e4e6ea] rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === 'faq7' ? null : 'faq7')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-base font-semibold text-[#1e2832] leading-6 tracking-[-0.4px] text-left" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  What if I fail the final exam?
                </span>
                <img 
                  src={imgChevronFAQ} 
                  alt="" 
                  className={`w-4 h-4 transition-transform ${expandedFAQ === 'faq7' ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedFAQ === 'faq7' && (
                <div className="px-6 pb-5">
                  <p className="text-base text-[#616d7b] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    You get unlimited retakes on all unit quizzes. There is no final exam. The goal is learning, not tricking you. Take your time and review the material as needed.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 8 */}
            <div className="bg-white border border-[#e4e6ea] rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === 'faq8' ? null : 'faq8')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-base font-semibold text-[#1e2832] leading-6 tracking-[-0.4px] text-left" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Are refunds available?
                </span>
                <img 
                  src={imgChevronFAQ} 
                  alt="" 
                  className={`w-4 h-4 transition-transform ${expandedFAQ === 'faq8' ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedFAQ === 'faq8' && (
                <div className="px-6 pb-5">
                  <p className="text-base text-[#616d7b] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Yes! If you're not satisfied, you can request a full refund before you complete the course or receive your certificate.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Still have questions? CTA */}
          <div className="bg-white border border-[#e4e6ea] rounded-[20px] p-8 flex flex-col gap-3 items-center">
            <h3 className="text-xl font-semibold text-[#1e2832] text-center leading-7 tracking-[-0.5px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Still have questions?
            </h3>
            <p className="text-base text-[#616d7b] text-center leading-6 pb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Our support team is here to help.
            </p>
            <Button
              href="/texas/contactus"
              variant="custom"
              className="h-12 px-[33.6px] border border-[#03449e] text-[#03449e] rounded-2xl text-base font-semibold flex items-center justify-center gap-2 leading-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Contact Support
              <img src={imgArrowContactSupport} alt="" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

