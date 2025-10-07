import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import courses from './data/courses.json';
import { usd, hours, truncate } from './lib/format.js';
import { Accordion } from 'flowbite-react';
import StickyEnrollBar from './components/StickyEnrollBar.jsx';
// CoursePreview removed - was causing React Error #310
import BuyBox from './components/BuyBox.jsx';
import CourseIllustration from './components/CourseIllustration.jsx';
import { getStateRequirements } from './utils/stateRequirements.js';
import SEO from './components/SEO.jsx';
import StructuredData from './components/StructuredData.jsx';
import CountySelector from './components/CountySelector.jsx';
import Button from './components/Button.jsx';


// State name mapping for full names
const stateNames = {
  'FL': 'Florida',
  'IL': 'Illinois', 
  'LA': 'Louisiana',
  'MI': 'Michigan',
  'MO': 'Missouri',
  'NY': 'New York',
  'TN': 'Tennessee',
  'TX': 'Texas',
  'VA': 'Virginia'
};

// Blueprint copy and labels
const copy = {
  facts_labels: {
    state: 'State',
    duration: 'Duration',
    price: 'Price',
    provider: 'Provider',
    certificate: 'Certificate',
  },
  details_labels: {
    eligibility: 'Eligibility',
    identity_verification: 'Identity Verification',
    reporting_method: 'Reporting',
    certificate_delivery: 'Certificate Delivery',
    retake_policy: 'Retake Policy',
  },
  headings: {
    details: 'Course requirements & logistics',
    features: 'What you\'ll learn',
  },
  partner_pill: 'Provided by TicketSchool',
  provider_note: 'You\'ll enroll and complete this course on TicketSchool\'s secure site. Road Ready is a trusted affiliate.',
  cta: {
    inhouse: 'Start course →',
    partner: 'Continue on TicketSchool →',
  },
  disclaimer: 'Acceptance varies by court and insurer. Always confirm requirements.',
  empty: {
    notFoundTitle: 'Course not found',
    notFoundBody: 'This course isn\'t available yet. Please choose another course or check back soon.',
  },
};

