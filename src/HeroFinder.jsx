// sref: hero-finder.v3
import React, { useState } from 'react';
import { Select } from 'flowbite-react';
import states from './data/states.json';
import courses from './data/courses.json';
import finderMap from '../blueprint/data/finder-map.json';
import { useNavigate } from 'react-router-dom';
import Button from './components/Button.jsx';
import PopularStatesChips from './components/PopularStatesChips.jsx';
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

  const handleChipSelect = code => {
    setSelectedState(code);
    setSelectedCourse('');
    setSelectedLanguage('');
  };

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
    <section className="relative bg-white border-b border-gray-200 py-20 lg:py-28 overflow-hidden scroll-mt-24" id="find-course">
      {/* sref: hero-bg-gradient */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none" style={{background: 'linear-gradient(120deg, #e0e7ff 0%, #f0fdfa 100%)', opacity: 0.25, zIndex: 0}}></div>
      <div className="relative max-w-[65ch] mx-auto px-4 text-center z-10">
        {/* sref: hero-title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">The modern way to finish your traffic course.</h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">Approved where required, built to be simple. Start on your phone, finish on your laptop—pick up right where you left off.</p>
        <Button href="#find-course" variant="primary" size="lg" className="mb-8">
          Get started
        </Button>
        {/* sref: hero-scroll-cue */}
        <div className="flex justify-center mt-2" aria-hidden="true">
          <svg className="w-7 h-7 text-blue-400 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </div>
        <div className="max-w-xl mx-auto text-left shadow-md bg-white p-6 rounded-lg mt-12">
          <form className="grid grid-cols-1 lg:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <div className="col-span-1 lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Find the right course</h2>
              <p className="text-gray-500 text-sm mb-4">Select your state and reason. If there are multiple options, we’ll show you the choices.</p>
            </div>
            <div className="col-span-1 lg:col-span-2">
              <PopularStatesChips value={selectedState} onSelect={handleChipSelect} courseType={selectedCourse} />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
              <Select id="state" value={selectedState} onChange={e => { setSelectedState(e.target.value); setSelectedCourse(''); setSelectedLanguage(''); }} required className="rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm">
                <option value="">Select a state</option>
                {states.map(s => (
                  <option key={s.code} value={s.code}>{stateNames[s.code] || s.code}</option>
                ))}
              </Select>
            </div>
            <div>
              <label htmlFor="reason" className="block text-sm font-medium mb-1">Reason</label>
              <Select id="reason" value={selectedReason} onChange={e => { setSelectedReason(e.target.value); setSelectedCourse(''); setSelectedLanguage(''); }} required className="rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm">
                <option value="">Select a reason</option>
                {reasons.map(r => (
                  <option key={r.key} value={r.key}>{r.label}</option>
                ))}
              </Select>
            </div>
            <div className="col-span-1 lg:col-span-2">
              <button
                type="button"
                className="mt-4 text-sm text-gray-700 underline underline-offset-4"
                aria-expanded={showAdvanced}
                onClick={() => setShowAdvanced(v => !v)}
              >
                Advanced options
              </button>
              <div className="text-sm text-gray-500 mt-1">Course and language are optional. Use these to narrow your results.</div>
            </div>
            <div className={showAdvanced ? '' : 'hidden'}>
              <label htmlFor="course" className="block text-sm font-medium mb-1">Course (optional)</label>
              <Select id="course" value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)} disabled={!courseOptions.length} className="rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm">
                <option value="">Best option for my state</option>
                {courseOptions.map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </Select>
              <p className="text-gray-500 text-sm mt-1">Leave “Course” as ‘Best option’ and we’ll recommend the right one.</p>
            </div>
            <div className={showAdvanced ? '' : 'hidden'}>
              <label htmlFor="language" className="block text-sm font-medium mb-1">Language</label>
              <Select id="language" value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)} disabled={!languageOptions.length} className="rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm">
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
    </section>
  );
}
