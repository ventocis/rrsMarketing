import React from 'react';
import ReactMarkdown from 'react-markdown';

const supportMd = `**Affiliate disclosure:** Road Ready may earn from partner referrals.`;

export default function SupportPage() {
  return (
    <main className="max-w-2xl mx-auto py-16 px-4">
      <ReactMarkdown>{supportMd}</ReactMarkdown>
    </main>
  );
}
