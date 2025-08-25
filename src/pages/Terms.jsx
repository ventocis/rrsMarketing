import React from "react";
import md from "/blueprint/legal/terms.md?raw";
import DocPage from "../components/DocPage.jsx";
import SEO from "../components/SEO.jsx";

export default function TermsPage() {
  const breadcrumbs = [
    { label: "Terms of Service", href: "/terms" }
  ];

  return (
    <>
      <SEO 
        title="Terms of Service"
        description="Read the terms and conditions for using Road Ready Safety's traffic safety courses and services."
        keywords="terms of service, terms and conditions, traffic course terms"
        image="/assets/rrs (1200 x 630 px).png"
        url="/terms"
      />
      <DocPage
        title="Terms of Service"
        subtitle="By using this site, you agree to these terms."
        markdown={md}
        breadcrumbs={breadcrumbs}
      />
    </>
  );
}
