// sref: cta-hero-finder-section.v1
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

export default function CtaHeroFinderSection() {
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
      navigate(`/find/${selectedState}/${courseTypeSlug}?reason=${selectedReason}&lang=${selectedLanguage || 'any'}`);
    } else {
      setEmptyState(true);
    }
  };

  return (
    <section className="bg-white py-16 lg:py-24 border-b border-[#e5e5e5]">
      <div className="max-w-[1152px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dark blue card with blur effects */}
        <div className="relative bg-[#03449e] rounded-[24px] p-8 lg:p-16 overflow-hidden">
          {/* Blue blur background effects */}
          <div className="absolute inset-0 opacity-10 pointer-events-none select-none z-0">
            <div className="absolute bg-[#46a2f2] blur-[32px] filter right-[-192px] rounded-full w-[384px] h-[384px] top-[-192px]" />
            <div className="absolute bg-[#46a2f2] blur-[32px] filter bottom-[-128px] left-[-128px] rounded-full w-[256px] h-[256px]" />
          </div>
          
          {/* Content */}
          <div className="relative z-10 flex flex-col gap-6 items-center max-w-[768px] mx-auto">
            {/* Heading */}
            <h2 className="text-[28px] lg:text-[36px] font-bold text-center text-white tracking-[-0.02em] lg:tracking-[-0.9px] leading-[150%] lg:leading-[40px]">
              Ready to Dismiss Your Ticket?
            </h2>
            
            {/* Subtitle */}
            <p className="text-base text-center text-[#b9e2fe] leading-6 max-w-[672px]">
              Join thousands of Texas drivers who have successfully completed their defensive driving course with Road Ready Safety. Start today and get your certificate instantly.
            </p>
            
            {/* Course Finder Form Card */}
            <div className="w-full max-w-xl mt-4">
              <div className="bg-[#0667D1] p-6 rounded-[12px]" style={{ boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)' }}>
                <form className="grid grid-cols-1 lg:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                  <div className="col-span-1 lg:col-span-2">
                    {/* Form Heading */}
                    <h3 className="text-xl leading-[30px] font-medium text-white mb-4">
                      Find the right course
                    </h3>
                    {/* Helper text */}
                    <p className="text-xs leading-4 text-white/80 mb-4">
                      Select your state and reason. If there are multiple options, we'll show you the choices.
                    </p>
                  </div>
                  <div>
                    <label 
                      htmlFor="cta-state" 
                      className="block text-sm font-medium mb-2 text-white"
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                    >
                      State
                    </label>
                    <Select 
                      id="cta-state" 
                      value={selectedState} 
                      onChange={e => { setSelectedState(e.target.value); setSelectedCourse(''); setSelectedLanguage(''); }} 
                      required
                      className="[&>select]:text-sm [&>select]:leading-5 [&>select]:py-3 [&>select]:px-4 [&>select]:min-h-[44px] [&>select]:w-full [&>select]:border [&>select]:border-[#7cc3f9] [&>select]:rounded-[16px] [&>select]:bg-white [&>select]:text-[#262626] [&>select]:focus:ring-2 [&>select]:focus:ring-[#7cc3f9] [&>select]:focus:border-[#7cc3f9] [&>select]:outline-none [&>select]:transition-colors"
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
                      htmlFor="cta-reason" 
                      className="block text-sm font-medium mb-2 text-white"
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                    >
                      Reason
                    </label>
                    <Select 
                      id="cta-reason" 
                      value={selectedReason} 
                      onChange={e => { setSelectedReason(e.target.value); setSelectedCourse(''); setSelectedLanguage(''); }} 
                      required
                      className="[&>select]:text-sm [&>select]:leading-5 [&>select]:py-3 [&>select]:px-4 [&>select]:min-h-[44px] [&>select]:w-full [&>select]:border [&>select]:border-[#7cc3f9] [&>select]:rounded-[16px] [&>select]:bg-white [&>select]:text-[#262626] [&>select]:focus:ring-2 [&>select]:focus:ring-[#7cc3f9] [&>select]:focus:border-[#7cc3f9] [&>select]:outline-none [&>select]:transition-colors"
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
                      htmlFor="cta-course" 
                      className="block text-sm font-medium mb-2 text-white"
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                    >
                      Course (optional)
                    </label>
                    <Select 
                      id="cta-course" 
                      value={selectedCourse} 
                      onChange={e => setSelectedCourse(e.target.value)} 
                      disabled={!courseOptions.length}
                      className="[&>select]:text-sm [&>select]:leading-5 [&>select]:py-3 [&>select]:px-4 [&>select]:min-h-[44px] [&>select]:w-full [&>select]:border [&>select]:border-[#7cc3f9] [&>select]:rounded-[16px] [&>select]:bg-white [&>select]:text-[#262626] [&>select]:focus:ring-2 [&>select]:focus:ring-[#7cc3f9] [&>select]:focus:border-[#7cc3f9] [&>select]:outline-none [&>select]:transition-colors [&>select]:disabled:bg-[#efefef] [&>select]:disabled:text-[#7c7c7c] [&>select]:disabled:border-[#e5e5e5]"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <option value="">Best option for my state</option>
                      {courseOptions.map(name => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </Select>
                    <p 
                      className="text-xs leading-4 text-white/80 mt-2"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Leave "Course" as 'Best option' and we'll recommend the right one.
                    </p>
                  </div>
                  <div className={showAdvanced ? '' : 'hidden'}>
                    <label 
                      htmlFor="cta-language" 
                      className="block text-sm font-medium mb-2 text-white"
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
                    >
                      Language
                    </label>
                    <Select 
                      id="cta-language" 
                      value={selectedLanguage} 
                      onChange={e => setSelectedLanguage(e.target.value)} 
                      disabled={!languageOptions.length}
                      className="[&>select]:text-sm [&>select]:leading-5 [&>select]:py-3 [&>select]:px-4 [&>select]:min-h-[44px] [&>select]:w-full [&>select]:border [&>select]:border-[#7cc3f9] [&>select]:rounded-[16px] [&>select]:bg-white [&>select]:text-[#262626] [&>select]:focus:ring-2 [&>select]:focus:ring-[#7cc3f9] [&>select]:focus:border-[#7cc3f9] [&>select]:outline-none [&>select]:transition-colors [&>select]:disabled:bg-[#efefef] [&>select]:disabled:text-[#7c7c7c] [&>select]:disabled:border-[#e5e5e5]"
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
                      className="w-full mt-2 bg-white hover:bg-gray-50 text-[#0667D1] hover:text-[#0556b3] text-sm font-semibold py-3 px-4 rounded-[16px] min-h-[44px] flex items-center justify-center transition-colors"
                      style={{ 
                        fontFamily: "'Inter', sans-serif",
                        boxShadow: '0 20px 25px -5px rgba(17, 23, 34, 0.10), 0 8px 10px -6px rgba(17, 23, 34, 0.05)'
                      }}
                    >
                      Find course
                    </Button>
                    {emptyState && (
                      <div 
                        className="text-white bg-red-500/20 border border-red-500/50 rounded-[8px] px-4 py-2 text-sm mt-2"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                      >
                        No courses found for your selection.
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