export default function CoursePage() {
  console.log('🔍 CoursePage: Component starting to render');
  
  const { slug } = useParams();
  console.log('🔍 CoursePage: useParams slug =', slug);
  
  const course = courses.find(c => c.slug === slug);
  console.log('🔍 CoursePage: Found course =', course);
  
  if (!course) {
    console.log('🔍 CoursePage: No course found, showing error page');
    return (
      <div className="max-w-2xl mx-auto py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">{copy.empty.notFoundTitle}</h1>
        <p className="text-gray-600 mb-8">{copy.empty.notFoundBody}</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  console.log('🔍 CoursePage: Course found, processing data');
  
  // Format data for display
  const price = usd(course.price_usd);
  const duration = hours(course.duration_hours);
  const isPartner = course.provider_type === 'Partner';
  const showFeatures = course.show_modules === true || course.show_modules === 'TRUE';
  const features = (course.features || course.modules || course.notes || '').split('|').filter(Boolean);
  
  // Texas-specific logic
  const isTexasDefensive = course.slug === 'tx-defensive';

  console.log('🔍 CoursePage: Data processed, rendering JSX');

  // Load state-specific requirements data
  const stateRequirements = getStateRequirements(course.state, course.course_type);

  // State for collapsible certificate details
  const [showStateDetails, setShowStateDetails] = useState(false);

  // Details accordion data
  const details = [
    { 
      key: 'eligibility', 
      title: copy.details_labels.eligibility, 
      body: isTexasDefensive 
        ? 'To dismiss a ticket, first ask the court for permission before the appearance date on your citation. Defensive Driving is for non-commercial drivers only.\n\nYou must not have taken a Texas defensive driving course for a ticket in the past 12 months. Your violation must be eligible and not 25 miles per hour or more over the limit.\n\nIf you\'re taking the course for an insurance discount, you don\'t need court permission—just finish the course and give the certificate to your insurer. For any extra steps your court may require, use the County selector below.'
        : course.eligibility 
    },
    { 
      key: 'identity_verification', 
      title: copy.details_labels.identity_verification, 
      body: isTexasDefensive 
        ? 'Texas requires us to confirm who\'s taking the course. You\'ll answer a few questions based on your driver or vehicle records at the start and at random times.'
        : course.identity_verification 
    },
    { 
      key: 'reporting_method', 
      title: copy.details_labels.reporting_method, 
      body: isTexasDefensive 
        ? 'You are responsible for turning in your certificate to the court. After you get permission, complete the course and submit your certificate the way your court asks. Many courts also ask for a Type 3A driving record; we\'ll show you how to order it from Texas.gov in the County section. Most courts give about 90 days from the date permission is granted—follow your court\'s deadline.'
        : course.reporting_method 
    },
    { 
      key: 'certificate_delivery', 
      title: copy.details_labels.certificate_delivery, 
      body: isTexasDefensive 
        ? 'We email your electronic certificate as soon as you finish, and you can download it from your dashboard. Check that your name and citation details are correct before you submit anything to the court or your insurer. For mailing addresses, in-person drop-off, email, or online portals—and for any forms your court needs—use the County section below.'
        : course.certificate_delivery 
    },
    { key: 'retake_policy', title: copy.details_labels.retake_policy, body: course.retake_policy },
  ].filter(item => item.body && item.body !== 'Not specified');

  console.log('🔍 CoursePage: About to return JSX');
  
  return (
    <>
      <SEO 
                title={isTexasDefensive ? 'Texas Driver Safety Course (6-Hour) — TDLR-Approved | $28 Total' : course.course_name}
                description={isTexasDefensive
                  ? 'Complete Texas\'s 6-hour Driver Safety Course online. TDLR-approved, $28 total ($25 course + $3 state fee), free e-certificate. Court dismissal with permission or insurance discount.'
                  : `${course.course_name} online. Mobile-friendly with clear requirements, pricing, and certificate details. ${course.subhead || ''}`
                }
        keywords={`${course.course_name}, ${stateNames[course.state] || course.state}, traffic school, defensive driving, online course`}
        image="/assets/rrs (1200 x 630 px).png"
        url={`/courses/${course.slug}`}
      />
      <StructuredData type="course" data={course} />
              
              {/* FAQ JSON-LD for Texas page */}
              {isTexasDefensive && (
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "FAQPage",
                      "mainEntity": [
                        {
                          "@type": "Question",
                          "name": "How much does it cost?",
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "The total is $28: $25 for the course plus a $3 Texas state fee required by TDLR. If your court asks for a certified 3A driving record, you'll order it from Texas.gov at the state-set price."
                          }
                        },
                        {
                          "@type": "Question",
                          "name": "Do I need court permission?",
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "For ticket dismissal, yes, ask your court before your appearance date. For insurance only, no permission needed."
                          }
                        },
                        {
                          "@type": "Question",
                          "name": "How fast can I finish?",
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Texas requires 6 hours. You can do it in one day or in short sessions, your progress saves on any device."
                          }
                        },
                        {
                          "@type": "Question",
                          "name": "When do I get my certificate?",
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Immediately by email. You can also download it from your dashboard."
                          }
                        },
                        {
                          "@type": "Question",
                          "name": "What if my county needs a 3A record?",
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Some courts ask for a Type 3A Driving Record in addition to your certificate. We show you how to order it from Texas.gov in minutes."
                          }
                        },
                        {
                          "@type": "Question",
                          "name": "Will my court or insurer accept this?",
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "The course is TDLR-approved statewide. Acceptance can vary by court and insurer—always confirm your specific requirements."
                          }
                        }
                      ]
                    })
                  }}
                />
              )}
      <main className="bg-gradient-to-b from-white to-gray-50 min-h-screen pb-20 md:pb-0">
      {/* Course Header */}
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-8">
        <h1 className={isTexasDefensive ? "text-2xl md:text-5xl font-extrabold text-gray-900 mb-3 md:mb-4" : "text-3xl font-bold text-gray-900 mb-4"}>
          {isTexasDefensive ? 'Texas Driver Safety Course (6-Hour)' : course.course_name}
        </h1>
        {isTexasDefensive ? (
          <p className="text-sm md:text-base leading-relaxed text-gray-600 mb-4">TDLR-approved, 100% online. Finish today—free e-certificate by email.</p>
        ) : course.subhead && (
          <p className="text-lg text-gray-600 mb-4">{course.subhead}</p>
        )}
      </div>
      
      {/* Main Content Grid - Left Content + Right BuyBox */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* CourseIllustration */}
            <CourseIllustration />
            
            {/* Facts Strip - Hidden for Texas */}
            {!isTexasDefensive && (
            <section className="mt-12">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-sm text-gray-500 mb-1">{copy.facts_labels.state}</div>
                    <div className="font-semibold text-gray-900">{stateNames[course.state] || course.state}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">{copy.facts_labels.duration}</div>
                    <div className="font-semibold text-gray-900">{duration}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">{copy.facts_labels.price}</div>
                    <div className="font-semibold text-gray-900">{price}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">{copy.facts_labels.provider}</div>
                    <div className="font-semibold text-gray-900">{isPartner ? course.provider_name : 'Road Ready'}</div>
                  </div>
                </div>
              </div>
            </section>
            )}

            {/* Faint divider after hero */}
            {isTexasDefensive && (
              <div className="border-b border-slate-200/70 pb-6 md:pb-8"></div>
            )}

            {/* How it works heading - Texas Only */}
            {isTexasDefensive && (
              <section id="how-it-works" className="mt-6 md:mt-14">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">How it works</h2>
              </section>
            )}

            {/* 3-Step Explainer - Texas Only - Tighter vertical layout */}
            {isTexasDefensive && (
              <section id="steps" className="mt-6 md:mt-14">
                <div className="space-y-3 md:space-y-4">
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-7 w-7 rounded-full bg-blue-100 text-blue-700 font-semibold grid place-items-center text-sm">1</div>
                      <div>
                        <h3 className="text-base font-semibold">Ask your court</h3>
                        <p className="mt-2 text-sm text-muted-foreground">Request permission before your appearance date.</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-7 w-7 rounded-full bg-blue-100 text-blue-700 font-semibold grid place-items-center text-sm">2</div>
                      <div>
                        <h3 className="text-base font-semibold">Take the 6-hour course</h3>
                        <p className="mt-2 text-sm text-muted-foreground">100% online. Start, pause, and finish anytime.</p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-7 w-7 rounded-full bg-blue-100 text-blue-700 font-semibold grid place-items-center text-sm">3</div>
                      <div>
                        <h3 className="text-base font-semibold">Submit your certificate</h3>
                        <p className="mt-2 text-sm text-muted-foreground">Send it to your court. Order a 3A record if your court asks.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Details Accordion - Texas Only - Improved styling */}
            {isTexasDefensive && (
              <section className="mt-10 md:mt-14">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <Accordion>
                    {details.map((item) => {
                      // Texas-specific title mapping
                      let title = item.title;
                      if (isTexasDefensive) {
                        switch (item.key) {
                          case 'identity_verification':
                            title = 'ID checks';
                            break;
                          case 'reporting_method':
                            title = 'Submitting to your court';
                            break;
                          case 'certificate_delivery':
                            title = 'Your certificate';
                            break;
                          default:
                            title = item.title;
                        }
                      }
                      
                      return (
                        <Accordion.Panel key={item.key}>
                          <Accordion.Title className="min-h-[56px] px-4 w-full flex items-center" aria-label={`Toggle ${title}`}>
                            {title}
                          </Accordion.Title>
                          <Accordion.Content className="px-4 pb-5 md:pb-6 bg-slate-50">
                            <div className="max-w-prose mx-auto">
                              {item.body.includes('\n\n') ? (
                                item.body.split('\n\n').map((paragraph, idx) => (
                                  <p key={idx} className="text-base leading-relaxed mb-4 last:mb-0">
                                    {paragraph}
                                  </p>
                                ))
                              ) : (
                                <p className="text-base leading-relaxed">{item.body}</p>
                              )}
                            </div>
                          </Accordion.Content>
                        </Accordion.Panel>
                      );
                    })}
                  </Accordion>
                </div>
              </section>
            )}

            {/* Details Accordion - Non-Texas */}
            {!isTexasDefensive && (
              <section id="how-it-works" className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{copy.headings.details}</h2>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
                <Accordion>
                  {details.map((item) => (
                    <Accordion.Panel key={item.key}>
                        <Accordion.Title className="min-h-[2.5rem] h-10 w-full flex items-center" aria-label={`Toggle ${item.title}`}>
                          {item.title}
                        </Accordion.Title>
                      <Accordion.Content>
                          {item.body.includes('\n\n') ? (
                            item.body.split('\n\n').map((paragraph, idx) => (
                              <p key={idx} className="text-base leading-relaxed mb-4 last:mb-0">
                                {paragraph}
                              </p>
                            ))
                          ) : (
                            <p className="text-base leading-relaxed">{item.body}</p>
                          )}
                      </Accordion.Content>
                    </Accordion.Panel>
                  ))}
                </Accordion>
              </div>
            </section>
            )}
            
            {/* County Selector - Only for TX Defensive Driving */}
            {isTexasDefensive && (
              <section className="mt-10 md:mt-14">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Find your county's instructions</h2>
                <p className="text-sm text-muted-foreground mb-6">We'll show your court's steps and any forms to download.</p>
                <CountySelector />
              </section>
            )}


                      {/* FAQ Section - Texas Only - Updated with 5 questions */}
                      {isTexasDefensive && (
                        <section className="mt-10 md:mt-14">
                          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
                            <Accordion>
                              <Accordion.Panel>
                                <Accordion.Title className="min-h-[56px] px-4 w-full flex items-center" aria-label="Toggle How much does it cost?">
                                  How much does it cost?
                                </Accordion.Title>
                                <Accordion.Content className="px-4 pb-5 md:pb-6 bg-slate-50">
                                  <div className="max-w-prose mx-auto space-y-4">
                                    <p className="text-base leading-relaxed">
                                      <span className="font-medium">The total is $28: $25 for the course plus a $3 Texas state fee required by TDLR.</span> If your court asks for a certified 3A driving record, you'll order it from Texas.gov at the state-set price.
                                    </p>
                                  </div>
                                </Accordion.Content>
                              </Accordion.Panel>
                              <Accordion.Panel>
                                <Accordion.Title className="min-h-[56px] px-4 w-full flex items-center" aria-label="Toggle Do I need court permission?">
                                  Do I need court permission?
                                </Accordion.Title>
                                <Accordion.Content className="px-4 pb-5 md:pb-6 bg-slate-50">
                                  <div className="max-w-prose mx-auto space-y-4">
                                    <p className="text-base leading-relaxed">
                                      <span className="font-medium">For ticket dismissal, yes, ask your court before your appearance date.</span> For insurance only, no permission needed.
                                    </p>
                                  </div>
                                </Accordion.Content>
                              </Accordion.Panel>
                              <Accordion.Panel>
                                <Accordion.Title className="min-h-[56px] px-4 w-full flex items-center" aria-label="Toggle How fast can I finish?">
                                  How fast can I finish?
                                </Accordion.Title>
                                <Accordion.Content className="px-4 pb-5 md:pb-6 bg-slate-50">
                                  <div className="max-w-prose mx-auto space-y-4">
                                    <p className="text-base leading-relaxed">
                                      <span className="font-medium">Texas requires 6 hours.</span> You can do it in one day or in short sessions, your progress saves on any device.
                                    </p>
                                  </div>
                                </Accordion.Content>
                              </Accordion.Panel>
                              <Accordion.Panel>
                                <Accordion.Title className="min-h-[56px] px-4 w-full flex items-center" aria-label="Toggle When do I get my certificate?">
                                  When do I get my certificate?
                                </Accordion.Title>
                                <Accordion.Content className="px-4 pb-5 md:pb-6 bg-slate-50">
                                  <div className="max-w-prose mx-auto space-y-4">
                                    <p className="text-base leading-relaxed">
                                      <span className="font-medium">Immediately by email.</span> You can also download it from your dashboard.
                                    </p>
                                  </div>
                                </Accordion.Content>
                              </Accordion.Panel>
                              <Accordion.Panel>
                                <Accordion.Title className="min-h-[56px] px-4 w-full flex items-center" aria-label="Toggle What if my county needs a 3A record?">
                                  What if my county needs a 3A record?
                                </Accordion.Title>
                                <Accordion.Content className="px-4 pb-5 md:pb-6 bg-slate-50">
                                  <div className="max-w-prose mx-auto space-y-4">
                                    <p className="text-base leading-relaxed">
                                      <span className="font-medium">Some courts ask for a Type 3A Driving Record in addition to your certificate.</span> We show you how to order it from Texas.gov in minutes.
                                    </p>
                                  </div>
                                </Accordion.Content>
                              </Accordion.Panel>
                              <Accordion.Panel>
                                <Accordion.Title className="min-h-[56px] px-4 w-full flex items-center" aria-label="Toggle Will my court or insurer accept this?">
                                  Will my court or insurer accept this?
                                </Accordion.Title>
                                <Accordion.Content className="px-4 pb-5 md:pb-6 bg-slate-50">
                                  <div className="max-w-prose mx-auto space-y-4">
                                    <p className="text-base leading-relaxed">
                                      <span className="font-medium">The course is TDLR-approved statewide.</span> Acceptance can vary by court and insurer—always confirm your specific requirements.
                                    </p>
                                  </div>
                                </Accordion.Content>
                              </Accordion.Panel>
                            </Accordion>
                          </div>
                        </section>
                      )}

                      {/* Insurance-only Note - Mobile Only */}
                      {isTexasDefensive && (
                        <div className="mt-10 md:mt-14 md:hidden">
                          <div className="bg-blue-50 rounded-lg border border-blue-200 p-3">
                            <div className="flex items-start gap-2">
                              <div className="text-blue-600 mt-0.5">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-blue-900 mb-1">Doing this for insurance only?</h3>
                                <p className="text-xs text-blue-800">
                                  Enroll and send your e-certificate to your insurer—no court permission needed. Price is $28 total ($25 course + $3 Texas state fee).
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
            
            {/* Features Section */}
            {showFeatures && features.length > 0 && (
              <section className="mt-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{copy.headings.features}</h2>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <ul className="space-y-3">
                    {features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-blue-600 font-bold mt-0.5">•</span>
                        <span className="text-gray-700 leading-relaxed">{feature.trim()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}
            
            {/* Certificate Callout - Hidden for TX Defensive Driving */}
            {course.slug !== 'tx-defensive' && (
            <section className="mt-12">
              <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="text-blue-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-blue-900">Certificate & Submission</h3>
                      {stateRequirements && stateRequirements.submission && (
                        <button
                          onClick={() => setShowStateDetails(!showStateDetails)}
                          className="flex items-center gap-1 text-sm text-blue-700 hover:text-blue-800 transition-colors"
                        >
                          <span className="font-medium">
                            {showStateDetails ? 'Hide' : 'Show'} state details
                          </span>
                          <svg 
                            className={`h-4 w-4 transition-transform ${showStateDetails ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <p className="text-blue-800 leading-relaxed mb-4">
                      {course.certificate_delivery || 'Your certificate will be available for download upon course completion.'}
                    </p>
                    
                    {stateRequirements && stateRequirements.submission && showStateDetails && (
                      <div className="bg-white rounded-lg p-4 mb-4">
                        <h4 className="font-medium text-blue-900 mb-2">State-Specific Details:</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          These are the specific submission requirements and deadlines for {course.state} {course.course_type} courses:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          {stateRequirements.submission.certificate && (
                            <div>
                              <span className="font-medium text-gray-700">Submission:</span>
                              <p className="text-gray-600 mt-1">{stateRequirements.submission.certificate}</p>
                            </div>
                          )}
                          {stateRequirements.submission.deadlines && (
                            <div className={!stateRequirements.submission.certificate ? 'md:col-span-2' : ''}>
                              <span className="font-medium text-gray-700">Deadline:</span>
                              <p className="text-gray-600 mt-1">{stateRequirements.submission.deadlines}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-3">
                      <a 
                        href={`/courses/${course.slug}/requirements`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-800 underline decoration-blue-300 underline-offset-2"
                      >
                        Complete course requirements
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                      
                      {stateRequirements?.sources?.[0] && (
                        <a 
                          href={stateRequirements.sources[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-800 underline decoration-blue-300 underline-offset-2"
                        >
                          Official state requirements
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            )}
            
            {/* Disclaimer */}
            <section className="mt-12 mb-16">
              <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
                <p className="text-sm text-blue-800 leading-relaxed text-center font-medium">
                  {copy.disclaimer}
                </p>
              </div>
            </section>
          </div>
          
                    {/* Right Column - BuyBox - Hidden on mobile for Texas */}
          <div className="lg:col-span-1">
                      <div className="sticky top-8 hidden md:block">
              <BuyBox 
                course={course} 
                price={price}
                provider={isPartner ? course.provider_name : 'Road Ready'}
                isPartner={isPartner}
                affiliateLink={course.affiliate_link}
              />

                        {/* Insurance-only Note - Texas Only - Desktop only */}
                        {isTexasDefensive && (
                          <div className="mt-4">
                            <div className="bg-blue-50 rounded-lg border border-blue-200 p-3">
                              <div className="flex items-start gap-2">
                                <div className="text-blue-600 mt-0.5">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                </div>
                                <div>
                                  <h3 className="text-sm font-medium text-blue-900 mb-1">Doing this for insurance only?</h3>
                                  <p className="text-xs text-blue-800">
                                    Enroll and send your e-certificate to your insurer—no court permission needed. Price is $28 total ($25 course + $3 Texas state fee).
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
            </div>
          </div>
        </div>
      </div>
      
      {/* StickyEnrollBar */}
      <StickyEnrollBar course={course} />

      {/* Mobile Sticky CTA - Texas Only */}
      {isTexasDefensive && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:hidden z-50">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <div className="text-2xl font-bold text-gray-900">$28 total</div>
              <div className="text-xs text-muted-foreground">($25 course + $3 Texas state fee)</div>
            </div>
            <Button
              href={course.affiliate_link}
              target="_blank"
              rel="noopener sponsored"
              variant="primary"
              size="lg"
              className="flex-1"
              data-rr="cta-enroll-mobile"
            >
              Enroll now
            </Button>
          </div>
        </div>
      )}
    </main>
    </>
  );
}
