import React from "react";
import md from "/blueprint/legal/how-to-submit.md?raw";
import DocPage from "../components/DocPage.jsx";

export default function HowToSubmit() {
  return (
    <DocPage
      title="How to Submit Your Certificate"
      subtitle="Learn when and how to submit your course completion certificate"
      markdown={md}
      showContactCard={true}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Help Center", href: "/support" },
        { label: "How to Submit" }
      ]}
    />
  );
}
