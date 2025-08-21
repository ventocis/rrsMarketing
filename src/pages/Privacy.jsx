import React from "react";
import md from "/blueprint/legal/privacy.md?raw";
import DocPage from "../components/DocPage.jsx";

export default function PrivacyPage() {
  const breadcrumbs = [
    { label: "Privacy Policy", href: "/privacy" }
  ];

  return (
    <DocPage
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your information."
      markdown={md}
      breadcrumbs={breadcrumbs}
    />
  );
}
