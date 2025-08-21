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
    <section className="bg-gray-50 py-20 lg:py-28 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-12">
          {/* Left column - heading and trust/support cards */}
          <div className="max-w-[65ch]">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-left">Trusted & Supported</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch mb-8">
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
            <div className="rounded-2xl border border-gray-200 bg-white/60 p-4 mb-8">
              <div className="text-center mb-4 text-sm text-gray-600">Accepted payment methods</div>
              <div className="flex justify-center items-center gap-8">
                {paymentMarks.map((payment, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <img 
                      src={payment.src} 
                      alt={payment.alt} 
                      className="h-8 w-auto" 
                      aria-label={payment.label}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col items-start">
              <Button href="/support" variant="secondary" size="md">
                Need help? Contact Support
              </Button>
            </div>
          </div>
          
          {/* Right column - illustration only */}
          <div className="hidden lg:block">
            <div className="relative">
              <img 
                src="/assets/illustrations/trusted-secure.svg" 
                alt="Trust and security features illustration"
                className="h-48 md:h-64 lg:h-72 mx-auto lg:ml-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
