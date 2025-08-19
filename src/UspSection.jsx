import React from 'react';

// sref: usp-section.v1
export default function UspSection() {
  const items = [
    { title: "Instant digital certificate", body: "Downloadable proof the moment you finish." },
    { title: "Works on any device", body: "Mobile-first design that feels natural on phone, tablet, or desktop." },
    { title: "Start/stop anytime", body: "Your progress is auto-saved so you can learn at your pace." },
    { title: "Modern, distraction-free", body: "Clean UI, readable text, and a flow that just makes sense." },
  ];
  return (
    <section className="bg-gray-50 py-20 lg:py-28 border-b border-gray-100">
      <div className="max-w-[65ch] mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">What sets us apart</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <div key={i} className="bg-white rounded-lg p-6 shadow-sm flex flex-col justify-between h-full">
              <h3 className="text-lg md:text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
