import React from 'react';

// sref: how-section.v1
export default function HowSection() {
  const steps = [
    { n: 1, title: "Choose state & course", body: "Tell us where you’re licensed and why you need the course." },
    { n: 2, title: "Take the course online", body: "Short, clear modules at your own pace on any device." },
    { n: 3, title: "Pass & get your certificate", body: "Instant digital certificate upon completion." },
    { n: 4, title: "Submit if required", body: "Some courts or insurers need documentation.", link: { label: "How to submit →", href: "#" } },
  ];
  return (
    <section className="bg-white py-20 lg:py-28 border-b border-gray-100">
      <div className="max-w-[65ch] mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How it works</h2>
        <ol className="space-y-8">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg mr-4">{step.n}</span>
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-1">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-1">{step.body}</p>
                {step.link && <a href={step.link.href} className="text-blue-600 hover:text-blue-700 text-sm">{step.link.label}</a>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
