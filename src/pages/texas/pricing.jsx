import React from 'react';
import Button from '../../components/Button.jsx';
import SEO from '../../components/SEO.jsx';

// Local icon assets for pricing section
const imgCheckmark = "/assets/icons/texas/checkmark-feature.svg";
const imgX = "/assets/icons/texas/x-icon.svg";
const imgStar = "/assets/icons/texas/star-pricing.svg";
const imgArrowEnroll = "/assets/icons/texas/arrow-enroll.svg";
const imgTDLRBadge = "/assets/icons/texas/tdlr-approved-icon.svg";

// Local icon assets for Everything You Get section
const imgIcon6Hour = "/assets/icons/texas/icon-6-hour.svg";
const imgIconDevice = "/assets/icons/texas/icon-device.svg";
const imgIconCertificate = "/assets/icons/texas/icon-certificate.svg";
const imgIconRetakes = "/assets/icons/texas/icon-retakes.svg";
const imgIconAutosave = "/assets/icons/texas/icon-autosave.svg";
const imgIconSupport = "/assets/icons/texas/icon-support.svg";
const imgIconList = "/assets/icons/texas/icon-list.svg";

// Local icon assets for How We Compare section
const imgLogoShieldBlue = "/assets/icons/texas/logo-shield-blue.svg";
const imgCheckmarkBlue = "/assets/icons/texas/checkmark-blue.svg";
const imgCheckmarkGray = "/assets/icons/texas/checkmark-gray.svg";
const imgXRed = "/assets/icons/texas/x-red.svg";

// Local icon assets for Money-Back Guarantee section
const imgIconLock = "/assets/icons/texas/icon-lock.svg";
const imgIconShieldGuarantee = "/assets/icons/texas/icon-shield-guarantee.svg";

