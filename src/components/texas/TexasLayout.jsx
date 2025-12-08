import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button.jsx';

export default function TexasLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="w-full overflow-x-hidden">
      {/* Announcement Ribbon */}
      <div className="w-full bg-blue-600 text-white py-3 text-center">
        <p className="text-sm md:text-base font-semibold">
          FREE Instant Digital Certificate Included
        </p>
      </div>

      {/* Header */}
      <header className="w-full bg-white border-b border-gray-200 py-4 sticky top-0 z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 w-full">
          {/* Logo - Left aligned */}
          <Link to="/texas" className="flex items-center gap-3 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded flex-shrink-0">
            <img src="/assets/logo.svg" alt="Road Ready Safety" className="h-8 w-auto max-w-full" />
            <span className="text-xl font-semibold text-slate-700">Road Ready Safety</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            <Link to="/texas/pricing" className="text-slate-700 hover:underline">Pricing</Link>
            <Link to="/support" className="text-slate-700 hover:underline">Help Center</Link>
            <Link to="/courses" className="text-slate-700 hover:underline">Ticket Resources</Link>
            <Button href="https://courses.ticketschool.com/login/login.asp" variant="custom" className="h-8 px-4 rounded-full border border-gray-300 bg-white text-gray-600 hover:text-gray-800 hover:border-gray-400 text-sm font-medium flex items-center justify-center">Login</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <Link to="/texas/pricing" onClick={closeMenu} className="block text-slate-700 hover:text-blue-600">Pricing</Link>
              <Link to="/support" onClick={closeMenu} className="block text-slate-700 hover:text-blue-600">Help Center</Link>
              <Link to="/courses" onClick={closeMenu} className="block text-slate-700 hover:text-blue-600">Ticket Resources</Link>
              <Button href="https://courses.ticketschool.com/login/login.asp" variant="custom" className="w-full h-10 px-4 rounded-full border border-gray-300 bg-white text-gray-600 hover:text-gray-800 hover:border-gray-400 text-sm font-medium flex items-center justify-center">Login</Button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-10 pt-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Footer Content - 3 Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1 - Logo & Tagline */}
            <div className="flex flex-col items-center md:items-start">
              <Link to="/texas" className="flex items-center gap-3 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
                <img src="/assets/logo.svg" alt="Road Ready Safety" className="h-10 w-auto" />
                <span className="text-lg font-semibold text-slate-700">Road Ready Safety</span>
              </Link>
              <p className="text-sm text-gray-500 mt-2 text-center md:text-left">
                Trusted and approved. Built for simplicity.
              </p>
            </div>
            
            {/* Column 2 - Quick Links */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-semibold text-gray-700 mb-2">Quick Links</h3>
              <div className="flex flex-col space-y-2">
                <Link to="/texas" className="text-sm text-gray-500 hover:text-gray-700 underline">Texas Course</Link>
                <Link to="/faq" className="text-sm text-gray-500 hover:text-gray-700 underline">FAQ</Link>
                <Link to="/support" className="text-sm text-gray-500 hover:text-gray-700 underline">Help Center</Link>
                <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-700 underline">Privacy Policy</Link>
                <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-700 underline">Terms of Service</Link>
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
                <a
                  href="https://facebook.com/roadreadysafety"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white border border-gray-200 hover:opacity-80 transition-opacity min-h-[44px] min-w-[44px] flex items-center justify-center flex-shrink-0"
                  aria-label="Facebook"
                >
                  <img src="/assets/social/facebook.svg" alt="" className="w-5 h-5 max-w-[24px] max-h-[24px]" />
                </a>
                <a
                  href="https://www.youtube.com/@RoadReadySafety"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white border border-gray-200 hover:opacity-80 transition-opacity min-h-[44px] min-w-[44px] flex items-center justify-center flex-shrink-0"
                  aria-label="YouTube"
                >
                  <img src="/assets/social/youtube.svg" alt="" className="w-5 h-5 max-w-[24px] max-h-[24px]" />
                </a>
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
    </div>
  );
}

