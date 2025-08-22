import React, { useState } from 'react';
import Button from './components/Button.jsx';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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
          <Button href="/login" variant="custom" className="h-8 px-4 rounded-full border border-gray-300 bg-white text-gray-600 hover:text-gray-800 hover:border-gray-400 text-sm font-medium flex items-center justify-center">Login</Button>
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
                  href="/login" 
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
