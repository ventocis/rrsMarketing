import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionPanel, AccordionTitle, AccordionContent } from 'flowbite-react';
import Button from '../../components/Button.jsx';
import Card from '../../components/Card.jsx';
import CheckCircleIcon from '../../components/icons/CheckCircleIcon.jsx';
import SEO from '../../components/SEO.jsx';

// Local icon assets for What to Expect accordion
const imgAfterTakingCourse = "/assets/icons/texas/after-taking-course.svg";
const imgChevronDown = "/assets/icons/texas/chevron-down.svg";
const imgSupportDetails = "/assets/icons/texas/support-details.svg";
const imgTopicsCovered = "/assets/icons/texas/topics-covered.svg";
const imgTexasRequirementsActive = "/assets/icons/texas/texas-requirements-active.svg";
const imgTexasRequirementsInactive = "/assets/icons/texas/texas-requirements-inactive.svg";
const imgChevronUp = "/assets/icons/texas/chevron-up.svg";
const imgRequirementCheck = "/assets/icons/texas/requirement-check-clipboard.svg";

export default function TexasIndex() {
  const [expandedExpect, setExpandedExpect] = useState(null);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  // #region agent log
  React.useEffect(() => {
    const logEndpoint = 'http://127.0.0.1:7242/ingest/d43cc9bd-40ea-434a-b828-df0c6f64d204';
    const safeLog = (data) => {
      fetch(logEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).catch(()=>{});
    };
    safeLog({location:'texas/index.jsx:hero-button',message:'Hero Start Course button props',data:{href:'/courses/tx-defensive',variant:'custom',text:'Start Course'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'});
    setTimeout(() => {
      const heroButtons = document.querySelectorAll('a[href="/courses/tx-defensive"]');
      heroButtons.forEach((btn, idx) => {
        const computed = window.getComputedStyle(btn);
        const rect = btn.getBoundingClientRect();
        safeLog({location:'texas/index.jsx:hero-button-dom',message:'Hero button DOM element',data:{index:idx,textContent:btn.textContent?.trim(),className:btn.className.substring(0,150),computedHeight:computed.height,computedPaddingTop:computed.paddingTop,computedPaddingBottom:computed.paddingBottom,computedFontSize:computed.fontSize,computedLineHeight:computed.lineHeight,computedFontFamily:computed.fontFamily,hasNoUnderline:btn.className.includes('no-underline'),actualHeight:rect.height,actualWidth:rect.width},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'E'});
      });
    }, 1000);
  }, []);
  // #endregion

  // #region agent log
  React.useEffect(() => {
    const logEndpoint = 'http://127.0.0.1:7242/ingest/d43cc9bd-40ea-434a-b828-df0c6f64d204';
    const safeLog = (data) => {
      fetch(logEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).catch(()=>{});
    };
    safeLog({location:'texas/index.jsx:mount',message:'TexasIndex component mounted',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'});
    
    // Log component imports to verify they're not undefined
    safeLog({location:'texas/index.jsx:imports',message:'Checking component imports',data:{
      Accordion: typeof Accordion,
      AccordionPanel: typeof AccordionPanel,
      AccordionTitle: typeof AccordionTitle,
      AccordionContent: typeof AccordionContent
    },timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'});
    
    // Check for missing assets
    const assetsToCheck = ['/texas/webpage.png', '/texas/phone.png', '/assets/logo.svg', '/assets/icons/texas/tdlr-approved.svg'];
    assetsToCheck.forEach(asset => {
      fetch(asset, { method: 'HEAD' }).then(res => {
        if (!res.ok) {
          safeLog({location:'texas/index.jsx:asset-check',message:'Missing asset detected',data:{asset,status:res.status},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'});
          console.warn('Missing asset:', asset, 'Status:', res.status);
        }
      }).catch(() => {
        safeLog({location:'texas/index.jsx:asset-check',message:'Asset fetch failed',data:{asset},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'});
        console.warn('Asset check failed:', asset);
      });
    });
    
    // Check first section container for width constraints
    setTimeout(() => {
      const firstSection = document.querySelector('section');
      if (firstSection) {
        const sectionComputed = window.getComputedStyle(firstSection);
        const sectionContainer = firstSection.querySelector('div.max-w-7xl, div.max-w-\\[1200px\\], div.max-w-4xl, div.max-w-6xl');
        if (sectionContainer) {
          const containerComputed = window.getComputedStyle(sectionContainer);
          safeLog({location:'texas/index.jsx:section-check',message:'First section container styles',data:{
            sectionWidth:sectionComputed.width,
            sectionMaxWidth:sectionComputed.maxWidth,
            containerWidth:containerComputed.width,
            containerMaxWidth:containerComputed.maxWidth,
            containerPaddingLeft:containerComputed.paddingLeft,
            containerPaddingRight:containerComputed.paddingRight,
            containerActualWidth:sectionContainer.offsetWidth,
            viewportWidth:window.innerWidth
          },timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'});
        }
      }
    }, 100);
  }, []);
  // #endregion

  return (
    <>
      <SEO 
        title="#1 Texas Driver Safety Course: Fast, Convenient, & Online"
        description="Check your eligibility, request permission from your court, and complete your Texas-approved course — all online, all on any device."
        keywords="Texas driver safety course, defensive driving, traffic school, online course, Texas approved"
        image="/assets/rrs (1200 x 630 px).png"
        url="/texas"
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#e5f6fe] to-white pt-8 pb-16 lg:pt-16 lg:pb-[128px] relative overflow-hidden">
        {/* Background blur effects */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute bg-[#7cc3f9] blur-[32px] rounded-full w-64 h-64 left-10 top-[150px]" />
          <div className="absolute bg-[#b9e2fe] blur-[32px] rounded-full w-96 h-96 bottom-20 right-10" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Hero - Two Column */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-center justify-center">
            {/* Left Column */}
            <div className="w-full lg:w-[544px] flex flex-col gap-[24px] items-center lg:items-start">
              <h1 className="text-[36px] lg:text-[60px] font-bold text-[#021954] leading-[36px] lg:leading-[74px] tracking-[-2px] text-center lg:text-left w-full max-w-[343px] lg:max-w-none">
                <span className="font-normal">#1</span> <span className="font-semibold">Texas Driver Safety Course:</span> <span className="font-normal">Fast, Convenient, & Online</span>
              </h1>
              <p className="text-[18px] lg:text-xl text-[#616d7b] leading-[28px] lg:leading-7 max-w-[576px] text-center lg:text-left">
                Complete your Texas-approved 6-hour<br className="lg:hidden" />
                <span className="hidden lg:inline"> </span>defensive driving course from any<br className="lg:hidden" />
                <span className="hidden lg:inline"> </span>device. Dismiss your ticket or reduce<br className="lg:hidden" />
                <span className="hidden lg:inline"> </span>insurance rates — it's never been easier.
              </p>
              <div className="flex flex-col sm:flex-row gap-[16px] pt-[8px] w-full items-center lg:items-start">
                <Button 
                  href="/courses/tx-defensive" 
                  variant="custom" 
                  className="bg-[#0667D1] hover:bg-[#0556b3] text-white h-[56px] px-[40px] sm:px-[40px] rounded-[16px] shadow-[0px_20px_25px_-5px_rgba(17,23,34,0.10),0px_8px_10px_-6px_rgba(17,23,34,0.05)] text-[18px] font-semibold flex items-center justify-center leading-[28px] no-underline text-center w-full sm:w-auto"
                  style={{ fontFamily: "'DM Sans', sans-serif", textAlign: 'center' }}
                >
                  <span className="sm:hidden">Start Course — $25</span>
                  <span className="hidden sm:inline">Start Course</span>
                </Button>
                <Button 
                  href="/texas/pricing" 
                  variant="custom" 
                  className="bg-white border border-[#e4e6ea] text-[#1e2832] h-[56px] px-[40px] sm:px-[40px] rounded-[16px] shadow-[0px_4px_6px_-1px_rgba(17,23,34,0.07),0px_2px_4px_-2px_rgba(17,23,34,0.05)] text-[18px] font-semibold flex items-center justify-center leading-[28px] no-underline text-center w-full sm:w-auto"
                  style={{ fontFamily: "'DM Sans', sans-serif", textAlign: 'center' }}
                >
                  Learn More
              </Button>
              </div>
            </div>
            
            {/* Right Column - Phone Mockup */}
            <div className="relative w-full lg:w-[544px] flex items-start justify-center lg:justify-end">
              <div className="relative w-full max-w-[240px] mx-auto lg:mx-0 scale-75 lg:scale-100">
                {/* Phone Frame */}
                <div className="aspect-[320/675.55] bg-[#1e2832] rounded-[48px] p-2 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
                  <div className="bg-white rounded-[40px] h-full overflow-hidden">
                    {/* Status Bar */}
                    <div className="bg-[#f0f2f4] h-8 flex items-center justify-center">
                      <div className="bg-[#1e2832] h-5 w-20 rounded-full" />
                    </div>
                    {/* Phone Content */}
                    <div className="p-4 space-y-4">
                      <div className="flex gap-2 items-center">
                        <div className="bg-[#03449e] rounded-xl w-8 h-8 flex-shrink-0" />
                        <div className="flex flex-col gap-1 flex-1">
                          <div className="bg-[#e5e8eb] border border-[#e4e6ea] h-3 rounded w-20" />
                          <div className="bg-[#f0f2f4] h-2 rounded w-14" />
                        </div>
                      </div>
                      {/* Course Progress Card */}
                      <div className="bg-[#e5f6fe] rounded-2xl p-4 relative h-[84px]">
                        <p className="text-[#03449e] text-xs font-semibold mb-2">Course Progress</p>
                        <div className="absolute left-4 right-4 top-10 bg-[#7cc3f9] h-2 rounded-full overflow-hidden">
                          <div className="bg-[#0351b4] h-full w-1/3 rounded-full" />
                        </div>
                        <p className="absolute left-4 right-4 top-[52px] text-[#0351b4] text-xs">4 of 6 modules complete</p>
                      </div>
                      {/* Module Items */}
                      <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="bg-[#f9fafb] rounded-xl p-3 flex gap-3 items-center">
                            <div className={`rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 ${i <= 2 ? 'bg-[#0967d2]' : 'bg-[#e5e8eb] border border-[#e4e6ea]'}`}>
                              {i <= 2 && (
                                <img src="/assets/icons/texas/checkmark-white.svg" alt="" className="w-3 h-3" />
                              )}
                            </div>
                            <div className="bg-[#e5e8eb] border border-[#e4e6ea] h-2.5 rounded w-24 flex-1" />
                          </div>
                        ))}
                      </div>
                      <Button 
                        href="/courses/tx-defensive" 
                        variant="custom" 
                        className="w-full bg-[#0667d1] text-white rounded-xl py-[14.8px] pb-[13.2px] text-sm font-semibold flex items-center justify-center leading-5"
                      >
                        Continue Module
                      </Button>
                    </div>
                  </div>
              </div>
              
                {/* Floating Badge - Court Approved */}
                <div className="absolute bg-white rounded-2xl shadow-[0px_20px_25px_-5px_rgba(17,23,34,0.1),0px_8px_10px_-6px_rgba(17,23,34,0.05)] p-4 right-[-17px] top-16 flex gap-3 items-center">
                  <div className="bg-[#e5f6fe] rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <img src="/assets/icons/texas/check-circle.svg" alt="" className="w-5 h-5" />
              </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1e2832] leading-5">Court Approved</p>
                    <p className="text-xs text-[#616d7b] leading-4">All Texas courts</p>
            </div>
          </div>

                {/* Floating Badge - Rating */}
                <div className="absolute bg-white rounded-2xl shadow-[0px_20px_25px_-5px_rgba(17,23,34,0.1),0px_8px_10px_-6px_rgba(17,23,34,0.05)] p-3 left-[-16px] bottom-[128px] flex flex-col gap-1">
                  <div className="flex gap-2 items-center">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <img key={i} src="/assets/icons/texas/star-rating.svg" alt="" className="w-4 h-4" />
                      ))}
              </div>
                    <p className="text-sm font-semibold text-[#1e2832] leading-5">4.9/5</p>
                  </div>
                  <p className="text-xs text-[#616d7b] leading-4">2,400+ reviews</p>
                </div>
              </div>
              </div>
            </div>
            
          {/* Feature Badges - 4 Column Horizontal Layout */}
          <div className="relative flex flex-col sm:flex-row gap-6 lg:gap-8 mt-12 lg:mt-16 justify-center items-center">
            {/* Vector decorations - positioned between cards based on Figma design */}
            {/* Vector 1: between card 1 and 2, at y=55.65px relative to container top (31.65px from card top) */}
            <div className="absolute left-[calc(25%-68px+12px)] top-[31.65px] w-[136px] h-4 hidden lg:block z-0">
              <img src="/assets/icons/texas/vector-decoration-features.svg" alt="" className="w-full h-full" />
              </div>
            {/* Vector 2: between card 2 and 3, at y=79.65px relative to container top (55.65px from card top), flipped */}
            <div className="absolute left-[calc(50%-68px+12px)] top-[55.65px] w-[136px] h-4 hidden lg:block z-0 transform scale-y-[-1]">
              <img src="/assets/icons/texas/vector-decoration-features.svg" alt="" className="w-full h-full" />
              </div>
            {/* Vector 3: between card 3 and 4, at y=55.65px relative to container top (31.65px from card top) */}
            <div className="absolute left-[calc(75%-68px+12px)] top-[31.65px] w-[136px] h-4 hidden lg:block z-0">
              <img src="/assets/icons/texas/vector-decoration-features.svg" alt="" className="w-full h-full" />
            </div>
            
            {/* TDLR-Approved */}
            <div className="relative flex-1 max-w-[282px] w-full flex flex-col gap-6 items-center px-3 py-8 rounded-[20px]">
              <div className="relative flex items-center justify-center w-[78px] h-[80px]">
                <div className="absolute inset-0 border border-[#e8e8e8] rounded-2xl" />
                <div className="relative w-10 h-10 flex items-center justify-center z-10 py-5">
                  <img src="/assets/icons/texas/tdlr-approved-icon.svg" alt="" className="w-10 h-10" />
              </div>
              </div>
              <div className="flex flex-col gap-3 items-center w-full">
                <h3 className="text-2xl font-semibold text-[#151515] leading-[32px]">TDLR- Approved</h3>
                <p className="text-sm text-[#4a5565] leading-5 text-center">
                  State-certified course accepted by all<br />
                  Texas courts
                </p>
              </div>
            </div>
            
            {/* Mobile Friendly */}
            <div className="relative flex-1 max-w-[282px] w-full flex flex-col gap-6 items-center px-3 py-8 rounded-[20px]">
              <div className="relative flex items-center justify-center w-[78px] h-[80px]">
                <div className="absolute inset-0 border border-[#e8e8e8] rounded-2xl" />
                <div className="relative w-10 h-10 flex items-center justify-center z-10 py-5">
                  <img src="/assets/icons/texas/mobile-friendly-icon.svg" alt="" className="w-10 h-10" />
              </div>
              </div>
              <div className="flex flex-col gap-3 items-center w-full">
                <h3 className="text-2xl font-semibold text-[#151515] leading-[32px]">Mobile Friendly</h3>
                <p className="text-sm text-[#4a5565] leading-5 text-center">
                  Complete on any device - phone,<br />
                  tablet, or computer
                </p>
              </div>
            </div>
            
            {/* Super Easy */}
            <div className="relative flex-1 max-w-[282px] w-full flex flex-col gap-6 items-center px-3 py-8 rounded-[20px]">
              <div className="relative flex items-center justify-center w-[78px] h-[80px]">
                <div className="absolute inset-0 border border-[#e8e8e8] rounded-2xl" />
                <div className="relative w-10 h-10 flex items-center justify-center z-10 py-5">
                  <img src="/assets/icons/texas/super-easy-icon.svg" alt="" className="w-10 h-10" />
                </div>
              </div>
              <div className="flex flex-col gap-3 items-center w-full">
                <h3 className="text-2xl font-semibold text-[#151515] leading-[32px]">Super Easy</h3>
                <p className="text-sm text-[#4a5565] leading-5 text-center">
                  Simple lessons, unlimited quiz<br />
                  attempts, auto-save progress
                </p>
              </div>
            </div>
            
            {/* 100% Guarantee */}
            <div className="relative flex-1 max-w-[282px] w-full flex flex-col gap-6 items-center px-3 py-8 rounded-[20px]">
              <div className="relative flex items-center justify-center w-[78px] h-[80px]">
                <div className="absolute inset-0 border border-[#e8e8e8] rounded-2xl" />
                <div className="relative w-10 h-10 flex items-center justify-center z-10 py-5">
                  <img src="/assets/icons/texas/guarantee-icon.svg" alt="" className="w-10 h-10" />
                </div>
              </div>
              <div className="flex flex-col gap-3 items-center w-full">
                <h3 className="text-2xl font-semibold text-[#151515] leading-[32px]">100% Guarantee</h3>
                <p className="text-sm text-[#4a5565] leading-5 text-center">
                  Not a fit? Get a full refund before you complete the course.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Info + Pricing Card */}
      <section className="py-16 lg:py-[112px] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start justify-center">
            {/* Left Column */}
            <div className="flex flex-col gap-[24px] items-start w-full lg:w-[536px] pb-8 lg:pb-0">
              <div className="bg-[#e5f6fe] inline-flex items-center px-4 py-2 rounded-full">
                <span className="text-sm font-semibold text-[#0351b4] leading-5">Texas Defensive Driving</span>
              </div>
              <h2 className="text-[30px] lg:text-[48px] font-bold text-[#1e2832] leading-[36px] lg:leading-[48px] tracking-[-0.75px] lg:tracking-[-1.2px]">
                Texas Defensive Driving<br />
                <span className="text-[#03449e]">Course (6 hr)</span>
              </h2>
              <p className="text-[18px] lg:text-lg text-[#616d7b] leading-[28px] lg:leading-7">
                Everything you need to dismiss your<br className="lg:hidden" />
                <span className="hidden lg:inline"> </span>Texas traffic ticket or<br className="lg:hidden" />
                <span className="hidden lg:inline"> </span>reduce insurance<br className="lg:hidden" />
                <span className="hidden lg:inline"> </span>premiums. State-approved, court-<br className="lg:hidden" />
                <span className="hidden lg:inline"> </span>accepted, and designed for busy Texans.
              </p>
              {/* Feature List - Vertical Stack for Mobile */}
              <div className="flex flex-col gap-[16px] w-full pt-[8px]">
                {/* 6-Hour State-Approved Course */}
                <div className="flex gap-[12px] items-center">
                  <div className="bg-[#e5f6fe] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <img src="/assets/icons/texas/checkmark-feature.svg" alt="" className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[16px] font-medium text-[#1e2832] leading-[24px]">6-Hour State-Approved Course</span>
                </div>
                {/* Instant Digital Certificate */}
                <div className="flex gap-[12px] items-center">
                  <div className="bg-[#e5f6fe] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <img src="/assets/icons/texas/checkmark-feature.svg" alt="" className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[16px] font-medium text-[#1e2832] leading-[24px]">Instant Digital Certificate</span>
                </div>
                {/* Mobile & Desktop Access */}
                <div className="flex gap-[12px] items-center">
                  <div className="bg-[#e5f6fe] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <img src="/assets/icons/texas/checkmark-feature.svg" alt="" className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[16px] font-medium text-[#1e2832] leading-[24px]">Mobile & Desktop Access</span>
                </div>
                {/* Automatic Progress Saving */}
                <div className="flex gap-[12px] items-center">
                  <div className="bg-[#e5f6fe] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <img src="/assets/icons/texas/checkmark-feature.svg" alt="" className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[16px] font-medium text-[#1e2832] leading-[24px]">Automatic Progress Saving</span>
                </div>
                {/* Unlimited Quiz Attempts */}
                <div className="flex gap-[12px] items-center">
                  <div className="bg-[#e5f6fe] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <img src="/assets/icons/texas/checkmark-feature.svg" alt="" className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[16px] font-medium text-[#1e2832] leading-[24px]">Unlimited Quiz Attempts</span>
                </div>
                {/* Customer Support */}
                <div className="flex gap-[12px] items-center">
                  <div className="bg-[#e5f6fe] rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <img src="/assets/icons/texas/checkmark-feature.svg" alt="" className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[16px] font-medium text-[#1e2832] leading-[24px]">Customer Support</span>
                </div>
              </div>
            </div>

            {/* Right Column - Pricing Card */}
            <div className="bg-white border border-[#e4e6ea] rounded-[20px] shadow-[0px_1px_3px_0px_rgba(17,23,34,0.04),0px_6px_16px_0px_rgba(17,23,34,0.06)] p-[34px] lg:sticky lg:top-0 w-full lg:w-[536px] h-[520px] flex flex-col">
              {/* Price */}
              <div className="mb-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-[48px] font-bold text-[#1e2832] leading-[48px]">$25</span>
                  <span className="text-base text-[#616d7b] leading-6">.00</span>
                  <span className="text-2xl font-medium text-[#616d7b] leading-[48px] line-through ml-4">$35.00</span>
                </div>
              </div>
              <div className="text-sm text-[#616d7b] leading-5 mb-4">+ $3.00 state processing fee</div>
              
              {/* Star Rating */}
              <div className="flex gap-3 items-center pb-6 pt-4 mb-6">
                <div className="flex gap-0">
                  {[...Array(5)].map((_, i) => (
                    <img key={i} src="/assets/icons/texas/star-pricing.svg" alt="" className="w-5 h-5" />
                  ))}
                </div>
                <span className="text-sm font-medium text-[#1e2832] leading-5">4.9 out of 5</span>
              </div>

              {/* Enroll Button */}
              <Button 
                href="/courses/tx-defensive" 
                variant="custom" 
                className="w-full h-[56px] bg-[#0667d1] hover:bg-[#0556b3] text-white rounded-2xl shadow-[0px_10px_15px_-3px_rgba(17,23,34,0.08),0px_4px_6px_-4px_rgba(17,23,34,0.05)] text-lg font-semibold flex items-center justify-center gap-2 mb-6"
              >
                Enroll Now
                <img src="/assets/icons/texas/arrow-enroll.svg" alt="" className="w-4 h-4" />
              </Button>

              {/* Trust Indicators */}
              <div className="flex flex-col gap-3 pt-4">
                <div className="flex gap-2 items-center">
                  <img src="/assets/icons/texas/secure-checkout-icon.svg" alt="" className="w-4 h-4" />
                  <span className="text-sm text-[#616d7b] leading-5">Secure checkout</span>
            </div>
                <div className="flex gap-2 items-center">
                  <img src="/assets/icons/texas/tdlr-provider-icon.svg" alt="" className="w-4 h-4" />
                  <span className="text-sm text-[#616d7b] leading-5">TDLR-approved provider</span>
                </div>
                <div className="flex gap-2 items-center">
                  <img src="/assets/icons/texas/money-back-icon.svg" alt="" className="w-4 h-4" />
                  <span className="text-sm text-[#616d7b] leading-5">100% risk-free guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Accordion */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-[#f9fafb] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col gap-4 items-center mb-12">
            <h2 className="text-4xl lg:text-[48px] font-bold text-[#101828] text-center leading-[48px]">
            What to Expect
          </h2>
            <p className="text-lg text-[#4a5565] text-center leading-7">
              Everything you need to know about the Texas defensive driving process
            </p>
                    </div>
                    
          {/* Accordion Items */}
          <div className="flex flex-col gap-4">
            {/* Texas Requirements - Expanded by default */}
            <div className={`bg-white rounded-2xl overflow-hidden transition-all ${expandedExpect === 'texas-requirements' ? 'border-2 border-[#03449e] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]' : 'border border-[#e5e7eb] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]'}`}>
              <button
                onClick={() => setExpandedExpect(expandedExpect === 'texas-requirements' ? null : 'texas-requirements')}
                className="w-full h-[100px] relative rounded-2xl"
              >
                <div className="absolute left-8 top-6 flex gap-4 items-center">
                  <div className={`rounded-2xl w-12 h-12 flex items-center justify-center ${expandedExpect === 'texas-requirements' ? 'bg-[#e5f6fe]' : 'bg-[#f9fafb]'}`}>
                    <img src={expandedExpect === 'texas-requirements' ? imgTexasRequirementsActive : imgTexasRequirementsInactive} alt="" className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col gap-1 items-start">
                    <h3 className="text-xl font-bold text-[#101828] leading-7">Texas Requirements</h3>
                    <p className="text-sm text-[#4a5565] leading-5">Everything Texas law requires for ticket dismissal</p>
                  </div>
                </div>
                <div className="absolute right-8 top-6 w-4 h-4 flex items-center justify-center">
                  <img src={imgChevronDown} alt="" className={`w-4 h-4 transition-transform ${expandedExpect === 'texas-requirements' ? 'rotate-180' : ''}`} />
                </div>
              </button>
              {expandedExpect === 'texas-requirements' && (
                <div className="px-8 pb-6 pt-0">
                  <div className="bg-[#fafafa] border border-[#e4e6ea] rounded-2xl p-6 flex flex-col gap-6">
                    <p className="text-sm text-[#364153] leading-6 mb-2">
                      Texas doesn't just say "take a course." To dismiss a ticket with defensive driving, most Texas courts require you to:
                    </p>
                    {/* Requirement Cards - Stacked */}
                    <div className="flex flex-col gap-4">
                      {/* Be Eligible */}
                      <div className="bg-white border border-[#f3f4f6] rounded-[10px] p-4">
                        <div className="flex gap-3 items-start">
                          <div className="pt-0.5 flex-shrink-0">
                            <img src={imgRequirementCheck} alt="" className="w-[18px] h-[18px]" />
                  </div>
                          <div className="flex flex-col gap-1 flex-1">
                            <h4 className="text-sm font-bold text-[#101828] leading-5 mb-1">Be Eligible</h4>
                            <p className="text-sm text-[#4a5565] leading-5">In general, you must not hold a commercial driver license, must not have been going 25 mph or more over the posted limit, and you usually can't have taken a Texas defensive driving course for ticket dismissal in the last 12 months.</p>
          </div>
        </div>
                      </div>
                      {/* Get Permission */}
                      <div className="bg-white border border-[#f3f4f6] rounded-[10px] p-4">
                        <div className="flex gap-3 items-start">
                          <div className="pt-0.5 flex-shrink-0">
                            <img src={imgRequirementCheck} alt="" className="w-[18px] h-[18px]" />
                          </div>
                          <div className="flex flex-col gap-1 flex-1">
                            <h4 className="text-sm font-bold text-[#101828] leading-5 mb-1">Get Permission</h4>
                            <p className="text-sm text-[#4a5565] leading-5">Before your deadline, your judge or court clerk must approve you to take a 6-hour state-approved defensive driving course for ticket dismissal.</p>
                          </div>
                        </div>
                      </div>
                      {/* Complete a Course */}
                      <div className="bg-white border border-[#f3f4f6] rounded-[10px] p-4">
                        <div className="flex gap-3 items-start">
                          <div className="pt-0.5 flex-shrink-0">
                            <img src={imgRequirementCheck} alt="" className="w-[18px] h-[18px]" />
                          </div>
                          <div className="flex flex-col gap-1 flex-1">
                            <h4 className="text-sm font-bold text-[#101828] leading-5 mb-1">Complete a Course</h4>
                            <p className="text-sm text-[#4a5565] leading-5">You must finish every lesson, pass the required quizzes and final exam, and certify that you—not someone else—completed the course.</p>
                          </div>
                        </div>
                      </div>
                      {/* Get a Copy of Your Driving Record */}
                      <div className="bg-white border border-[#f3f4f6] rounded-[10px] p-4">
                        <div className="flex gap-3 items-start">
                          <div className="pt-0.5 flex-shrink-0">
                            <img src={imgRequirementCheck} alt="" className="w-[18px] h-[18px]" />
                          </div>
                          <div className="flex flex-col gap-1 flex-1">
                            <h4 className="text-sm font-bold text-[#101828] leading-5 mb-1">Get a Copy of Your Driving Record</h4>
                            <p className="text-sm text-[#4a5565] leading-5">Many Texas courts require a copy of your 3A driving record along with your course certificate.</p>
                          </div>
                        </div>
                      </div>
                      {/* Turn Everything In */}
                      <div className="bg-white border border-[#f3f4f6] rounded-[10px] p-4">
                        <div className="flex gap-3 items-start">
                          <div className="pt-0.5 flex-shrink-0">
                            <img src={imgRequirementCheck} alt="" className="w-[18px] h-[18px]" />
                          </div>
                          <div className="flex flex-col gap-1 flex-1">
                            <h4 className="text-sm font-bold text-[#101828] leading-5 mb-1">Turn Everything In</h4>
                            <p className="text-sm text-[#4a5565] leading-5">You'll submit your Certificate of Course Completion to the court by the deadline they give you.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-[#364153] leading-6 mt-2">
                      Every court and precinct can have slightly different instructions, so always follow your local court's rules first.
                    </p>
                  </div>
                </div>
              )}
                    </div>
                    
            {/* Topics Covered */}
            <div className={`bg-white rounded-2xl overflow-hidden transition-all ${expandedExpect === 'topics-covered' ? 'border-2 border-[#03449e] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]' : 'border border-[#e5e7eb] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]'}`}>
              <button
                onClick={() => setExpandedExpect(expandedExpect === 'topics-covered' ? null : 'topics-covered')}
                className="w-full h-[100px] relative rounded-2xl"
              >
                <div className="absolute left-8 top-6 flex gap-4 items-center">
                  <div className="bg-[#f9fafb] rounded-2xl w-12 h-12 flex items-center justify-center">
                    <img src={imgTopicsCovered} alt="" className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col gap-1 items-start">
                    <h3 className="text-xl font-bold text-[#101828] leading-7">Topics Covered</h3>
                    <p className="text-sm text-[#4a5565] leading-5">Comprehensive curriculum required by Texas</p>
                </div>
              </div>
                <div className="absolute right-8 top-6 w-4 h-4 flex items-center justify-center">
                  <img src={imgChevronDown} alt="" className={`w-4 h-4 transition-transform ${expandedExpect === 'topics-covered' ? 'rotate-180' : ''}`} />
              </div>
              </button>
              {expandedExpect === 'topics-covered' && (
                <div className="px-8 pb-6 pt-0">
                  <div className="bg-[#fafafa] border border-[#e4e6ea] rounded-2xl p-6 flex flex-col gap-6">
                    <p className="text-sm text-[#364153] leading-6">
                      In 6 hours (the Texas state minimum, with two built-in breaks instead of extra fluff, we cover:
                    </p>
                    {/* Topic Cards - Stacked */}
                    <div className="flex flex-col gap-4">
                      {/* Texas traffic laws & ticket dismissal basics */}
                      <div className="bg-white border border-[#f3f4f6] rounded-[10px] p-4">
                        <div className="flex gap-3 items-start">
                          <div className="pt-0.5 flex-shrink-0">
                            <img src={imgRequirementCheck} alt="" className="w-[18px] h-[18px]" />
              </div>
                          <div className="flex flex-col gap-1 flex-1">
                            <h4 className="text-sm font-bold text-[#101828] leading-5 mb-1">Texas traffic laws & ticket dismissal basics</h4>
                            <p className="text-sm text-[#4a5565] leading-5">Why the laws exist, how tickets work, and what courts actually care about.</p>
            </div>
              </div>
            </div>
                      {/* Real-world defensive driving */}
                      <div className="bg-white border border-[#f3f4f6] rounded-[10px] p-4">
                        <div className="flex gap-3 items-start">
                          <div className="pt-0.5 flex-shrink-0">
                            <img src={imgRequirementCheck} alt="" className="w-[18px] h-[18px]" />
          </div>
                          <div className="flex flex-col gap-1 flex-1">
                            <h4 className="text-sm font-bold text-[#101828] leading-5 mb-1">Real-world defensive driving</h4>
                            <p className="text-sm text-[#4a5565] leading-5">The 5 pillars of defensive driving, high-risk situations, crash dynamics, and how to avoid or reduce crash severity.</p>
                  </div>
                </div>
              </div>
                      {/* Driver mindset & psychology */}
                      <div className="bg-white border border-[#f3f4f6] rounded-[10px] p-4">
                        <div className="flex gap-3 items-start">
                          <div className="pt-0.5 flex-shrink-0">
                            <img src={imgRequirementCheck} alt="" className="w-[18px] h-[18px]" />
                          </div>
                          <div className="flex flex-col gap-1 flex-1">
                            <h4 className="text-sm font-bold text-[#101828] leading-5 mb-1">Driver mindset & psychology</h4>
                            <p className="text-sm text-[#4a5565] leading-5">Attitude, road rage, distraction, multitasking myths, and how your emotions silently change the way you drive.</p>
                          </div>
                        </div>
                      </div>
                      {/* Alcohol, drugs & DWI */}
                      <div className="bg-white border border-[#f3f4f6] rounded-[10px] p-4">
                        <div className="flex gap-3 items-start">
                          <div className="pt-0.5 flex-shrink-0">
                            <img src={imgRequirementCheck} alt="" className="w-[18px] h-[18px]" />
                          </div>
                          <div className="flex flex-col gap-1 flex-1">
                            <h4 className="text-sm font-bold text-[#101828] leading-5 mb-1">Alcohol, drugs & DWI</h4>
                            <p className="text-sm text-[#4a5565] leading-5">How substances affect your brain and body, key Texas laws, and real-life consequences (and how to avoid them).</p>
                          </div>
                        </div>
                      </div>
                      {/* Vulnerable road users & big vehicles */}
                      <div className="bg-white border border-[#f3f4f6] rounded-[10px] p-4">
                        <div className="flex gap-3 items-start">
                          <div className="pt-0.5 flex-shrink-0">
                            <img src={imgRequirementCheck} alt="" className="w-[18px] h-[18px]" />
                          </div>
                          <div className="flex flex-col gap-1 flex-1">
                            <h4 className="text-sm font-bold text-[#101828] leading-5 mb-1">Vulnerable road users & big vehicles</h4>
                            <p className="text-sm text-[#4a5565] leading-5">Pedestrians, cyclists, motorcyclists, school buses, emergency vehicles, large trucks, and work zones.</p>
                          </div>
                        </div>
                      </div>
                      {/* Modern Texas road issues */}
                      <div className="bg-white border border-[#f3f4f6] rounded-[10px] p-4">
                        <div className="flex gap-3 items-start">
                          <div className="pt-0.5 flex-shrink-0">
                            <img src={imgRequirementCheck} alt="" className="w-[18px] h-[18px]" />
                          </div>
                          <div className="flex flex-col gap-1 flex-1">
                            <h4 className="text-sm font-bold text-[#101828] leading-5 mb-1">Modern Texas road issues</h4>
                            <p className="text-sm text-[#4a5565] leading-5">Street racing awareness, human trafficking prevention, litter prevention, organ donation awareness, and traffic stop protocols.</p>
                          </div>
                        </div>
                      </div>
                      {/* Special programs & recovery */}
                      <div className="bg-white border border-[#f3f4f6] rounded-[10px] p-4">
                        <div className="flex gap-3 items-start">
                          <div className="pt-0.5 flex-shrink-0">
                            <img src={imgRequirementCheck} alt="" className="w-[18px] h-[18px]" />
                          </div>
                          <div className="flex flex-col gap-1 flex-1">
                            <h4 className="text-sm font-bold text-[#101828] leading-5 mb-1">Special programs & recovery</h4>
                            <p className="text-sm text-[#4a5565] leading-5">Driving with disabilities indicators, oversize/overweight vehicle awareness, insurance, SR-22, and Texas support resources.</p>
                          </div>
                        </div>
              </div>
            </div>
                    {/* Testing Section */}
                    <div className="mt-4">
                      <h4 className="text-sm font-bold text-[#101828] leading-5 mb-2">Testing</h4>
                      <p className="text-sm text-[#364153] leading-6">
                        And don't stress about testing: instead of a giant scary exam, you'll see short 3-question knowledge checks along the way and one final quiz. You always get unlimited retries, so the goal is learning—not tricking you.
                      </p>
              </div>
            </div>
            </div>
              )}
          </div>

            {/* Support Details */}
            <div className={`bg-white rounded-2xl overflow-hidden transition-all ${expandedExpect === 'support-details' ? 'border-2 border-[#03449e] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]' : 'border border-[#e5e7eb] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]'}`}>
              <button
                onClick={() => setExpandedExpect(expandedExpect === 'support-details' ? null : 'support-details')}
                className="w-full h-[100px] relative rounded-2xl"
              >
                <div className="absolute left-8 top-6 flex gap-4 items-center">
                  <div className="bg-[#f9fafb] rounded-2xl w-12 h-12 flex items-center justify-center">
                    <img src={imgSupportDetails} alt="" className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col gap-1 items-start">
                    <h3 className="text-xl font-bold text-[#101828] leading-7">Support Details</h3>
                    <p className="text-sm text-[#4a5565] leading-5">We're here to help throughout your course</p>
                </div>
              </div>
                <div className="absolute right-8 top-6 w-4 h-4 flex items-center justify-center">
                  <img src={imgChevronDown} alt="" className={`w-4 h-4 transition-transform ${expandedExpect === 'support-details' ? 'rotate-180' : ''}`} />
              </div>
              </button>
              {expandedExpect === 'support-details' && (
                <div className="px-8 pb-6 pt-0">
                  <div className="bg-[#fafafa] border border-[#e4e6ea] rounded-2xl p-6 flex flex-col gap-6">
                    <p className="text-sm text-[#364153] leading-6">
                      Our friendly support team is here to help with anything from questions about topics covered to technical issues like login or account access. You can browse our help articles and resources anytime, and if you still need assistance, email us and a real person will typically respond within one business day.
                    </p>
              </div>
            </div>
              )}
            </div>

            {/* After Taking Course */}
            <div className={`bg-white rounded-2xl overflow-hidden transition-all ${expandedExpect === 'after-taking-course' ? 'border-2 border-[#03449e] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]' : 'border border-[#e5e7eb] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]'}`}>
              <button
                onClick={() => setExpandedExpect(expandedExpect === 'after-taking-course' ? null : 'after-taking-course')}
                className="w-full h-[100px] relative rounded-2xl"
              >
                <div className="absolute left-8 top-6 flex gap-4 items-center">
                  <div className="bg-[#f9fafb] rounded-2xl w-12 h-12 flex items-center justify-center">
                    <img src={imgAfterTakingCourse} alt="" className="w-6 h-6" />
          </div>
                  <div className="flex flex-col gap-1 items-start">
                    <h3 className="text-xl font-bold text-[#101828] leading-7">After Taking Course</h3>
                    <p className="text-sm text-[#4a5565] leading-5">What happens once you complete the course</p>
                  </div>
                </div>
                <div className="absolute right-8 top-6 w-4 h-4 flex items-center justify-center">
                  <img src={imgChevronDown} alt="" className={`w-4 h-4 transition-transform ${expandedExpect === 'after-taking-course' ? 'rotate-180' : ''}`} />
              </div>
              </button>
              {expandedExpect === 'after-taking-course' && (
                <div className="px-8 pb-6 pt-0">
                  <div className="bg-[#fafafa] border border-[#e4e6ea] rounded-2xl p-6 flex flex-col gap-6">
                    <p className="text-sm text-[#364153] leading-6">
                      Once you finish and pass, you'll get your Certificate of Completion right away.
                    </p>
                    <p className="text-sm text-[#364153] leading-6">
                      Most Texas courts also require you to submit two additional items along with your certificate:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-sm text-[#364153] leading-6 ml-4">
                      <li>Your Texas Driver Record (DPS "Type 3A")</li>
                      <li>A court affidavit (if your court requires one)</li>
              </ul>
                    <div className="bg-white border border-[#e4e6ea] rounded-[10px] p-4">
                      <p className="text-sm font-semibold text-[#101828] leading-5 mb-2">Important:</p>
                      <p className="text-sm text-[#364153] leading-6">
                        Every court is a little different. Always follow your court's exact submission instructions and deadline. Your county page will tell you where to send it and what to include.
                      </p>
            </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#101828] leading-5 mb-3">Typical next steps</h4>
                      <ol className="list-decimal list-inside space-y-2 text-sm text-[#364153] leading-6 ml-4">
                        <li>Download your certificate</li>
                        <li>Request your DPS Type 3A driver record</li>
                        <li>Complete any required court affidavit</li>
                        <li>Submit everything to the court by the deadline</li>
                      </ol>
                    </div>
                  </div>
            </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* What Our Customers Say */}
      <section className="py-[112px] px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          {/* Header */}
          <div className="flex flex-col gap-6 items-center">
            <div className="bg-[#e5f6fe] inline-flex items-center px-4 py-2 rounded-full">
              <span className="text-sm font-semibold text-[#0351b4] leading-5">Trusted by Texas Drivers</span>
            </div>
            <h2 className="text-4xl lg:text-[48px] font-bold text-[#1e2832] text-center leading-[48px] tracking-[-1.2px]">
              What Our Customers Say
          </h2>
            <p className="text-lg text-[#616d7b] text-center leading-7 max-w-[672px]">
              Join thousands of Texas drivers who have successfully dismissed their tickets<br />
              with Road Ready Safety.
            </p>
          </div>

          {/* Testimonials Grid - 2x2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 w-full">
            {/* Testimonial 1 - Michael T. */}
            <div className="bg-[#f9fafb] rounded-[20px] p-8 flex flex-col gap-4 items-start">
              <div className="flex gap-1 items-start">
                {[...Array(5)].map((_, i) => (
                  <img key={i} src="/assets/icons/texas/star-testimonial.svg" alt="" className="w-5 h-5" />
                ))}
              </div>
              <p className="text-lg text-[#1e2832] leading-[28px]">
                "Super easy and straightforward. I finished the whole<br />
                course in one afternoon while watching football. Certificate<br />
                was in my inbox immediately."
              </p>
              <div className="flex gap-3 items-center pt-2">
                <div className="bg-[#e5f6fe] rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-[#03449e]">MT</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-[#1e2832] leading-6">Michael T.</span>
                  <span className="text-sm text-[#616d7b] leading-5">Houston, TX</span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 - Sarah M. */}
            <div className="bg-[#f9fafb] rounded-[20px] p-8 pb-[60px] flex flex-col gap-4 items-start">
              <div className="flex gap-1 items-start">
                {[...Array(5)].map((_, i) => (
                  <img key={i} src="/assets/icons/texas/star-testimonial.svg" alt="" className="w-5 h-5" />
                ))}
              </div>
              <p className="text-lg text-[#1e2832] leading-[28px]">
                "I was dreading this, but Road Ready made it painless. The<br />
                court accepted my certificate right away. No issues at all."
              </p>
              <div className="flex gap-3 items-center pt-2">
                <div className="bg-[#e5f6fe] rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-[#03449e]">SM</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-[#1e2832] leading-6">Sarah M.</span>
                  <span className="text-sm text-[#616d7b] leading-5">Dallas, TX</span>
                </div>
              </div>
            </div>

            {/* Testimonial 3 - James R. */}
            <div className="bg-[#f9fafb] rounded-[20px] p-8 flex flex-col gap-4 items-start">
              <div className="flex gap-1 items-start">
                {[...Array(5)].map((_, i) => (
                  <img key={i} src="/assets/icons/texas/star-testimonial.svg" alt="" className="w-5 h-5" />
                ))}
              </div>
              <p className="text-lg text-[#1e2832] leading-[28px]">
                "Best $25 I've spent. Clear instructions, easy modules, and<br />
                my insurance actually went down. Wish I knew about this<br />
                sooner."
              </p>
              <div className="flex gap-3 items-center pt-2">
                <div className="bg-[#e5f6fe] rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-[#03449e]">JR</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-[#1e2832] leading-6">James R.</span>
                  <span className="text-sm text-[#616d7b] leading-5">Austin, TX</span>
                </div>
              </div>
            </div>

            {/* Testimonial 4 - Christina L. */}
            <div className="bg-[#f9fafb] rounded-[20px] p-8 pb-[60px] flex flex-col gap-4 items-start">
              <div className="flex gap-1 items-start">
                {[...Array(5)].map((_, i) => (
                  <img key={i} src="/assets/icons/texas/star-testimonial.svg" alt="" className="w-5 h-5" />
                ))}
              </div>
              <p className="text-lg text-[#1e2832] leading-[28px]">
                "Did the whole thing on my phone during lunch breaks. The<br />
                progress saving feature is a lifesaver. Highly recommend!"
              </p>
              <div className="flex gap-3 items-center pt-2">
                <div className="bg-[#e5f6fe] rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-semibold text-[#03449e]">CL</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-[#1e2832] leading-6">Christina L.</span>
                  <span className="text-sm text-[#616d7b] leading-5">San Antonio, TX</span>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Banner */}
          <div className="bg-[#03449e] rounded-[20px] p-12 flex flex-col md:flex-row items-center justify-center gap-8 w-full">
            <div className="flex flex-col gap-2 items-center w-[240px]">
              <div className="text-[36px] font-bold text-white text-center leading-[40px]">Unlimited</div>
              <div className="text-sm text-white text-center leading-[20px]">Quiz Attempts</div>
            </div>
            <div className="flex flex-col gap-2 items-center w-[240px]">
              <div className="text-[36px] font-bold text-white text-center leading-[40px]">4.9/5</div>
              <div className="text-sm text-white text-center leading-[20px]">Average Rating</div>
            </div>
            <div className="flex flex-col gap-2 items-center w-[240px]">
              <div className="text-[36px] font-bold text-white text-center leading-[40px]">100%</div>
              <div className="text-sm text-white text-center leading-[20px]">Satisfaction Guarantee</div>
            </div>
            <div className="flex flex-col gap-2 items-center w-[240px]">
              <div className="text-[36px] font-bold text-white text-center leading-[40px]">6 hrs</div>
              <div className="text-sm text-white text-center leading-[20px]">Average Completion</div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-[112px] px-4 sm:px-6 lg:px-8 bg-[#f9fafb]">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4 items-center relative h-[140px]">
            <div className="bg-[#e5f6fe] inline-flex items-center px-4 py-2 rounded-full">
              <span className="text-sm font-semibold text-[#0351b4] leading-5">Got Questions?</span>
            </div>
            <h2 className="text-[36px] font-bold text-[#1e2832] text-center leading-[40px] tracking-[-0.9px]">
              Frequently Asked Questions
          </h2>
            <p className="text-base text-[#616d7b] text-center leading-6">
              Everything you need to know about our Texas defensive driving course.
            </p>
          </div>

          {/* FAQ Accordion Items */}
          <div className="flex flex-col gap-4">
            {/* FAQ 1 */}
            <div className="bg-white border border-[#e4e6ea] rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === 'faq1' ? null : 'faq1')}
                className="w-full px-6 py-5 flex items-center justify-between"
              >
                <span className="text-base font-semibold text-[#1e2832] leading-6 tracking-[-0.4px] text-left">
                  Why is the course $25 + $3?
                </span>
                <img 
                  src="/assets/icons/texas/chevron-faq.svg" 
                  alt="" 
                  className={`w-4 h-4 transition-transform ${expandedFAQ === 'faq1' ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedFAQ === 'faq1' && (
                <div className="px-6 pb-5">
                  <p className="text-base text-[#616d7b] leading-6">
                    The $25 is our course fee, and the $3 is a required state processing fee that goes directly to the Texas Department of Licensing and Regulation (TDLR). This is the minimum fee allowed by Texas law.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 2 */}
            <div className="bg-white border border-[#e4e6ea] rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === 'faq2' ? null : 'faq2')}
                className="w-full px-6 py-5 flex items-center justify-between"
              >
                <span className="text-base font-semibold text-[#1e2832] leading-6 tracking-[-0.4px] text-left">
                  Is this accepted by all Texas courts?
                </span>
                <img 
                  src="/assets/icons/texas/chevron-faq.svg" 
                  alt="" 
                  className={`w-4 h-4 transition-transform ${expandedFAQ === 'faq2' ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedFAQ === 'faq2' && (
                <div className="px-6 pb-5">
                  <p className="text-base text-[#616d7b] leading-6">
                    Yes! We are a TDLR-approved provider, and our certificates are accepted by every court in Texas for ticket dismissal.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 3 */}
            <div className="bg-white border border-[#e4e6ea] rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === 'faq3' ? null : 'faq3')}
                className="w-full px-6 py-5 flex items-center justify-between"
              >
                <span className="text-base font-semibold text-[#1e2832] leading-6 tracking-[-0.4px] text-left">
                  Are there extra fees after completing the course?
                </span>
                <img 
                  src="/assets/icons/texas/chevron-faq.svg" 
                  alt="" 
                  className={`w-4 h-4 transition-transform ${expandedFAQ === 'faq3' ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedFAQ === 'faq3' && (
                <div className="px-6 pb-5">
                  <p className="text-base text-[#616d7b] leading-6">
                    No hidden fees. The $25 + $3 is all you pay. However, some courts may require you to submit a copy of your driving record (DPS Type 3A), which has a separate fee paid directly to the DPS.
                  </p>
                </div>
              )}
          </div>
          
            {/* FAQ 4 */}
            <div className="bg-white border border-[#e4e6ea] rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === 'faq4' ? null : 'faq4')}
                className="w-full px-6 py-5 flex items-center justify-between"
              >
                <span className="text-base font-semibold text-[#1e2832] leading-6 tracking-[-0.4px] text-left">
                  How do I get my certificate?
                </span>
                <img 
                  src="/assets/icons/texas/chevron-faq.svg" 
                  alt="" 
                  className={`w-4 h-4 transition-transform ${expandedFAQ === 'faq4' ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedFAQ === 'faq4' && (
                <div className="px-6 pb-5">
                  <p className="text-base text-[#616d7b] leading-6">
                    Your certificate is available immediately upon course completion. You can download it right away from your account dashboard to submit to your court.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 5 */}
            <div className="bg-white border border-[#e4e6ea] rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === 'faq5' ? null : 'faq5')}
                className="w-full px-6 py-5 flex items-center justify-between"
              >
                <span className="text-base font-semibold text-[#1e2832] leading-6 tracking-[-0.4px] text-left">
                  How long do I have to complete the course?
                </span>
                <img 
                  src="/assets/icons/texas/chevron-faq.svg" 
                  alt="" 
                  className={`w-4 h-4 transition-transform ${expandedFAQ === 'faq5' ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedFAQ === 'faq5' && (
                <div className="px-6 pb-5">
                  <p className="text-base text-[#616d7b] leading-6">
                    You have up to 180 days from enrollment to complete the course. However, you must finish before your court's deadline for ticket dismissal.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 6 */}
            <div className="bg-white border border-[#e4e6ea] rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === 'faq6' ? null : 'faq6')}
                className="w-full px-6 py-5 flex items-center justify-between"
              >
                <span className="text-base font-semibold text-[#1e2832] leading-6 tracking-[-0.4px] text-left">
                  Can I take the course on my phone?
                </span>
                <img 
                  src="/assets/icons/texas/chevron-faq.svg" 
                  alt="" 
                  className={`w-4 h-4 transition-transform ${expandedFAQ === 'faq6' ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedFAQ === 'faq6' && (
                <div className="px-6 pb-5">
                  <p className="text-base text-[#616d7b] leading-6">
                    Yes! The course is fully mobile-friendly. You can take it on any device — phone, tablet, or computer. Your progress automatically saves, so you can switch devices anytime.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 7 */}
            <div className="bg-white border border-[#e4e6ea] rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === 'faq7' ? null : 'faq7')}
                className="w-full px-6 py-5 flex items-center justify-between"
              >
                <span className="text-base font-semibold text-[#1e2832] leading-6 tracking-[-0.4px] text-left">
                  What if I fail the final exam?
                </span>
                <img 
                  src="/assets/icons/texas/chevron-faq.svg" 
                  alt="" 
                  className={`w-4 h-4 transition-transform ${expandedFAQ === 'faq7' ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedFAQ === 'faq7' && (
                <div className="px-6 pb-5">
                  <p className="text-base text-[#616d7b] leading-6">
                    You get unlimited retakes on all quizzes and the final exam. The goal is learning, not tricking you. Take your time and review the material as needed.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ 8 */}
            <div className="bg-white border border-[#e4e6ea] rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedFAQ(expandedFAQ === 'faq8' ? null : 'faq8')}
                className="w-full px-6 py-5 flex items-center justify-between"
              >
                <span className="text-base font-semibold text-[#1e2832] leading-6 tracking-[-0.4px] text-left">
                  Are refunds available?
                </span>
                <img 
                  src="/assets/icons/texas/chevron-faq.svg" 
                  alt="" 
                  className={`w-4 h-4 transition-transform ${expandedFAQ === 'faq8' ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedFAQ === 'faq8' && (
                <div className="px-6 pb-5">
                  <p className="text-base text-[#616d7b] leading-6">
                    Yes, we offer a 100% money-back guarantee. If you're not satisfied with the course, contact us within 30 days of enrollment for a full refund.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Still have questions? CTA */}
          <div className="bg-white border border-[#e4e6ea] rounded-[20px] p-8 flex flex-col gap-3 items-center">
            <h3 className="text-xl font-semibold text-[#1e2832] text-center leading-7 tracking-[-0.5px]">
              Still have questions?
            </h3>
            <p className="text-base text-[#616d7b] text-center leading-6 pb-3">
              Our Texas-based support team is here to help. We typically respond within 1 business day.
            </p>
            <Button 
              href="/contact" 
              variant="custom" 
              className="h-12 px-8 border-2 border-[#03449e] text-[#03449e] hover:bg-[#03449e] hover:text-white rounded-2xl text-base font-semibold flex items-center justify-center gap-2"
            >
              Contact Support
              <img src="/assets/icons/texas/arrow-contact-support.svg" alt="" className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[112px] px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#03449e] rounded-[24px] px-8 lg:px-16 xl:px-24 py-16 relative overflow-hidden">
            {/* Background blur effects */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute bg-[#46a2f2] blur-[32px] rounded-full w-[384px] h-[384px] -right-48 -top-48" />
              <div className="absolute bg-[#46a2f2] blur-[32px] rounded-full w-[256px] h-[256px] -bottom-32 -left-32" />
            </div>
            
            {/* Content */}
            <div className="relative flex flex-col gap-6 items-center max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-[48px] font-bold text-white text-center leading-[48px] tracking-[-1.2px]">
              Ready to Dismiss Your Texas Ticket?
            </h2>
            <p className="text-lg text-[#b9e2fe] text-center leading-7 max-w-[672px]">
              Join thousands of Texas drivers who have successfully completed their<br />
              defensive driving course with Road Ready Safety. Start today and get your<br />
              certificate instantly.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-[16px] items-center justify-center pt-[8px]">
              <Button 
                href="/courses/tx-defensive" 
                variant="custom" 
                className="h-[56px] px-[40px] py-0 bg-[#0667d1] hover:bg-[#0556b3] text-white rounded-[16px] shadow-[0px_20px_25px_-5px_rgba(17,23,34,0.1),0px_8px_10px_-6px_rgba(17,23,34,0.05)] text-[18px] font-semibold flex items-center justify-center gap-2 leading-[28px] no-underline"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Start Course — $25
                <img src="/assets/icons/texas/arrow-start-course.svg" alt="" className="w-4 h-4" />
              </Button>
              <Button 
                href="/texas" 
                variant="custom" 
                className="h-[56px] px-[41.6px] py-[1.6px] bg-white border border-[#e4e6ea] border-solid text-[#1e2832] rounded-[16px] shadow-[0px_4px_6px_-1px_rgba(17,23,34,0.07),0px_2px_4px_-2px_rgba(17,23,34,0.05)] text-[18px] font-semibold flex items-center justify-center leading-[28px] no-underline"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Learn More
              </Button>
            </div>
            
            {/* Badges */}
            <div className="flex flex-wrap gap-10 items-center justify-center pt-6">
              <div className="flex gap-2 items-center">
                <img src="/assets/icons/texas/tdlr-approved-badge.svg" alt="" className="w-5 h-5" />
                <span className="text-sm font-medium text-[#b9e2fe] leading-5">TDLR Approved</span>
              </div>
              <div className="flex gap-2 items-center">
                <img src="/assets/icons/texas/6-hour-course-badge.svg" alt="" className="w-5 h-5" />
                <span className="text-sm font-medium text-[#b9e2fe] leading-5">6-Hour Course</span>
              </div>
              <div className="flex gap-2 items-center">
                <img src="/assets/icons/texas/guarantee-badge.svg" alt="" className="w-5 h-5" />
                <span className="text-sm font-medium text-[#b9e2fe] leading-5">100% Guarantee</span>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

