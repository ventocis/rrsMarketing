import React from 'react';
import ReactMarkdown from 'react-markdown';

const termsMd = `# Terms of Service\n\nContent coming soon.`;

export default function TermsPage() {
  return (
    <main className="max-w-2xl mx-auto py-16 px-4">
      <ReactMarkdown>{termsMd}</ReactMarkdown>
    </main>
  );
}
