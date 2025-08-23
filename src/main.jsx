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
import { Routes, Route } from 'react-router-dom';

function Home() {
  return (
    <>
      <HeroFinder />
      <UspSection />
      <HowSection />
      <TrustSection />
      <FaqSection />
    </>
  );
}

function App() {
  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <Routes>
        <Route path="/courses" element={<CoursesIndex />} />
        <Route path="/courses/:slug" element={<CoursePage />} />
        <Route path="/find/:state/:courseType" element={<ResultsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/support/how-to-submit" element={<HowToSubmit />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;