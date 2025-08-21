import React from 'react';
import Button from './components/Button.jsx';

export default function Footer() {
  // All labels are blueprint-sourced; if a footer.json is added, update here.
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
    <footer className="bg-gray-50 border-t border-gray-200 py-20 lg:py-28 mt-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and company info */}
          <div className="flex flex-col items-start">
            <a href="/" className="flex items-center gap-3 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded mb-4">
              <img src="/assets/logo.svg" alt="Road Ready Safety" className="h-8" />
              <span className="text-xl font-semibold text-slate-700">Road Ready Safety</span>
            </a>
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Road Ready Safety</p>
          </div>
          
          {/* Legal links */}
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-gray-900 mb-3">Legal</h3>
            <nav aria-label="Legal" className="flex flex-col gap-2">
              {legalLinks.map(link => (
                <Button key={link.href} href={link.href} variant="link" size="sm" className="text-left justify-start p-0 h-auto">
                  {link.label}
                </Button>
              ))}
            </nav>
          </div>
          
          {/* Social links and additional links */}
          <div className="flex flex-col items-start">
            <h3 className="font-semibold text-gray-900 mb-3">Follow us</h3>
            <div className="flex gap-3 mb-4">
              {socialLinks.map(social => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                  aria-label={social.label}
                >
                  <img src={social.icon} alt="" className="w-5 h-5" />
                </a>
              ))}
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
            <nav aria-label="Resources" className="flex flex-col gap-2">
              {additionalLinks.map(link => (
                <Button key={link.href} href={link.href} variant="link" size="sm" className="text-left justify-start p-0 h-auto">
                  {link.label}
                </Button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Bottom border */}
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">Drive safe, drive smart.</p>
        </div>
      </div>
    </footer>
  );
}
