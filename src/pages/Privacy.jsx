import React from "react";
import md from "/blueprint/legal/privacy.md?raw";
import DocPage from "../components/DocPage.jsx";
import SEO from "../components/SEO.jsx";

export default function PrivacyPage() {
  const breadcrumbs = [
    { label: "Privacy Policy", href: "/privacy" }
  ];

  return (
    <>
      <SEO 
        title="Privacy Policy"
        description="Learn how Road Ready Safety collects, uses, and protects your personal information when you use our traffic safety courses."
        keywords="privacy policy, data protection, personal information, traffic course privacy"
        image="/assets/rrs (1200 x 630 px).png"
        url="/privacy"
      />
      <DocPage
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information."
        markdown={md}
        breadcrumbs={breadcrumbs}
      />
    </>
  );
}
