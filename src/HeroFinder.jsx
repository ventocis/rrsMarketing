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
      navigate(`/find/${selectedState}/${courseTypeSlug}?lang=${selectedLanguage || 'any'}`);
    } else {
      setEmptyState(true);
    }
  };

  return (
    <section className="relative bg-white border-b border-gray-200 py-20 lg:py-28 overflow-hidden overflow-x-hidden scroll-mt-24" id="find-course">
      {/* sref: hero-bg-gradient */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none" style={{background: 'linear-gradient(120deg, #e0e7ff 0%, #f0fdfa 100%)', opacity: 0.25, zIndex: 0}}></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-12">
          {/* Left column - existing content unchanged */}
          <div className="max-w-[65ch] text-center lg:text-left">
            {/* sref: hero-title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">The modern way to finish your traffic course.</h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">Approved where required, built to be simple. Start on your phone, finish on your laptop—pick up right where you left off.</p>
            <div className="max-w-xl mx-auto lg:mx-0 text-left shadow-md bg-white p-6 rounded-lg mt-12">
              <form className="grid grid-cols-1 lg:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                <div className="col-span-1 lg:col-span-2">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Find the right course</h2>
                  <p className="text-gray-500 text-sm mb-4">Select your state and reason. If there are multiple options, we'll show you the choices.</p>
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
                  <Select 
                    id="state" 
                    value={selectedState} 
                    onChange={e => { setSelectedState(e.target.value); setSelectedCourse(''); setSelectedLanguage(''); }} 
                    required
                    className="text-sm md:text-base [&>select]:text-sm [&>select]:md:text-base [&>select]:py-2 [&>select]:md:py-2.5 [&>select]:px-3 [&>select]:md:px-4 [&>select]:min-h-[44px] [&>select]:md:min-h-[44px] [&>select]:w-full [&>select]:border-gray-300 [&>select]:rounded-lg [&>select]:focus:ring-2 [&>select]:focus:ring-blue-500 [&>select]:focus:border-blue-500"
                  >
                    <option value="">Select a state</option>
                    {states.map(s => (
                      <option key={s.code} value={s.code}>{stateNames[s.code] || s.code}</option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label htmlFor="reason" className="block text-sm font-medium mb-1">Reason</label>
                  <Select 
                    id="reason" 
                    value={selectedReason} 
                    onChange={e => { setSelectedReason(e.target.value); setSelectedCourse(''); setSelectedLanguage(''); }} 
                    required
                    className="text-sm md:text-base [&>select]:text-sm [&>select]:md:text-base [&>select]:py-2 [&>select]:md:py-2.5 [&>select]:px-3 [&>select]:md:px-4 [&>select]:min-h-[44px] [&>select]:md:min-h-[44px] [&>select]:w-full [&>select]:border-gray-300 [&>select]:rounded-lg [&>select]:focus:ring-2 [&>select]:focus:ring-blue-500 [&>select]:focus:border-blue-500"
                  >
                    <option value="">Select a reason</option>
                    {reasons.map(r => (
                      <option key={r.key} value={r.key}>{r.label}</option>
                    ))}
                  </Select>
                </div>
                <div className={showAdvanced ? '' : 'hidden'}>
                  <label htmlFor="course" className="block text-sm font-medium mb-1">Course (optional)</label>
                  <Select 
                    id="course" 
                    value={selectedCourse} 
                    onChange={e => setSelectedCourse(e.target.value)} 
                    disabled={!courseOptions.length}
                    className="text-sm md:text-base [&>select]:text-sm [&>select]:md:text-base [&>select]:py-2 [&>select]:md:py-2.5 [&>select]:px-3 [&>select]:md:px-4 [&>select]:min-h-[44px] [&>select]:md:min-h-[44px] [&>select]:w-full [&>select]:border-gray-300 [&>select]:rounded-lg [&>select]:focus:ring-2 [&>select]:focus:ring-blue-500 [&>select]:focus:border-blue-500"
                  >
                    <option value="">Best option for my state</option>
                    {courseOptions.map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </Select>
                  <p className="text-gray-500 text-sm mt-1">Leave "Course" as 'Best option' and we'll recommend the right one.</p>
                </div>
                <div className={showAdvanced ? '' : 'hidden'}>
                  <label htmlFor="language" className="block text-sm font-medium mb-1">Language</label>
                  <Select 
                    id="language" 
                    value={selectedLanguage} 
                    onChange={e => setSelectedLanguage(e.target.value)} 
                    disabled={!languageOptions.length}
                    className="text-sm md:text-base [&>select]:text-sm [&>select]:md:text-base [&>select]:py-2 [&>select]:md:py-2.5 [&>select]:px-3 [&>select]:md:px-4 [&>select]:min-h-[44px] [&>select]:md:min-h-[44px] [&>select]:w-full [&>select]:border-gray-300 [&>select]:rounded-lg [&>select]:focus:ring-2 [&>select]:focus:ring-blue-500 [&>select]:focus:border-blue-500"
                  >
                    <option value="">Any language</option>
                    {languageOptions.map(lang => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </Select>
                </div>
                <div className="col-span-1 lg:col-span-2">
                  <Button type="submit" variant="primary" size="md" className="w-full mt-2">
                    Find course
                  </Button>
                  {emptyState && <div className="text-red-600 text-sm mt-2">No courses found for your selection.</div>}
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
                className="h-48 md:h-64 lg:h-72 mx-auto lg:ml-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
