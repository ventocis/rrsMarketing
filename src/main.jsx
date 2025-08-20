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
import ResultsPage from './ResultsPage.jsx';
import SupportPage from './SupportPage.jsx';
import PrivacyPage from './PrivacyPage.jsx';
import TermsPage from './TermsPage.jsx';
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
    <>
      <Header />
      <Routes>
        <Route path="/courses/:slug" element={<CoursePage />} />
        <Route path="/find/:state/:courseType" element={<ResultsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;