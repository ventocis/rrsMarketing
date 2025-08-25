import React from 'react';
import Button from './components/Button.jsx';

export default function Footer() {
  const quickLinks = [
    { href: '/find/FL/multi?lang=any', label: 'Courses' },
    { href: '/faq', label: 'FAQ' },
    { href: '/support', label: 'Help Center' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/partners', label: 'Become a Partner' }
  ];
  
  const socialLinks = [
    { href: 'https://facebook.com/roadreadysafety', icon: '/assets/social/facebook.svg', label: 'Facebook' },
    { href: 'https://www.youtube.com/@RoadReadySafety', icon: '/assets/social/youtube.svg', label: 'YouTube' }
  ];
  
  return (
    <footer className="border-t border-gray-200 mt-10 pt-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content - 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1 - Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start">
            <a href="/" className="flex items-center gap-3 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
              <img src="/assets/logo.svg" alt="Road Ready Safety" className="h-10 w-auto" />
              <span className="text-lg font-semibold text-slate-700">Road Ready Safety</span>
            </a>
            <p className="text-sm text-gray-500 mt-2 text-center md:text-left">
              Trusted and approved. Built for simplicity.
            </p>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-gray-700 mb-2">Quick Links</h3>
            <div className="flex flex-col space-y-2">
              {quickLinks.map(link => (
                <Button 
                  key={link.href} 
                  href={link.href} 
                  variant="custom" 
                  size="sm" 
                  className="text-sm text-gray-500 hover:text-gray-700 underline p-0 h-auto justify-start w-full text-left"
                >
                  {link.label}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Column 3 - Support & Social */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-gray-700 mb-2">Need Support?</h3>
            <div className="space-y-2 mb-4">
              <div className="flex flex-col items-center md:items-start">
                <a href="mailto:info@roadreadysafety.com" className="text-blue-600 hover:text-blue-700 text-sm">
                  info@roadreadysafety.com
                </a>
              </div>
              <div className="flex flex-col items-center md:items-start">
                <a href="tel:+18888855707" className="text-blue-600 hover:text-blue-700 text-sm">
                  (888) 885-5707
                </a>
                <span className="text-gray-500 text-xs">Mon–Fri, 9am–5pm EST</span>
              </div>
            </div>
            
            {/* Social Media Icons */}
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
        
        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center">
            © {new Date().getFullYear()} Road Ready Safety. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