export default function TexasPricing() {
  return (
    <>
      <SEO 
        title="Texas Defensive Driving Course Pricing | Road Ready Safety"
        description="Simple, transparent pricing for Texas defensive driving courses. One price, everything included. TDLR-approved provider."
      />
      
      {/* Pricing Section */}
      <section className="relative py-[96px] px-4 sm:px-6 lg:px-[120px] bg-gradient-to-b from-[#e5f6fe] to-white" style={{ background: 'linear-gradient(to bottom, rgba(229, 246, 254, 0.5), rgba(255, 255, 255, 1))' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col gap-[42px] items-center mb-12">
            <div className="flex flex-col gap-[24px] items-center max-w-[768px]">
              {/* Badge */}
              <div className="bg-[#e5f6fe] inline-flex gap-2 items-center px-4 py-2 rounded-full">
                <img src={imgTDLRBadge} alt="" className="w-4 h-4" />
                <span className="text-sm font-semibold text-[#0351b4] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  TDLR-Approved Course Provider
                </span>
              </div>
              
              {/* Title */}
              <h1 className="text-[60px] font-bold text-[#111722] text-center leading-[60px] tracking-[-1.5px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Simple, Transparent Pricing
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl text-[#657386] text-center leading-[28px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                One price. Everything included. No surprises.
              </p>
            </div>
          </div>
          
          {/* Pricing Cards */}
          <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
            {/* Basic Card */}
            <div className="relative bg-white border border-[#eaecf0] rounded-2xl p-6 flex flex-col gap-6 w-full lg:w-[322px] h-[551px]">
              {/* Badge */}
              <div className="absolute bg-[#e5f6fe] px-2 py-1 rounded-2xl top-[42px] left-[195px]">
                <span className="text-sm font-semibold text-[#1e2832] leading-[18px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Most Popular
                </span>
              </div>
              
              {/* Header */}
              <div className="flex flex-col gap-5">
                <h3 className="text-[22px] font-bold text-[#1e2832]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Basic
                </h3>
                
                {/* Price */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[40px] font-bold text-[#1e2832]" style={{ fontFamily: "'DM Sans', sans-serif" }}>$17</span>
                    <span className="text-base text-[#616d7b]" style={{ fontFamily: "'DM Sans', sans-serif" }}>.00</span>
                  </div>
                  <p className="text-sm text-[#616d7b] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    + $3.00 state processing fee
                  </p>
                </div>
                
                {/* Rating */}
                <div className="flex flex-col gap-1">
                  <div className="flex gap-3 items-center">
                    <div className="flex gap-0">
                      {[...Array(5)].map((_, i) => (
                        <img key={i} src={imgStar} alt="" className="w-5 h-5" />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-[#1e2832] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      4.9 out of 5
                    </span>
                  </div>
                </div>
                
                {/* Button */}
                <Button
                  href="/courses/tx-defensive"
                  variant="custom"
                  className="h-[56px] px-[40px] border border-[#0667d1] text-[#0667d1] rounded-2xl shadow-[0px_10px_15px_-3px_rgba(17,23,34,0.08),0px_4px_6px_-4px_rgba(17,23,34,0.05)] text-lg font-semibold flex items-center justify-center gap-2 leading-[28px] w-[275px]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Enroll Now
                  <img src={imgArrowEnroll} alt="" className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Features */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-[17px] items-center">
                  <div className="bg-[#e5f6fe] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img src={imgCheckmark} alt="" className="w-4 h-4" />
                  </div>
                  <span className="text-base font-medium text-[#191d23]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Secure checkout
                  </span>
                </div>
                <div className="flex gap-[17px] items-center">
                  <div className="bg-[#e5f6fe] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img src={imgCheckmark} alt="" className="w-4 h-4" />
                  </div>
                  <span className="text-base font-medium text-[#191d23]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    TDLR-approved provider
                  </span>
                </div>
                <div className="flex gap-[17px] items-center">
                  <div className="bg-[#f7f8f9] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img src={imgX} alt="" className="w-4 h-4" />
                  </div>
                  <span className="text-base font-medium text-[#a0abbb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Comparison 3
                  </span>
                </div>
                <div className="flex gap-[17px] items-center">
                  <div className="bg-[#f7f8f9] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img src={imgX} alt="" className="w-4 h-4" />
                  </div>
                  <span className="text-base font-medium text-[#a0abbb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Comparison 4
                  </span>
                </div>
                <div className="flex gap-[17px] items-center">
                  <div className="bg-[#f7f8f9] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img src={imgX} alt="" className="w-4 h-4" />
                  </div>
                  <span className="text-base font-medium text-[#a0abbb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Comparison 5
                  </span>
                </div>
              </div>
            </div>
            
            {/* Professional Card - Highlighted */}
            <div className="relative bg-gradient-to-r from-[#191917] to-[#3d3d3d] border border-[#eaecf0] rounded-2xl p-6 flex flex-col gap-6 w-full lg:w-[322px] h-[551px]">
              {/* Badge */}
              <div className="absolute bg-[#e5f6fe] px-2 py-1 rounded-2xl top-[26px] left-[180px]">
                <span className="text-sm font-semibold text-[#0667d1] leading-[18px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Recommended
                </span>
              </div>
              
              {/* Header */}
              <div className="flex flex-col gap-5">
                <h3 className="text-[22px] font-bold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Professional
                </h3>
                
                {/* Price */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[40px] font-bold text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>$25</span>
                    <span className="text-base text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>.00</span>
                    <span className="text-2xl font-medium text-[#aeaeae] line-through ml-2">$35.00</span>
                  </div>
                  <p className="text-sm text-white leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    + $3.00 state processing fee
                  </p>
                </div>
                
                {/* Rating */}
                <div className="flex flex-col gap-1">
                  <div className="flex gap-3 items-center">
                    <div className="flex gap-0">
                      {[...Array(5)].map((_, i) => (
                        <img key={i} src={imgStar} alt="" className="w-5 h-5" />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-white leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      4.9 out of 5
                    </span>
                  </div>
                </div>
                
                {/* Button */}
                <Button
                  href="/courses/tx-defensive"
                  variant="custom"
                  className="h-[56px] px-[40px] bg-[#0667d1] border border-[#0667d1] text-white rounded-2xl shadow-[0px_10px_15px_-3px_rgba(17,23,34,0.08),0px_4px_6px_-4px_rgba(17,23,34,0.05)] text-lg font-semibold flex items-center justify-center gap-2 leading-[28px] w-[275px]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Enroll Now
                  <img src={imgArrowEnroll} alt="" className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Features */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-[17px] items-center">
                  <div className="bg-[#e5f6fe] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img src={imgCheckmark} alt="" className="w-4 h-4" />
                  </div>
                  <span className="text-base font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Secure checkout
                  </span>
                </div>
                <div className="flex gap-[17px] items-center">
                  <div className="bg-[#e5f6fe] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img src={imgCheckmark} alt="" className="w-4 h-4" />
                  </div>
                  <span className="text-base font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    TDLR-approved provider
                  </span>
                </div>
                <div className="flex gap-[17px] items-center">
                  <div className="bg-[#e5f6fe] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img src={imgCheckmark} alt="" className="w-4 h-4" />
                  </div>
                  <span className="text-base font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    100% money-back guarantee
                  </span>
                </div>
                <div className="flex gap-[17px] items-center">
                  <div className="bg-[#e5f6fe] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img src={imgCheckmark} alt="" className="w-4 h-4" />
                  </div>
                  <span className="text-base font-medium text-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Comparison 4
                  </span>
                </div>
                <div className="flex gap-[17px] items-center">
                  <div className="bg-[#f7f8f9] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img src={imgX} alt="" className="w-4 h-4" />
                  </div>
                  <span className="text-base font-medium text-[#a0abbb]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Comparison 5
                  </span>
                </div>
              </div>
            </div>
            
            {/* Enterprise Card */}
            <div className="relative bg-white border border-[#eaecf0] rounded-2xl p-6 flex flex-col gap-6 w-full lg:w-[322px] h-[551px]">
              {/* Badge */}
              <div className="absolute bg-[#e5f6fe] px-2 py-1 rounded-2xl top-[26px] left-[222px]">
                <span className="text-sm font-semibold text-[#1e2832] leading-[18px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Premium
                </span>
              </div>
              
              {/* Header */}
              <div className="flex flex-col gap-5">
                <h3 className="text-[22px] font-bold text-[#1e2832]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Enterprise
                </h3>
                
                {/* Price */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[40px] font-bold text-[#1e2832]" style={{ fontFamily: "'DM Sans', sans-serif" }}>$45</span>
                    <span className="text-base text-[#616d7b]" style={{ fontFamily: "'DM Sans', sans-serif" }}>.00</span>
                  </div>
                  <p className="text-sm text-[#616d7b] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    + $3.00 state processing fee
                  </p>
                </div>
                
                {/* Rating */}
                <div className="flex flex-col gap-1">
                  <div className="flex gap-3 items-center">
                    <div className="flex gap-0">
                      {[...Array(5)].map((_, i) => (
                        <img key={i} src={imgStar} alt="" className="w-5 h-5" />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-[#1e2832] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      4.9 out of 5
                    </span>
                  </div>
                </div>
                
                {/* Button */}
                <Button
                  href="/courses/tx-defensive"
                  variant="custom"
                  className="h-[56px] px-[40px] border border-[#0667d1] text-[#0667d1] rounded-2xl shadow-[0px_10px_15px_-3px_rgba(17,23,34,0.08),0px_4px_6px_-4px_rgba(17,23,34,0.05)] text-lg font-semibold flex items-center justify-center gap-2 leading-[28px] w-[275px]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Enroll Now
                  <img src={imgArrowEnroll} alt="" className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Features */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-[17px] items-center">
                  <div className="bg-[#e5f6fe] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img src={imgCheckmark} alt="" className="w-4 h-4" />
                  </div>
                  <span className="text-base font-medium text-[#191d23]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Secure checkout
                  </span>
                </div>
                <div className="flex gap-[17px] items-center">
                  <div className="bg-[#e5f6fe] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img src={imgCheckmark} alt="" className="w-4 h-4" />
                  </div>
                  <span className="text-base font-medium text-[#191d23]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    TDLR-approved provider
                  </span>
                </div>
                <div className="flex gap-[17px] items-center">
                  <div className="bg-[#e5f6fe] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img src={imgCheckmark} alt="" className="w-4 h-4" />
                  </div>
                  <span className="text-base font-medium text-[#191d23]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    100% money-back guarantee
                  </span>
                </div>
                <div className="flex gap-[17px] items-center">
                  <div className="bg-[#e5f6fe] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img src={imgCheckmark} alt="" className="w-4 h-4" />
                  </div>
                  <span className="text-base font-medium text-[#191d23]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Comparison 4
                  </span>
                </div>
                <div className="flex gap-[17px] items-center">
                  <div className="bg-[#e5f6fe] rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    <img src={imgCheckmark} alt="" className="w-4 h-4" />
                  </div>
                  <span className="text-base font-medium text-[#191d23]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Comparison 5
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Everything You Get Section */}
      <section className="bg-[rgba(249,250,251,0.3)] py-[96px] px-4 sm:px-6 lg:px-[120px]">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col gap-12 items-center">
            {/* Header */}
            <div className="flex flex-col gap-4 items-center max-w-[672px]">
              <h2 className="text-[36px] font-bold text-[#111722] text-center leading-[40px] tracking-[-0.9px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Everything You Get
              </h2>
              <p className="text-lg text-[#657386] text-center leading-[28px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                One payment covers your entire defensive driving journey — from start to<br />
                certificate.
              </p>
            </div>

            {/* Top Grid - 6 Feature Cards (3x2) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1024px]">
              {/* Card 1: 6-Hour State Minimum */}
              <div className="bg-white border border-[#e5e8eb] rounded-[20px] p-6 shadow-[0px_1px_3px_0px_rgba(17,23,34,0.04),0px_6px_16px_0px_rgba(17,23,34,0.06)] flex flex-col gap-3">
                <div className="relative w-12 h-12 flex items-center justify-center rounded-[10px] border border-[#e8e8e8]">
                  <img src={imgIcon6Hour} alt="" className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-[#111722] leading-6 tracking-[-0.4px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  6-Hour State Minimum
                </h3>
                <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Complete the course as fast as Texas law<br />
                  allows
                </p>
              </div>

              {/* Card 2: Any Device Access */}
              <div className="bg-white border border-[#e5e8eb] rounded-[20px] p-6 shadow-[0px_1px_3px_0px_rgba(17,23,34,0.04),0px_6px_16px_0px_rgba(17,23,34,0.06)] flex flex-col gap-3">
                <div className="relative w-12 h-12 flex items-center justify-center rounded-[10px] border border-[#e8e8e8]">
                  <img src={imgIconDevice} alt="" className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-[#111722] leading-6 tracking-[-0.4px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Any Device Access
                </h3>
                <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Take the course on your phone, tablet, or<br />
                  computer
                </p>
              </div>

              {/* Card 3: Instant Certificate */}
              <div className="bg-white border border-[#e5e8eb] rounded-[20px] p-6 shadow-[0px_1px_3px_0px_rgba(17,23,34,0.04),0px_6px_16px_0px_rgba(17,23,34,0.06)] flex flex-col gap-3">
                <div className="relative w-12 h-12 flex items-center justify-center rounded-[10px] border border-[#e8e8e8]">
                  <img src={imgIconCertificate} alt="" className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-[#111722] leading-6 tracking-[-0.4px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Instant Certificate
                </h3>
                <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Download your certificate immediately<br />
                  upon completion
                </p>
              </div>

              {/* Card 4: Unlimited Retakes */}
              <div className="bg-white border border-[#e5e8eb] rounded-[20px] p-6 shadow-[0px_1px_3px_0px_rgba(17,23,34,0.04),0px_6px_16px_0px_rgba(17,23,34,0.06)] flex flex-col gap-3">
                <div className="relative w-12 h-12 flex items-center justify-center rounded-[10px] border border-[#e8e8e8]">
                  <img src={imgIconRetakes} alt="" className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-[#111722] leading-6 tracking-[-0.4px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Unlimited Retakes
                </h3>
                <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Retake quizzes as many times as needed<br />
                  at no extra cost
                </p>
              </div>

              {/* Card 5: Auto-Save Progress */}
              <div className="bg-white border border-[#e5e8eb] rounded-[20px] p-6 shadow-[0px_1px_3px_0px_rgba(17,23,34,0.04),0px_6px_16px_0px_rgba(17,23,34,0.06)] flex flex-col gap-3">
                <div className="relative w-12 h-12 flex items-center justify-center rounded-[10px] border border-[#e8e8e8]">
                  <img src={imgIconAutosave} alt="" className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-[#111722] leading-6 tracking-[-0.4px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Auto-Save Progress
                </h3>
                <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Your progress is automatically saved —<br />
                  pick up where you left off
                </p>
              </div>

              {/* Card 6: Texas-Based Support */}
              <div className="bg-white border border-[#e5e8eb] rounded-[20px] p-6 shadow-[0px_1px_3px_0px_rgba(17,23,34,0.04),0px_6px_16px_0px_rgba(17,23,34,0.06)] flex flex-col gap-3">
                <div className="relative w-12 h-12 flex items-center justify-center rounded-[10px] border border-[#e8e8e8]">
                  <img src={imgIconSupport} alt="" className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-[#111722] leading-6 tracking-[-0.4px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Texas-Based Support
                </h3>
                <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Real humans ready to help via email within<br />
                  1 business day
                </p>
              </div>
            </div>

            {/* Bottom Grid - 3 Feature List Cards */}
            <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center w-full max-w-[1024px]">
              {/* Card 7: State Requirements */}
              <div className="bg-white border border-[#e5e8eb] rounded-[20px] p-6 shadow-[0px_1px_3px_0px_rgba(17,23,34,0.04),0px_6px_16px_0px_rgba(17,23,34,0.06)] flex flex-col gap-4 flex-1">
                <div className="flex gap-2 items-center">
                  <img src={imgIconList} alt="" className="w-5 h-5" />
                  <h3 className="text-base font-semibold text-[#111722] leading-6 tracking-[-0.4px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    State Requirements
                  </h3>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2 items-start">
                    <img src={imgCheckmark} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      6-hour defensive driving curriculum
                    </p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <img src={imgCheckmark} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      All required course modules
                    </p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <img src={imgCheckmark} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Chapter quizzes
                    </p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <img src={imgCheckmark} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Final exam
                    </p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <img src={imgCheckmark} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Certificate of completion
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 8: Bonus Tools */}
              <div className="bg-white border border-[#e5e8eb] rounded-[20px] p-6 shadow-[0px_1px_3px_0px_rgba(17,23,34,0.04),0px_6px_16px_0px_rgba(17,23,34,0.06)] flex flex-col gap-4 flex-1">
                <div className="flex gap-2 items-center">
                  <img src={imgIconList} alt="" className="w-5 h-5" />
                  <h3 className="text-base font-semibold text-[#111722] leading-6 tracking-[-0.4px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Bonus Tools
                  </h3>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2 items-start">
                    <img src={imgCheckmark} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Eligibility checker tool
                    </p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <img src={imgCheckmark} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Court permission letter template
                    </p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <img src={imgCheckmark} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Court lookup by county
                    </p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <img src={imgCheckmark} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Step-by-step dismissal guide
                    </p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <img src={imgCheckmark} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Driving record request instructions
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 9: Support & Access */}
              <div className="bg-white border border-[#e5e8eb] rounded-[20px] p-6 shadow-[0px_1px_3px_0px_rgba(17,23,34,0.04),0px_6px_16px_0px_rgba(17,23,34,0.06)] flex flex-col gap-4 flex-1">
                <div className="flex gap-2 items-center">
                  <img src={imgIconList} alt="" className="w-5 h-5" />
                  <h3 className="text-base font-semibold text-[#111722] leading-6 tracking-[-0.4px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Support & Access
                  </h3>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2 items-start">
                    <img src={imgCheckmark} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Access on any device
                    </p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <img src={imgCheckmark} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Unlimited quiz retakes
                    </p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <img src={imgCheckmark} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Automatic progress saving
                    </p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <img src={imgCheckmark} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Email support (1 business day)
                    </p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <img src={imgCheckmark} alt="" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Help center resources
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Compare Section */}
      <section className="py-[112px] px-4 sm:px-6 lg:px-[217px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col gap-12 items-center">
            {/* Header */}
            <div className="flex flex-col gap-4 items-center max-w-[672px]">
              <h2 className="text-[36px] font-bold text-[#111722] text-center leading-[40px] tracking-[-0.9px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                How We Compare
              </h2>
              <p className="text-lg text-[#657386] text-center leading-[28px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                See why Texas drivers choose Road Ready Safety over the competition.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="w-full overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Table Header */}
                <div className="flex border-b border-[#e5e8eb]">
                  <div className="flex-1 px-4 py-10">
                    <p className="text-base font-semibold text-[#111722] leading-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Feature
                    </p>
                  </div>
                  <div className="flex-1 px-4 py-10 flex flex-col items-center">
                    <div className="bg-[#0667d1] rounded-2xl w-10 h-10 flex items-center justify-center mb-2">
                      <img src={imgLogoShieldBlue} alt="Road Ready" className="w-5 h-5" />
                    </div>
                    <p className="text-base font-semibold text-[#0667d1] leading-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Road Ready
                    </p>
                  </div>
                  <div className="flex-1 px-4 py-10 flex items-center justify-center">
                    <p className="text-base font-medium text-[#657386] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Competitor A
                    </p>
                  </div>
                  <div className="flex-1 px-4 py-10 flex items-center justify-center">
                    <p className="text-base font-medium text-[#657386] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Competitor B
                    </p>
                  </div>
                </div>

                {/* Table Rows */}
                <div className="flex flex-col">
                  {/* Course Price */}
                  <div className="flex border-b border-[rgba(229,232,235,0.5)]">
                    <div className="flex-1 px-4 py-[18px] flex items-center">
                      <p className="text-sm font-medium text-[#111722] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Course Price
                      </p>
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <p className="text-base font-semibold text-[#0667d1] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        $25
                      </p>
                    </div>
                    <div className="flex-1 px-4 py-[18px] flex items-center justify-center">
                      <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        $24.95
                      </p>
                    </div>
                    <div className="flex-1 px-4 py-[18px] flex items-center justify-center">
                      <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        $29.95
                      </p>
                    </div>
                  </div>

                  {/* State Fee Included */}
                  <div className="flex border-b border-[rgba(229,232,235,0.5)]">
                    <div className="flex-1 px-4 py-[18px] flex items-center">
                      <p className="text-sm font-medium text-[#111722] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        State Fee Included
                      </p>
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <p className="text-base font-semibold text-[#0667d1] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        No ($3 separate)
                      </p>
                    </div>
                    <div className="flex-1 px-4 py-[18px] flex items-center justify-center">
                      <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        No ($3 separate)
                      </p>
                    </div>
                    <div className="flex-1 px-4 py-[18px] flex items-center justify-center">
                      <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        No ($7.95 separate)
                      </p>
                    </div>
                  </div>

                  {/* TDLR Approved */}
                  <div className="flex border-b border-[rgba(229,232,235,0.5)]">
                    <div className="flex-1 px-4 py-4 flex items-center">
                      <p className="text-sm font-medium text-[#111722] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        TDLR Approved
                      </p>
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgCheckmarkBlue} alt="" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgCheckmarkGray} alt="" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgCheckmarkGray} alt="" className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Mobile Friendly */}
                  <div className="flex border-b border-[rgba(229,232,235,0.5)]">
                    <div className="flex-1 px-4 py-4 flex items-center">
                      <p className="text-sm font-medium text-[#111722] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Mobile Friendly
                      </p>
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgCheckmarkBlue} alt="" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgCheckmarkGray} alt="" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Limited
                      </p>
                    </div>
                  </div>

                  {/* Instant Certificate */}
                  <div className="flex border-b border-[rgba(229,232,235,0.5)]">
                    <div className="flex-1 px-4 py-4 flex items-center">
                      <p className="text-sm font-medium text-[#111722] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Instant Certificate
                      </p>
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgCheckmarkBlue} alt="" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgCheckmarkGray} alt="" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgXRed} alt="" className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Unlimited Quiz Retakes */}
                  <div className="flex border-b border-[rgba(229,232,235,0.5)]">
                    <div className="flex-1 px-4 py-4 flex items-center">
                      <p className="text-sm font-medium text-[#111722] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Unlimited Quiz Retakes
                      </p>
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgCheckmarkBlue} alt="" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgXRed} alt="" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgCheckmarkGray} alt="" className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Progress Auto-Save */}
                  <div className="flex border-b border-[rgba(229,232,235,0.5)]">
                    <div className="flex-1 px-4 py-4 flex items-center">
                      <p className="text-sm font-medium text-[#111722] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Progress Auto-Save
                      </p>
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgCheckmarkBlue} alt="" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgCheckmarkGray} alt="" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgXRed} alt="" className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Court Lookup Tool */}
                  <div className="flex border-b border-[rgba(229,232,235,0.5)]">
                    <div className="flex-1 px-4 py-4 flex items-center">
                      <p className="text-sm font-medium text-[#111722] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Court Lookup Tool
                      </p>
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgCheckmarkBlue} alt="" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgXRed} alt="" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgXRed} alt="" className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Eligibility Checker */}
                  <div className="flex border-b border-[rgba(229,232,235,0.5)]">
                    <div className="flex-1 px-4 py-4 flex items-center">
                      <p className="text-sm font-medium text-[#111722] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        Eligibility Checker
                      </p>
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgCheckmarkBlue} alt="" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgXRed} alt="" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgXRed} alt="" className="w-5 h-5" />
                    </div>
                  </div>

                  {/* 100% Money-Back Guarantee */}
                  <div className="flex border-b border-[rgba(229,232,235,0.5)]">
                    <div className="flex-1 px-4 py-4 flex items-center">
                      <p className="text-sm font-medium text-[#111722] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        100% Money-Back Guarantee
                      </p>
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgCheckmarkBlue} alt="" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgXRed} alt="" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <p className="text-sm text-[#657386] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        30 days
                      </p>
                    </div>
                  </div>

                  {/* No Hidden Fees */}
                  <div className="flex border-b border-[rgba(229,232,235,0.5)]">
                    <div className="flex-1 px-4 py-4 flex items-center">
                      <p className="text-sm font-medium text-[#111722] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        No Hidden Fees
                      </p>
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgCheckmarkBlue} alt="" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgXRed} alt="" className="w-5 h-5" />
                    </div>
                    <div className="flex-1 px-4 py-4 flex items-center justify-center">
                      <img src={imgXRed} alt="" className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 100% Money-Back Guarantee Section */}
      <section className="bg-[#e5f6fe] py-[96px] px-4 sm:px-6 lg:px-[144px]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
            {/* Left Column - Content */}
            <div className="flex flex-col gap-6 items-start w-full lg:w-[424px]">
              {/* Badge */}
              <div className="bg-white inline-flex gap-2 items-center px-4 py-2 rounded-full">
                <img src={imgIconLock} alt="" className="w-4 h-4" />
                <span className="text-sm font-semibold text-[#111722] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Risk-Free Guarantee
                </span>
              </div>
              
              {/* Title */}
              <h2 className="text-[36px] font-bold text-[#111722] leading-[40px] tracking-[-0.9px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                100% Money-Back<br />
                Guarantee
              </h2>
              
              {/* Description */}
              <p className="text-lg text-[#111722] opacity-90 leading-[28px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                We're confident you'll love our course. But if you're<br />
                not completely satisfied for any reason, we'll<br />
                refund your money — no questions asked.
              </p>
              
              {/* List */}
              <div className="flex flex-col gap-4">
                <div className="flex gap-3 items-center">
                  <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <img src={imgCheckmarkBlue} alt="" className="w-4 h-4" />
                  </div>
                  <p className="text-base text-[#111722] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Full refund if you're not satisfied
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <img src={imgCheckmarkBlue} alt="" className="w-4 h-4" />
                  </div>
                  <p className="text-base text-[#111722] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    No complicated forms or hoops
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <img src={imgCheckmarkBlue} alt="" className="w-4 h-4" />
                  </div>
                  <p className="text-base text-[#111722] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Refund processed within 3-5 business days
                  </p>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="bg-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <img src={imgCheckmarkBlue} alt="" className="w-4 h-4" />
                  </div>
                  <p className="text-base text-[#111722] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Keep your progress if you decide to return
                  </p>
                </div>
              </div>
              
              {/* Button */}
              <Button
                href="/courses/tx-defensive"
                variant="custom"
                className="h-12 px-8 bg-[#0667d1] hover:bg-[#0556b3] text-white rounded-2xl shadow-[0px_20px_25px_-5px_rgba(17,23,34,0.1),0px_8px_10px_-6px_rgba(17,23,34,0.05)] text-base font-semibold flex items-center justify-center leading-6"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Start Risk-Free Today
              </Button>
            </div>
            
            {/* Right Column - Stats Card */}
            <div className="backdrop-blur-[2px] bg-white border border-[rgba(255,255,255,0.2)] rounded-[24px] p-8 flex flex-col gap-6 items-center w-full lg:w-[424px]">
              <div className="bg-[rgba(255,255,255,0.2)] rounded-full w-24 h-24 flex items-center justify-center">
                <img src={imgIconShieldGuarantee} alt="" className="w-12 h-12" />
              </div>
              <div className="flex flex-col gap-2 items-center">
                <p className="text-[48px] font-bold text-[#111722] leading-[48px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  100%
                </p>
                <p className="text-xl font-medium text-[#111722] opacity-90 leading-[28px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Satisfaction Guaranteed
                </p>
                <p className="text-sm text-[#111722] opacity-70 leading-5 text-center pt-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Join thousands of Texas drivers who've successfully<br />
                  dismissed their tickets with Road Ready Safety.
                </p>
              </div>
            </div>
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
                  className="h-[56px] px-[41.6px] py-[1.6px] border border-[#7cc3f9] border-solid bg-transparent text-white rounded-[16px] text-[18px] font-semibold flex items-center justify-center leading-[28px] no-underline"
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

