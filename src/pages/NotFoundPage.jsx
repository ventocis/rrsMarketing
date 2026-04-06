import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page Not Found | Road Ready Safety"
        description="The page you're looking for doesn't exist."
        url=""
        robots="noindex, nofollow"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-[#1e2832] mb-4">Page not found</h1>
        <p className="text-[#616d7b] mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
        <div className="flex flex-col gap-3">
          <Link to="/" className="text-[#0667D1] hover:underline">
            Return to homepage
          </Link>
          <Link to="/texas/courts" className="text-[#0667D1] hover:underline">
            Browse Texas courts
          </Link>
        </div>
      </div>
    </>
  );
}
