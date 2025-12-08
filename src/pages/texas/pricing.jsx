import React, { useState } from 'react';
import { Accordion } from 'flowbite-react';
import TexasLayout from '../../components/texas/TexasLayout.jsx';
import Button from '../../components/Button.jsx';
import Card from '../../components/Card.jsx';
import CheckCircleIcon from '../../components/icons/CheckCircleIcon.jsx';
import SEO from '../../components/SEO.jsx';

export default function TexasPricing() {
  const [expandedExpect, setExpandedExpect] = useState(null);
  
  return (
    <TexasLayout>
      <SEO 
        title="Texas Defensive Driving Course Pricing - $25 + $3 Fee"
        description="Affordable Texas-approved defensive driving course. State-regulated minimum fee of $25 plus $3 processing fee. Instant certificate, mobile-friendly, unlimited quiz attempts."
        keywords="Texas defensive driving course price, Texas traffic school cost, defensive driving course fee"
        image="/assets/rrs (1200 x 630 px).png"
        url="/texas/pricing"
      />
      
      {/* Top Section: Course + Price */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Column - Course Features */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Texas Defensive Driving Course (6 hr)
              </h1>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <CheckCircleIcon className="w-7 h-7 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xl text-gray-700">6-Hour State-Approved Course</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircleIcon className="w-7 h-7 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xl text-gray-700">Instant Digital Certificate</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircleIcon className="w-7 h-7 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xl text-gray-700">Mobile & Desktop Access</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircleIcon className="w-7 h-7 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xl text-gray-700">Automatic Progress Saving</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircleIcon className="w-7 h-7 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xl text-gray-700">Unlimited Quiz Attempts</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircleIcon className="w-7 h-7 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xl text-gray-700">Court Submission Instructions</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircleIcon className="w-7 h-7 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xl text-gray-700">Access on any device</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircleIcon className="w-7 h-7 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xl text-gray-700">Customer Support</span>
                </li>
              </ul>
            </div>

            {/* Right Column - Pricing Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 lg:p-8 max-w-md lg:max-w-sm mx-auto lg:mx-0 lg:ml-auto">
              <div className="mb-6">
                <div className="text-5xl font-bold text-gray-900 mb-2">$25.00</div>
                <div className="text-sm text-gray-600 mb-6">+ $3.00 Fee</div>
                
                {/* Star Rating */}
                <div className="flex items-center justify-start gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              <Button href="/courses/tx-defensive" variant="primary" size="lg" className="w-full mb-6">
                Enroll Now
              </Button>

              <ul className="space-y-2 text-sm text-gray-600">
                <li>Secure Checkout</li>
                <li>Course Provider Road Ready Driver Instruction LLC</li>
                <li>100% Satisfaction Guarantee</li>
                <li>Refund Policy</li>
                <li>Customer Service</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Text */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
                What's Included in the Course Price?
              </h2>
              
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Everything the state requires:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <span className="text-lg text-gray-700">6-hour defensive driving course</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <span className="text-lg text-gray-700">Timed modules</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <span className="text-lg text-gray-700">Quizzes & final exam</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <span className="text-lg text-gray-700">Certificate of Completion</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Everything YOU need:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <CheckCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <span className="text-lg text-gray-700">Clear guidance on Texas rules</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <span className="text-lg text-gray-700">Eligibility check</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <span className="text-lg text-gray-700">Court permission instructions</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <span className="text-lg text-gray-700">Downloads and resources</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircleIcon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <span className="text-lg text-gray-700">Email support</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <Button href="/courses/tx-defensive" variant="primary" size="lg" className="w-1/2">
                Enroll Now
              </Button>
            </div>

            {/* Right Column - Phone Illustration */}
            <div className="flex justify-center items-center">
              <img 
                src="/texas/enrollphone.png" 
                alt="Enrollment interface" 
                className="max-w-md lg:max-w-lg h-auto transform translate-x-[5%] lg:translate-x-[8%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Accordion */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-left mb-12">
            What to Expect
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <Accordion alwaysOpen={false}>
              <Accordion.Panel>
                <Accordion.Title className="text-xl font-semibold text-gray-900">
                  Texas Requirements
                </Accordion.Title>
                <Accordion.Content>
                  <div className="text-lg text-gray-600 leading-relaxed space-y-4">
                    <p>Texas doesn't just say "take a course." To dismiss a ticket with defensive driving, most Texas courts require you to:</p>
                    
                    <div className="space-y-3">
                      <p><strong>Be eligible for a driving safety course.</strong></p>
                      <p className="ml-4">In general, you must not hold a commercial driver license, must not have been going 25 mph or more over the posted limit, and you usually can't have taken a Texas defensive driving course for ticket dismissal in the last 12 months.</p>
                      
                      <p><strong>Get permission from your court.</strong></p>
                      <p className="ml-4">Before your deadline, your judge or court clerk must approve you to take a 6-hour state-approved defensive driving course for ticket dismissal.</p>
                      
                      <p><strong>Complete a 6-hour Texas-approved course.</strong></p>
                      <p className="ml-4">You must finish every lesson, pass the required quizzes and final exam, and certify that you—not someone else—completed the course.</p>
                      
                      <p><strong>Order your certified Type 3A driving record.</strong></p>
                      <p className="ml-4">Many Texas courts require a copy of your 3A driving record along with your course certificate.</p>
                      
                      <p><strong>Turn everything in on time.</strong></p>
                      <p className="ml-4">You'll submit your Certificate of Course Completion to the court by the deadline they give you.</p>
                    </div>
                    
                    <p>Every court and precinct can have slightly different instructions, so always follow your local court's rules first.</p>
                    
                    <p>We make this easier by walking you through each step and giving you a quick Eligibility Quiz so you can confirm that you qualify before you enroll.</p>
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
              
              <Accordion.Panel>
                <Accordion.Title className="text-xl font-semibold text-gray-900">
                  Topics Covered
                </Accordion.Title>
                <Accordion.Content>
                  <div className="text-lg text-gray-600 leading-relaxed space-y-4">
                    <p>In 6 hours (the Texas state minimum, with two built-in breaks instead of extra fluff), we cover:</p>
                    
                    <ul className="space-y-3 ml-4">
                      <li><strong>Texas traffic laws & ticket dismissal basics</strong> – why the laws exist, how tickets work, and what courts actually care about.</li>
                      <li><strong>Real-world defensive driving</strong> – the 5 pillars of defensive driving, high-risk situations, crash dynamics, and how to avoid or reduce crash severity.</li>
                      <li><strong>Driver mindset & psychology</strong> – attitude, road rage, distraction, multitasking myths, and how your emotions silently change the way you drive.</li>
                      <li><strong>Alcohol, drugs & DWI</strong> – how substances affect your brain and body, key Texas laws, and real-life consequences (and how to avoid them).</li>
                      <li><strong>Vulnerable road users & big vehicles</strong> – pedestrians, cyclists, motorcyclists, school buses, emergency vehicles, large trucks, and work zones.</li>
                      <li><strong>Modern Texas road issues</strong> – street racing awareness, human trafficking prevention, litter prevention, organ donation awareness, and traffic stop protocols.</li>
                      <li><strong>Special programs & recovery</strong> – driving with disabilities indicators, oversize/overweight vehicle awareness, insurance, SR-22, and Texas support resources.</li>
                    </ul>
                    
                    <p><strong>Testing</strong></p>
                    <p>And don't stress about testing: instead of a giant scary exam, you'll see short 3-question knowledge checks along the way and one final quiz. You always get unlimited retries, so the goal is learning—not tricking you.</p>
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
              
              <Accordion.Panel>
                <Accordion.Title className="text-xl font-semibold text-gray-900">
                  Support Details
                </Accordion.Title>
                <Accordion.Content>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Our friendly Texas-based support team is here to help with anything from questions about topics covered to technical issues like login or account access. You can browse our help articles and resources anytime, and if you still need assistance, email us and a real person will typically respond within one business day.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              
              <Accordion.Panel>
                <Accordion.Title className="text-xl font-semibold text-gray-900">
                  After Taking Course
                </Accordion.Title>
                <Accordion.Content>
                  <div className="text-lg text-gray-600 leading-relaxed space-y-4">
                    <p>Once you finish the course, we'll generate your Texas completion certificate right away using the details in your profile. Before you start, double-check that your legal name, current mailing address, and the correct court handling your case are all entered accurately. You'll find the court name and your due date on your ticket.</p>
                    
                    <p>After you download your certificate, submit it to your court along with your driving record by the deadline they've given you so your ticket can be dismissed. At the end of the course, you'll also have a chance to share feedback on your experience.</p>
                  </div>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Testimonials Band */}
      <section className="py-12 lg:py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12">
            Trusted by Drivers Across Texas
          </h2>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <div className="flex items-center justify-start gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg text-gray-700 italic mb-2">"Super easy. I finished on my phone during breaks."</p>
              <p className="text-base text-gray-500">— Texas Driver</p>
            </Card>
            
            <Card>
              <div className="flex items-center justify-start gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg text-gray-700 italic mb-2">"Clear instructions — no confusion at all."</p>
              <p className="text-base text-gray-500">— Texas Driver</p>
            </Card>
            
            <Card>
              <div className="flex items-center justify-start gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg text-gray-700 italic mb-2">"Court accepted my certificate immediately."</p>
              <p className="text-base text-gray-500">— Texas Driver</p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-8">
            FAQ
          </h2>
          <div className="mb-8">
            <Accordion>
              <Accordion.Panel>
                <Accordion.Title className="text-xl font-semibold text-gray-900">
                  Why is the course $25 + $3?
                </Accordion.Title>
                <Accordion.Content>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    The $25 is the Texas state-regulated minimum course fee that all approved providers must charge. The additional $3 covers the state processing fee and administrative costs required to issue your certificate and maintain compliance with Texas regulations.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              
              <Accordion.Panel>
                <Accordion.Title className="text-xl font-semibold text-gray-900">
                  Is this accepted by all Texas courts?
                </Accordion.Title>
                <Accordion.Content>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Yes, this is a Texas state-approved defensive driving course. In most cases, it is accepted statewide. However, students must follow their specific court's instructions and obtain permission when required before taking the course.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              
              <Accordion.Panel>
                <Accordion.Title className="text-xl font-semibold text-gray-900">
                  Are there extra fees after completing the course?
                </Accordion.Title>
                <Accordion.Content>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    There are no surprise course fees from us. However, courts may have their own fines or administrative costs, and students might need to pay for their driving record (Type 3A) if required by their court.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              
              <Accordion.Panel>
                <Accordion.Title className="text-xl font-semibold text-gray-900">
                  How do I get my certificate?
                </Accordion.Title>
                <Accordion.Content>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Once you finish the course, a digital certificate is generated immediately using your profile information. You can download it right away and submit it to your court along with your driving record by the court's deadline.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
              
              <Accordion.Panel>
                <Accordion.Title className="text-xl font-semibold text-gray-900">
                  Are refunds available?
                </Accordion.Title>
                <Accordion.Content>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Full refunds are available within the allowed cancellation window, subject to state rules and regulations. Please contact our support team for specific refund policy details.
                  </p>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </div>
          
          <div className="text-center mt-12">
            <Button href="/courses/tx-defensive" variant="primary" size="lg" className="w-1/2">
              Enroll Now
            </Button>
          </div>
        </div>
      </section>
    </TexasLayout>
  );
}

