import React from 'react';
import { Link } from 'react-router-dom';
import Button from './components/Button.jsx';
import howData from '../blueprint/copy/home.json';
// sref: how-section.v1

export default function HowSection() {
  const heading = howData.how.heading;
  const steps = howData.how.steps;
  // Optional: define CTA label and href if provided in blueprint, else fallback
  const cta = { label: 'Get started', href: '#find-course' };

  return (
    <section className="bg-white py-20 lg:py-28 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-12">
          {/* Left column - existing content unchanged */}
          <div className="max-w-[65ch]">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center lg:text-left">{heading}</h2>
            <ol className="space-y-8">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-500 text-white flex items-center justify-center font-bold text-lg mr-4">{step.n}</span>
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold mb-1">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-1">{step.body}</p>
                    {step.link && (
                      step.link.href.startsWith('/') ? (
                        <Link to={step.link.href} className="text-blue-600 hover:text-blue-700 text-sm underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
                          {step.link.label}
                        </Link>
                      ) : (
                        <a href={step.link.href} className="text-blue-600 hover:text-blue-700 text-sm underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
                          {step.link.label}
                        </a>
                      )
                    )}
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex justify-center lg:justify-start">
              <Button variant="primary" size="lg" href={cta.href}>{cta.label}</Button>
            </div>
          </div>
          
          {/* Right column - illustration only */}
          <div className="hidden lg:block">
            <div className="relative">
              <img 
                src="/assets/illustrations/add-tasks.svg" 
                alt="How it works - step-by-step process illustration"
                className="h-48 md:h-64 lg:h-72 mx-auto lg:ml-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
