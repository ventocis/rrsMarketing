import React from "react";
import md from "/blueprint/legal/support.md?raw";
import DocPage from "../components/DocPage.jsx";
import SEO from "../components/SEO.jsx";

export default function SupportPage() {
  const breadcrumbs = [
    { label: "Help Center", href: "/support" }
  ];

  return (
    <>
      <SEO 
        title="Help Center"
        description="Get help with your traffic safety course. Contact support for enrollment, certificates, and reporting assistance."
        keywords="help center, support, traffic course help, enrollment assistance"
        image="/assets/rrs (1200 x 630 px).png"
        url="/support"
      />
      <DocPage
        title="Help Center"
        subtitle="We're here to help you start, finish, and get credit for your course."
        markdown={md}
        showContactCard
        breadcrumbs={breadcrumbs}
      />
    </>
  );
}
