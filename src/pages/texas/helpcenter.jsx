import React, { useState } from 'react';
import Button from '../../components/Button.jsx';
import SEO from '../../components/SEO.jsx';

// Local icon assets for Help Center section
const imgChevronFAQ = "/assets/icons/texas/chevron-faq.svg";
const imgArrowContactSupport = "/assets/icons/texas/arrow-contact-support.svg";

export default function TexasHelpCenter() {
  const [expandedHelp, setExpandedHelp] = useState(null);

  return (
    <>
      <SEO 
        title="Help Center - Texas Defensive Driving Course | Road Ready Safety"
        description="Step-by-step guides and tutorials for completing your Texas defensive driving course. Learn how to enroll, access your course, download your certificate, and more."
      />
      
      {/* Help Center Section */}
      <section className="py-[112px] px-4 sm:px-6 lg:px-8 bg-[#f9fafb]">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col gap-4 items-center relative">
            <div className="bg-[#e5f6fe] inline-flex items-center px-4 py-2 rounded-full">
              <span className="text-sm font-semibold text-[#0351b4] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Need Help?</span>
            </div>
            <h2 className="text-[36px] font-bold text-[#1e2832] text-center leading-[40px] tracking-[-0.9px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Help Center
            </h2>
            <p className="text-base text-[#616d7b] text-center leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Step-by-step guides to help you complete your Texas defensive driving course and dismiss your ticket.
            </p>
          </div>

          {/* Help Center Accordion Items */}
          <div className="flex flex-col gap-4">
            {/* Help 1 */}
            <div className="bg-white border border-[#e4e6ea] rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedHelp(expandedHelp === 'help1' ? null : 'help1')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-base font-semibold text-[#1e2832] leading-6 tracking-[-0.4px] text-left" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  How to enroll in the course
                </span>
                <img 
                  src={imgChevronFAQ} 
                  alt="" 
                  className={`w-4 h-4 transition-transform ${expandedHelp === 'help1' ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedHelp === 'help1' && (
                <div className="px-6 pb-5">
                  <p className="text-base text-[#616d7b] leading-6 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Enrolling is quick and easy:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-base text-[#616d7b] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <li>Click the "Start Course" or "Enroll Now" button on any page</li>
                    <li>Enter your ticket information and personal details</li>
                    <li>Complete the secure payment ($25 + $3 state fee)</li>
                    <li>You'll receive an email confirmation with your login credentials</li>
                    <li>Log in to your account and begin the course immediately</li>
                  </ol>
                </div>
              )}
            </div>

            {/* Help 2 */}
            <div className="bg-white border border-[#e4e6ea] rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedHelp(expandedHelp === 'help2' ? null : 'help2')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-base font-semibold text-[#1e2832] leading-6 tracking-[-0.4px] text-left" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  How to access your course
                </span>
                <img 
                  src={imgChevronFAQ} 
                  alt="" 
                  className={`w-4 h-4 transition-transform ${expandedHelp === 'help2' ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedHelp === 'help2' && (
                <div className="px-6 pb-5">
                  <p className="text-base text-[#616d7b] leading-6 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    To access your course:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-base text-[#616d7b] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <li>Go to the login page and enter your email and password</li>
                    <li>If you forgot your password, click "Forgot Password" to reset it</li>
                    <li>Once logged in, you'll see your course dashboard</li>
                    <li>Click "Continue Course" to pick up where you left off</li>
                    <li>Your progress is automatically saved, so you can stop and resume anytime</li>
                  </ol>
                </div>
              )}
            </div>

            {/* Help 3 */}
            <div className="bg-white border border-[#e4e6ea] rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedHelp(expandedHelp === 'help3' ? null : 'help3')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-base font-semibold text-[#1e2832] leading-6 tracking-[-0.4px] text-left" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  How to complete the course modules
                </span>
                <img 
                  src={imgChevronFAQ} 
                  alt="" 
                  className={`w-4 h-4 transition-transform ${expandedHelp === 'help3' ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedHelp === 'help3' && (
                <div className="px-6 pb-5">
                  <p className="text-base text-[#616d7b] leading-6 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Follow these steps to complete your course:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-base text-[#616d7b] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <li>Work through each module in order (you can't skip ahead)</li>
                    <li>Read the content and watch any videos included</li>
                    <li>Complete the knowledge checks at the end of each section</li>
                    <li>Take your time — there's no time limit per module</li>
                    <li>You must pass the final exam with a 70% or higher to complete the course</li>
                    <li>Don't worry — you get unlimited retakes on all quizzes and the final exam</li>
                  </ol>
                </div>
              )}
            </div>

            {/* Help 4 */}
            <div className="bg-white border border-[#e4e6ea] rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedHelp(expandedHelp === 'help4' ? null : 'help4')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-base font-semibold text-[#1e2832] leading-6 tracking-[-0.4px] text-left" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  How to download your certificate
                </span>
                <img 
                  src={imgChevronFAQ} 
                  alt="" 
                  className={`w-4 h-4 transition-transform ${expandedHelp === 'help4' ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedHelp === 'help4' && (
                <div className="px-6 pb-5">
                  <p className="text-base text-[#616d7b] leading-6 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Once you complete the course:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-base text-[#616d7b] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <li>Log in to your account dashboard</li>
                    <li>Look for the "Certificate" section or "Download Certificate" button</li>
                    <li>Click to download your Certificate of Completion (PDF format)</li>
                    <li>Save it to your computer or print it immediately</li>
                    <li>You can download it as many times as needed — it's always available in your account</li>
                  </ol>
                  <p className="text-base text-[#616d7b] leading-6 mt-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <strong>Note:</strong> Your certificate is available immediately after course completion. No waiting period required.
                  </p>
                </div>
              )}
            </div>

            {/* Help 5 */}
            <div className="bg-white border border-[#e4e6ea] rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedHelp(expandedHelp === 'help5' ? null : 'help5')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-base font-semibold text-[#1e2832] leading-6 tracking-[-0.4px] text-left" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  How to submit your certificate to the court
                </span>
                <img 
                  src={imgChevronFAQ} 
                  alt="" 
                  className={`w-4 h-4 transition-transform ${expandedHelp === 'help5' ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedHelp === 'help5' && (
                <div className="px-6 pb-5">
                  <p className="text-base text-[#616d7b] leading-6 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    To submit your certificate for ticket dismissal:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-base text-[#616d7b] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <li>Download your Certificate of Completion from your account</li>
                    <li>Request your Texas Driver Record (DPS Type 3A) from the Texas Department of Public Safety</li>
                    <li>Check if your court requires a court affidavit (some courts do, some don't)</li>
                    <li>Gather all required documents according to your court's specific instructions</li>
                    <li>Submit everything to your court by the deadline (usually 90-120 days from ticket date)</li>
                    <li>Keep copies of everything you submit for your records</li>
                  </ol>
                  <p className="text-base text-[#616d7b] leading-6 mt-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <strong>Important:</strong> Every court has different requirements. Always check your court's website or call them directly for their exact submission instructions.
                  </p>
                </div>
              )}
            </div>

            {/* Help 6 */}
            <div className="bg-white border border-[#e4e6ea] rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedHelp(expandedHelp === 'help6' ? null : 'help6')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-base font-semibold text-[#1e2832] leading-6 tracking-[-0.4px] text-left" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  How to request your Texas Driver Record (DPS Type 3A)
                </span>
                <img 
                  src={imgChevronFAQ} 
                  alt="" 
                  className={`w-4 h-4 transition-transform ${expandedHelp === 'help6' ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedHelp === 'help6' && (
                <div className="px-6 pb-5">
                  <p className="text-base text-[#616d7b] leading-6 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    To get your DPS Type 3A driver record:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-base text-[#616d7b] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <li>Visit the Texas DPS website or go to a DPS office in person</li>
                    <li>Request a "Type 3A" driver record (this is the specific type courts require)</li>
                    <li>Pay the required fee (usually around $10-12, paid directly to DPS)</li>
                    <li>You can request it online, by mail, or in person</li>
                    <li>Processing time is typically 5-10 business days</li>
                    <li>Make sure to request it early enough to meet your court deadline</li>
                  </ol>
                  <p className="text-base text-[#616d7b] leading-6 mt-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <strong>Tip:</strong> You can request your driver record online at the Texas DPS website for faster processing.
                  </p>
                </div>
              )}
            </div>

            {/* Help 7 */}
            <div className="bg-white border border-[#e4e6ea] rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedHelp(expandedHelp === 'help7' ? null : 'help7')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-base font-semibold text-[#1e2832] leading-6 tracking-[-0.4px] text-left" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  How to reset your password
                </span>
                <img 
                  src={imgChevronFAQ} 
                  alt="" 
                  className={`w-4 h-4 transition-transform ${expandedHelp === 'help7' ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedHelp === 'help7' && (
                <div className="px-6 pb-5">
                  <p className="text-base text-[#616d7b] leading-6 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    If you forgot your password:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-base text-[#616d7b] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <li>Go to the login page</li>
                    <li>Click the "Forgot Password" link below the login form</li>
                    <li>Enter the email address you used to enroll</li>
                    <li>Check your email for a password reset link</li>
                    <li>Click the link in the email (it expires after 24 hours)</li>
                    <li>Create a new password following the requirements</li>
                    <li>Log in with your new password</li>
                  </ol>
                  <p className="text-base text-[#616d7b] leading-6 mt-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <strong>Note:</strong> If you don't receive the email, check your spam folder. If you still have issues, contact our support team.
                  </p>
                </div>
              )}
            </div>

            {/* Help 8 */}
            <div className="bg-white border border-[#e4e6ea] rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedHelp(expandedHelp === 'help8' ? null : 'help8')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="text-base font-semibold text-[#1e2832] leading-6 tracking-[-0.4px] text-left" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  How to take the course on mobile devices
                </span>
                <img 
                  src={imgChevronFAQ} 
                  alt="" 
                  className={`w-4 h-4 transition-transform ${expandedHelp === 'help8' ? 'rotate-180' : ''}`} 
                />
              </button>
              {expandedHelp === 'help8' && (
                <div className="px-6 pb-5">
                  <p className="text-base text-[#616d7b] leading-6 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Our course is fully mobile-friendly. Here's how to use it on your phone or tablet:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-base text-[#616d7b] leading-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <li>Open your mobile browser (Safari, Chrome, Firefox, etc.)</li>
                    <li>Navigate to our website and log in to your account</li>
                    <li>The course automatically adapts to your screen size</li>
                    <li>You can scroll through content, watch videos, and take quizzes just like on a computer</li>
                    <li>Your progress saves automatically, so you can switch between devices anytime</li>
                    <li>Complete the course entirely on your phone, or switch between phone, tablet, and computer</li>
                  </ol>
                  <p className="text-base text-[#616d7b] leading-6 mt-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    <strong>Tip:</strong> For the best experience, use a stable internet connection and keep your browser updated.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Still need help? CTA */}
          <div className="bg-white border border-[#e4e6ea] rounded-[20px] p-8 flex flex-col gap-3 items-center">
            <h3 className="text-xl font-semibold text-[#1e2832] text-center leading-7 tracking-[-0.5px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Still need help?
            </h3>
            <p className="text-base text-[#616d7b] text-center leading-6 pb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Our Texas-based support team is here to help. We typically respond within 1 business day.
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

