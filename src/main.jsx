import React from 'react';
import ReactDOM from 'react-dom/client';
import 'flowbite/dist/flowbite.css';
import './index.css';

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="container py-8">
        <h1 className="text-3xl font-bold text-gray-900">Road Ready Safety</h1>
        <p className="mt-4 text-gray-600">State-approved traffic courses. Mobile-friendly. Instant proof.</p>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);