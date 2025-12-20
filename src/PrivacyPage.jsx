import React from 'react';
import ReactMarkdown from 'react-markdown';

const privacyMd = `# Privacy Policy\n\nContent coming soon.`;

export default function PrivacyPage() {
  return (
    <main className="max-w-2xl mx-auto py-16 px-4">
      <ReactMarkdown>{privacyMd}</ReactMarkdown>
    </main>
  );
}
