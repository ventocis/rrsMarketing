// sref: hero-finder.v2
import React, { useState } from 'react';
import { Select, Button } from 'flowbite-react';
import states from './data/states.json';
import courses from './data/courses.json';
import { useNavigate } from 'react-router-dom';

export default function HeroFinder() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCourseType, setSelectedCourseType] = useState('');
  const [emptyState, setEmptyState] = useState(false);
  const navigate = useNavigate ? useNavigate() : (url => window.location.assign(url));

  // Get unique course types for dropdown
  const courseTypes = Array.from(new Set(courses.map(c => c.course_type)));

  const handleSubmit = e => {
    e.preventDefault();
    setEmptyState(false);
    if (!selectedState || !selectedCourseType) return;
    const filtered = courses.filter(c => c.state === selectedState && c.course_type === selectedCourseType);
    if (filtered.length === 1) {
      navigate(`/courses/${filtered[0].slug}`);
    } else if (filtered.length > 1) {
      navigate(`/find/${selectedState}/${selectedCourseType}`);
    } else {
      setEmptyState(true);
    }
  };

  return (
    <section className="bg-gray-50 border-b border-gray-200 pt-8 pb-12" id="find-course">
      <div className="max-w-3xl mx-auto px-4 text-center">
        {/* sref: hero-title */}
        <h1 className="text-3xl md:text-5xl font-bold mb-4">The modern way to finish your traffic course.</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">Approved where required, built to be simple. Start on your phone, finish on your laptop—pick up right where you left off.</p>
        <a href="#find-course" className="inline-block mb-8">
          <Button size="lg">Get started</Button>
        </a>
        <div className="max-w-xl mx-auto text-left shadow-md bg-white p-6 rounded-lg">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* sref: finder-form-title */}
            <h2 className="text-xl font-semibold mb-2">Find the right course</h2>
            <p className="text-gray-600 mb-4">Select your state and course type. If there are multiple options, we’ll show you the choices.</p>
            <div>
              <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
              <Select id="state" value={selectedState} onChange={e => setSelectedState(e.target.value)} required>
                <option value="">Select a state</option>
                {states.map(s => (
                  <option key={s.code} value={s.code}>{s.name}</option>
                ))}
              </Select>
            </div>
            <div>
              <label htmlFor="courseType" className="block text-sm font-medium mb-1">Course Type</label>
              <Select id="courseType" value={selectedCourseType} onChange={e => setSelectedCourseType(e.target.value)} required>
                <option value="">Select a course type</option>
                {courseTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Select>
            </div>
            <Button type="submit" className="w-full">Find course</Button>
            <p className="text-xs text-gray-500 mt-2">Leave “Course Type” as ‘Best option’ and we’ll recommend the right one.</p>
            {emptyState && <div className="text-red-600 text-sm mt-2">No courses found for your selection.</div>}
          </form>
        </div>
      </div>
    </section>
  );
}
