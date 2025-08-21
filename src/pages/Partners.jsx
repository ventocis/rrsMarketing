import React from "react";
import md from "/blueprint/legal/partners.md?raw";
import DocPage from "../components/DocPage.jsx";

export default function PartnersPage() {
  const breadcrumbs = [
    { label: "Become a Partner", href: "/partners" }
  ];

  return (
    <DocPage
      title="Become a Partner"
      subtitle="Join our partner program to offer courses on our platform."
      markdown={md}
      breadcrumbs={breadcrumbs}
    />
  );
}
