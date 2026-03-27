import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../Button.jsx';
import TopBanner from '../TopBanner.jsx';
import { TEXAS_ENROLLMENT_URL } from '../../config/texasEnrollment.js';
import { LOGIN_URL, CONTACT_US_URL } from '../../config/urls.js';

export default function TexasLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isQa = import.meta.env.VITE_TEXAS_ROUTES_ENABLED === 'true';
  const loginUrl = LOGIN_URL
    ? `${LOGIN_URL}${LOGIN_URL.includes('?') ? '&' : '?'}returnUrl=${encodeURIComponent(location.pathname || '/')}`
    : null;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const logoImage = "/assets/icons/texas/logo-shield.svg";

  return (
    <div className="w-full overflow-x-hidden">
      {/* Header */}
      <header className="backdrop-blur-[2px] backdrop-filter bg-[rgba(255,255,255,0.95)] border-[#e4e6ea] border-b sticky top-0 z-50">
        {/* Promotional Banner */}
        <TopBanner />
        
        {/* Main Navigation */}
        <nav className="h-20 max-w-[1152px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 w-full">
          {/* Logo - Left aligned */}
          <Link to="/texas" className="flex items-center gap-2 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded flex-shrink-0">
            <img src={logoImage} alt="Road Ready Safety Logo" className="h-[39.633px] w-9" />
            <div className="flex flex-col">
              <span className="text-[18px] font-bold text-[#2E323D] leading-[22.5px]" style={{ fontFamily: "'Outfit', sans-serif" }}>Road Ready</span>
              <span className="text-xs font-medium leading-4" style={{ fontFamily: "'DM Sans', sans-serif" }}><span className="text-[#2E323D]">Safety</span><span className="text-[#6E747F]"> TDLR: CP#1234</span></span>
            </div>
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 flex-shrink-0">
            <Link to="/texas/pricing" className="text-sm font-medium text-[#616d7b] hover:text-[#1e2832] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Pricing</Link>
            <Link to="/texas/faq" className="text-sm font-medium text-[#616d7b] hover:text-[#1e2832] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>FAQ</Link>
            <Link to="/texas/helpcenter" className="text-sm font-medium text-[#616d7b] hover:text-[#1e2832] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Help Center</Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <button
              type="button"
              className="h-9 px-4 rounded-[10px] text-xs font-semibold text-[#1e2832] hover:bg-gray-100 transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              onClick={loginUrl ? () => { window.location.href = loginUrl; } : undefined}
            >
              Log In
            </button>
            <Button 
              href={TEXAS_ENROLLMENT_URL} 
              variant="custom" 
              className="bg-[#0667d1] hover:bg-[#0556b3] text-white pt-[11.6px] pb-[12.4px] px-[20px] rounded-[12px] shadow-[0px_10px_15px_-3px_rgba(17,23,34,0.08),0px_4px_6px_-4px_rgba(17,23,34,0.05)] text-sm font-semibold flex items-center justify-center leading-[20px] no-underline text-center"
              style={{ fontFamily: "'DM Sans', sans-serif", minHeight: '44px', textAlign: 'center' }}
            >
              Start Course
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-[#616d7b] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-3">
              <Link to="/texas/pricing" onClick={closeMenu} className="block text-sm font-medium text-[#616d7b] hover:text-[#1e2832]">Pricing</Link>
              <Link to="/texas/faq" onClick={closeMenu} className="block text-sm font-medium text-[#616d7b] hover:text-[#1e2832]">FAQ</Link>
              <Link to="/texas/helpcenter" onClick={closeMenu} className="block text-sm font-medium text-[#616d7b] hover:text-[#1e2832]">Help Center</Link>
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  className="w-full h-9 px-4 rounded-[10px] text-xs font-semibold text-[#1e2832] border border-gray-300 hover:bg-gray-100"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  onClick={loginUrl ? () => { window.location.href = loginUrl; } : undefined}
                >
                  Log In
                </button>
                <Button 
                  href={TEXAS_ENROLLMENT_URL} 
                  variant="custom" 
                  className="w-full h-11 px-5 rounded-xl bg-[#0667d1] text-white text-sm font-semibold shadow-[0px_10px_15px_-3px_rgba(17,23,34,0.08),0px_4px_6px_-4px_rgba(17,23,34,0.05)] hover:bg-[#0556b3]"
                >
                  Start Course
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
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
                  <a href="mailto:info@roadreadysafety.com" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    info@roadreadysafety.com
                  </a>
                </div>
                <div className="flex gap-3 items-center">
                  <img src="/assets/icons/texas/tdlr-badge-footer.svg" alt="" className="w-4 h-4" />
                  <span className="text-sm text-[#f6f6f9] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>TDLR Approved: CP#1234</span>
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
                <a href={CONTACT_US_URL} className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Contact Us</a>
              </div>
              </div>
              
            {/* Column 4 - Legal Links */}
            <div className="flex flex-col gap-4 items-start w-full lg:w-[192px]">
              <h4 className="text-base font-semibold text-white leading-6 tracking-[-0.4px]" style={{ fontFamily: "'Outfit', sans-serif" }}>Legal</h4>
              <div className="flex flex-col gap-3">
                <Link to="/privacy" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Privacy Policy</Link>
                <Link to="/texas/terms" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Terms of Service</Link>
                <Link to="/texas/refund" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Refund Policy</Link>
                <Link to="/texas/accessibility" className="text-sm text-[#f6f6f9] leading-5 hover:text-white transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Accessibility</Link>
              </div>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="border-t border-[#1c2331] pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-[#616d7b] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                © 2025 Road Ready Safety. All rights reserved.
              </p>
              <div className="flex gap-2 items-center">
                <img src="/assets/icons/texas/tdlr-badge-footer.svg" alt="" className="w-4 h-4" />
                <span className="text-sm text-[#616d7b] leading-5" style={{ fontFamily: "'DM Sans', sans-serif" }}>TDLR Approved Provider</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

