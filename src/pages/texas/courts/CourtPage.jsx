import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../../../components/SEO.jsx';
import { TexasCourtBreadcrumbs } from '../../../components/Breadcrumbs.jsx';
import Button from '../../../components/Button.jsx';
import courtData from '../../../data/texas-courts.json';

export default function CourtPage() {
  const { slug } = useParams();
  const court = courtData.courts.find(c => c.slug === slug);
  const [expandedSteps, setExpandedSteps] = useState(new Set());
  
  const toggleStep = (step) => {
    setExpandedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(step)) {
        newSet.delete(step);
      } else {
        newSet.add(step);
      }
      return newSet;
    });
  };

  if (!court) {
    return (
      <>
        <SEO 
          title="Court Not Found - Texas Driver Safety Course"
          description="The court page you're looking for doesn't exist."
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-2xl font-bold text-[#1e2832] mb-4">Court Not Found</h1>
          <p className="text-[#616d7b] mb-6">The court page you're looking for doesn't exist.</p>
          <Link to="/texas" className="text-[#0667d1] hover:underline">Return to Texas Home</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title={`${court.county} County ${court.courtType} Court ${court.courtName} Driver Safety Course Instructions`}
        description={`Complete your Texas Driver Safety Course for ${court.courtName} in ${court.county} County. Follow these step-by-step instructions to dismiss your ticket.`}
        keywords={`${court.courtName}, ${court.county} County, Texas driver safety course, defensive driving, traffic school`}
        url={`/texas/courts/${court.slug}`}
      />
      
      <section className="pt-8 pb-[112px] px-4 sm:px-6 lg:px-8 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          {/* Breadcrumbs */}
          <TexasCourtBreadcrumbs county={court.county} courtName={court.courtName} />

          {/* Header with Blue Badge and Title - Centered at Top */}
          <div className="flex flex-col gap-[16px] items-center relative w-full">
            <div className="bg-[#e6f6ff] inline-flex items-center px-[16px] py-[8px] rounded-[9999px]">
              <span className="text-[14px] font-semibold text-[#0967d2] leading-[20px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>Driver Safety Course Information</span>
            </div>
            <div className="flex flex-col items-center relative w-full">
              <h1 className="text-[48px] font-bold text-[#323f4b] leading-[60px] text-center w-full" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <p className="mb-0">{court.county} County </p>
                <p className="mb-0">{court.courtType} Court</p>
                <p className="mb-0">{court.courtName}</p>
              </h1>
            </div>
            <div className="flex flex-col items-center relative w-full">
              <p className="text-[18px] font-normal text-[#3e4c59] leading-[28px] text-center w-full" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Use this page to see how your court handles Texas Defensive Driving Courses (Driver's Safety Course). Always follow your court's instructions if they differ from what is listed here.
              </p>
            </div>
          </div>

          {/* Two Column Layout - Court Information and Buy Box */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Column - Court Information */}
            <div className="flex-1 flex flex-col gap-12">
          {/* Court Information Section */}
          <div className="bg-white border border-[#e4e6ea] rounded-2xl overflow-hidden shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
            {/* Header */}
            <div className="px-4 sm:px-8 py-6 flex items-center gap-4">
              <div className="bg-[#e6f6ff] flex items-center justify-center rounded-[14px] w-12 h-12 shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0967d2]">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="9" y1="15" x2="15" y2="15"></line>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#323f4b] leading-[30px]" style={{ fontFamily: "'Outfit', sans-serif" }}>Court Information</h2>
            </div>

            {/* Content Area */}
            <div className="px-4 sm:px-8 py-6">
              <div className="bg-[#f4f4f4] border border-[#e4e7eb] rounded-[14px] p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Judge Card */}
                <div className="bg-white border border-white rounded-[10px] p-3 sm:p-[17px] flex items-center gap-3">
                  <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 9C10.6569 9 12 7.65685 12 6C12 4.34315 10.6569 3 9 3C7.34315 3 6 4.34315 6 6C6 7.65685 7.34315 9 9 9Z" fill="#616d7b"/>
                      <path d="M9 10.5C6.51472 10.5 4.5 12.5147 4.5 15V15.75C4.5 16.1642 4.83579 16.5 5.25 16.5H12.75C13.1642 16.5 13.5 16.1642 13.5 15.75V15C13.5 12.5147 11.4853 10.5 9 10.5Z" fill="#616d7b"/>
                    </svg>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Judge
                    </p>
                    <p className="text-sm text-[#3e4c59] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {(() => {
                        const nameParts = [
                          court.prefix,
                          court.firstName,
                          court.middleName,
                          court.lastName,
                          court.suffix
                        ].filter(Boolean);
                        const fullName = nameParts.length > 0 ? nameParts.join(' ') : '';
                        const withTitle = court.title ? (fullName ? `${court.title} ${fullName}` : court.title) : fullName;
                        return withTitle || 'Unavailable';
                      })()}
                    </p>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="bg-white border border-white rounded-[10px] p-3 sm:p-[17px] flex items-center gap-3">
                  <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.5 1H5.5C4.67157 1 4 1.67157 4 2.5V15.5C4 16.3284 4.67157 17 5.5 17H12.5C13.3284 17 14 16.3284 14 15.5V2.5C14 1.67157 13.3284 1 12.5 1Z" stroke="#616d7b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      <path d="M9 13.5H9.0075" stroke="#616d7b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Phone
                    </p>
                    {court.phone ? (
                      <a href={`tel:${court.phone}`} className="text-sm text-[#3e4c59] leading-5 underline mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {court.phone}
                      </a>
                    ) : (
                      <p className="text-sm text-[#3e4c59] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Unavailable
                      </p>
                    )}
                  </div>
                </div>

                {/* Website Card */}
                <div className="bg-white border border-white rounded-[10px] p-3 sm:p-[17px] flex items-center gap-3">
                  <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="9" cy="9" r="7.5" stroke="#616d7b" strokeWidth="1.5" fill="none"/>
                      <path d="M5.25 9C5.25 10.7949 6.70507 12.25 8.5 12.25C10.2949 12.25 11.75 10.7949 11.75 9C11.75 7.20507 10.2949 5.75 8.5 5.75C6.70507 5.75 5.25 7.20507 5.25 9Z" stroke="#616d7b" strokeWidth="1.5" fill="none"/>
                      <path d="M2.25 6.75C2.25 6.75 3.75 8.25 6 8.25C8.25 8.25 9.75 6.75 9.75 6.75M8.25 11.25C8.25 11.25 9.75 9.75 12 9.75C14.25 9.75 15.75 11.25 15.75 11.25" stroke="#616d7b" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Website
                    </p>
                    {court.website ? (
                      <a href={court.website} target="_blank" rel="noopener noreferrer" className="text-sm text-[#3e4c59] leading-5 underline mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {court.website}
                      </a>
                    ) : (
                      <p className="text-sm text-[#3e4c59] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Unavailable
                      </p>
                    )}
                  </div>
                </div>

                {/* Email Card */}
                <div className="bg-white border border-white rounded-[10px] p-3 sm:p-[17px] flex items-center gap-3">
                  <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 4.5H15C15.4142 4.5 15.75 4.83579 15.75 5.25V12.75C15.75 13.1642 15.4142 13.5 15 13.5H3C2.58579 13.5 2.25 13.1642 2.25 12.75V5.25C2.25 4.83579 2.58579 4.5 3 4.5Z" stroke="#616d7b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                      <path d="M15 4.5L9 9.75L3 4.5" stroke="#616d7b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Email
                    </p>
                    {court.email ? (
                      <a href={`mailto:${court.email}`} className="text-sm text-[#3e4c59] leading-5 underline mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {court.email}
                      </a>
                    ) : (
                      <p className="text-sm text-[#3e4c59] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Unavailable
                      </p>
                    )}
                  </div>
                </div>

                {/* Address Card */}
                <div className="bg-white border border-white rounded-[10px] p-3 sm:p-[17px] flex items-center gap-3 col-span-1 md:col-span-2">
                  <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z" fill="#616d7b"/>
                      <path d="M9 1.5C6.51472 1.5 4.5 3.51472 4.5 6C4.5 8.25 8.25 13.5 9 13.5C9.75 13.5 13.5 8.25 13.5 6C13.5 3.51472 11.4853 1.5 9 1.5Z" stroke="#616d7b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      Address
                    </p>
                    <p className="text-sm text-[#3e4c59] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {(() => {
                        const parts = [];
                        if (court.address) parts.push(court.address);
                        if (court.city) parts.push(court.city);
                        if (court.zipCode) parts.push(court.zipCode);
                        return parts.length > 0 ? parts.join(', ') : 'Unavailable';
                      })()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

              {/* Texas Driver Safety Course Steps */}
              <div className="flex flex-col gap-4">
              {/* Step 1 – Make Sure You're Eligible */}
              <div className={`bg-white rounded-2xl overflow-hidden transition-all ${expandedSteps.has('step1') ? 'border-2 border-[#03449e] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]' : 'border border-[#e4e6ea] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]'}`}>
                <button
                  onClick={() => toggleStep('step1')}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-[#e6f6ff] flex items-center justify-center rounded-[14px] w-12 h-12 shrink-0">
                      <span className="text-xl font-bold text-[#03449e]" style={{ fontFamily: "'Outfit', sans-serif" }}>1</span>
                    </div>
                    <span className="text-xl font-bold text-[#323f4b] text-left" style={{ fontFamily: "'Outfit', sans-serif", lineHeight: '30px' }}>
                      Make Sure You're Eligible
                    </span>
                  </div>
                  <svg className={`w-4 h-4 transition-transform ${expandedSteps.has('step1') ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSteps.has('step1') && (
                  <div className="px-8 py-6">
                    <div className="bg-[#f4f4f4] border border-[#e4e7eb] rounded-[14px] p-6 flex flex-col gap-6">
                      {/* Intro paragraph */}
                      <div>
                        <p className="text-sm text-[#3e4c59] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          To qualify for ticket dismissal through a Texas Driver Safety Course (DSC), you must meet all of the following requirements:
                        </p>
                      </div>

                      {/* Requirements Grid */}
                      <div className="grid grid-cols-1 gap-3">
                        {/* Requirement 1 */}
                        <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                          <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="9" cy="9" r="8" fill="#34C759" stroke="#34C759" strokeWidth="1"/>
                              <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                              You must have a valid Texas driver's license
                            </p>
                            <p className="text-xs text-[#3e4c59] leading-[18px] mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                              Your license cannot be expired, suspended, or revoked
                            </p>
                          </div>
                        </div>

                        {/* Requirement 2 */}
                        <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                          <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="9" cy="9" r="8" fill="#34C759" stroke="#34C759" strokeWidth="1"/>
                              <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                              You must NOT hold a Commercial Driver License (CDL)
                            </p>
                            <p className="text-xs text-[#3e4c59] leading-[18px] mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                              Even if driving a personal vehicle
                            </p>
                          </div>
                        </div>

                        {/* Requirement 3 */}
                        <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                          <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="9" cy="9" r="8" fill="#34C759" stroke="#34C759" strokeWidth="1"/>
                              <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                              You must have current auto insurance
                            </p>
                          </div>
                        </div>

                        {/* Requirement 4 */}
                        <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                          <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="9" cy="9" r="8" fill="#34C759" stroke="#34C759" strokeWidth="1"/>
                              <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                              You must NOT have completed a Driver Safety Course within the past 12 months
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Ineligible Violations Section Header */}
                      <div>
                        <p className="text-sm text-[#3e4c59] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Some violations may be ineligible, including:
                        </p>
                      </div>

                      {/* Violations Grid */}
                      <div className="grid grid-cols-1 gap-3">
                        {/* Violation 1 */}
                        <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                          <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="9" cy="9" r="8" fill="#FF3B30" stroke="#FF3B30" strokeWidth="1"/>
                              <path d="M6 6L12 12M12 6L6 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                              Speeding 25 mph or more over the posted limit
                            </p>
                          </div>
                        </div>

                        {/* Violation 2 */}
                        <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                          <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="9" cy="9" r="8" fill="#FF3B30" stroke="#FF3B30" strokeWidth="1"/>
                              <path d="M6 6L12 12M12 6L6 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                              Speeding 95 mph or more
                            </p>
                          </div>
                        </div>

                        {/* Violation 3 */}
                        <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                          <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="9" cy="9" r="8" fill="#FF3B30" stroke="#FF3B30" strokeWidth="1"/>
                              <path d="M6 6L12 12M12 6L6 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                              Passing a stopped school bus
                            </p>
                          </div>
                        </div>

                        {/* Violation 4 */}
                        <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                          <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="9" cy="9" r="8" fill="#FF3B30" stroke="#FF3B30" strokeWidth="1"/>
                              <path d="M6 6L12 12M12 6L6 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                              Leaving the scene of an accident
                            </p>
                          </div>
                        </div>

                        {/* Violation 5 */}
                        <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                          <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="9" cy="9" r="8" fill="#FF3B30" stroke="#FF3B30" strokeWidth="1"/>
                              <path d="M6 6L12 12M12 6L6 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <div className="flex flex-col gap-1">
                            <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                              Certain construction-zone or school-zone violations
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Final Disclaimer */}
                      <div>
                        <p className="text-sm text-[#3e4c59] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Eligibility is determined by the court. Always confirm eligibility with your court before requesting permission.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 2 – Request Permission From the Court */}
              <div className={`bg-white rounded-2xl overflow-hidden transition-all ${expandedSteps.has('step2') ? 'border-2 border-[#03449e] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]' : 'border border-[#e4e6ea] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]'}`}>
                <button
                  onClick={() => toggleStep('step2')}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-[#e6f6ff] flex items-center justify-center rounded-[14px] w-12 h-12 shrink-0">
                      <span className="text-xl font-bold text-[#03449e]" style={{ fontFamily: "'Outfit', sans-serif" }}>2</span>
                    </div>
                    <span className="text-xl font-bold text-[#323f4b] text-left" style={{ fontFamily: "'Outfit', sans-serif", lineHeight: '30px' }}>
                      Request Permission From the Court
                    </span>
                  </div>
                  <svg className={`w-4 h-4 transition-transform ${expandedSteps.has('step2') ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSteps.has('step2') && (
                  <div className="px-8 py-6">
                    <div className="bg-[#f4f4f4] border border-[#e4e7eb] rounded-[14px] p-6 flex flex-col gap-6">
                      {/* Intro paragraph */}
                      <div>
                        <p className="text-sm text-[#3e4c59] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          You must receive court approval before taking a Driver Safety Course.
                        </p>
                      </div>

                      {/* Section: Most courts require you to */}
                      <div>
                        <p className="text-sm text-[#3e4c59] leading-5 mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Most courts require you to:
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                          {/* Card 1 */}
                          <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                            <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="8" fill="#34C759" stroke="#34C759" strokeWidth="1"/>
                                <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Visit the court's website
                              </p>
                            </div>
                          </div>

                          {/* Card 2 */}
                          <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                            <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="8" fill="#34C759" stroke="#34C759" strokeWidth="1"/>
                                <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Search for "Driver Safety Course" or "Defensive Driving"
                              </p>
                            </div>
                          </div>

                          {/* Card 3 */}
                          <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                            <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="8" fill="#34C759" stroke="#34C759" strokeWidth="1"/>
                                <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Review the court's specific DSC instructions
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section: You may be asked to */}
                      <div>
                        <p className="text-sm text-[#3e4c59] leading-5 mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          You may be asked to:
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                          {/* Card 4 */}
                          <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                            <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="8" fill="#616d7b" stroke="#616d7b" strokeWidth="1"/>
                                <path d="M9 5V9M9 13H9.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                              </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Complete a Driver Safety Course affidavit confirming you have not taken a course in the past 12 months
                              </p>
                            </div>
                          </div>

                          {/* Card 5 */}
                          <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                            <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="8" fill="#616d7b" stroke="#616d7b" strokeWidth="1"/>
                                <path d="M9 5V9M9 13H9.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                              </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Enter a plea of No Contest or Guilty
                              </p>
                            </div>
                          </div>

                          {/* Card 6 */}
                          <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                            <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="8" fill="#616d7b" stroke="#616d7b" strokeWidth="1"/>
                                <path d="M9 5V9M9 13H9.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                              </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Pay court costs and any DSC administrative fees
                              </p>
                            </div>
                          </div>

                          {/* Card 7 */}
                          <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                            <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="8" fill="#616d7b" stroke="#616d7b" strokeWidth="1"/>
                                <path d="M9 5V9M9 13H9.01" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                              </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Submit your request online, by email, by mail, or in person (varies by court)
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Important block */}
                      <div>
                        <p className="text-sm font-semibold text-[#1e2832] leading-5 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Important:
                        </p>
                        <p className="text-sm text-[#3e4c59] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Each court sets its own fees and submission process. Always follow the instructions provided by your court.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3 – Wait for Court Approval */}
              <div className={`bg-white rounded-2xl overflow-hidden transition-all ${expandedSteps.has('step3') ? 'border-2 border-[#03449e] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]' : 'border border-[#e4e6ea] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]'}`}>
                <button
                  onClick={() => toggleStep('step3')}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-[#e6f6ff] flex items-center justify-center rounded-[14px] w-12 h-12 shrink-0">
                      <span className="text-xl font-bold text-[#03449e]" style={{ fontFamily: "'Outfit', sans-serif" }}>3</span>
                    </div>
                    <span className="text-xl font-bold text-[#323f4b] text-left" style={{ fontFamily: "'Outfit', sans-serif", lineHeight: '30px' }}>
                      Wait for Court Approval
                    </span>
                  </div>
                  <svg className={`w-4 h-4 transition-transform ${expandedSteps.has('step3') ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSteps.has('step3') && (
                  <div className="px-8 py-6">
                    <div className="bg-[#f4f4f4] border border-[#e4e7eb] rounded-[14px] p-6 flex flex-col gap-6">
                      {/* Intro paragraph */}
                      <div>
                        <p className="text-sm text-[#3e4c59] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Do not start a Driver Safety Course until the court grants permission.
                        </p>
                      </div>

                      {/* Section: Once approved, the court will provide */}
                      <div>
                        <p className="text-sm text-[#3e4c59] leading-5 mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Once approved, the court will provide:
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                          {/* Card 1 */}
                          <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                            <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="8" fill="#34C759" stroke="#34C759" strokeWidth="1"/>
                                <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Your deadline to complete the course
                              </p>
                            </div>
                          </div>

                          {/* Card 2 */}
                          <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                            <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="8" fill="#34C759" stroke="#34C759" strokeWidth="1"/>
                                <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Any additional documents required
                              </p>
                            </div>
                          </div>

                          {/* Card 3 */}
                          <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                            <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="8" fill="#34C759" stroke="#34C759" strokeWidth="1"/>
                                <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Instructions on how and where to submit your completion paperwork
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 4 – Take a TDLR-Approved Driver Safety Course */}
              <div className={`bg-white rounded-2xl overflow-hidden transition-all ${expandedSteps.has('step4') ? 'border-2 border-[#03449e] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]' : 'border border-[#e4e6ea] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]'}`}>
                <button
                  onClick={() => toggleStep('step4')}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-[#e6f6ff] flex items-center justify-center rounded-[14px] w-12 h-12 shrink-0">
                      <span className="text-xl font-bold text-[#03449e]" style={{ fontFamily: "'Outfit', sans-serif" }}>4</span>
                    </div>
                    <span className="text-xl font-bold text-[#323f4b] text-left" style={{ fontFamily: "'Outfit', sans-serif", lineHeight: '30px' }}>
                      Take a TDLR-Approved Driver Safety Course
                    </span>
                  </div>
                  <svg className={`w-4 h-4 transition-transform ${expandedSteps.has('step4') ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSteps.has('step4') && (
                  <div className="px-8 py-6">
                    <div className="bg-[#f4f4f4] border border-[#e4e7eb] rounded-[14px] p-6 flex flex-col gap-6">
                      {/* Section: After receiving court approval */}
                      <div>
                        <p className="text-sm text-[#3e4c59] leading-5 mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          After receiving court approval:
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                          {/* Card 1 */}
                          <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                            <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="8" fill="#34C759" stroke="#34C759" strokeWidth="1"/>
                                <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Enroll with a Texas-approved Driver Safety Course provider
                              </p>
                            </div>
                          </div>

                          {/* Card 2 */}
                          <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                            <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="8" fill="#34C759" stroke="#34C759" strokeWidth="1"/>
                                <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Complete the online course
                              </p>
                            </div>
                          </div>

                          {/* Card 3 */}
                          <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                            <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="8" fill="#34C759" stroke="#34C759" strokeWidth="1"/>
                                <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Receive a Certificate of Completion after finishing
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 5 – Get Your Certified Type 3A Driving Record */}
              <div className={`bg-white rounded-2xl overflow-hidden transition-all ${expandedSteps.has('step5') ? 'border-2 border-[#03449e] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]' : 'border border-[#e4e6ea] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]'}`}>
                <button
                  onClick={() => toggleStep('step5')}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-[#e6f6ff] flex items-center justify-center rounded-[14px] w-12 h-12 shrink-0">
                      <span className="text-xl font-bold text-[#03449e]" style={{ fontFamily: "'Outfit', sans-serif" }}>5</span>
                    </div>
                    <span className="text-xl font-bold text-[#323f4b] text-left" style={{ fontFamily: "'Outfit', sans-serif", lineHeight: '30px' }}>
                      Get Your Certified Type 3A Driving Record
                    </span>
                  </div>
                  <svg className={`w-4 h-4 transition-transform ${expandedSteps.has('step5') ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSteps.has('step5') && (
                  <div className="px-8 py-6">
                    <div className="bg-[#f4f4f4] border border-[#e4e7eb] rounded-[14px] p-6 flex flex-col gap-6">
                      {/* Intro paragraph */}
                      <div>
                        <p className="text-sm text-[#3e4c59] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Texas law requires you to submit a certified driving record with your certificate.
                        </p>
                      </div>

                      {/* Section: To obtain it */}
                      <div>
                        <p className="text-sm text-[#3e4c59] leading-5 mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          To obtain it:
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                          {/* Card 1 */}
                          <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                            <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="8" fill="#34C759" stroke="#34C759" strokeWidth="1"/>
                                <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Visit <a href="https://www.texas.gov/driver-record" target="_blank" rel="noopener noreferrer" className="text-[#0667d1] hover:text-[#0556b3] hover:underline">https://www.texas.gov/driver-record</a>
                              </p>
                            </div>
                          </div>

                          {/* Card 2 */}
                          <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                            <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="8" fill="#34C759" stroke="#34C759" strokeWidth="1"/>
                                <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Select "Type 3A Certified Driving Record"
                              </p>
                            </div>
                          </div>

                          {/* Card 3 */}
                          <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                            <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="8" fill="#34C759" stroke="#34C759" strokeWidth="1"/>
                                <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Download or print the record once received
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 6 – Submit Your Completion Packet to the Court */}
              <div className={`bg-white rounded-2xl overflow-hidden transition-all ${expandedSteps.has('step6') ? 'border-2 border-[#03449e] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]' : 'border border-[#e4e6ea] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]'}`}>
                <button
                  onClick={() => toggleStep('step6')}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-[#e6f6ff] flex items-center justify-center rounded-[14px] w-12 h-12 shrink-0">
                      <span className="text-xl font-bold text-[#03449e]" style={{ fontFamily: "'Outfit', sans-serif" }}>6</span>
                    </div>
                    <span className="text-xl font-bold text-[#323f4b] text-left" style={{ fontFamily: "'Outfit', sans-serif", lineHeight: '30px' }}>
                      Submit Your Completion Packet to the Court
                    </span>
                  </div>
                  <svg className={`w-4 h-4 transition-transform ${expandedSteps.has('step6') ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedSteps.has('step6') && (
                  <div className="px-8 py-6">
                    <div className="bg-[#f4f4f4] border border-[#e4e7eb] rounded-[14px] p-6 flex flex-col gap-6">
                      {/* Section: Before your court deadline, submit */}
                      <div>
                        <p className="text-sm text-[#3e4c59] leading-5 mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Before your court deadline, submit:
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                          {/* Card 1 */}
                          <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                            <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="8" fill="#34C759" stroke="#34C759" strokeWidth="1"/>
                                <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Your Certificate of Completion
                              </p>
                            </div>
                          </div>

                          {/* Card 2 */}
                          <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                            <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="8" fill="#34C759" stroke="#34C759" strokeWidth="1"/>
                                <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Your Type 3A Certified Driving Record
                              </p>
                            </div>
                          </div>

                          {/* Card 3 */}
                          <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                            <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="8" fill="#34C759" stroke="#34C759" strokeWidth="1"/>
                                <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Any additional court-specific documents (affidavit, compliance form, etc.)
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section: Submit everything exactly how your court requires */}
                      <div>
                        <p className="text-sm text-[#3e4c59] leading-5 mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
                          Submit everything exactly how your court requires:
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                          {/* Card 1 */}
                          <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                            <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="8" fill="#34C759" stroke="#34C759" strokeWidth="1"/>
                                <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Online portal
                              </p>
                            </div>
                          </div>

                          {/* Card 2 */}
                          <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                            <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="8" fill="#34C759" stroke="#34C759" strokeWidth="1"/>
                                <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Email
                              </p>
                            </div>
                          </div>

                          {/* Card 3 */}
                          <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                            <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="8" fill="#34C759" stroke="#34C759" strokeWidth="1"/>
                                <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                Mail
                              </p>
                            </div>
                          </div>

                          {/* Card 4 */}
                          <div className="bg-white border border-white rounded-[10px] p-[17px] flex items-start gap-3">
                            <div className="flex items-center justify-center w-[18px] h-[20px] shrink-0 pt-[2px]">
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="9" r="8" fill="#34C759" stroke="#34C759" strokeWidth="1"/>
                                <path d="M6 9L8 11L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                              <p className="text-sm font-bold text-[#323f4b] leading-5 mb-0" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                In person
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            </div>

            {/* Right Column - Buy Box */}
            <div className="lg:w-[300px] flex-shrink-0">
            <div className="bg-white border border-[#e4e6ea] rounded-[20px] shadow-[0px_1px_3px_0px_rgba(17,23,34,0.04),0px_6px_16px_0px_rgba(17,23,34,0.06)] p-5 lg:sticky lg:top-8 flex flex-col">
              {/* Title with Recommended Badge */}
              <div className="flex flex-col gap-2 mb-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-[#1e2832] leading-[24px] pr-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Texas Defensive Driving Course 6hr
                  </h3>
                  <div className="bg-[#e5f6fe] px-2 py-0.5 rounded-2xl flex-shrink-0">
                    <span className="text-xs font-semibold text-[#0667d1] leading-[14px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      Recommended
                    </span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="mb-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-[32px] font-bold text-[#1e2832] leading-[36px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>$25</span>
                  <span className="text-xs text-[#616d7b] leading-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>.00</span>
                  <span className="text-lg font-medium text-[#616d7b] leading-[36px] line-through ml-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>$35.00</span>
                </div>
              </div>
              <div className="text-xs text-[#616d7b] leading-4 mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>+ $3.00 state processing fee</div>
              
              {/* Star Rating */}
              <div className="flex gap-2 items-center pb-3 pt-1 mb-3">
                <div className="flex gap-0">
                  {[...Array(5)].map((_, i) => (
                    <img key={i} src="/assets/icons/texas/star-pricing.svg" alt="" className="w-3.5 h-3.5" />
                  ))}
                </div>
                <span className="text-xs font-medium text-[#1e2832] leading-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>4.9 out of 5</span>
              </div>

              {/* Enroll Button */}
              <Button 
                href="/courses/tx-defensive" 
                variant="custom" 
                className="w-full h-[44px] bg-[#0667d1] hover:bg-[#0556b3] text-white rounded-2xl shadow-[0px_10px_15px_-3px_rgba(17,23,34,0.08),0px_4px_6px_-4px_rgba(17,23,34,0.05)] text-sm font-semibold flex items-center justify-center gap-2 mb-3"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Enroll Now
                <img src="/assets/icons/texas/arrow-enroll.svg" alt="" className="w-3 h-3" />
              </Button>

              {/* Trust Indicators */}
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex gap-2 items-center">
                  <div className="bg-[#e5f6fe] rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                    <img src="/assets/icons/texas/checkmark-feature.svg" alt="" className="w-3 h-3" />
                  </div>
                  <span className="text-xs text-[#616d7b] leading-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Secure checkout</span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="bg-[#e5f6fe] rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                    <img src="/assets/icons/texas/checkmark-feature.svg" alt="" className="w-3 h-3" />
                  </div>
                  <span className="text-xs text-[#616d7b] leading-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>TDLR-approved provider</span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="bg-[#e5f6fe] rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                    <img src="/assets/icons/texas/checkmark-feature.svg" alt="" className="w-3 h-3" />
                  </div>
                  <span className="text-xs text-[#616d7b] leading-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>100% money-back guarantee</span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="bg-[#e5f6fe] rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                    <img src="/assets/icons/texas/checkmark-feature.svg" alt="" className="w-3 h-3" />
                  </div>
                  <span className="text-xs text-[#616d7b] leading-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Instant Certificate Download</span>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="bg-[#e5f6fe] rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                    <img src="/assets/icons/texas/checkmark-feature.svg" alt="" className="w-3 h-3" />
                  </div>
                  <span className="text-xs text-[#616d7b] leading-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Compatible with any device</span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>
    </>
  );
}
