import React from "react";
import md from "/blueprint/legal/terms.md?raw";
import DocPage from "../components/DocPage.jsx";

export default function TermsPage() {
  const breadcrumbs = [
    { label: "Terms of Service", href: "/terms" }
  ];

  return (
    <DocPage
      title="Terms of Service"
      subtitle="By using this site, you agree to these terms."
      markdown={md}
      breadcrumbs={breadcrumbs}
    />
  );
}
