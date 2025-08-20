// sref: stripe-nav
import React from 'react';
import Button from './components/Button.jsx';

export default function Header() {
  const [open, setOpen] = React.useState(false);
  return (
    <header className="sticky top-0 z-50 shadow-[0_1px_0_0_rgba(0,0,0,0.06)]">
      <div className="relative">
        {/* gradient background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-500"
        />
        {/* subtle blur over gradient for text legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-white/10 backdrop-blur-sm"
        />
        <nav className="mx-auto flex h-14 md:h-16 max-w-6xl items-center justify-between px-4 text-white">
          {/* Left: Logo */}
          <a href="/" className="font-semibold tracking-tight text-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded">
            Road Ready
          </a>

          {/* Center / Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {/* “Courses” must scroll to #find-course on Home. Use onClick handler to support cross-route hash+scroll. */}
            <a
              href="/#find-course"
              onClick={(e) => {
                const isHome = window.location.pathname === "/";
                if (isHome) {
                  e.preventDefault();
                  const el = document.getElementById("find-course");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white/80 rounded"
            >
              Courses
            </a>

            <a href="/support" className="hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white/80 rounded">
              Help Center
            </a>

            <a href="/#faq" className="hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white/80 rounded">
              FAQ
            </a>
          </div>

          {/* Right: Login button (Flowbite Button, light-on-dark) */}
          <div className="hidden md:flex">
            <Button href="/login" variant="secondary" className="!bg-white !text-gray-900 hover:!bg-white/90 focus-visible:ring-2 focus-visible:ring-white/80">
              Login
            </Button>
          </div>

          {/* Mobile: menu toggle */}
          <button
            type="button"
            aria-label="Open menu"
            className="md:hidden inline-flex items-center justify-center rounded p-2 text-white/90 hover:text-white focus-visible:ring-2 focus-visible:ring-white/80"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="block h-0.5 w-5 bg-current mb-1"></span>
            <span className="block h-0.5 w-5 bg-current mb-1"></span>
            <span className="block h-0.5 w-5 bg-current"></span>
          </button>
        </nav>

        {/* Mobile sheet */}
        {open ? (
          <div className="md:hidden border-t border-white/15 bg-gradient-to-b from-indigo-600 via-violet-600 to-fuchsia-600 text-white">
            <div className="mx-auto max-w-6xl px-4 py-3 space-y-1">
              <a href="/#find-course" className="block rounded px-3 py-2 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/80"
                onClick={(e) => {
                  const isHome = window.location.pathname === "/";
                  if (isHome) {
                    e.preventDefault();
                    const el = document.getElementById("find-course");
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                  setOpen(false);
                }}
              >
                Courses
              </a>
              <a href="/support" className="block rounded px-3 py-2 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/80">Help Center</a>
              <a href="/#faq" className="block rounded px-3 py-2 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/80" onClick={() => setOpen(false)}>FAQ</a>
              <a href="/login" className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-white px-3 py-2 font-medium text-gray-900 hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-white/80">Login</a>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
