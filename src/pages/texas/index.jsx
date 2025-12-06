import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Accordion } from 'flowbite-react';
import TexasLayout from '../../components/texas/TexasLayout.jsx';
import Button from '../../components/Button.jsx';
import Card from '../../components/Card.jsx';
import CheckCircleIcon from '../../components/icons/CheckCircleIcon.jsx';
import SEO from '../../components/SEO.jsx';

export default function TexasIndex() {
  const [expandedExpect, setExpandedExpect] = useState(0);

  return (
    <TexasLayout>
      <SEO 
        title="#1 Texas Driver Safety Course: Fast, Convenient, & Online"
        description="Check your eligibility, request permission from your court, and complete your Texas-approved course — all online, all on any device."
        keywords="Texas driver safety course, defensive driving, traffic school, online course, Texas approved"
        image="/assets/rrs (1200 x 630 px).png"
        url="/texas"
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          {/* Hero - Two Column */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
            {/* Left Column */}
            <div>
              <h1 className="text-6xl lg:text-7xl font-normal text-gray-900 mb-8 leading-normal tracking-normal">
                #1 <span className="font-bold">Texas Driver Safety Course</span>: Fast, Convenient, & Online
              </h1>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Check your eligibility, request permission from your court, and complete your Texas-approved course — all online, all on any device.
              </p>
              <Button href="/courses/tx-defensive" variant="primary" size="lg" className="w-full">
                Start Course
              </Button>
            </div>
            
            {/* Right Column - Layered Hero Images */}
            <div className="relative w-full h-[500px] lg:h-[650px] overflow-visible flex items-center justify-center">
              {/* Background webpage - scaled larger and positioned behind phone, partially off-screen */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <img 
                  src="/texas/webpage.png" 
                  alt="Web interface background" 
                  className="w-[160%] lg:w-[190%] h-auto transform scale-[1.4] lg:scale-[1.65] translate-x-[57%] lg:translate-x-[62%] translate-y-[2%] lg:translate-y-[4%] opacity-50 lg:opacity-55"
                  style={{
                    willChange: 'transform',
                    objectFit: 'contain',
                  }}
                />
              </div>
              
              {/* Phone on top - positioned left and down */}
              <div className="relative z-10 w-full max-w-sm lg:max-w-md mx-auto transform -translate-x-[5%] lg:-translate-x-[8%] translate-y-[3%] lg:translate-y-[5%]">
                <img 
                  src="/texas/phone.png" 
                  alt="Mobile course interface" 
                  className="w-full h-auto"
                  style={{
                    filter: 'drop-shadow(0 25px 50px -12px rgba(0, 0, 0, 0.25))',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Feature Badges - 2x2 Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 flex items-start gap-4">
              <div className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircleIcon className="w-7 h-7 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">TDLR-Approved Provider</h3>
                <p className="text-xl text-gray-600">Accepted by all Texas courts.</p>
              </div>
            </div>
            
            <div className="p-6 flex items-start gap-4">
              <div className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircleIcon className="w-7 h-7 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Mobile Friendly</h3>
                <p className="text-xl text-gray-600">Take course on any device.</p>
              </div>
            </div>
            
            <div className="p-6 flex items-start gap-4">
              <div className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircleIcon className="w-7 h-7 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">Super Easy</h3>
                <p className="text-xl text-gray-600">Take course at your pace.</p>
              </div>
            </div>
            
            <div className="p-6 flex items-start gap-4">
              <div className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircleIcon className="w-7 h-7 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">100% Satisfaction Guarantee</h3>
                <p className="text-xl text-gray-600">If something isn't right, we'll fix it.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Info + Pricing Card */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column */}
            <div className="flex flex-col items-start justify-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Texas Defensive Driving Course (6 hr)
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Complete your Texas-approved defensive driving course quickly and easily.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <CheckCircleIcon className="w-7 h-7 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-gray-700"><strong>Fast:</strong> Complete in as little as 6 hours (Texas minimum required)</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircleIcon className="w-7 h-7 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-gray-700"><strong>Low Price:</strong> We charge the required state-minimum fee</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircleIcon className="w-7 h-7 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-gray-700"><strong>Texas-Approved:</strong> Accepted by every court in the state</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircleIcon className="w-7 h-7 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-gray-700"><strong>100% Online:</strong> Take it anywhere — phone, tablet, or computer</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircleIcon className="w-7 h-7 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-gray-700"><strong>Instant Certificate:</strong> Ready immediately when you finish</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircleIcon className="w-7 h-7 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-lg text-gray-700"><strong>Court Lookup Built-In:</strong> Find your county, precinct, and instructions in seconds</span>
                </li>
              </ul>
            </div>

            {/* Right Column - Pricing Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 lg:p-8 max-w-md lg:max-w-sm mx-auto lg:mx-0 lg:ml-auto mt-12 lg:mt-16">
              <div className="mb-6">
                <div className="text-5xl font-bold text-gray-900 mb-2">$25.00</div>
                <div className="text-sm text-gray-600 mb-6">+$3.00 Fee</div>
                
              </div>

              <Button href="/courses/tx-defensive" variant="primary" size="lg" className="w-full mb-6">
                Enroll Now
              </Button>

              <ul className="space-y-2 text-sm text-gray-600">
                <li>Secure Checkout</li>
                <li>Course Provider Road Ready Driver Instruction LLC</li>
                <li>100% Satisfaction Guarantee</li>
                <li>Refund Policy</li>
                <li>Customer Service</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Accordion */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-left mb-12">
            What to Expect
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <Accordion>
              <Accordion.Panel>
                <Accordion.Title className="text-xl font-semibold text-gray-900">
                  Texas Requirements
                </Accordion.Title>
                <Accordion.Content>
                  <div className="text-lg text-gray-600 leading-relaxed space-y-4">
                    <p>Texas doesn't just say "take a course." To dismiss a ticket with defensive driving, most Texas courts require you to:</p>
                    
                    <div className="space-y-3">
                      <p><strong>Be eligible for a driving safety course.</strong></p>
                      <p className="ml-4">In general, you must not hold a commercial driver license, must not have been going 25 mph or more over the posted limit, and you usually can't have taken a Texas defensive driving course for ticket dismissal in the last 12 months.</p>
                      
                      <p><strong>Get permission from your court.</strong></p>
                      <p className="ml-4">Before your deadline, your judge or court clerk must approve you to take a 6-hour state-approved defensive driving course for ticket dismissal.</p>
                      
                      <p><strong>Complete a 6-hour Texas-approved course.</strong></p>
                      <p className="ml-4">You must finish every lesson, pass the required quizzes and final exam, and certify that you—not someone else—completed the course.</p>
                      
                      <p><strong>Order your certified Type 3A driving record.</strong></p>
                      <p className="ml-4">Many Texas courts require a copy of your 3A driving record along with your course certificate.</p>
                      
                      <p><strong>Turn everything in on time.</strong></p>
                      <p className="ml-4">You'll submit your Certificate of Course Completion to the court by the deadline they give you.</p>
                    </div>
                    
                    <p>Every court and precinct can have slightly different instructions, so always follow your local court's rules first.</p>
                    
                    <p>We make this easier by walking you through each step and giving you a quick Eligibility Quiz so you can confirm that you qualify before you enroll.</p>
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
              
              <Accordion.Panel>
                <Accordion.Title className="text-xl font-semibold text-gray-900">
                  Topics Covered
                </Accordion.Title>
                <Accordion.Content>
                  <div className="text-lg text-gray-600 leading-relaxed space-y-4">
                    <p>In 6 hours (the Texas state minimum, with two built-in breaks instead of extra fluff), we cover:</p>
                    
                    <ul className="space-y-3 ml-4">
                      <li><strong>Texas traffic laws & ticket dismissal basics</strong> – why the laws exist, how tickets work, and what courts actually care about.</li>
                      <li><strong>Real-world defensive driving</strong> – the 5 pillars of defensive driving, high-risk situations, crash dynamics, and how to avoid or reduce crash severity.</li>
                      <li><strong>Driver mindset & psychology</strong> – attitude, road rage, distraction, multitasking myths, and how your emotions silently change the way you drive.</li>
                      <li><strong>Alcohol, drugs & DWI</strong> – how substances affect your brain and body, key Texas laws, and real-life consequences (and how to avoid them).</li>
                      <li><strong>Vulnerable road users & big vehicles</strong> – pedestrians, cyclists, motorcyclists, school buses, emergency vehicles, large trucks, and work zones.</li>
                      <li><strong>Modern Texas road issues</strong> – street racing awareness, human trafficking prevention, litter prevention, organ donation awareness, and traffic stop protocols.</li>
                      <li><strong>Special programs & recovery</strong> – driving with disabilities indicators, oversize/overweight vehicle awareness, insurance, SR-22, and Texas support resources.</li>
                    </ul>
                    
                    <p><strong>Testing</strong></p>
                    <p>And don't stress about testing: instead of a giant scary exam, you'll see short 3-question knowledge checks along the way and one final quiz. You always get unlimited retries, so the goal is learning—not tricking you.</p>
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
              
              <Accordion.Panel>
                <Accordion.Title className="text-xl font-semibold text-gray-900">
                  Support Details
                </Accordion.Title>
                <Accordion.Content>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Our friendly Texas-based support team is here to help with anything from questions about topics covered to technical issues like login or account access. You can browse our help articles and resources anytime, and if you still need assistance, email us and a real person will typically respond within one business day.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              
              <Accordion.Panel>
                <Accordion.Title className="text-xl font-semibold text-gray-900">
                  After Taking Course
                </Accordion.Title>
                <Accordion.Content>
                  <div className="text-lg text-gray-600 leading-relaxed space-y-4">
                    <p>Once you finish the course, we'll generate your Texas completion certificate right away using the details in your profile. Before you start, double-check that your legal name, current mailing address, and the correct court handling your case are all entered accurately. You'll find the court name and your due date on your ticket.</p>
                    
                    <p>After you download your certificate, submit it to your court along with your driving record by the deadline they've given you so your ticket can be dismissed. At the end of the course, you'll also have a chance to share feedback on your experience.</p>
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-left mb-16">
            How To Dismiss<br />Your Texas Ticket
          </h2>

          {/* Step 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-24">
            <div className="order-2 lg:order-1">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-gray-900 font-semibold">Step</span>
                  <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs">
                    1
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Check To See If You're Eligible</h3>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Texas has specific rules for who can take a defensive driving course to dismiss a ticket. Take our quick check to confirm you meet the requirements.
              </p>
              <p className="font-semibold text-gray-900 mb-2">This quick quiz tells you:</p>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-gray-700">•</span>
                  <span>Whether you qualify based on Texas statutes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-700">•</span>
                  <span>Whether your violation is eligible</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-700">•</span>
                  <span>Whether you've taken a course too recently</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-700">•</span>
                  <span>What steps you should take next</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-700">•</span>
                  <span>How to request permission from your court (required for all drivers)</span>
                </li>
              </ul>
              <Button href="/texas/eligibility" variant="primary" size="lg" className="mb-3 w-[40%] bg-[#243b53] hover:bg-[#1e2f42]">
                Check Eligibility
              </Button>
              <div>
                <Link to="/courses/tx-defensive" className="text-sm text-gray-900 hover:text-gray-800 underline">
                  Already confirmed eligibility? Start Course
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative w-full h-[400px] lg:h-[500px] overflow-visible flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <img 
                  src="/texas/webpage.png" 
                  alt="Eligibility check interface" 
                  className="w-[130%] lg:w-[150%] h-auto transform scale-[1.1] lg:scale-[1.3] translate-x-[57%] lg:translate-x-[62%] translate-y-[5%] lg:translate-y-[8%] opacity-50 lg:opacity-55"
                  style={{
                    willChange: 'transform',
                    objectFit: 'contain',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-32">
            <div className="order-2 lg:order-1">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-gray-900 font-semibold">Step</span>
                  <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs">
                    2
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Request Permission From Your Court</h3>
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                After confirming eligibility, you need to get permission from your court. We help you find the right court and prepare your request.
              </p>
              <p className="font-semibold text-gray-900 mb-2">Just enter your:</p>
              <ul className="space-y-2 mb-4 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-gray-700">•</span>
                  <span>County</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-700">•</span>
                  <span>Precinct</span>
                </li>
              </ul>
              <p className="font-semibold text-gray-900 mb-2">And you'll receive:</p>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-gray-700">•</span>
                  <span>Your exact court/precinct</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-700">•</span>
                  <span>Judge or clerk info</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-700">•</span>
                  <span>Phone and email</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-700">•</span>
                  <span>What to say</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-700">•</span>
                  <span>A ready-to-send permission email</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-700">•</span>
                  <span>Your next steps</span>
                </li>
              </ul>
              <Button href="/texas/court-finder" variant="primary" size="lg" className="mb-3 w-[40%] bg-[#243b53] hover:bg-[#1e2f42]">
                Find My Court
              </Button>
              <div>
                <Link to="/courses/tx-defensive" className="text-sm text-gray-900 hover:text-gray-800 underline">
                  Already requested permission? Start Course
                </Link>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <img 
                src="/texas/envelope.png" 
                alt="Court permission request" 
                className="max-w-[55%] h-auto transform translate-x-[8%] lg:translate-x-[12%] translate-y-[5%] lg:translate-y-[8%]"
              />
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-gray-900 font-semibold">Step</span>
                  <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs">
                    3
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Sign Up With Road Ready</h3>
              </div>
              <ul className="space-y-2 mb-6 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-gray-700">•</span>
                  <span><strong>Fast:</strong> Complete in as little as 6 hours</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-700">•</span>
                  <span><strong>Low Price:</strong> We charge the required state-minimum fee</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-700">•</span>
                  <span><strong>Texas-Approved:</strong> Accepted by every court in the state</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-700">•</span>
                  <span><strong>100% Online:</strong> Take it anywhere — phone, tablet, or computer</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-700">•</span>
                  <span><strong>Instant Certificate:</strong> Ready immediately when you finish</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-700">•</span>
                  <span><strong>Court Lookup Built-In:</strong> Find your court's instructions in seconds</span>
                </li>
              </ul>
              <Button href="/courses/tx-defensive" variant="primary" size="lg" className="mb-3 w-[40%]">
                Enroll Now
              </Button>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <img 
                src="/texas/enrollphone.png" 
                alt="Enrollment interface" 
                className="max-w-[70%] h-auto transform translate-x-[15%] lg:translate-x-[20%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Band */}
      <section className="py-12 lg:py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12">
            Trusted by Drivers Across Texas
          </h2>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div className="flex items-center justify-start gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg text-gray-700 italic mb-2">"Super easy. I finished on my phone during breaks."</p>
              <p className="text-base text-gray-500">— Texas Driver</p>
            </Card>
            
            <Card>
              <div className="flex items-center justify-start gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg text-gray-700 italic mb-2">"Clear instructions — no confusion at all."</p>
              <p className="text-base text-gray-500">— Texas Driver</p>
            </Card>
            
            <Card>
              <div className="flex items-center justify-start gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg text-gray-700 italic mb-2">"Court accepted my certificate immediately."</p>
              <p className="text-base text-gray-500">— Texas Driver</p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ + Final CTA */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-8">
            FAQ
          </h2>
          <div className="mb-8">
            <Accordion>
              <Accordion.Panel>
                <Accordion.Title className="text-xl font-semibold text-gray-900">
                  Do I need court permission?
                </Accordion.Title>
                <Accordion.Content>
                  <p className="text-gray-600 leading-relaxed">
                    Yes, you must request permission from your court before taking the course. We help you find your court and prepare your request.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              
              <Accordion.Panel>
                <Accordion.Title className="text-xl font-semibold text-gray-900">
                  How long does the course take?
                </Accordion.Title>
                <Accordion.Content>
                  <p className="text-gray-600 leading-relaxed">
                    The course takes a minimum of 6 hours as required by Texas law. You can complete it at your own pace, all online.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              
              <Accordion.Panel>
                <Accordion.Title className="text-xl font-semibold text-gray-900">
                  When do I get my certificate?
                </Accordion.Title>
                <Accordion.Content>
                  <p className="text-gray-600 leading-relaxed">
                    Your certificate is available immediately upon course completion. You can download it right away to submit to your court.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              
              <Accordion.Panel>
                <Accordion.Title className="text-xl font-semibold text-gray-900">
                  Can I use my phone?
                </Accordion.Title>
                <Accordion.Content>
                  <p className="text-gray-600 leading-relaxed">
                    Yes! The course is fully mobile-friendly. You can take it on any device — phone, tablet, or computer.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </div>
          
          <div className="text-center mt-12">
            <Button href="/courses/tx-defensive" variant="primary" size="lg" className="px-12">
              Enroll Now
            </Button>
          </div>
        </div>
      </section>
    </TexasLayout>
  );
}

