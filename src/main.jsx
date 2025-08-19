import 'flowbite/dist/flowbite.css';
import './index.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Home() {
  return <div>Home Page</div>;
}
function Find() {
  return <div>Find Results Page</div>;
}
function Course() {
  return <div>Course Page</div>;
}
function Support() {
  return <div>Support Page</div>;
}
function Privacy() {
  return <div>Privacy Policy Page</div>;
}
function Terms() {
  return <div>Terms of Service Page</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find/:state/:courseType" element={<Find />} />
        <Route path="/courses/:slug" element={<Course />} />
        <Route path="/support" element={<Support />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Routes>
    </BrowserRouter>
  );
}