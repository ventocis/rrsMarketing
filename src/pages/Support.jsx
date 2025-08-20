import React from "react";
import md from "/blueprint/legal/support.md?raw";
import DocPage from "../components/DocPage.jsx";

export default function SupportPage() {
  return (
    <DocPage
      title="Help Center"
      subtitle="We’re here to help you start, finish, and get credit for your course."
      markdown={md}
      showContactCard
    />
  );
}
