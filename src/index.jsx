import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./main.jsx";

// GA4 affiliate link click tracking (main site only; app.roadreadysafety.com is separate)
function AffiliateClickTracker() {
  useEffect(() => {
    const handler = (e) => {
      const link = e.target.closest('a[data-affiliate="true"]');
      if (!link) return;
      if (typeof gtag === 'undefined') return;
      gtag('event', 'affiliate_click', {
        partner_name: link.dataset.partner,
        destination_state: link.dataset.state,
        course_type: link.dataset.course,
        destination_url: link.href,
        page_location: window.location.pathname
      });
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);
  return null;
}

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <BrowserRouter>
      <AffiliateClickTracker />
      <App />
    </BrowserRouter>
  </HelmetProvider>
);
