import React, { useState } from 'react';
import TexasLayout from '../../components/texas/TexasLayout.jsx';
import SEO from '../../components/SEO.jsx';

export default function TexasContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1000);
  };

  return (
    <TexasLayout>
      <SEO 
        title="Contact Us - Road Ready Safety"
        description="Get in touch with Road Ready Safety. Have questions about our Texas defensive driving course? Contact our support team."
      />
      
      {/* Contact Us Section */}
      <section className="py-[112px] px-4 sm:px-6 lg:px-8 bg-[#f9fafb]">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-4 items-center mb-12">
            <div className="bg-[#e5f6fe] inline-flex items-center px-4 py-2 rounded-full">
              <span className="text-sm font-semibold text-[#0351b4] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Get in Touch</span>
            </div>
            <h2 className="text-[36px] font-bold text-[#1e2832] text-center leading-[40px] tracking-[-0.9px]" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Contact Us
            </h2>
            <p className="text-base text-[#616d7b] text-center leading-6 max-w-xl" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Have questions about our Texas defensive driving course? Our support team is here to help. We typically respond within 1 business day.
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-white border border-[#e4e6ea] rounded-[20px] p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-semibold text-[#1e2832] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#e4e6ea] rounded-xl text-base text-[#1e2832] leading-6 focus:outline-none focus:ring-2 focus:ring-[#03449e] focus:border-transparent transition-all"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold text-[#1e2832] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#e4e6ea] rounded-xl text-base text-[#1e2832] leading-6 focus:outline-none focus:ring-2 focus:ring-[#03449e] focus:border-transparent transition-all"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  placeholder="john.doe@example.com"
                />
              </div>

              {/* Subject Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-semibold text-[#1e2832] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#e4e6ea] rounded-xl text-base text-[#1e2832] leading-6 focus:outline-none focus:ring-2 focus:ring-[#03449e] focus:border-transparent transition-all"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  placeholder="What can we help you with?"
                />
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold text-[#1e2832] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-[#e4e6ea] rounded-xl text-base text-[#1e2832] leading-6 focus:outline-none focus:ring-2 focus:ring-[#03449e] focus:border-transparent transition-all resize-y"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  placeholder="Please provide details about your question or issue..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-[#0667D1] hover:bg-[#0556b3] text-white rounded-xl text-base font-semibold flex items-center justify-center leading-6 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0px_10px_15px_-3px_rgba(17,23,34,0.08),0px_4px_6px_-4px_rgba(17,23,34,0.05)]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="bg-[#e5f6fe] border border-[#03449e] rounded-xl p-4">
                  <p className="text-sm text-[#03449e] leading-5 text-center" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    ✓ Thank you! Your message has been sent. We'll get back to you within 1 business day.
                  </p>
                </div>
              )}
            </form>

            {/* Additional Contact Info */}
            <div className="mt-8 pt-8 border-t border-[#e4e6ea]">
              <p className="text-sm text-[#616d7b] leading-5 text-center mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Prefer to reach us another way?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <div className="flex items-center gap-2">
                  <img src="/assets/icons/texas/email-icon.svg" alt="" className="w-4 h-4" />
                  <a href="mailto:support@roadreadysafety.com" className="text-sm text-[#616d7b] hover:text-[#03449e] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    support@roadreadysafety.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </TexasLayout>
  );
}

