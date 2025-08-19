import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-8">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <div className="mb-2 md:mb-0">© {new Date().getFullYear()} Road Ready Safety</div>
        <div className="space-x-4">
          <a href="/support" className="hover:underline">Support</a>
          <a href="/privacy" className="hover:underline">Privacy</a>
          <a href="/terms" className="hover:underline">Terms</a>
        </div>
      </div>
    </footer>
  );
}
