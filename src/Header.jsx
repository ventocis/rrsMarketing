// sref: header.v1
import React from 'react';
import { Button } from 'flowbite-react';

export default function Header() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16 mx-auto px-4 max-w-[1120px]">
        <a href="/" className="flex items-center gap-2" aria-label="Home">
          <img src="/images/logo.svg" alt="Road Ready Safety logo" className="h-8 w-auto" />
        </a>
        <ul className="flex items-center gap-6">
          <li>
            <a href="#find-course" className="text-base font-medium text-gray-900 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary px-2 py-1 rounded transition-colors" tabIndex={0}>
              Courses
            </a>
          </li>
          <li>
            <a href="/support" className="text-base font-medium text-gray-900 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary px-2 py-1 rounded transition-colors" tabIndex={0}>
              Help Center
            </a>
          </li>
          <li>
            <Button as="a" href="#" size="sm" className="font-medium" tabIndex={0}>
              Login
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
