import React from 'react';
import Button from './components/Button.jsx';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 py-4 mb-4 sticky top-0 z-10">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-4">
        <a href="/" className="flex items-center gap-3 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
          <img src="/assets/logo.svg" alt="Road Ready Safety" className="h-8" />
          <span className="text-xl font-semibold text-slate-700">Road Ready Safety</span>
        </a>
        <div className="flex items-center gap-4">
          <a href="/faq" className="text-slate-700 hover:underline">FAQ</a>
          <a href="/support" className="text-slate-700 hover:underline">Help Center</a>
          <a href="/find/FL/multi?lang=any" className="text-slate-700 hover:underline">Courses</a>
          <Button href="/login" variant="custom" className="h-8 px-4 rounded-full border border-gray-300 bg-white text-gray-600 hover:text-gray-800 hover:border-gray-400 text-sm font-medium flex items-center justify-center">Login</Button>
        </div>
      </nav>
    </header>
  );
}
