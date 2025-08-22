import React from 'react';
import { useParams, Link } from 'react-router-dom';
import courses from './data/courses.json';
import { usd, hours, truncate } from './lib/format.js';
import { Accordion } from 'flowbite-react';
import StickyEnrollBar from './components/StickyEnrollBar.jsx';
import CoursePreview from './components/CoursePreview.jsx';
import BuyBox from './components/BuyBox.jsx';
import CourseBullets from './components/CourseBullets.jsx';
import CourseIllustration from './components/CourseIllustration.jsx';

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
  const { slug } = useParams();
  const course = courses.find(c => c.slug === slug);

  if (!course) {
    return (
      <div className="max-w-2xl mx-auto py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">{copy.empty.notFoundTitle}</h1>
        <p className="text-gray-600 mb-8">{copy.empty.notFoundBody}</p>
        <Link to="/" className="text-blue-600 hover:underline">Back to home</Link>
      </div>
    );
  }

  const isPartner = course.provider_type === 'Partner';
  const showFeatures = course.show_modules === true || course.show_modules === 'TRUE';
  const features = (course.features || course.modules || course.notes || '').split('|').filter(Boolean);
  
  // Format data for BuyBox
  const price = usd(course.price_usd);
  const provider = isPartner ? course.provider_name : 'Road Ready';
  const affiliateLink = course.affiliate_link;

  // Details accordion data
  const details = [
    { key: 'eligibility', title: copy.details_labels.eligibility, body: course.eligibility },
    { key: 'identity_verification', title: copy.details_labels.identity_verification, body: course.identity_verification },
    { key: 'reporting_method', title: copy.details_labels.reporting_method, body: course.reporting_method },
    { key: 'certificate_delivery', title: copy.details_labels.certificate_delivery, body: course.certificate_delivery },
    { key: 'retake_policy', title: copy.details_labels.retake_policy, body: course.retake_policy },
  ].filter(item => item.body);

  return (
    <main className="bg-gradient-to-b from-white to-gray-50 min-h-screen pb-16 md:pb-0">
      {/* Header Band - Two Column Layout */}
      <section className="bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] gap-8">
            
            {/* Left Column - Content */}
            <div className="max-w-[65ch]">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                {course.headline}
              </h1>
              <p className="mt-3 text-gray-600 text-lg md:text-xl">
                {course.subhead}
              </p>
              
              {/* Affiliate Pill */}
              {isPartner && (
                <span className="mt-4 inline-flex max-w-max items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 leading-none">
                  {course.partner_badge || copy.partner_pill}
                </span>
              )}
              
              {/* Course Illustration - Desktop Only */}
              <CourseIllustration />
              
              {/* Course Bullets */}
              <CourseBullets course={course} />
            </div>
            
            {/* Right Column - Buy Box */}
            <div className="lg:order-2">
              <BuyBox
                course={course}
                price={price}
                provider={provider}
                isPartner={isPartner}
                affiliateLink={affiliateLink}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Facts Strip - Full Width Below Header */}
      <section className="max-w-7xl mx-auto px-4 -mt-8 lg:mt-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4 text-center">
            <div className="text-xs uppercase tracking-wide text-gray-500">{copy.facts_labels.state}</div>
            <div className="mt-1 text-lg font-semibold text-gray-900">
              {stateNames[course.state] || course.state}
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4 text-center">
            <div className="text-xs uppercase tracking-wide text-gray-500">{copy.facts_labels.duration}</div>
            <div className="mt-1 text-lg font-semibold text-gray-900">{hours(course.duration_hours)}</div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4 text-center">
            <div className="text-xs uppercase tracking-wide text-gray-500">{copy.facts_labels.price}</div>
            <div className="mt-1 text-lg font-semibold text-gray-900">{usd(course.price_usd)}</div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4 text-center">
            <div className="text-xs uppercase tracking-wide text-gray-500">{copy.facts_labels.provider}</div>
            <div className="mt-1 text-lg font-semibold text-gray-900">{provider}</div>
          </div>
        </div>
      </section>

      {/* Certificate callout */}
      {course.certificate_delivery && (
        <div className="mt-8 flex justify-center">
          <div className="inline-flex max-w-full items-center gap-2 rounded-xl border border-gray-200 bg-white shadow-sm px-4 py-3">
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 2l3 3 4 1-1 4 3 3-3 3 1 4-4 1-3 3-3-3-4-1 1-4-3-3 3-3-1-4 4-1 3-3z"/>
              <path d="M9.5 12.5l2 2 3.5-3.5"/>
            </svg>
            <span className="text-sm text-gray-800">{truncate(course.certificate_delivery, 80)}</span>
          </div>
        </div>
      )}

      {/* Course Preview */}
      <CoursePreview slug={course.slug} />

      {/* Details accordion */}
      <section className="mt-12 max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900">{copy.headings.details}</h2>
        <div className="mt-4 rounded-xl border border-gray-200 bg-white shadow-sm">
          <Accordion collapseAll={false} alwaysOpen={false}>
            {details.map((item, idx) => (
              <Accordion.Panel key={idx}>
                <Accordion.Title className="text-gray-900 font-semibold">{item.title}</Accordion.Title>
                <Accordion.Content>
                  <p className="text-gray-700 leading-relaxed">{item.body}</p>
                </Accordion.Content>
              </Accordion.Panel>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Features (unchanged) */}
      {showFeatures && features.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 mb-8">
          <h2 className="text-xl font-bold mb-4">{copy.headings.features}</h2>
          <ul className="bg-white rounded-lg shadow-sm p-6 list-disc list-inside">
            {features.map((f, i) => (
              <li key={i} className="text-gray-800 mb-2">{f}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Disclaimer */}
      <div className="max-w-3xl mx-auto px-4 text-xs text-gray-400 mt-8">{copy.disclaimer}</div>

      {/* Sticky enroll bar (mobile only) */}
      <StickyEnrollBar course={course} />
    </main>
  );
}
