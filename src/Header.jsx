import React from 'react';
import Button from './components/Button.jsx';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 py-4 mb-4 sticky top-0 z-10">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-4">
        <a href="/" className="font-bold text-lg hover:underline focus:outline-none">Road Ready</a>
        <div className="flex items-center gap-4">
          <a href="/faq" className="text-slate-700 hover:underline">FAQ</a>
          <a href="/support" className="text-slate-700 hover:underline">Help Center</a>
          <a href="/find/FL/multi?lang=any" className="text-slate-700 hover:underline">Courses</a>
          <Button href="/login" className="h-9 px-4 rounded-full border border-gray-200 text-slate-700 bg-white hover:bg-gray-50 text-sm font-semibold">Login</Button>
        </div>
      </nav>
    </header>
  );
}
