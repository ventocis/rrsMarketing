import React from 'react';
import { Link } from 'react-router-dom';
import Button from './components/Button.jsx';
import howData from '../blueprint/copy/home.json';
// sref: how-section.v1

export default function HowSection() {
  const heading = howData.how.heading;
  const steps = howData.how.steps;

  return (
    <section id="how-it-works" className="bg-white py-16 lg:py-24 border-b border-[#e5e5e5]">
      <div className="max-w-[1152px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section with badge, heading, and subtitle - centered above content */}
        <div className="flex flex-col gap-6 items-center mb-12">
          {/* Blue badge */}
          <div className="bg-[#e5f6fe] inline-flex items-center px-4 py-2 rounded-full">
            <span className="text-sm font-semibold text-[#0351b4] leading-5">Simple Steps</span>
          </div>
          
          {/* Section Heading - matches FAQ styling */}
          <h2 className="text-[28px] lg:text-[36px] font-bold text-center text-[#1e2832] tracking-[-0.02em] lg:tracking-[-0.9px] leading-[150%] lg:leading-[40px]">
            {heading}
          </h2>
          
          {/* Subtitle */}
          <p className="text-base text-center text-[#616d7b] leading-6 max-w-[672px]">
            Learn at your own pace on any device. Your progress is saved automatically so you can pick up right where you left off.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
          {/* Left column - content */}
          <div className="max-w-[65ch]">
            <ol className="space-y-8">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start">
                  {/* Step Number Badge - design system colors */}
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#0667D1] text-white flex items-center justify-center font-bold text-lg mr-4">{step.n}</span>
                  <div>
                    {/* Step Title - design system styling */}
                    <h3 className="text-xl font-medium text-[#262626] mb-1 tracking-[-0.02em]" style={{ lineHeight: '30px' }}>
                      {step.title}
                    </h3>
                    {/* Step Body - design system colors */}
                    <p className="text-base leading-[22px] text-[#616d7b] mb-1">{step.body}</p>
                    {step.link && (
                      step.link.href.startsWith('/') ? (
                        <Link to={step.link.href} className="text-[#0667D1] hover:text-[#0556b3] text-sm underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-[#0667D1] focus:ring-offset-2 rounded">
                          {step.link.label}
                        </Link>
                      ) : (
                        <a href={step.link.href} className="text-[#0667D1] hover:text-[#0556b3] text-sm underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-[#0667D1] focus:ring-offset-2 rounded">
                          {step.link.label}
                        </a>
                      )
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
          
          {/* Right column - illustration only */}
          <div className="hidden lg:block">
            <div className="relative">
              <img 
                src="/assets/illustrations/add-tasks.svg" 
                alt="How it works - step-by-step process illustration"
                className="h-72 md:h-96 lg:h-[32rem] xl:h-[36rem] mx-auto lg:ml-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
