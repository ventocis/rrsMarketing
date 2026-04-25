import { useState, useEffect, useRef } from 'react';

export type EligibilityResult =
  | 'eligible'
  | 'eligible-pending'
  | 'ineligible-serious'
  | 'ineligible-speed'
  | 'ineligible-cdl'
  | 'ineligible-prior'
  | 'ineligible-denied';

interface Props {
  result: EligibilityResult;
  onClose: () => void;
}

const SESSION_KEY = 'rrs_ec_lead_captured';
const KLAVIYO_LIST_ID = 'UHAu4n';

// Map result → Klaviyo segment-friendly label
const ELIGIBILITY_LABEL: Record<EligibilityResult, string> = {
  'eligible':            'Eligible',
  'eligible-pending':    'Likely Eligible',
  'ineligible-serious':  'Not Eligible – Serious Violation',
  'ineligible-speed':    'Not Eligible – Speed',
  'ineligible-cdl':      'Not Eligible – CDL',
  'ineligible-prior':    'Not Eligible – Prior Dismissal',
  'ineligible-denied':   'Not Eligible – Court Denied',
};

const COPY: Record<string, { title: string; body: string; cta: string }> = {
  eligible: {
    title: 'See Your Eligibility Result',
    body: "Enter your email to unlock your result — we'll also send you a step-by-step guide on exactly what to do next.",
    cta: 'See My Results →',
  },
  'eligible-pending': {
    title: 'See Your Eligibility Result',
    body: "Enter your email to unlock your result — we'll also send you a personalized guide on your next steps.",
    cta: 'See My Results →',
  },
  ineligible: {
    title: 'See Your Eligibility Result',
    body: "Enter your email to unlock your result — you may still have options, and we'll send you what to explore next.",
    cta: 'See My Results →',
  },
};

function getCopy(result: EligibilityResult) {
  if (result === 'eligible') return COPY['eligible'];
  if (result === 'eligible-pending') return COPY['eligible-pending'];
  return COPY['ineligible'];
}

async function subscribeToKlaviyo(email: string, result: EligibilityResult) {
  const publicKey = (import.meta as any).env?.VITE_KLAVIYO_PUBLIC_KEY ?? 'U3BbdX';
  const headers = {
    'Content-Type': 'application/vnd.api+json',
    'revision': '2024-10-15',
  };

  const res = await fetch(
    `https://a.klaviyo.com/client/subscriptions/?company_id=${publicKey}`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        data: {
          type: 'subscription',
          attributes: {
            custom_source: 'TX Eligibility Checker',
            profile: {
              data: {
                type: 'profile',
                attributes: {
                  email,
                  properties: {
                    eligibility_status: ELIGIBILITY_LABEL[result],
                    lead_source: 'TX Eligibility Checker',
                  },
                },
              },
            },
          },
          relationships: {
            list: {
              data: {
                type: 'list',
                id: KLAVIYO_LIST_ID,
              },
            },
          },
        },
      }),
    }
  );

  if (!res.ok && res.status !== 202) {
    const body = await res.text().catch(() => '');
    console.error('Klaviyo error', res.status, body);
    throw new Error(`Klaviyo error: ${res.status}`);
  }
}

export default function LeadCaptureModal({ result, onClose }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const copy = getCopy(result);
  const isEligible = result === 'eligible' || result === 'eligible-pending';

  // Animate in
  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(true);
      setTimeout(() => inputRef.current?.focus(), 300);
    }, 50);
    return () => clearTimeout(t);
  }, []);

  // Auto-close after success
  useEffect(() => {
    if (status === 'success') {
      const t = setTimeout(() => handleClose(), 2500);
      return () => clearTimeout(t);
    }
  }, [status]);

  function handleClose() {
    sessionStorage.setItem(SESSION_KEY, '1');
    setVisible(false);
    setTimeout(onClose, 250);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === 'loading') return;
    setStatus('loading');
    try {
      await subscribeToKlaviyo(email, result);
      sessionStorage.setItem(SESSION_KEY, '1');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    // Overlay
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        backgroundColor: `rgba(14, 19, 36, ${visible ? '0.55' : '0'})`,
        transition: 'background-color 0.25s ease',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Get your personalized next steps"
    >
      {/* Card */}
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-7 relative"
        style={{
          transform: visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.97)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.25s ease, opacity 0.25s ease',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text transition-colors"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
          </svg>
        </button>

        {status === 'success' ? (
          // Success state
          <div className="text-center py-4">
            <div className="w-14 h-14 bg-success-bg rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M6 14l5 5 11-11" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-text mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Here's your result!
            </h3>
            <p className="text-sm text-text-body">Your guide is on its way to your inbox.</p>
          </div>
        ) : (
          <>
            {/* Badge */}
            <div className="mb-4">
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
                  isEligible
                    ? 'bg-success-bg text-success'
                    : 'bg-surface-muted text-text-body'
                }`}
              >
                {isEligible ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="6" fill="#16A34A"/>
                    <path d="M3.5 6l1.75 1.75L8.5 4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="6" fill="#64748B"/>
                    <path d="M6 4v3M6 8.5v.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                )}
                {isEligible ? 'Almost there' : 'Your result is ready'}
              </span>
            </div>

            {/* Headline */}
            <h3
              className="text-xl font-bold text-text mb-2 leading-snug"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {copy.title}
            </h3>
            <p className="text-sm text-text-body mb-5 leading-relaxed">
              {copy.body}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                ref={inputRef}
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                className="w-full border border-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary bg-white disabled:bg-surface-muted transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              />

              <button
                type="submit"
                disabled={status === 'loading' || !email}
                className="w-full bg-primary hover:bg-primary-hover disabled:opacity-60 text-white rounded-xl py-3 text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="white" strokeOpacity="0.3" strokeWidth="2"/>
                      <path d="M8 2a6 6 0 016 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Sending…
                  </>
                ) : copy.cta}
              </button>

              {status === 'error' && (
                <p className="text-xs text-error text-center">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>

            {/* Dismiss */}
            <button
              onClick={handleClose}
              className="mt-4 w-full text-center text-xs text-text-subtle hover:text-text-body transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              No thanks
            </button>

            {/* Trust */}
            <p className="mt-3 text-center text-[11px] text-text-subtle">
              No spam. Unsubscribe anytime.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
