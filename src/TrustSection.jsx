import React from 'react';
import Button from './components/Button.jsx';
import ShieldIcon from './components/icons/ShieldIcon.jsx';
import BadgeCheckIcon from './components/icons/BadgeCheckIcon.jsx';
import CertificateIcon from './components/icons/CertificateIcon.jsx';
import DeviceIcon from './components/icons/DeviceIcon.jsx';
import trustData from '../blueprint/copy/home.json';
// sref: trust-section.v1

const iconMap = [
  <ShieldIcon key="shield" />, // Secure checkout
  <BadgeCheckIcon key="badge" />, // Accepted where required
  <CertificateIcon key="certificate" />, // Certificate delivery - using certificate icon
  <DeviceIcon key="device" /> // Responsive support
];

export default function TrustSection() {
  const items = trustData.trust.items;
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-left">Trusted & Supported</h2>
        
        {/* Cards grid - 2x2 layout for better card proportions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-full flex items-start gap-4">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 ring-1 ring-blue-100">
                  <div className="h-5 w-5 text-blue-600">
                    {iconMap[i]}
                  </div>
                </span>
                <div className="space-y-1">
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Payment marks row — centered */}
        <div className="mt-8">
          <div className="rounded-xl border border-gray-200 bg-white/70 px-5 md:px-6 py-3 md:py-4">
            <div className="flex justify-center items-center gap-8">
              {/* All logos normalized to the same height via h-6 md:h-7; width auto */}
              <img src="/assets/payments/visa.svg" alt="Visa" className="h-6 md:h-7 w-auto object-contain opacity-90" />
              <img src="/assets/payments/mastercard.svg" alt="Mastercard" className="h-6 md:h-7 w-auto object-contain opacity-90" />
              <img src="/assets/payments/amex.svg" alt="American Express" className="h-6 md:h-7 w-auto object-contain opacity-90" />
              <img src="/assets/payments/discover.svg" alt="Discover" className="h-6 md:h-7 w-auto object-contain opacity-90" />
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col items-start">
          <Button href="/support" variant="secondary" size="md">
            Need help? Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
}
