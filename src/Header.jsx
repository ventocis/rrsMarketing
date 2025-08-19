import React from 'react';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 py-4 mb-4 sticky top-0 z-10">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-4">
        <span className="font-bold text-lg">Road Ready</span>
        <a href="#find-course" className="text-blue-600 hover:underline">Courses</a>
      </nav>
    </header>
  );
}
