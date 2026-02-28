import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'flowbite/dist/flowbite.css';
import './index.css';
import Header from './Header.jsx';
import HeroFinder from './HeroFinder.jsx';
import UspSection from './UspSection.jsx';
import HowSection from './HowSection.jsx';
import TrustSection from './TrustSection.jsx';
import FaqSection from './FaqSection.jsx';
import CtaHeroFinderSection from './CtaHeroFinderSection.jsx';
import Footer from './Footer.jsx';
import CoursePage from './CoursePage.jsx';
import CoursesIndex from './pages/CoursesIndex.jsx';
import ResultsPage from './ResultsPage.jsx';
import SupportPage from './pages/Support.jsx';
import HowToSubmit from './pages/HowToSubmit.jsx';
import PrivacyPage from './pages/Privacy.jsx';
import TermsPage from './pages/Terms.jsx';
import Partners from './pages/Partners.jsx';
import BlogIndex from './pages/BlogIndex.jsx';
import BlogPost from './pages/BlogPost.jsx';
import Faq from './pages/Faq.jsx';
import CourseRequirements from './pages/CourseRequirements.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import SEO from './components/SEO.jsx';
import StructuredData from './components/StructuredData.jsx';
// Texas pages
import TexasIndex from './pages/texas/index.jsx';
import TexasPricing from './pages/texas/pricing.jsx';
import TexasFAQ from './pages/texas/faq.jsx';
import TexasHelpCenter from './pages/texas/helpcenter.jsx';
import TexasContactUs from './pages/texas/contactus.jsx';
import TexasTerms from './pages/texas/terms.jsx';
import CourtPage from './pages/texas/courts/CourtPage.jsx';
import CourtsIndex from './pages/texas/courts/CourtsIndex.jsx';

// #region agent log
// Logging initialization and error capture - silent fail if endpoint unavailable
if (typeof window !== 'undefined') {
  const logEndpoint = 'http://127.0.0.1:7242/ingest/d43cc9bd-40ea-434a-b828-df0c6f64d204';
  const safeLog = (data) => {
    fetch(logEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).catch(()=>{});
  };
  window.addEventListener('error', (e) => {
    safeLog({location:'main.jsx:error-handler',message:'JavaScript error caught',data:{message:e.message,filename:e.filename,lineno:e.lineno,error:e.error?.toString()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'});
    console.error('Runtime error:', e.message, e.filename, e.lineno);
  });
  window.addEventListener('unhandledrejection', (e) => {
    safeLog({location:'main.jsx:unhandled-rejection',message:'Unhandled promise rejection',data:{reason:e.reason?.toString()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'});
    console.error('Unhandled rejection:', e.reason);
  });
}
// #endregion

function Home() {
  return (
    <>
      <SEO 
        title="The modern way to finish your traffic course"
        description="State-approved traffic school and defensive driving built to be simple. Start on your phone, finish anywhere. Instant digital certificate available."
        keywords="traffic school, defensive driving, online course, traffic ticket, driver improvement, state approved"
        image="/assets/rrs (1200 x 630 px).png"
        url="/"
      />
      <StructuredData type="website" />
      <StructuredData type="organization" />
      <HeroFinder />
      <UspSection />
      <HowSection />
      <TrustSection />
      <FaqSection />
      <CtaHeroFinderSection />
    </>
  );
}

function App() {
  // Check if Texas routes are enabled via environment variable
  // Set VITE_TEXAS_ROUTES_ENABLED=true to enable Texas routes (e.g. QA build). See .env.example.
  // Defaults to false (disabled) if not set — prod keeps /texas off.
  const isTexasRoutesEnabled = import.meta.env.VITE_TEXAS_ROUTES_ENABLED === 'true';
  const location = useLocation();
  const isTexasRoute = isTexasRoutesEnabled && location.pathname.startsWith('/texas');

  return (
    <div className={`w-full overflow-x-hidden m-0 p-0${isTexasRoute ? ' texas-route' : ''}`}>
      <ScrollToTop />
      <Header />
      <Routes>
        {/* Main site routes */}
        <Route path="/courses" element={<CoursesIndex />} />
        <Route path="/courses/:slug" element={<CoursePage />} />
        <Route path="/courses/:slug/requirements" element={<CourseRequirements />} />
        <Route path="/find/:state/:courseType" element={<ResultsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/support/how-to-submit" element={<HowToSubmit />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/faq" element={<Faq />} />
        {/* Texas pages - only rendered if VITE_TEXAS_ROUTES_ENABLED=true */}
        {isTexasRoutesEnabled && (
          <>
            <Route path="/texas" element={<TexasIndex />} />
            <Route path="/texas/pricing" element={<TexasPricing />} />
            <Route path="/texas/faq" element={<TexasFAQ />} />
            <Route path="/texas/helpcenter" element={<TexasHelpCenter />} />
            <Route path="/texas/contactus" element={<TexasContactUs />} />
            <Route path="/texas/terms" element={<TexasTerms />} />
            <Route path="/texas/courts" element={<CourtsIndex />} />
            <Route path="/texas/courts/:slug" element={<CourtPage />} />
          </>
        )}
        {/* Home route - must be last */}
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
