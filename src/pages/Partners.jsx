import React from 'react';
import DocPage from '../components/DocPage.jsx';

export default function Partners() {
  const markdown = `# Become a partner

We're building our partner program. Coming soon. For inquiries: info@roadreadysafety.com.`;

  return (
    <DocPage 
      title="Become a partner"
      subtitle="Partner program coming soon"
      markdown={markdown}
      showContactCard={false}
    />
  );
}
