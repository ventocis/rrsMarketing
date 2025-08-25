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

  console.log('🔍 CoursePage: Data processed, rendering JSX');

  // Load state-specific requirements data
  const stateRequirements = getStateRequirements(course.state, course.course_type);

  // State for collapsible certificate details
  const [showStateDetails, setShowStateDetails] = useState(false);

  // Details accordion data
  const details = [
    { key: 'eligibility', title: copy.details_labels.eligibility, body: course.eligibility },
    { key: 'identity_verification', title: copy.details_labels.identity_verification, body: course.identity_verification },
    { key: 'reporting_method', title: copy.details_labels.reporting_method, body: course.reporting_method },
    { key: 'certificate_delivery', title: copy.details_labels.certificate_delivery, body: course.certificate_delivery },
    { key: 'retake_policy', title: copy.details_labels.retake_policy, body: course.retake_policy },
  ].filter(item => item.body && item.body !== 'Not specified');

  console.log('🔍 CoursePage: About to return JSX');
  
  return (
    <>
      <SEO 
        title={course.course_name}
        description={`${course.course_name} online. Mobile-friendly with clear requirements, pricing, and certificate details. ${course.subhead || ''}`}
        keywords={`${course.course_name}, ${stateNames[course.state] || course.state}, traffic school, defensive driving, online course`}
        image="/assets/rrs (1200 x 630 px).png"
        url={`/courses/${course.slug}`}
      />
      <StructuredData type="course" data={course} />
      <main className="bg-gradient-to-b from-white to-gray-50 min-h-screen pb-16 md:pb-0">
      {/* Course Header */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.course_name}</h1>
        {course.subhead && (
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
            
            {/* Facts Strip */}
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
            
            {/* Details Accordion */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{copy.headings.details}</h2>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
                <Accordion>
                  {details.map((item) => (
                    <Accordion.Panel key={item.key}>
                      <Accordion.Title>{item.title}</Accordion.Title>
                      <Accordion.Content>
                        <p className="text-gray-700 leading-relaxed">{item.body}</p>
                      </Accordion.Content>
                    </Accordion.Panel>
                  ))}
                </Accordion>
              </div>
            </section>
            
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
            
            {/* Certificate Callout */}
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
            
            {/* Disclaimer */}
            <section className="mt-12">
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                <p className="text-sm text-gray-600 leading-relaxed text-center">
                  {copy.disclaimer}
                </p>
              </div>
            </section>
          </div>
          
          {/* Right Column - BuyBox */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BuyBox 
                course={course} 
                price={price}
                provider={isPartner ? course.provider_name : 'Road Ready'}
                isPartner={isPartner}
                affiliateLink={course.affiliate_link}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* StickyEnrollBar */}
      <StickyEnrollBar course={course} />
    </main>
    </>
  );
}
