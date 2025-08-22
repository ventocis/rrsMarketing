import React from 'react';
import Button from './components/Button.jsx';

export default function Footer() {
  const quickLinks = [
    { href: '/find/FL/multi?lang=any', label: 'Courses' },
    { href: '/faq', label: 'FAQ' },
    { href: '/support', label: 'Help Center' },
    { href: '/partners', label: 'Become a Partner' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' }
  ];
  
  const socialLinks = [
    { href: 'https://facebook.com/roadreadysafety', icon: '/assets/social/facebook.svg', label: 'Facebook' },
    { href: 'https://youtube.com/@roadreadysafety', icon: '/assets/social/youtube.svg', label: 'YouTube' }
  ];
  
  return (
    <footer className="w-full max-w-full overflow-x-hidden bg-gray-50 border-t border-gray-200 mt-8 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
        
        {/* Top Section – Brand & Trust */}
        <div className="flex flex-col items-center md:items-start mb-8 md:mb-12">
          {/* Logo and Tagline */}
          <div className="flex flex-col items-center md:items-start mb-6">
            <a href="/" className="flex items-center gap-3 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded mb-4">
              <img src="/assets/logo.svg" alt="Road Ready Safety" className="max-w-[120px] md:max-w-[160px] h-auto" />
              <span className="text-xl font-semibold text-slate-700">Road Ready Safety</span>
            </a>
            <p className="text-center md:text-left text-gray-600 text-sm md:text-base">
              Approved where required. Built for simplicity.
            </p>
          </div>
          
          {/* Payment Logos */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
            <img src="/assets/payments/visa.svg" alt="Visa" className="h-6 md:h-7 w-auto max-w-full" />
            <img src="/assets/payments/mastercard.svg" alt="Mastercard" className="h-6 md:h-7 w-auto max-w-full" />
            <img src="/assets/payments/amex.svg" alt="American Express" className="h-6 md:h-7 w-auto max-w-full" />
            <img src="/assets/payments/discover.svg" alt="Discover" className="h-6 md:h-7 w-auto max-w-full" />
          </div>
        </div>
        
        {/* Middle Section – Quick Links and Support (Two Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Left Column - Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {quickLinks.map(link => (
                <Button 
                  key={link.href} 
                  href={link.href} 
                  variant="custom" 
                  size="sm" 
                  className="text-left justify-start p-0 h-10 text-sm text-gray-600 hover:text-gray-800 underline min-h-[44px] flex items-center w-full"
                >
                  {link.label}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Right Column - Support */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-gray-900 mb-4">Need Support?</h3>
            <div className="space-y-3">
              <div className="flex flex-col items-center md:items-start">
                <span className="text-gray-600 text-sm mb-1">Email</span>
                <a href="mailto:info@roadreadysafety.com" className="text-indigo-600 hover:underline">
                  info@roadreadysafety.com
                </a>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <span className="text-gray-600 text-sm mb-1">Phone</span>
                <a href="tel:+18888855707" className="text-indigo-600 hover:underline">
                  (888) 885-5707
                </a>
                <span className="text-gray-500 text-sm">Mon–Fri, 9–5 local</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar – Legal & Social */}
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 md:gap-8 pt-6 border-t border-gray-200">
          {/* Copyright */}
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} Road Ready Safety. All rights reserved.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-3">
            {socialLinks.map(social => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white border border-gray-200 hover:opacity-80 transition-opacity min-h-[44px] min-w-[44px] flex items-center justify-center flex-shrink-0"
                aria-label={social.label}
              >
                <img src={social.icon} alt="" className="w-5 h-5 max-w-[24px] max-h-[24px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
