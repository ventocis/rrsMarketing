// sref: hero-finder.v3
import React, { useState } from 'react';
import { Select } from 'flowbite-react';
import states from './data/states.json';
import courses from './data/courses.json';
import finderMap from '../blueprint/data/finder-map.json';
import { useNavigate } from 'react-router-dom';
import Button from './components/Button.jsx';
import { stateNames } from './utils/states.js';

const reasons = [
  { key: 'court', label: 'Court / Ticket' },
  { key: 'insurance', label: 'Insurance Discount' },
  { key: 'license', label: 'Driver License' },
];

export default function HeroFinder() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [emptyState, setEmptyState] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const navigate = useNavigate ? useNavigate() : (url => window.location.assign(url));

  // Get course types for the selected reason
  const courseTypes = selectedReason ? finderMap[selectedReason] || [] : [];

  // Get courses for the selected state and reason
  const filteredCourses = courses.filter(c =>
    (!selectedState || c.state === selectedState) &&
    (!selectedReason || courseTypes.includes(c.course_type))
  );

  // Get unique course names for dropdown
  const courseOptions = Array.from(new Set(filteredCourses.map(c => c.course_name)));
  // Get unique languages for dropdown
  const languageOptions = Array.from(new Set(filteredCourses.map(c => c.language)));

  const handleSubmit = e => {
    e.preventDefault();
    setEmptyState(false);
    if (!selectedState || !selectedReason) return;

    // When Texas routes are enabled (QA), send Texas + Court/Ticket or Insurance to /texas
    const isTexasRoutesEnabled = import.meta.env.VITE_TEXAS_ROUTES_ENABLED === 'true';
    if (isTexasRoutesEnabled && selectedState === 'TX' && (selectedReason === 'court' || selectedReason === 'insurance')) {
      navigate('/texas');
      return;
    }

    // Determine course types to filter by
    let typesToUse = courseTypes;
    if (selectedCourse) {
      // If a specific course is selected, use its type
      const found = courses.find(c => c.course_name === selectedCourse && c.state === selectedState);
      typesToUse = found ? [found.course_type] : [];
    }

    // Filter by state, course_type, and language (if set)
    let results = courses.filter(c =>
      c.state === selectedState &&
      typesToUse.includes(c.course_type) &&
      (!selectedLanguage || c.language === selectedLanguage)
    );

    if (results.length === 1) {
      navigate(`/courses/${results[0].slug}`);
    } else if (results.length > 1) {
      const courseTypeSlug = typesToUse.length === 1 ? typesToUse[0] : 'multi';
      navigate(`/find/${selectedState}/${courseTypeSlug}?reason=${selectedReason}&lang=${selectedLanguage || 'any'}`);
    } else {
      setEmptyState(true);
    }
  };

  return (
    <section className="relative border-b border-[#e5e5e5] py-16 lg:py-24 overflow-hidden overflow-x-hidden scroll-mt-24" id="find-course" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#e5f6fe] opacity-50 to-white pointer-events-none"></div>
      <div className="relative max-w-[1152px] mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
          {/* Left column - Text and Form */}
          <div className="max-w-[65ch] text-center lg:text-left">
            {/* Main Heading */}
            <h1 className="mb-6 text-[40px] leading-[52px] font-extrabold text-[#1e2832] tracking-[-0.02em]">
              Dismiss your ticket. Lower your rates. Get it done fast.
            </h1>
            {/* Subtitle */}
            <p className="text-base leading-[22px] text-[#616d7b] mb-12">
              State-approved, mobile-friendly, and built to save your progress. Learn at your pace, pass the quizzes, and get your certificate without the hassle.
            </p>
            {/* Form Card - light grey bg, 12px radius, shadow */}
            <div className="max-w-xl mx-auto lg:mx-0 text-left bg-[#F9FAFB] border border-[#e5e5e5] p-6 rounded-[12px] mt-12" style={{ boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)' }}>
              <form className="grid grid-cols-1 lg:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                <div className="col-span-1 lg:col-span-2">
                  {/* Form Heading */}
                  <h2 className="text-xl leading-[30px] font-medium text-[#464646] mb-4">
                    Find the right course
                  </h2>
                  {/* Helper text */}
                  <p className="text-xs leading-4 text-[#616d7b] mb-4">
                    Select your state and reason. If there are multiple options, we'll show you the choices.
                  </p>
                </div>
                <div>
                  <label 
                    htmlFor="state" 
                    className="block text-sm font-medium mb-2 text-[#262626]"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                  >
                    State
                  </label>
                  <Select 
                    id="state" 
                    value={selectedState} 
                    onChange={e => { setSelectedState(e.target.value); setSelectedCourse(''); setSelectedLanguage(''); }} 
                    required
                    className="[&>select]:text-sm [&>select]:leading-5 [&>select]:py-3 [&>select]:px-4 [&>select]:min-h-[44px] [&>select]:w-full [&>select]:border [&>select]:border-[#e5e5e5] [&>select]:rounded-[8px] [&>select]:bg-white [&>select]:text-[#262626] [&>select]:focus:ring-2 [&>select]:focus:ring-[#fe915c] [&>select]:focus:border-[#fe915c] [&>select]:outline-none [&>select]:transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <option value="">Select a state</option>
                    {states.map(s => (
                      <option key={s.code} value={s.code}>{stateNames[s.code] || s.code}</option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label 
                    htmlFor="reason" 
                    className="block text-sm font-medium mb-2 text-[#262626]"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                  >
                    Reason
                  </label>
                  <Select 
                    id="reason" 
                    value={selectedReason} 
                    onChange={e => { setSelectedReason(e.target.value); setSelectedCourse(''); setSelectedLanguage(''); }} 
                    required
                    className="[&>select]:text-sm [&>select]:leading-5 [&>select]:py-3 [&>select]:px-4 [&>select]:min-h-[44px] [&>select]:w-full [&>select]:border [&>select]:border-[#e5e5e5] [&>select]:rounded-[8px] [&>select]:bg-white [&>select]:text-[#262626] [&>select]:focus:ring-2 [&>select]:focus:ring-[#fe915c] [&>select]:focus:border-[#fe915c] [&>select]:outline-none [&>select]:transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <option value="">Select a reason</option>
                    {reasons.map(r => (
                      <option key={r.key} value={r.key}>{r.label}</option>
                    ))}
                  </Select>
                </div>
                <div className={showAdvanced ? '' : 'hidden'}>
                  <label 
                    htmlFor="course" 
                    className="block text-sm font-medium mb-2 text-[#262626]"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                  >
                    Course (optional)
                  </label>
                  <Select 
                    id="course" 
                    value={selectedCourse} 
                    onChange={e => setSelectedCourse(e.target.value)} 
                    disabled={!courseOptions.length}
                    className="[&>select]:text-sm [&>select]:leading-5 [&>select]:py-3 [&>select]:px-4 [&>select]:min-h-[44px] [&>select]:w-full [&>select]:border [&>select]:border-[#e5e5e5] [&>select]:rounded-[8px] [&>select]:bg-white [&>select]:text-[#262626] [&>select]:focus:ring-2 [&>select]:focus:ring-[#fe915c] [&>select]:focus:border-[#fe915c] [&>select]:outline-none [&>select]:transition-colors [&>select]:disabled:bg-[#efefef] [&>select]:disabled:text-[#7c7c7c]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <option value="">Best option for my state</option>
                    {courseOptions.map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </Select>
                  <p 
                    className="text-xs leading-4 text-[#616d7b] mt-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Leave "Course" as 'Best option' and we'll recommend the right one.
                  </p>
                </div>
                <div className={showAdvanced ? '' : 'hidden'}>
                  <label 
                    htmlFor="language" 
                    className="block text-sm font-medium mb-2 text-[#262626]"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                  >
                    Language
                  </label>
                  <Select 
                    id="language" 
                    value={selectedLanguage} 
                    onChange={e => setSelectedLanguage(e.target.value)} 
                    disabled={!languageOptions.length}
                    className="[&>select]:text-sm [&>select]:leading-5 [&>select]:py-3 [&>select]:px-4 [&>select]:min-h-[44px] [&>select]:w-full [&>select]:border [&>select]:border-[#e5e5e5] [&>select]:rounded-[8px] [&>select]:bg-white [&>select]:text-[#262626] [&>select]:focus:ring-2 [&>select]:focus:ring-[#fe915c] [&>select]:focus:border-[#fe915c] [&>select]:outline-none [&>select]:transition-colors [&>select]:disabled:bg-[#efefef] [&>select]:disabled:text-[#7c7c7c]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <option value="">Any language</option>
                    {languageOptions.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </Select>
                </div>
                <div className="col-span-1 lg:col-span-2">
                  <Button 
                    type="submit" 
                    variant="custom" 
                    className="w-full mt-2 bg-[#0667D1] hover:bg-[#0556b3] text-white text-sm font-semibold py-3 px-4 rounded-[16px] min-h-[44px] flex items-center justify-center transition-colors"
                    style={{ 
                      fontFamily: "'Inter', sans-serif",
                      boxShadow: '0 20px 25px -5px rgba(17, 23, 34, 0.10), 0 8px 10px -6px rgba(17, 23, 34, 0.05)'
                    }}
                  >
                    Find course
                  </Button>
                  {emptyState && (
                    <div 
                      className="text-[#ef4444] text-sm mt-2"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      No courses found for your selection.
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
          
          {/* Right column - illustration only */}
          <div className="hidden lg:block">
            <div className="relative">
              <img 
                src="/assets/illustrations/product-explainer.svg" 
                alt="Modern traffic course interface showing mobile and desktop compatibility"
                className="h-64 md:h-80 lg:h-96 xl:h-[28rem] mx-auto lg:ml-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
