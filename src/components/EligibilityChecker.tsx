import { useState } from 'react';

interface Court {
  slug: string;
  county: string;
  courtType: string;
  courtName: string;
  judges: string[];
  phone: string[];
  address: string[];
  website: string[];
  email: string[];
}

interface Props {
  courts: Court[];
}

type Step = 'step1' | 'step1b' | 'step2' | 'step3' | 'step4' | 'result';

type ViolationType = 'speeding' | 'red_light' | 'insurance' | 'cell_phone' | 'other' | 'serious' | '';

type ResultType =
  | 'ineligible-serious'
  | 'ineligible-speed'
  | 'ineligible-cdl'
  | 'ineligible-prior'
  | 'ineligible-denied'
  | 'eligible-pending'
  | 'eligible'
  | '';

const RESULT_DATA: Record<
  Exclude<ResultType, ''>,
  { badge: string; badgeClass: string; heading: string; body: string; isEligible: boolean }
> = {
  'ineligible-serious': {
    badge: 'Not Eligible',
    badgeClass: 'inline-flex items-center gap-2 bg-[#fee2e2] text-[#dc2626] text-sm font-semibold px-3 py-1.5 rounded-full',
    heading: "Serious violations can't be dismissed through defensive driving",
    body: "Texas law does not allow criminal or serious traffic violations to be dismissed through a Driver Safety Course. You'll need to address this charge differently.",
    isEligible: false,
  },
  'ineligible-speed': {
    badge: 'Likely Not Eligible',
    badgeClass: 'inline-flex items-center gap-2 bg-[#fee2e2] text-[#dc2626] text-sm font-semibold px-3 py-1.5 rounded-full',
    heading: 'Speeds 25+ mph over the limit are rarely approved',
    body: 'Texas courts have discretion to deny DSC for high-speed violations. You may still ask your court, but approval is uncommon at this speed.',
    isEligible: false,
  },
  'ineligible-cdl': {
    badge: 'Not Eligible',
    badgeClass: 'inline-flex items-center gap-2 bg-[#fee2e2] text-[#dc2626] text-sm font-semibold px-3 py-1.5 rounded-full',
    heading: 'CDL holders cannot use defensive driving for ticket dismissal',
    body: 'Texas law prohibits CDL holders from dismissing violations through a Driver Safety Course, even when driving a personal vehicle.',
    isEligible: false,
  },
  'ineligible-prior': {
    badge: 'Not Eligible',
    badgeClass: 'inline-flex items-center gap-2 bg-[#fee2e2] text-[#dc2626] text-sm font-semibold px-3 py-1.5 rounded-full',
    heading: "You've already used a dismissal in the past 12 months",
    body: "Texas only allows one ticket dismissal via defensive driving per 12-month period. You'll need to wait until 12 months have passed from your last dismissal.",
    isEligible: false,
  },
  'ineligible-denied': {
    badge: 'Not Eligible',
    badgeClass: 'inline-flex items-center gap-2 bg-[#fee2e2] text-[#dc2626] text-sm font-semibold px-3 py-1.5 rounded-full',
    heading: 'Court has denied your request',
    body: 'Courts have full discretion to deny DSC requests. A denial is generally final, though you may consult an attorney about your options.',
    isEligible: false,
  },
  'eligible-pending': {
    badge: 'Likely Eligible',
    badgeClass: 'inline-flex items-center gap-2 bg-[#dcfce7] text-[#16a34a] text-sm font-semibold px-3 py-1.5 rounded-full',
    heading: 'Likely Eligible — Request Court Approval First',
    body: 'Based on your answers, you should qualify to have this ticket dismissed through a TDLR-approved defensive driving course. However, you must get court approval before signing up for the course. Taking the course before approval is granted is a common and costly mistake.',
    isEligible: true,
  },
  eligible: {
    badge: 'Eligible',
    badgeClass: 'inline-flex items-center gap-2 bg-[#dcfce7] text-[#16a34a] text-sm font-semibold px-3 py-1.5 rounded-full',
    heading: 'You Appear Eligible for Dismissal',
    body: 'Based on your answers, you qualify to dismiss this ticket through a TDLR-approved defensive driving course. Complete the steps below to get your ticket dismissed.',
    isEligible: true,
  },
};

function getStepNumber(step: Step, isSpeedingPath: boolean): number {
  const order: Step[] = isSpeedingPath
    ? ['step1', 'step1b', 'step2', 'step3', 'step4', 'result']
    : ['step1', 'step2', 'step3', 'step4', 'result'];
  const idx = order.indexOf(step);
  return idx + 1;
}

function getTotalSteps(isSpeedingPath: boolean): number {
  return isSpeedingPath ? 5 : 4;
}

const enrollUrl = import.meta.env.VITE_TEXAS_ENROLLMENT_URL || '#';

const TRUST_ITEMS = [
  'Secure checkout',
  'TDLR-approved provider',
  '100% money-back guarantee',
  'Instant Certificate Download',
  'Compatible with any device',
];

