import 'flowbite/dist/flowbite.css';
import './index.css';
import Header from './Header.jsx';
import HeroFinder from './HeroFinder.jsx';
import UspSection from './UspSection.jsx';
import HowSection from './HowSection.jsx';
import TrustSection from './TrustSection.jsx';
import FaqSection from './FaqSection.jsx';
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
import TexasIndex from './pages/texas/index.jsx';
import TexasPricing from './pages/texas/pricing.jsx';
import { Routes, Route, useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import SEO from './components/SEO.jsx';
import StructuredData from './components/StructuredData.jsx';

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
    </>
  );
}

function App() {
  const location = useLocation();
  const isTexasRoute = location.pathname.startsWith('/texas');
  
  return (
    <div className="w-full overflow-x-hidden">
      <ScrollToTop />
      {!isTexasRoute && <Header />}
      <Routes>
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
        <Route path="/texas" element={<TexasIndex />} />
        <Route path="/texas/pricing" element={<TexasPricing />} />
        <Route path="/" element={<Home />} />
      </Routes>
      {!isTexasRoute && <Footer />}
    </div>
  );
}

export default App;