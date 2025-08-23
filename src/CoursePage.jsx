import React from 'react';
import { useParams, Link } from 'react-router-dom';
import courses from './data/courses.json';
import { usd, hours, truncate } from './lib/format.js';
import { Accordion } from 'flowbite-react';
import StickyEnrollBar from './components/StickyEnrollBar.jsx';
// CoursePreview removed - was causing React Error #310
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
      {/* TESTING: Re-enabling CoursePreview only */}
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Testing CoursePreview Component</h1>
        <p className="text-gray-600 mb-8">Course: {course.slug}</p>
      </div>
      
      {/* CourseIllustration - WORKING */}
      <CourseIllustration />
      
      {/* CourseBullets - WORKING */}
      <CourseBullets course={course} />
      
      {/* BuyBox - WORKING */}
      <BuyBox course={course} />
      
      {/* Facts Strip - WORKING */}
      <section className="mt-12 max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-sm text-gray-500 mb-1">{copy.facts_labels.state}</div>
              <div className="font-semibold text-gray-900">{stateNames[course.state] || course.state}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">{copy.facts_labels.duration}</div>
              <div className="font-semibold text-gray-900">{hours(course.duration_hours)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">{copy.facts_labels.price}</div>
              <div className="font-semibold text-gray-900">{price}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">{copy.facts_labels.provider}</div>
              <div className="font-semibold text-gray-900">{provider}</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Details Accordion - WORKING */}
      <section className="mt-12 max-w-4xl mx-auto px-4">
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
      
      {/* Features Section - WORKING */}
      {showFeatures && features.length > 0 && (
        <section className="mt-12 max-w-4xl mx-auto px-4">
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
      
      {/* Certificate Callout - WORKING */}
      <section className="mt-12 max-w-4xl mx-auto px-4">
        <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
          <div className="flex items-start gap-4">
            <div className="text-blue-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Certificate Delivery</h3>
              <p className="text-blue-800 leading-relaxed">
                {course.certificate_delivery || 'Your certificate will be available for download upon course completion.'}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Disclaimer - WORKING */}
      <section className="mt-12 max-w-4xl mx-auto px-4">
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
          <p className="text-sm text-gray-600 leading-relaxed text-center">
            {copy.disclaimer}
          </p>
        </div>
      </section>
      
      {/* StickyEnrollBar - FINAL COMPONENT */}
      <StickyEnrollBar course={course} />
    </main>
  );
}
