import React from 'react';

// sref: trust-section.v1
export default function TrustSection() {
  const items = [
    "Secure checkout",
    "Accepted where required",
    "Email support 24/7 (reply within 24h)",
    "Phone support Mon–Fri 9–5"
  ];
  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Trusted & Supported</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item, i) => (
            <li key={i} className="flex items-center justify-center bg-gray-50 rounded-lg p-4 shadow-sm">
              <span className="inline-block w-6 h-6 mr-3 text-blue-600">★</span>
              <span className="text-gray-800 text-base">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
