import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Button from './components/Button.jsx';

export default function Footer() {
  const location = useLocation();
  // Check if Texas routes are enabled via environment variable
  const isTexasRoutesEnabled = import.meta.env.VITE_TEXAS_ROUTES_ENABLED === 'true';
  const isTexasRoute = isTexasRoutesEnabled && location.pathname.startsWith('/texas');

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
              <Link to="/texas" className="flex items-center gap-2 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded flex-shrink-0">
                <img src="/assets/icons/texas/logo-shield.svg" alt="Road Ready Safety Logo" className="h-[39.633px] w-9" />
                <div className="flex flex-col">
                  <span className="text-[18px] font-bold text-white leading-[22.5px]" style={{ fontFamily: "'Outfit', sans-serif" }}>Road Ready</span>
                  <span className="text-xs font-medium text-[#616d7b] leading-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Safety</span>
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
                  <a href="mailto:info@roadreadysafety.com" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    info@roadreadysafety.com
                  </a>
                </div>
                <div className="flex gap-3 items-center">
                  <img src="/assets/icons/texas/tdlr-badge-footer.svg" alt="" className="w-4 h-4" />
                  <span className="text-sm text-[#f6f6f9] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>TDLR Approved: CPXXXX</span>
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
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  // Standard Footer
  return (
    <footer className="bg-[#1e2832]">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        {/* Main Footer Content - 4 Column Grid */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-[48px] items-start justify-center">
          {/* Column 1 - Company Info */}
          <div className="flex flex-col gap-6 items-start w-full lg:w-[432px]">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded flex-shrink-0">
              <img src="/assets/icons/texas/logo-shield.svg" alt="Road Ready Safety Logo" className="h-[39.633px] w-9" />
              <div className="flex flex-col">
                <span className="text-[18px] font-bold text-white leading-[22.5px]" style={{ fontFamily: "'Outfit', sans-serif" }}>Road Ready</span>
                <span className="text-xs font-medium text-[#616d7b] leading-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Safety</span>
              </div>
            </Link>
            
            {/* Description */}
            <p className="text-[14px] text-[#f6f6f9] leading-[20px] max-w-[384px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Trusted and approved. Built for simplicity.
            </p>
            
            {/* Contact Info */}
            <div className="flex flex-col gap-[11.6px]">
              <div className="flex gap-[12px] items-center">
                <img src="/assets/icons/texas/email-icon.svg" alt="" className="w-4 h-4" />
                <a href="mailto:info@roadreadysafety.com" className="text-[14px] text-[#f6f6f9] leading-[20px] hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  info@roadreadysafety.com
                </a>
              </div>
              <div className="flex gap-[12px] items-center">
                <img src="/assets/icons/texas/location-icon.svg" alt="" className="w-4 h-4" />
                <a href="tel:+18888855707" className="text-[14px] text-[#f6f6f9] leading-[20px] hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  (888) 885-5707
                </a>
              </div>
            </div>
          </div>
          
          {/* Column 2 - Quick Links / Course */}
          <div className="flex flex-col gap-4 items-start w-full lg:w-[192px]">
            <h4 className="text-[16px] font-semibold text-white leading-6 tracking-[-0.4px]" style={{ fontFamily: "'Outfit', sans-serif" }}>Course</h4>
            <div className="flex flex-col gap-[12px]">
              {quickLinks.filter(link => ['Courses', 'FAQ'].includes(link.label)).map(link => (
                <Link 
                  key={link.href} 
                  to={link.href}
                  className="text-[14px] text-[#f6f6f9] leading-[20px] hover:text-white transition-colors" 
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Column 3 - Support */}
          <div className="flex flex-col gap-4 items-start w-full lg:w-[192px]">
            <h4 className="text-[16px] font-semibold text-white leading-6 tracking-[-0.4px]" style={{ fontFamily: "'Outfit', sans-serif" }}>Support</h4>
            <div className="flex flex-col gap-[12px]">
              {quickLinks.filter(link => link.label === 'Help Center').map(link => (
                <Link 
                  key={link.href} 
                  to={link.href}
                  className="text-[14px] text-[#f6f6f9] leading-[20px] hover:text-white transition-colors" 
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                to="/support" 
                className="text-[14px] text-[#f6f6f9] leading-[20px] hover:text-white transition-colors" 
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Contact Us
              </Link>
              {quickLinks.filter(link => link.label === 'Become a Partner').map(link => (
                <Link 
                  key={link.href} 
                  to={link.href}
                  className="text-[14px] text-[#f6f6f9] leading-[20px] hover:text-white transition-colors" 
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Column 4 - Legal */}
          <div className="flex flex-col gap-4 items-start w-full lg:w-[192px]">
            <h4 className="text-[16px] font-semibold text-white leading-6 tracking-[-0.4px]" style={{ fontFamily: "'Outfit', sans-serif" }}>Legal</h4>
            <div className="flex flex-col gap-[12px]">
              {quickLinks.filter(link => ['Privacy Policy', 'Terms of Service'].includes(link.label)).map(link => (
                <Link 
                  key={link.href} 
                  to={link.href}
                  className="text-[14px] text-[#f6f6f9] leading-[20px] hover:text-white transition-colors" 
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-[#1c2331] pt-[32.8px]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[14px] text-[#616d7b] leading-[20px]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              © {new Date().getFullYear()} Road Ready Safety. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
