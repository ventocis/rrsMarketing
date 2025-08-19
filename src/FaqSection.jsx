import React from 'react';

// sref: faq-section.v1
export default function FaqSection() {
  const heading = "Frequently asked questions";
  const items = [
    { q: "Is this accepted in my state?", a: "Yes where specified on the course page. We note approvals and any special instructions you may need to follow." },
    { q: "How long is the course?", a: "Most courses are 4–6 hours. The exact duration is listed at the top of the course page." },
    { q: "How do I get my certificate?", a: "It’s issued instantly upon completion. You can download your digital certificate right away." },
    { q: "Can I use my phone?", a: "Absolutely. Start on your phone, continue on a laptop or tablet—your progress is saved automatically." },
    { q: "What if my court or insurer needs proof?", a: "We provide clear next steps on the course page. If submission is required, follow the instructions or contact support." }
  ];
  return (
    <section className="bg-gray-50 py-12 border-b border-gray-100">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{heading}</h2>
        <dl className="space-y-8">
          {items.map((item, i) => (
            <div key={i}>
              <dt className="font-semibold text-lg mb-2">{item.q}</dt>
              <dd className="text-gray-700 ml-4">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
