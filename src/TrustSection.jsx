import React from 'react';
import Button from './components/Button.jsx';
// sref: trust-section.v1
// TODO: Move trust items and CTA label to blueprint/copy/home.json for full blueprint sourcing
const items = [
  "Secure checkout",
  "Accepted where required",
  "Email support 24/7 (reply within 24h)",
  "Phone support Mon–Fri 9–5"
];
export default function TrustSection() {
  return (
    <section className="bg-gray-50 py-20 lg:py-28 border-b border-gray-100">
      <div className="max-w-[65ch] mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Trusted & Supported</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <li key={i} className="flex items-center justify-center bg-white rounded-lg p-4 shadow-sm">
              <span className="inline-block w-6 h-6 mr-3 text-blue-600">★</span>
              <span className="text-gray-600 leading-relaxed text-base">{item}</span>
            </li>
          ))}
        </ul>
        {/* Logo strip placeholder */}
        <div className="mt-8 flex justify-center">
          <div className="w-full max-w-md h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-sm">
            [Logo strip placeholder]
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Button href="/support" variant="secondary" size="md">
          Need help? Contact Support
        </Button>
      </div>
    </section>
  );
}
