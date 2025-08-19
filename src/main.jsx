import 'flowbite/dist/flowbite.css';
import './index.css';
import Header from './Header.jsx';
import HeroFinder from './HeroFinder.jsx';
import UspSection from './UspSection.jsx';
import HowSection from './HowSection.jsx';
import TrustSection from './TrustSection.jsx';
import FaqSection from './FaqSection.jsx';
import Footer from './Footer.jsx';

function App() {
  return (
    <>
      <Header />
      <HeroFinder />
      <UspSection />
      <HowSection />
      <TrustSection />
      <FaqSection />
      <Footer />
    </>
  );
}

export default App;