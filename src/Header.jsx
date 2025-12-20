import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Button from './components/Button.jsx';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isTexasRoute = location.pathname.startsWith('/texas');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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
            <button className="h-9 px-4 rounded-[10px] text-xs font-semibold text-[#1e2832] hover:bg-gray-100 transition-colors" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Log In
            </button>
            <Button 
              href="/courses/tx-defensive" 
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
                <button className="w-full h-9 px-4 rounded-[10px] text-xs font-semibold text-[#1e2832] border border-gray-300 hover:bg-gray-100">
                  Log In
                </button>
                <Button 
                  href="/courses/tx-defensive" 
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
    );
  }

  // Standard Header
  return (
    <header className="w-full bg-white border-b border-gray-200 py-4 sticky top-0 z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 w-full">
        {/* Logo - Left aligned */}
        <a href="/" className="flex items-center gap-3 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded flex-shrink-0">
          <img src="/assets/logo.svg" alt="Road Ready Safety" className="h-8 w-auto max-w-full" />
          <span className="text-xl font-semibold text-slate-700">Road Ready Safety</span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          <a href="/faq" className="text-slate-700 hover:underline">FAQ</a>
          <a href="/support" className="text-slate-700 hover:underline">Help Center</a>
          <a href="/courses" className="text-slate-700 hover:underline">Courses</a>
          <Button href="https://courses.ticketschool.com/login/login.asp" variant="custom" className="h-8 px-4 rounded-full border border-gray-300 bg-white text-gray-600 hover:text-gray-800 hover:border-gray-400 text-sm font-medium flex items-center justify-center">Login</Button>
        </div>
        
        {/* Mobile Hamburger Menu */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0"
          aria-label="Toggle navigation menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-300 mt-1 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-5 h-0.5 bg-slate-700 transition-all duration-300 mt-1 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </div>
        </button>
      </nav>
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg w-full z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full">
            <nav className="flex flex-col space-y-4 w-full">
              <a 
                href="/" 
                onClick={closeMenu}
                className="text-slate-700 hover:text-slate-900 py-2 px-3 rounded-lg hover:bg-gray-50 font-medium w-full"
              >
                Home
              </a>
              <a 
                href="/courses" 
                onClick={closeMenu}
                className="text-slate-700 hover:text-slate-900 py-2 px-3 rounded-lg hover:bg-gray-50 font-medium w-full"
              >
                Courses
              </a>
              <a 
                href="/faq" 
                onClick={closeMenu}
                className="text-slate-700 hover:text-slate-900 py-2 px-3 rounded-lg hover:bg-gray-50 font-medium w-full"
              >
                FAQ
              </a>
              <a 
                href="/support" 
                onClick={closeMenu}
                className="text-slate-700 hover:text-slate-900 py-2 px-3 rounded-lg hover:bg-gray-50 font-medium w-full"
              >
                Help Center
              </a>
              <div className="pt-2 w-full">
                <Button 
                  href="https://courses.ticketschool.com/login/login.asp" 
                  variant="custom" 
                  onClick={closeMenu}
                  className="w-full h-12 px-4 rounded-lg border border-gray-300 bg-white text-gray-600 hover:text-gray-800 hover:border-gray-400 text-sm font-medium flex items-center justify-center"
                >
                  Login
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
