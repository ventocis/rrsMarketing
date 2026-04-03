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

/** Rows after RRS — editorial table data. */
const COMPARISON_ROWS = [
  {
    provider: 'Aware Driver',
    cp: 'CP995',
    coursePrice: '$25.00',
    processingFee: '$3.00',
    minCertCost: '$0.00',
    total: '$28.00',
    certificate: 'Paid',
    format: 'Online',
    language: 'English'
  },
  {
    provider: 'DefensiveDriving.com',
    cp: 'CP284',
    coursePrice: '$25.00',
    processingFee: '$3.00',
    minCertCost: '$0.00',
    total: '$28.00',
    certificate: 'Mail',
    format: 'Online',
    language: 'English'
  },
  {
    provider: 'I Drive Safely',
    cp: 'CP022',
    coursePrice: '$29.00',
    processingFee: '$0.00',
    minCertCost: '$0.00',
    total: '$29.00',
    certificate: 'Free',
    format: 'Online',
    language: 'English'
  },
  {
    provider: 'GetDefensive.com',
    cp: 'CP021',
    coursePrice: '$30.00',
    processingFee: '$0.00',
    minCertCost: '$0.00',
    total: '$30.00',
    certificate: 'Free',
    format: 'Online / In-Person',
    language: 'Eng / Spanish'
  },
  {
    provider: 'DrivingQuest',
    cp: 'CP020',
    coursePrice: '$25.00',
    processingFee: '$0.00',
    minCertCost: '$6.00',
    total: '$31.00',
    certificate: 'Paid',
    format: 'Online',
    language: 'Eng / Spanish'
  },
  {
    provider: 'J&T Adult Driving School',
    cp: 'CP1158',
    coursePrice: '$29.99',
    processingFee: '$3.99',
    minCertCost: '$3.99',
    total: '$37.97',
    certificate: 'Paid',
    format: 'Online / In-Person',
    language: 'Eng / Spanish'
  },
  {
    provider: 'DriversEd.com',
    cp: 'CP019',
    coursePrice: '$34.00',
    processingFee: '$0.00',
    minCertCost: '$15.00',
    total: '$49.00',
    certificate: 'Paid',
    format: 'Online',
    language: 'English'
  },
  {
    provider: 'Aceable Defensive Driving',
    cp: 'CP262',
    coursePrice: '$49.00',
    processingFee: '$0.00',
    minCertCost: '$15.00',
    total: '$64.00',
    certificate: 'Paid',
    format: 'Online',
    language: 'English'
  },
  {
    provider: 'Excellent Driving School',
    cp: 'CP1010',
    coursePrice: '$65.00',
    processingFee: '$3.99',
    minCertCost: '$3.99',
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
    q: 'Is there a required minimum fee for a Texas defensive driving course?',
    a: 'Yes. Under Texas Education Code §1001.352 (as amended by H.B. 3012, effective September 1, 2025), TDLR-approved providers are required to charge each student a minimum of $25.00 for a driving safety course. Prior to September 2025, a separate minimum $3.00 fee for course materials and administration was also required by law — which is why many providers still show a $25 base + $3 fee structure. Some providers have absorbed this into a flat price; others continue to itemize it at checkout. Either way, the statutory floor is now $25.00 total — meaning courses listed at $28.00 are pricing above the minimum, not meeting a two-part requirement.'
  },
  {
    q: 'Can I get my certificate instantly in Texas?',
    a: 'Yes — if your provider offers digital certificate delivery. Not all do. Providers that offer free instant PDF download let you submit to your court the same day you finish the course.'
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
        description="Most Texas defensive driving courses advertise a low price but add fees at checkout. See the real all-in cost — including fees and certificate delivery."
        url="/texas-defensive-driving-cost"
        type="article"
        publishedTime="2026-03-03"
        modifiedTime="2026-03-03"
        robots="index, follow"
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
                <strong className="text-[#1e2832]">Processing fee</strong> — Texas law requires all TDLR-approved
                providers to charge a minimum of $25.00 for a defensive driving course. You may notice some providers show
                a $25 base price plus a separate $3 fee at checkout — that two-part structure was required by law until
                September 1, 2025, when it was simplified to a single $25 minimum. Some providers still itemize the $3
                separately; others have rolled it into a flat price. Either way, always check your final checkout total
                before paying — the advertised price and what you actually owe are not always the same number.
              </li>
              <li>
                <strong className="text-[#1e2832]">Certificate delivery fee</strong> — after you complete the course,
                you receive a completion certificate to submit to your court. Some providers charge $7+ to mail a physical
                certificate, others charge $0 to mail a physical certificate (while charging $5-$10+ for an instant
                download certificate) and others offer an instant download for free. If you&apos;re on a court deadline,
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

          <div className="mb-4 w-full rounded-xl border border-[#e4e6ea]">
            <table className="w-full border-collapse text-[12px] md:text-sm break-words">
              <thead>
                <tr className="bg-[#f9fafb] text-left border-b border-[#e4e6ea]">
                  <th
                    className="py-2 px-1 sm:px-2 md:py-3 md:px-3 font-semibold text-[#1e2832]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Provider
                  </th>
                  <th
                    className="hidden md:table-cell py-2 px-1 sm:px-2 md:py-3 md:px-3 font-semibold text-[#1e2832]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    CP#
                  </th>
                  <th
                    className="py-2 px-1 sm:px-2 md:py-3 md:px-3 font-semibold text-[#1e2832]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Course Price
                  </th>
                  <th
                    className="py-2 px-1 sm:px-2 md:py-3 md:px-3 font-semibold text-[#1e2832]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Processing Fee
                  </th>
                  <th
                    className="py-2 px-1 sm:px-2 md:py-3 md:px-3 font-semibold text-[#1e2832]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Min. Cert. Cost
                  </th>
                  <th
                    className="py-2 px-1 sm:px-2 md:py-3 md:px-3 font-semibold text-[#1e2832]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Total
                  </th>
                  <th
                    className="py-2 px-1 sm:px-2 md:py-3 md:px-3 font-semibold text-[#1e2832]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Certificate
                  </th>
                  <th
                    className="py-2 px-1 sm:px-2 md:py-3 md:px-3 font-semibold text-[#1e2832]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Format
                  </th>
                  <th
                    className="py-2 px-1 sm:px-2 md:py-3 md:px-3 font-semibold text-[#1e2832]"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Language
                  </th>
                </tr>
              </thead>
              <tbody style={{ fontFamily: "'DM Sans', sans-serif" }}>
                <tr className="bg-[#e5f6fe] border-b border-[#c5e6fa]">
                  <td className="py-2 px-1 sm:px-2 md:py-3 md:px-3 font-semibold text-[#1e2832]">Road Ready Safety</td>
                  <td className="hidden md:table-cell py-2 px-1 sm:px-2 md:py-3 md:px-3">CP1234</td>
                  <td className="py-2 px-1 sm:px-2 md:py-3 md:px-3">$25.00</td>
                  <td className="py-2 px-1 sm:px-2 md:py-3 md:px-3">$3.00</td>
                  <td className="py-2 px-1 sm:px-2 md:py-3 md:px-3">$0.00</td>
                  <td className="py-2 px-1 sm:px-2 md:py-3 md:px-3 font-bold text-[#03449e]">$28.00</td>
                  <td className="py-2 px-1 sm:px-2 md:py-3 md:px-3">Free instant download</td>
                  <td className="py-2 px-1 sm:px-2 md:py-3 md:px-3">Online</td>
                  <td className="py-2 px-1 sm:px-2 md:py-3 md:px-3">English</td>
                </tr>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.cp} className="border-b border-[#eef0f3]">
                    <td className="py-2 px-1 sm:px-2 md:py-3 md:px-3 text-[#1e2832]">{row.provider}</td>
                    <td className="hidden md:table-cell py-2 px-1 sm:px-2 md:py-3 md:px-3">{row.cp}</td>
                    <td className="py-2 px-1 sm:px-2 md:py-3 md:px-3">{row.coursePrice}</td>
                    <td className="py-2 px-1 sm:px-2 md:py-3 md:px-3">{row.processingFee}</td>
                    <td className="py-2 px-1 sm:px-2 md:py-3 md:px-3">{row.minCertCost}</td>
                    <td className="py-2 px-1 sm:px-2 md:py-3 md:px-3 font-bold text-[#1e2832]">{row.total}</td>
                    <td className="py-2 px-1 sm:px-2 md:py-3 md:px-3">{row.certificate}</td>
                    <td className="py-2 px-1 sm:px-2 md:py-3 md:px-3">{row.format}</td>
                    <td className="py-2 px-1 sm:px-2 md:py-3 md:px-3">{row.language}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p
            className="text-[#364153] text-base leading-7 mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            The Certificate column shows how each provider delivers your completion certificate. &apos;Free instant
            download&apos; means you can print or email your certificate the same day you finish — no waiting, no extra
            charge. &apos;Paid&apos; means the provider charges an additional delivery fee, which may or may not be reflected
            in the total above depending on the method selected at checkout. &apos;Mail&apos; means the provider mails a
            physical certificate, which typically adds several business days and may cost extra. If your court deadline is
            close, certificate delivery method matters as much as price.
          </p>

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
                <strong className="text-[#1e2832]">How the course fee is itemized.</strong> Texas law sets a $25.00
                minimum course fee. Prior to September 2025, a separate $3.00 fee for materials and administration was also
                required — many providers still itemize this separately at checkout. Check your final order total, not the
                advertised base price.
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

          <h2
            className="text-2xl font-bold text-[#1e2832] mt-10 mb-4"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Finding a course by format, language, or price range
          </h2>
          <div className="space-y-4 text-[#364153] text-base leading-7 mb-12" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <p>
              All providers in the table above offer online courses, meaning you can complete the required 6-hour Texas
              driver safety course from any device without visiting a classroom. Several providers offer bilingual courses
              in both English and Spanish, including GetDefensive.com, J&amp;T Adult Driving School, and Excellent Driving
              School.
            </p>
            <p>
              If you are looking for an online English-language Texas defensive driving course under $30, Road Ready
              Safety, Aware Driver, DefensiveDriving.com, and I Drive Safely all meet that criteria based on verified March
              2026 totals. Of those, only Road Ready Safety includes a free instant certificate download with no additional
              delivery fee — making it the lowest-friction option if you need to submit to your court quickly.
            </p>
            <p>
              If you need a bilingual course in English and Spanish, options in the table priced under $40 include
              GetDefensive.com ($30.00) and J&amp;T Adult Driving School ($37.97).
            </p>
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
