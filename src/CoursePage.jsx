import React from 'react';
import { useParams, Link } from 'react-router-dom';
import courses from './data/courses.json';
import { usd, hours, truncate } from './lib/format.js';

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
    features: 'What you’ll learn',
  },
  partner_pill: 'Provided by TicketSchool',
  provider_note: 'You’ll enroll and complete this course on TicketSchool’s secure site. Road Ready is a trusted affiliate.',
  cta: {
    inhouse: 'Start course →',
    partner: 'Continue on TicketSchool →',
  },
  disclaimer: 'Acceptance varies by court and insurer. Always confirm requirements.',
  empty: {
    notFoundTitle: 'Course not found',
    notFoundBody: 'This course isn’t available yet. Please choose another course or check back soon.',
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
  const badges = (course.badge_list || '').split('|').filter(Boolean);

  // Hero
  return (
    <main className="bg-gray-50 min-h-screen pb-12">
      <section className="bg-white border-b border-gray-200 pt-10 pb-8 mb-8">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{course.headline}</h1>
          <p className="text-lg md:text-xl text-gray-700 mb-4">{course.subhead}</p>
          {isPartner && (
            <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mb-2">{course.partner_badge || copy.partner_pill}</div>
          )}
          <div className="mb-4">
            {badges.map((b, i) => (
              <span key={i} className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs mr-2 mb-1">{b}</span>
            ))}
          </div>
          <a
            href={isPartner ? course.affiliate_link : `/courses/${course.slug}#enroll`}
            target={isPartner ? '_blank' : '_self'}
            rel={isPartner ? 'noopener sponsored' : undefined}
          >
            <button className="bg-blue-600 text-white px-6 py-2 rounded font-semibold text-base hover:bg-blue-700 transition">{course.hero_cta_label || (isPartner ? copy.cta.partner : copy.cta.inhouse)}</button>
          </a>
          {isPartner && (
            <div className="text-xs text-gray-500 mt-2">{copy.provider_note}</div>
          )}
        </div>
      </section>

      {/* Facts */}
      <section className="max-w-3xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="bg-white rounded-lg shadow-sm px-4 py-3 text-center min-w-[120px]">
            <div className="text-xs text-gray-500 mb-1">{copy.facts_labels.state}</div>
            <div className="font-semibold">{course.state}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm px-4 py-3 text-center min-w-[120px]">
            <div className="text-xs text-gray-500 mb-1">{copy.facts_labels.duration}</div>
            <div className="font-semibold">{hours(course.duration_hours)}</div>
          </div>
          {course.price_usd && (
            <div className="bg-white rounded-lg shadow-sm px-4 py-3 text-center min-w-[120px]">
              <div className="text-xs text-gray-500 mb-1">{copy.facts_labels.price}</div>
              <div className="font-semibold">{usd(course.price_usd)}</div>
            </div>
          )}
          <div className="bg-white rounded-lg shadow-sm px-4 py-3 text-center min-w-[120px]">
            <div className="text-xs text-gray-500 mb-1">{copy.facts_labels.provider}</div>
            <div className="font-semibold">{course.provider_name}</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm px-4 py-3 text-center min-w-[120px]">
            <div className="text-xs text-gray-500 mb-1">{copy.facts_labels.certificate}</div>
            <div className="font-semibold">{truncate(course.certificate_delivery, 40)}</div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="max-w-3xl mx-auto px-4 mb-8">
        <h2 className="text-xl font-bold mb-4">{copy.headings.details}</h2>
        <dl className="bg-white rounded-lg shadow-sm p-6">
          {['eligibility','identity_verification','reporting_method','certificate_delivery','retake_policy'].map(key => (
            course[key] ? (
              <div key={key} className="mb-4">
                <dt className="font-semibold text-gray-700">{copy.details_labels[key]}</dt>
                <dd className="ml-4 text-gray-800">{course[key]}</dd>
              </div>
            ) : null
          ))}
        </dl>
      </section>

      {/* Features */}
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
    </main>
  );
}
