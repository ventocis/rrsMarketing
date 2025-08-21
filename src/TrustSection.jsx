import React from 'react';
import Button from './components/Button.jsx';
import ShieldIcon from './components/icons/ShieldIcon.jsx';
import BadgeCheckIcon from './components/icons/BadgeCheckIcon.jsx';
import HeadsetIcon from './components/icons/HeadsetIcon.jsx';
import DeviceIcon from './components/icons/DeviceIcon.jsx';
import trustData from '../blueprint/copy/trust.json';
// sref: trust-section.v1

const iconMap = [
  <ShieldIcon key="shield" />, // Secure checkout
  <BadgeCheckIcon key="badge" />, // Accepted where required
  <HeadsetIcon key="headset" />, // Email support
  <DeviceIcon key="device" /> // Phone support (or device)
];

const paymentMarks = [
  { src: '/assets/payments/visa.svg', alt: 'Visa', label: 'Visa' },
  { src: '/assets/payments/mastercard.svg', alt: 'Mastercard', label: 'Mastercard' },
  { src: '/assets/payments/amex.svg', alt: 'American Express', label: 'American Express' },
  { src: '/assets/payments/discover.svg', alt: 'Discover', label: 'Discover' },
];

export default function TrustSection() {
  const items = trustData.items;
  return (
    <section className="bg-gray-50 py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Trusted & Supported</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {items.map((item, i) => (
            <div key={i} className="h-full rounded-2xl border border-gray-200 bg-white shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 focus:shadow-md focus:-translate-y-0.5 transition flex flex-col items-center text-center motion-reduce:transition-none motion-reduce:hover:transform-none motion-reduce:focus:transform-none">
              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mb-3">
                {iconMap[i]}
              </div>
              <div className="text-gray-900 font-semibold">{item}</div>
            </div>
          ))}
        </div>
        
        {/* Payment marks row */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white/60 p-4">
          <div className="text-center mb-4 text-sm text-gray-600">Accepted payment methods</div>
          <div className="flex justify-center items-center gap-6">
            {paymentMarks.map((payment, i) => (
              <div key={i} className="flex flex-col items-center">
                <img 
                  src={payment.src} 
                  alt={payment.alt} 
                  className="h-6 mb-2" 
                  aria-label={payment.label}
                />
                <span className="text-xs text-gray-500">{payment.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 flex flex-col items-center">
          <Button href="/support" variant="secondary" size="md">
            Need help? Contact Support
          </Button>
          {/* Muted microcopy below CTA if available in trust.json */}
        </div>
      </div>
    </section>
  );
}