export default function EligibilityChecker({ courts: _courts }: Props) {
  const [step, setStep] = useState<Step>('step1');
  const [violation, setViolation] = useState<ViolationType>('');
  const [result, setResult] = useState<ResultType>('');

  const isSpeedingPath = violation === 'speeding';
  const totalSteps = getTotalSteps(isSpeedingPath);
  const currentStepNum = step === 'result' ? totalSteps + 1 : getStepNumber(step, isSpeedingPath);
  const progressPct = step === 'result' ? 100 : Math.round(((currentStepNum - 1) / totalSteps) * 100);

  const resetAll = () => {
    setStep('step1');
    setViolation('');
    setResult('');
  };

  const optionButtonClass =
    'w-full text-left px-5 py-4 rounded-xl border border-[#e4e6ea] bg-white hover:border-[#0667D1] hover:bg-[#e5f6fe] transition-all text-sm font-semibold text-[#1e2832] flex items-center gap-3';

  const startOverButtonClass =
    'border border-[#e4e6ea] text-[#616d7b] rounded-xl px-6 py-3 text-sm font-medium hover:bg-[#f9fafb] transition-colors';

  const primaryButtonClass =
    'bg-[#0667D1] hover:bg-[#0556b3] text-white rounded-xl px-6 py-3 text-sm font-semibold transition-colors';

  const backButtonClass =
    'text-sm text-[#616d7b] hover:text-[#1e2832] flex items-center gap-1 transition-colors mb-6';

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-[#e4e6ea] shadow-sm p-8">

        {/* Progress bar */}
        {step !== 'result' ? (
          <div className="mb-8">
            <p className="text-xs text-[#616d7b] mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Step {currentStepNum - 1} of {totalSteps}
            </p>
            <div className="h-1.5 w-full bg-[#f0f2f4] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0667D1] rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <p className="text-xs text-[#616d7b] mb-2 flex items-center gap-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="7" fill="#16a34a" />
                <path d="M4 7l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Done!
            </p>
            <div className="h-1.5 w-full bg-[#0667D1] rounded-full" />
          </div>
        )}

        {/* ── STEP 1 ── */}
        {step === 'step1' && (
          <div>
            <h2
              className="text-2xl font-bold text-[#1e2832] mb-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              What type of violation do you need dismissed?
            </h2>
            <p
              className="text-base text-[#616d7b] leading-7 mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Select the option that best describes your ticket.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Speeding', icon: '🚗', value: 'speeding' as ViolationType },
                { label: 'Red Light or Stop Sign', icon: '🛑', value: 'red_light' as ViolationType },
                { label: 'No Proof of Insurance', icon: '📋', value: 'insurance' as ViolationType },
                { label: 'Cell Phone / Texting While Driving', icon: '📱', value: 'cell_phone' as ViolationType },
                { label: 'Other Minor Traffic Violation', icon: '⚠️', value: 'other' as ViolationType },
                { label: 'Serious or Criminal Violation', icon: '🚨', value: 'serious' as ViolationType },
              ].map(opt => (
                <button
                  key={opt.value}
                  className={optionButtonClass}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  onClick={() => {
                    setViolation(opt.value);
                    if (opt.value === 'serious') {
                      setResult('ineligible-serious');
                      setStep('result');
                    } else if (opt.value === 'speeding') {
                      setStep('step1b');
                    } else {
                      setStep('step2');
                    }
                  }}
                >
                  <span className="text-lg leading-none">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── STEP 1B ── */}
        {step === 'step1b' && (
          <div>
            <button
              className={backButtonClass}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              onClick={() => setStep('step1')}
            >
              ← Back
            </button>
            <h2
              className="text-2xl font-bold text-[#1e2832] mb-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              How far were you going over the speed limit?
            </h2>
            <p
              className="text-base text-[#616d7b] leading-7 mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              The amount over the limit affects your eligibility.
            </p>
            <div className="flex flex-col gap-3">
              <button
                className={optionButtonClass}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                onClick={() => setStep('step2')}
              >
                <span className="text-lg leading-none">✅</span>
                Less than 25 mph over
              </button>
              <button
                className={optionButtonClass}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                onClick={() => {
                  setResult('ineligible-speed');
                  setStep('result');
                }}
              >
                <span className="text-lg leading-none">⛔</span>
                25 mph or more over
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step === 'step2' && (
          <div>
            <button
              className={backButtonClass}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              onClick={() => setStep(isSpeedingPath ? 'step1b' : 'step1')}
            >
              ← Back
            </button>
            <h2
              className="text-2xl font-bold text-[#1e2832] mb-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Do you hold a Commercial Driver's License (CDL)?
            </h2>
            <p
              className="text-base text-[#616d7b] leading-7 mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              This applies even if you were driving a personal vehicle at the time.
            </p>
            <div className="flex flex-col gap-3">
              <button
                className={optionButtonClass}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                onClick={() => {
                  setResult('ineligible-cdl');
                  setStep('result');
                }}
              >
                <span className="text-lg leading-none">🚛</span>
                Yes, I have a CDL
              </button>
              <button
                className={optionButtonClass}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                onClick={() => setStep('step3')}
              >
                <span className="text-lg leading-none">🪪</span>
                No, standard license
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3 ── */}
        {step === 'step3' && (
          <div>
            <button
              className={backButtonClass}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              onClick={() => setStep('step2')}
            >
              ← Back
            </button>
            <h2
              className="text-2xl font-bold text-[#1e2832] mb-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Have you had a ticket dismissed with a defensive driving course in the past 12 months?
            </h2>
            <p
              className="text-base text-[#616d7b] leading-7 mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Texas only permits one dismissal per 12-month period.
            </p>
            <div className="flex flex-col gap-3">
              <button
                className={optionButtonClass}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                onClick={() => {
                  setResult('ineligible-prior');
                  setStep('result');
                }}
              >
                <span className="text-lg leading-none">📅</span>
                Yes
              </button>
              <button
                className={optionButtonClass}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                onClick={() => setStep('step4')}
              >
                <span className="text-lg leading-none">🙅</span>
                No
              </button>
              <button
                className={optionButtonClass}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                onClick={() => setStep('step4')}
              >
                <span className="text-lg leading-none">🤷</span>
                Not Sure
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4 ── */}
        {step === 'step4' && (
          <div>
            <button
              className={backButtonClass}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              onClick={() => setStep('step3')}
            >
              ← Back
            </button>
            <h2
              className="text-2xl font-bold text-[#1e2832] mb-2"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Have you received court approval to take a defensive driving course?
            </h2>
            <p
              className="text-base text-[#616d7b] leading-7 mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Most Texas courts require you to request permission before enrolling.
            </p>
            <div className="flex flex-col gap-3">
              <button
                className={optionButtonClass}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                onClick={() => {
                  setResult('eligible');
                  setStep('result');
                }}
              >
                <span className="text-lg leading-none">✅</span>
                Yes, I have court approval
              </button>
              <button
                className={optionButtonClass}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                onClick={() => {
                  setResult('eligible-pending');
                  setStep('result');
                }}
              >
                <span className="text-lg leading-none">⏳</span>
                Not yet — I haven't asked yet
              </button>
              <button
                className={optionButtonClass}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                onClick={() => {
                  setResult('ineligible-denied');
                  setStep('result');
                }}
              >
                <span className="text-lg leading-none">❌</span>
                The court denied my request
              </button>
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {step === 'result' && result !== '' && (() => {
          const data = RESULT_DATA[result];
          return (
            <div>
              {/* Back button */}
              <button
                className={backButtonClass}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                onClick={() => setStep('step4')}
              >
                ← Back
              </button>

              {/* Result card */}
              <div className="mb-6">
                <span className={data.badgeClass} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {data.isEligible ? (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <circle cx="7" cy="7" r="7" fill="#16a34a" />
                      <path d="M4 7l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <circle cx="7" cy="7" r="7" fill="#dc2626" />
                      <path d="M4.5 4.5l5 5M9.5 4.5l-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                  {data.badge}
                </span>
                <h2
                  className="text-2xl font-bold text-[#1e2832] mt-4 mb-3"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {data.heading}
                </h2>
                <p
                  className="text-base text-[#616d7b] leading-7"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {data.body}
                </p>
              </div>

              {/* Buy box — eligible results only */}
              {data.isEligible && (
                <div className="border border-[#e4e6ea] rounded-2xl p-5 mb-6 shadow-sm">
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3
                      className="text-base font-semibold text-[#1e2832] leading-snug"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      Texas Defensive Driving Course 6hr
                    </h3>
                    <span className="bg-[#e5f6fe] text-[#0667d1] text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0">
                      Recommended
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="text-[28px] font-bold text-[#1e2832] leading-none">$25</span>
                    <span className="text-xs text-[#616d7b]">.00</span>
                    <span className="text-base font-medium text-[#616d7b] line-through ml-2">$35.00</span>
                  </div>
                  <p className="text-xs text-[#616d7b] mb-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    + $3.00 state processing fee
                  </p>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#f59e0b" aria-hidden="true">
                        <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7L7 1z"/>
                      </svg>
                    ))}
                    <span className="text-xs font-medium text-[#1e2832] ml-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      4.9 out of 5
                    </span>
                  </div>

                  {/* Enroll CTA */}
                  {result === 'eligible-pending' && (
                    <p className="text-xs text-[#616d7b] mb-2 leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      ⚠️ Get court approval first, then enroll.
                    </p>
                  )}
                  <a
                    href={enrollUrl}
                    className="w-full h-11 bg-[#0667d1] hover:bg-[#0556b3] text-white rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 no-underline transition-colors mb-3 shadow-sm"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    Start Your Course
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>

                  {/* Trust items */}
                  <div className="flex flex-col gap-2">
                    {TRUST_ITEMS.map(item => (
                      <div key={item} className="flex items-center gap-2">
                        <div className="bg-[#e5f6fe] rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                            <path d="M2 5l2 2 4-4" stroke="#0667d1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-xs text-[#616d7b]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Start Over */}
              <button
                className={startOverButtonClass}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
                onClick={resetAll}
              >
                ← Start Over
              </button>
            </div>
          );
        })()}

      </div>
    </div>
  );
}
