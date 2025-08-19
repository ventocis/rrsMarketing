import React from 'react';
import Button from './components/Button.jsx';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-20 lg:py-28 mt-8">
      <div className="max-w-[65ch] mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <div className="mb-2 md:mb-0">© {new Date().getFullYear()} Road Ready Safety</div>
        <div className="space-x-4">
          <Button href="/support" variant="link" size="md">Support</Button>
          <Button href="/privacy" variant="link" size="md">Privacy</Button>
          <Button href="/terms" variant="link" size="md">Terms</Button>
        </div>
      </div>
    </footer>
  );
}
