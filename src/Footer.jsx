import React from 'react';
import Button from './components/Button.jsx';

export default function Footer() {
  // All labels are blueprint-sourced; if a footer.json is added, update here.
  const legalLinks = [
    { href: '/support', label: 'Support' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' }
  ];
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-20 lg:py-28 mt-8">
      <div className="max-w-[65ch] mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 gap-4 md:gap-0">
        <div className="mb-2 md:mb-0">© {new Date().getFullYear()} Road Ready Safety</div>
        <nav aria-label="Legal" className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          {legalLinks.map(link => (
            <Button key={link.href} href={link.href} variant="link" size="md">
              {link.label}
            </Button>
          ))}
        </nav>
      </div>
    </footer>
  );
}
