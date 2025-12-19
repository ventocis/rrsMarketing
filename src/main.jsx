import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import 'flowbite/dist/flowbite.css';
import './index.css';
import TexasIndex from './pages/texas/index.jsx';
import TexasPricing from './pages/texas/pricing.jsx';
import TexasFAQ from './pages/texas/faq.jsx';
import TexasHelpCenter from './pages/texas/helpcenter.jsx';
import TexasContactUs from './pages/texas/contactus.jsx';

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

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-gray-900">Road Ready Safety</h1>
        <p className="mt-4 text-gray-600">State-approved traffic courses. Mobile-friendly. Instant proof.</p>
        <a href="/texas" className="text-blue-600 underline mt-4 inline-block">Go to Texas Page</a>
      </div>
    </div>
  );
};

function App() {
  // #region agent log
  React.useEffect(() => {
    const logEndpoint = 'http://127.0.0.1:7242/ingest/d43cc9bd-40ea-434a-b828-df0c6f64d204';
    fetch(logEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.jsx:App:mount',message:'App component mounted',data:{pathname:window.location.pathname},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  }, []);
  // #endregion
  
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/texas" element={<TexasIndex />} />
          <Route path="/texas/pricing" element={<TexasPricing />} />
          <Route path="/texas/faq" element={<TexasFAQ />} />
          <Route path="/texas/helpcenter" element={<TexasHelpCenter />} />
          <Route path="/texas/contactus" element={<TexasContactUs />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);