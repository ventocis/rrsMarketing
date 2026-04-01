import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import SEO from '../components/SEO.jsx';
import { TEXAS_ENROLLMENT_URL } from '../config/texasEnrollment.js';
import { CONTACT_US_URL } from '../config/urls.js';

const ARTICLE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How Much Does Texas Defensive Driving Really Cost in 2026?',
  dateModified: '2026-03-03',
  datePublished: '2026-03-03',
  author: {
    '@type': 'Organization',
    name: 'Road Ready Safety'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Road Ready Safety',
    url: 'https://roadreadysafety.com'
  }
};

/** Rows after RRS: sorted by total all-in ascending. Data per editorial brief — do not change prices. */
const COMPARISON_ROWS = [
  {
    provider: 'Defensive Driving by Improv Comedy Club',
    cp: 'CP342',
    base: '$25.95',
    cert: '$3.00',
    total: '$28.95',
    certificate: 'Free',
    format: 'Online',
    language: 'English'
  },
  {
    provider: 'First Class Defensive Driving',
    cp: 'CP661',
    base: '$28.95',
    cert: '$0.00',
    total: '$28.95',
    certificate: 'Paid',
    format: 'Online / In-Person',
    language: 'Eng / Spanish'
  },
  {
    provider: 'DefensiveDrivingCourse.com',
    cp: 'CP280',
    base: '$28.95',
    cert: '$0.00',
    total: '$28.95',
    certificate: 'Paid',
    format: 'Online',
    language: 'Eng / Spanish'
  },
  {
    provider: '1-Driving.com',
    cp: 'CP935',
    base: '$29.00',
    cert: '$0.00',
    total: '$29.00',
    certificate: 'Free',
    format: 'Online',
    language: 'English'
  },
  {
    provider: 'I Drive Safely, LLC',
    cp: 'CP022',
    base: '$29.00',
    cert: '$0.00',
    total: '$29.00',
    certificate: 'Free',
    format: 'Online',
    language: 'English'
  },
  {
    provider: 'GetDefensive.com',
    cp: 'CP021',
    base: '$30.00',
    cert: '$0.00',
    total: '$30.00',
    certificate: 'Free',
    format: 'Online / In-Person',
    language: 'Eng / Spanish'
  },
  {
    provider: 'DrivingQuest',
    cp: 'CP020',
    base: '$25.00',
    cert: '$0.00',
    total: '$31.00',
    certificate: 'Paid',
    format: 'Online',
    language: 'Eng / Spanish'
  },
  {
    provider: 'J&T Adult Driving School LLC',
    cp: 'CP1158',
    base: '$29.99',
    cert: '$3.99',
    total: '$37.97',
    certificate: 'Paid',
    format: 'Online / In-Person',
    language: 'Eng / Spanish'
  },
  {
    provider: 'DriversEd.com',
    cp: 'CP019',
    base: '$34.00',
    cert: '$0.00',
    total: '$49.00',
    certificate: 'Paid',
    format: 'Online',
    language: 'English'
  },
  {
    provider: 'Aceable Defensive Driving',
    cp: 'CP262',
    base: '$49.00',
    cert: '$0.00',
    total: '$64.00',
    certificate: 'Paid',
    format: 'Online',
    language: 'English'
  },
  {
    provider: 'Excellent Driving School LLC',
    cp: 'CP1010',
    base: '$65.00',
    cert: '$3.99',
    total: '$72.98',
    certificate: 'Paid',
    format: 'Online / In-Person',
    language: 'Eng / Spanish'
  }
];

const FAQ_ITEMS = [
  {
    q: 'How much does Texas defensive driving cost?',
    a: 'Among TDLR-approved online providers, all-in prices range from $25 to over $70 depending on the provider and certificate delivery method. The most affordable verified option as of March 2026 is Road Ready Safety at $28.00 all-in, which includes the required processing fee and a free instant certificate download.'
  },
  {
    q: 'Is there a state fee for Texas defensive driving?',
    a: 'Yes. TDLR charges a $3.00 state processing fee for every defensive driving course completion in Texas. Some providers include this in their advertised price; others add it at checkout.'
  },
  {
    q: 'Can I get my certificate instantly in Texas?',
    a: 'Yes — if your provider offers digital certificate delivery. Not all do. Providers that offer free instant PDF download let you submit to your court the same day you finish the course.'
  },
  {
    q: 'Does every TDLR-approved course qualify for ticket dismissal?',
    a: 'Yes. All 133 TDLR-approved providers offer courses that qualify for ticket dismissal (deferred disposition is separate). The course content requirements are identical — price and delivery method are the main differentiators.'
  },
  {
    q: 'How do I submit my certificate to my Texas court?',
    a: 'Submission methods vary by court. Most accept email, fax, or in-person drop-off. Some courts accept digital PDF certificates; others require a physical copy. Check your court\'s specific instructions or call your clerk\'s office directly.'
  }
];

