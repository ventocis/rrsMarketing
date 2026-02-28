import React, { useEffect } from "react";
import SEO from "../components/SEO.jsx";
import { CONTACT_US_URL } from "../config/urls.js";

export default function SupportPage() {
  useEffect(() => {
    window.location.replace(CONTACT_US_URL);
  }, []);

  return (
    <>
      <SEO
        title="Help Center | Road Ready Safety"
        description="Get help with your traffic safety course. Contact support for enrollment, certificates, and reporting assistance."
        url="/support"
      />
      <div className="min-h-[40vh] flex items-center justify-center">
        <p className="text-[#616d7b]">
          Redirecting to support…
        </p>
      </div>
    </>
  );
}
