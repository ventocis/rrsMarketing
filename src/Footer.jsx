import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Button from './components/Button.jsx';

export default function Footer() {
  const location = useLocation();
  const isTexasRoute = location.pathname.startsWith('/texas');

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

  // Texas Footer
  if (isTexasRoute) {
    return (
      <footer className="bg-[#1e2832]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Main Footer Content - 4 Column Grid */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-12 items-start justify-center mb-12">
            {/* Column 1 - Company Info */}
            <div className="flex flex-col gap-6 items-start w-full lg:w-[432px]">
              {/* Logo */}
              <Link to="/texas" className="flex gap-2 items-center hover:opacity-80">
                <div className="bg-[#0351b4] rounded-2xl w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <img src="/assets/icons/texas/logo-shield-footer.svg" alt="Road Ready Safety Logo" className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-white leading-[22.5px]" style={{ fontFamily: "'Outfit', sans-serif" }}>Road Ready</span>
                  <span className="text-xs font-medium text-[#f6f6f9] leading-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Safety</span>
                </div>
              </Link>
              
              {/* Description */}
              <p className="text-sm text-[#f6f6f9] leading-5 max-w-[384px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                Texas' trusted defensive driving course provider. TDLR-<br />
                approved, court-accepted, and designed for busy Texans.
              </p>
              
              {/* Contact Info */}
              <div className="flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                  <img src="/assets/icons/texas/email-icon.svg" alt="" className="w-4 h-4" />
                  <a href="mailto:support@roadreadysafety.com" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    support@roadreadysafety.com
                  </a>
                </div>
                <div className="flex gap-3 items-center">
                  <img src="/assets/icons/texas/location-icon.svg" alt="" className="w-4 h-4" />
                  <span className="text-sm text-[#f6f6f9] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>Provider License #: xxxxx</span>
                </div>
              </div>
            </div>
            
            {/* Column 2 - Course Links */}
            <div className="flex flex-col gap-4 items-start w-full lg:w-[192px]">
              <h4 className="text-base font-semibold text-white leading-6 tracking-[-0.4px]" style={{ fontFamily: "'Outfit', sans-serif" }}>Course</h4>
              <div className="flex flex-col gap-3">
                <Link to="/texas" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Texas Course</Link>
                <Link to="/texas/pricing" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Pricing</Link>
                <Link to="/texas/faq" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>FAQ</Link>
              </div>
            </div>
            
            {/* Column 3 - Support Links */}
            <div className="flex flex-col gap-4 items-start w-full lg:w-[192px]">
              <h4 className="text-base font-semibold text-white leading-6 tracking-[-0.4px]" style={{ fontFamily: "'Outfit', sans-serif" }}>Support</h4>
              <div className="flex flex-col gap-3">
                <Link to="/texas/helpcenter" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Help Center</Link>
                <Link to="/texas/contactus" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Contact Us</Link>
              </div>
            </div>
              
            {/* Column 4 - Legal Links */}
            <div className="flex flex-col gap-4 items-start w-full lg:w-[192px]">
              <h4 className="text-base font-semibold text-white leading-6 tracking-[-0.4px]" style={{ fontFamily: "'Outfit', sans-serif" }}>Legal</h4>
              <div className="flex flex-col gap-3">
                <Link to="/privacy" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Privacy Policy</Link>
                <Link to="/texas/terms" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Terms of Service</Link>
                <Link to="/refund" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Refund Policy</Link>
                <Link to="/accessibility" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Accessibility</Link>
              </div>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="border-t border-[#1c2331] pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-[#616d7b] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                © {new Date().getFullYear()} Road Ready Safety. All rights reserved.
              </p>
              <div className="flex gap-2 items-center">
                <img src="/assets/icons/texas/tdlr-badge-footer.svg" alt="" className="w-4 h-4" />
                <span className="text-sm text-[#616d7b] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>TDLR Approved Provider</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  // Standard Footer
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