export default function TexasCostPage() {
  return (
    <>
      <SEO
        exactTitle
        title="How Much Does Texas Defensive Driving Cost? (2026 Guide)"
        description="Most Texas defensive driving courses advertise a low price but add fees at checkout. See the real all-in cost — including state fees and certificate delivery."
        url="/texas-defensive-driving-cost"
        type="article"
        publishedTime="2026-03-03"
        modifiedTime="2026-03-03"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(ARTICLE_JSON_LD)}</script>
      </Helmet>

      <article className="bg-white pb-16 lg:pb-24">
        <div className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-14">
          <p className="text-sm text-[#616d7b] mb-6">
            <Link to="/texas" className="text-[#03449e] font-medium hover:underline">
              Texas defensive driving
            </Link>
          </p>

          <h1
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#021954] leading-tight tracking-[-0.02em] mb-6"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            How Much Does Texas Defensive Driving Really Cost in 2026?
          </h1>

          <div
            className="space-y-4 text-[#364153] text-base leading-7 mb-10"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <p>
              A Texas defensive driving course — also called a Texas driver safety course — is required by hundreds of
              thousands of drivers every year to dismiss a traffic ticket or earn an insurance discount. If you&apos;re
              asking yourself which provider is the cheapest, the fastest, and the most straightforward, here&apos;s a
              side-by-side comparison.
            </p>
            <p>
              Most Texas defensive driving courses advertise a base price, but the amount you actually pay at checkout is
              higher once processing fees and certificate delivery fees are added. As of March 2026, prices among
              TDLR-approved online providers start at $25 and reach over $70 all-in.
            </p>
            <p>
              This page shows manually verified totals pulled from a selection of TDLR-approved providers — last pulled
              March 3, 2026. There are 250+ approved providers total; this table covers some of the more widely used
              options. Totals are subject to change — always confirm current pricing at checkout before enrolling.
            </p>
          </div>

          <h2
            className="text-2xl font-bold text-[#1e2832] mt-10 mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            What&apos;s included in the &quot;all-in&quot; price?
          </h2>
          <div className="space-y-4 text-[#364153] text-base leading-7 mb-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <p>When comparing defensive driving courses in Texas, three costs determine your actual total:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-[#1e2832]">Base course fee</strong> — what the provider charges for the course
                itself.
              </li>
              <li>
                <strong className="text-[#1e2832]">Processing fee</strong> — Texas requires TDLR-approved providers to
                charge a minimum $3.00 fee for the certificate of completion, per TDLR rules under 16 TAC Chapter 84.
                Some providers include this in their advertised price; others add it at checkout. Either way, you pay
                it — the difference is just when you see it.
              </li>
              <li>
                <strong className="text-[#1e2832]">Certificate delivery fee</strong> — after you complete the course,
                you receive a completion certificate to submit to your court. Some providers charge $7–10 to mail a
                physical certificate or offer an instant digital download for free. If you&apos;re on a court deadline,
                a free instant download matters.
              </li>
            </ul>
            <p>The table below reflects the total of all three costs based on verified checkout totals.</p>
          </div>

          <h2
            className="text-2xl font-bold text-[#1e2832] mt-10 mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            All-in price comparison — TDLR-approved online courses
          </h2>

          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 mb-4 rounded-xl border border-[#e4e6ea]">
            <table className="w-full min-w-[720px] text-sm border-collapse">
              <thead>
                <tr className="bg-[#f9fafb] text-left border-b border-[#e4e6ea]">
                  <th className="py-3 px-3 font-semibold text-[#1e2832]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Provider
                  </th>
                  <th className="py-3 px-3 font-semibold text-[#1e2832]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    CP #
                  </th>
                  <th className="py-3 px-3 font-semibold text-[#1e2832]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Base Price
                  </th>
                  <th className="py-3 px-3 font-semibold text-[#1e2832]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Cert Fee
                  </th>
                  <th className="py-3 px-3 font-semibold text-[#1e2832]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Total All-In
                  </th>
                  <th className="py-3 px-3 font-semibold text-[#1e2832]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Certificate
                  </th>
                  <th className="py-3 px-3 font-semibold text-[#1e2832]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Format
                  </th>
                  <th className="py-3 px-3 font-semibold text-[#1e2832]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    Language
                  </th>
                </tr>
              </thead>
              <tbody style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <tr className="bg-[#e5f6fe] border-b border-[#c5e6fa]">
                  <td className="py-3 px-3 font-semibold text-[#1e2832]">Road Ready Safety</td>
                  <td className="py-3 px-3">CP1234</td>
                  <td className="py-3 px-3">$25.00</td>
                  <td className="py-3 px-3">$3.00</td>
                  <td className="py-3 px-3 font-bold text-[#03449e]">$28.00</td>
                  <td className="py-3 px-3">Free instant download</td>
                  <td className="py-3 px-3">Online</td>
                  <td className="py-3 px-3">English</td>
                </tr>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.cp} className="border-b border-[#eef0f3]">
                    <td className="py-3 px-3 text-[#1e2832]">{row.provider}</td>
                    <td className="py-3 px-3">{row.cp}</td>
                    <td className="py-3 px-3">{row.base}</td>
                    <td className="py-3 px-3">{row.cert}</td>
                    <td className="py-3 px-3 font-bold text-[#1e2832]">{row.total}</td>
                    <td className="py-3 px-3">{row.certificate}</td>
                    <td className="py-3 px-3">{row.format}</td>
                    <td className="py-3 px-3">{row.language}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p
            className="text-sm text-[#616d7b] mb-2"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Last verified: March 3, 2026 — Road Ready Safety editorial team, verified against TDLR provider records
          </p>
          <p className="text-sm text-[#616d7b] mb-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Note: Prices shown reflect TDLR-published provider records verified by Road Ready Safety on March 3, 2026.
            Course fees are set independently by each provider and may change. Verify current pricing at checkout before
            enrolling.
          </p>

          <h2
            className="text-2xl font-bold text-[#1e2832] mt-10 mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            What affects the final price at checkout?
          </h2>
          <div className="space-y-4 text-[#364153] text-base leading-7 mb-10" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <p>A few things to check before you pay:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-[#1e2832]">Certificate delivery method.</strong> If your court requires you to
                submit within 90 days and you&apos;re cutting it close, paying $7–10 for overnight mail adds up. A free
                instant PDF download eliminates that cost and that risk.
              </li>
              <li>
                <strong className="text-[#1e2832]">Whether the state fee is bundled.</strong> TDLR requires a $3.00 state
                processing fee for every course completion. Some providers show a $25 base price and add $3 at checkout.
                Others include it in the advertised price. The total is what matters.
              </li>
              <li>
                <strong className="text-[#1e2832]">Processing or convenience fees.</strong> Some providers add a
                &quot;processing fee&quot; or &quot;convenience fee&quot; at checkout that isn&apos;t reflected in either
                the base price or the state fee. Always scroll to the final order summary before entering payment.
              </li>
            </ul>
          </div>

          <h2
            className="text-2xl font-bold text-[#1e2832] mt-10 mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Frequently asked questions
          </h2>
          <div className="space-y-8 mb-12">
            {FAQ_ITEMS.map((item) => (
              <div key={item.q}>
                <h3
                  className="text-lg font-semibold text-[#1e2832] mb-2"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {item.q}
                </h3>
                <p className="text-[#364153] text-base leading-7" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>

          <div
            className="space-y-6 text-[#364153] text-base leading-7 pt-4 border-t border-[#e4e6ea]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <p>
              All prices on this page reflect TDLR-published provider data. Course fees are set by each provider
              independently and may change. If you notice a discrepancy,{' '}
              <a href={CONTACT_US_URL} className="text-[#03449e] font-semibold hover:underline">
                contact us
              </a>{' '}
              and we&apos;ll verify and update.
            </p>
            <div>
              <Button
                href={TEXAS_ENROLLMENT_URL}
                variant="custom"
                className="inline-flex bg-[#0667D1] hover:bg-[#0556b3] text-white h-[56px] px-8 rounded-[16px] text-lg font-semibold items-center justify-center no-underline shadow-[0px_10px_15px_-3px_rgba(17,23,34,0.08),0px_4px_6px_-4px_rgba(17,23,34,0.05)]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Take the $28 Course — Instant Certificate
              </Button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
