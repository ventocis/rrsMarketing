import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Button from './components/Button.jsx';
import { TEXAS_ENROLLMENT_URL } from './config/texasEnrollment.js';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  // Check if Texas routes are enabled via environment variable
  const isTexasRoutesEnabled = import.meta.env.VITE_TEXAS_ROUTES_ENABLED === 'true';
  const isTexasRoute = isTexasRoutesEnabled && location.pathname.startsWith('/texas');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isQa = isTexasRoutesEnabled;
  const loginUrl = isQa
    ? `https://app.qa.roadreadysafety.com/public/login?returnUrl=${encodeURIComponent(location.pathname || '/')}`
    : null;

  const logInButtonClass = "h-9 px-4 rounded-[10px] text-xs font-semibold text-[#1e2832] hover:bg-gray-100 transition-colors";
  const logInButtonStyle = { fontFamily: "'DM Sans', sans-serif" };
  const logInMobileClass = "w-full h-12 px-4 rounded-[10px] text-[18px] font-semibold text-[#1e2832] border border-[#e5e5e5] bg-white hover:bg-gray-50 transition-colors";

  const logoImage = "/assets/icons/texas/logo-shield.svg";

  // Texas Header
  if (isTexasRoute) {
    return (
      <header className="backdrop-blur-[2px] backdrop-filter bg-[rgba(255,255,255,0.95)] border-[#e4e6ea] border-b sticky top-0 z-50 m-0">
        {/* Promotional Banner */}
        <div className="bg-[#17a34a] w-full">
          <div className="px-4 py-2">
            <p className="text-white text-sm font-medium text-center leading-5">
              🎉 Limited Time: Texas Defensive Driving Course — Only $25 + $3 state fee
            </p>
          </div>
        </div>
        
        {/* Main Navigation */}
        <nav className="h-20 max-w-[1152px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 w-full">
          {/* Logo - Left aligned */}
          <Link to="/texas" className="flex items-center gap-2 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded flex-shrink-0">
            <img src={logoImage} alt="Road Ready Safety Logo" className="h-[39.633px] w-9" />
            <div className="flex flex-col">
              <span className="text-[18px] font-bold text-[#1e2832] leading-[22.5px]" style={{ fontFamily: "'Outfit', sans-serif" }}>Road Ready</span>
              <span className="text-xs font-medium text-[#616d7b] leading-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Safety</span>
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
              className={logInButtonClass}
              style={logInButtonStyle}
              onClick={loginUrl ? () => { window.location.href = loginUrl; } : undefined}
            >
              Log In
            </button>
          <Button 
            href={TEXAS_ENROLLMENT_URL} 
            variant="custom" 
            className="bg-[#0667D1] hover:bg-[#0556b3] text-white pt-[11.6px] pb-[12.4px] px-[20px] rounded-[16px] text-sm font-semibold flex items-center justify-center leading-[20px] no-underline text-center"
            style={{ 
              fontFamily: "'DM Sans', sans-serif", 
              minHeight: '44px', 
              textAlign: 'center',
              boxShadow: '0 20px 25px -5px rgba(17, 23, 34, 0.10), 0 8px 10px -6px rgba(17, 23, 34, 0.05)'
            }}
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
          <div className="md:hidden border-t border-[#e5e5e5] bg-white">
            <div className="px-4 py-6 space-y-4">
              <Link to="/texas/pricing" onClick={closeMenu} className="block text-lg font-medium text-[#1e2832] text-center py-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Pricing</Link>
              <Link to="/texas/faq" onClick={closeMenu} className="block text-lg font-medium text-[#1e2832] text-center py-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>FAQ</Link>
              <Link to="/texas/helpcenter" onClick={closeMenu} className="block text-lg font-medium text-[#1e2832] text-center py-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>Help Center</Link>
              <div className="pt-4 space-y-3">
                <button
                  type="button"
                  className={logInMobileClass}
                  style={logInButtonStyle}
                  onClick={loginUrl ? () => { window.location.href = loginUrl; } : undefined}
                >
                  Log In
                </button>
                <Button 
                  href={TEXAS_ENROLLMENT_URL} 
                  variant="custom" 
                  className="w-full h-12 px-4 rounded-[10px] bg-[#0667D1] text-white text-[18px] font-semibold hover:bg-[#0556b3] transition-colors flex items-center justify-center"
                  style={{ 
                    fontFamily: "'DM Sans', sans-serif",
                    boxShadow: '0 20px 25px -5px rgba(17, 23, 34, 0.10), 0 8px 10px -6px rgba(17, 23, 34, 0.05)',
                    minWidth: '0',
                    display: 'flex'
                  }}
                >
                  Start Course
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    );
  }

  // Standard Header
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-[1152px] mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-20 w-full">
        {/* Logo - Left aligned */}
        <a href="/" className="flex items-center gap-2 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded flex-shrink-0">
          <img src="/assets/icons/texas/logo-shield.svg" alt="Road Ready Safety Logo" className="h-[39.633px] w-9" />
          <div className="flex flex-col">
            <span className="text-[18px] font-bold text-[#1e2832] leading-[22.5px]" style={{ fontFamily: "'Outfit', sans-serif" }}>Road Ready</span>
            <span className="text-xs font-medium text-[#616d7b] leading-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Safety</span>
          </div>
        </a>
        
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 flex-shrink-0">
          <a href="#how-it-works" className="text-sm font-medium text-[#616d7b] hover:text-[#1e2832] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>How It Works</a>
          <a href="/courses" className="text-sm font-medium text-[#616d7b] hover:text-[#1e2832] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Courses</a>
          <a href="/faq" className="text-sm font-medium text-[#616d7b] hover:text-[#1e2832] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>FAQ</a>
          <a href="/support" className="text-sm font-medium text-[#616d7b] hover:text-[#1e2832] transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>Help Center</a>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          <button
            type="button"
            className={logInButtonClass}
            style={logInButtonStyle}
            onClick={loginUrl ? () => { window.location.href = loginUrl; } : undefined}
          >
            Log In
          </button>
          <Button 
            href="/courses" 
            variant="custom" 
            className="bg-[#0667D1] hover:bg-[#0556b3] text-white pt-[11.6px] pb-[12.4px] px-[20px] rounded-[16px] text-sm font-semibold flex items-center justify-center leading-[20px] no-underline text-center"
            style={{ 
              fontFamily: "'DM Sans', sans-serif", 
              minHeight: '44px', 
              textAlign: 'center',
              boxShadow: '0 20px 25px -5px rgba(17, 23, 34, 0.10), 0 8px 10px -6px rgba(17, 23, 34, 0.05)'
            }}
          >
            Start Course
          </Button>
        </div>
        
        {/* Mobile Hamburger Menu */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg text-[#616d7b] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Toggle navigation menu"
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
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-[#e5e5e5] bg-white">
          <div className="px-4 py-6 space-y-4">
            <a 
              href="#how-it-works" 
              onClick={closeMenu}
              className="block text-lg font-medium text-[#1e2832] text-center py-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              How It Works
            </a>
            <a 
              href="/courses" 
              onClick={closeMenu}
              className="block text-lg font-medium text-[#1e2832] text-center py-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Courses
            </a>
            <a 
              href="/faq" 
              onClick={closeMenu}
              className="block text-lg font-medium text-[#1e2832] text-center py-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              FAQ
            </a>
            <a 
              href="/support" 
              onClick={closeMenu}
              className="block text-lg font-medium text-[#1e2832] text-center py-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Help Center
            </a>
            <div className="pt-4 space-y-3">
              <button
                type="button"
                className={logInMobileClass}
                style={logInButtonStyle}
                onClick={loginUrl ? () => { window.location.href = loginUrl; } : undefined}
              >
                Log In
              </button>
              <Button 
                href="/courses" 
                variant="custom" 
                className="w-full h-12 px-4 rounded-[10px] bg-[#0667D1] text-white text-[18px] font-semibold hover:bg-[#0556b3] transition-colors flex items-center justify-center"
                style={{ 
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: '0 20px 25px -5px rgba(17, 23, 34, 0.10), 0 8px 10px -6px rgba(17, 23, 34, 0.05)',
                  minWidth: '0',
                  display: 'flex'
                }}
              >
                Start Course
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
