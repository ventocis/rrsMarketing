// sref: hero-finder.v3
import React, { useState } from 'react';
import { Select, Button } from 'flowbite-react';
import states from './data/states.json';
import courses from './data/courses.json';
import finderMap from '../blueprint/data/finder-map.json';
import { useNavigate } from 'react-router-dom';

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
    <section className="bg-white border-b border-gray-200 py-20 lg:py-28" id="find-course">
      <div className="max-w-[65ch] mx-auto px-4 text-center">
        {/* sref: hero-title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">The modern way to finish your traffic course.</h1>
        <p className="text-gray-600 leading-relaxed text-lg md:text-xl mb-8">Approved where required, built to be simple. Start on your phone, finish on your laptop—pick up right where you left off.</p>
        <a href="#find-course" className="inline-block mb-8 text-blue-600 hover:text-blue-700">
          <Button size="lg" color="blue">Get started</Button>
        </a>
        <div className="max-w-xl mx-auto text-left shadow-md bg-white p-6 rounded-lg">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* sref: finder-form-title */}
            <h2 className="text-2xl md:text-3xl font-bold mb-8">Find the right course</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Select your state and reason. If there are multiple options, we’ll show you the choices.</p>
            <div>
              <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
              <Select id="state" value={selectedState} onChange={e => { setSelectedState(e.target.value); setSelectedCourse(''); setSelectedLanguage(''); }} required>
                <option value="">Select a state</option>
                {states.map(s => (
                  <option key={s.code} value={s.code}>{s.name}</option>
                ))}
              </Select>
            </div>
            <div>
              <label htmlFor="reason" className="block text-sm font-medium mb-1">Reason</label>
              <Select id="reason" value={selectedReason} onChange={e => { setSelectedReason(e.target.value); setSelectedCourse(''); setSelectedLanguage(''); }} required>
                <option value="">Select a reason</option>
                {reasons.map(r => (
                  <option key={r.key} value={r.key}>{r.label}</option>
                ))}
              </Select>
            </div>
            <div>
              <label htmlFor="course" className="block text-sm font-medium mb-1">Course (optional)</label>
              <Select id="course" value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)} disabled={!courseOptions.length}>
                <option value="">Best option for my state</option>
                {courseOptions.map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </Select>
            </div>
            <div>
              <label htmlFor="language" className="block text-sm font-medium mb-1">Language</label>
              <Select id="language" value={selectedLanguage} onChange={e => setSelectedLanguage(e.target.value)} disabled={!languageOptions.length}>
                <option value="">Any language</option>
                {languageOptions.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </Select>
            </div>
            <Button type="submit" color="blue" className="w-full">Find course</Button>
            <p className="text-xs text-gray-500 mt-2">Leave “Course” as ‘Best option’ and we’ll recommend the right one.</p>
            {emptyState && <div className="text-red-600 text-sm mt-2">No courses found for your selection.</div>}
          </form>
        </div>
      </div>
    </section>
  );
}
