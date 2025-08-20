import React from "react";
import md from "/blueprint/legal/terms.md?raw";
import DocPage from "../components/DocPage.jsx";

export default function TermsPage() {
  return (
    <DocPage
      title="Terms of Service"
      subtitle="The rules for using our site and services."
      markdown={md}
    />
  );
}
