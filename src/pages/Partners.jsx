import React from "react";
import md from "/blueprint/legal/partners.md?raw";
import DocPage from "../components/DocPage.jsx";
import SEO from "../components/SEO.jsx";

export default function PartnersPage() {
  const breadcrumbs = [
    { label: "Become a Partner", href: "/partners" }
  ];

  return (
    <>
      <SEO 
        title="Become a Partner"
        description="Join our partner program to offer traffic safety courses on our platform. Expand your reach and grow your business."
        keywords="partner program, traffic course partnership, business partnership, course provider"
        image="/assets/rrs (1200 x 630 px).png"
        url="/partners"
      />
      <DocPage
        title="Become a Partner"
        subtitle="Join our partner program to offer courses on our platform."
        markdown={md}
        breadcrumbs={breadcrumbs}
      />
    </>
  );
}
