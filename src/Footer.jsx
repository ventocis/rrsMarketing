import React from 'react';
import Button from './components/Button.jsx';

export default function Footer() {
  const legalLinks = [
    { href: '/support', label: 'Support' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
    { href: '/partners', label: 'Become a partner' }
  ];
  
  const socialLinks = [
    { href: 'https://facebook.com/roadreadysafety', icon: '/assets/social/facebook.svg', label: 'Facebook' },
    { href: 'https://youtube.com/@roadreadysafety', icon: '/assets/social/youtube.svg', label: 'YouTube' }
  ];
  
  const additionalLinks = [
    { href: '/blog', label: 'Drive Smart Blog' }
  ];
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-8 pt-6">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Left column - Logo and company info */}
          <div className="flex flex-col items-start">
            <a href="/" className="flex items-center gap-3 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded mb-4">
              <img src="/assets/logo.svg" alt="Road Ready Safety" className="h-8" />
              <span className="text-xl font-semibold text-slate-700">Road Ready Safety</span>
            </a>
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} Road Ready Safety</p>
          </div>
          
          {/* Center column - Legal links */}
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-gray-900 mb-3">Legal</h3>
            <nav aria-label="Legal" className="flex flex-col gap-2 ml-4">
              {legalLinks.map(link => (
                <Button key={link.href} href={link.href} variant="custom" size="sm" className="text-left justify-start p-0 h-auto text-sm text-gray-600 hover:text-gray-800 underline">
                  {link.label}
                </Button>
              ))}
            </nav>
          </div>
          
          {/* Right column - Social icons and resources */}
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-gray-900 mb-3">Follow us</h3>
            <div className="flex gap-3 mb-6">
              {socialLinks.map(social => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white border border-gray-200 hover:opacity-80 transition-opacity"
                  aria-label={social.label}
                >
                  <img src={social.icon} alt="" className="w-5 h-5" />
                </a>
              ))}
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
            <nav aria-label="Resources" className="flex flex-col gap-2 ml-4">
              {additionalLinks.map(link => (
                <Button key={link.href} href={link.href} variant="custom" size="sm" className="text-left justify-start p-0 h-auto text-sm text-gray-600 hover:text-gray-800 underline">
                  {link.label}
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
