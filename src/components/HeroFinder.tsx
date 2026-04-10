import { useState } from 'react';
import statesData from '../data/states.json';
import coursesData from '../data/courses.json';
import finderMap from '../data/finder-map.json';
import { stateNames } from '../utils/states';

interface Props {
  variant?: 'hero' | 'cta';
}

const reasons = [
  { key: 'court', label: 'Court / Ticket' },
  { key: 'insurance', label: 'Insurance Discount' },
  { key: 'license', label: 'Driver License' },
];

const courses = coursesData as Array<{
  slug: string;
  state: string;
  course_name: string;
  course_type: string;
  language: string;
  qa_link?: string;
  affiliate_link?: string;
}>;

const map = finderMap as Record<string, string[]>;

export default function HeroFinder({ variant = 'hero' }: Props) {
  const [selectedState, setSelectedState] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [emptyState, setEmptyState] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const isCta = variant === 'cta';

  const courseTypes: string[] = selectedReason ? map[selectedReason] || [] : [];

  const filteredCourses = courses.filter(c =>
    (!selectedState || c.state === selectedState) &&
    (!selectedReason || courseTypes.includes(c.course_type))
  );

  const courseOptions = Array.from(new Set(filteredCourses.map(c => c.course_name)));
  const languageOptions = Array.from(new Set(filteredCourses.map(c => c.language)));

  const selectClass = isCta
    ? 'text-sm leading-5 py-3 px-4 min-h-[44px] w-full border border-info-border rounded-[16px] bg-white text-text focus:ring-2 focus:ring-info-border focus:border-info-border outline-none transition-colors disabled:bg-surface-muted disabled:text-text-muted'
    : 'text-sm leading-5 py-3 px-4 min-h-[44px] w-full border border-border rounded-[8px] bg-white text-text focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors disabled:bg-surface-muted disabled:text-text-muted';

  const labelClass = `block text-sm font-medium mb-2 ${isCta ? 'text-white' : 'text-text'}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmptyState(false);
    if (!selectedState || !selectedReason) return;

    const isTexasEnabled = import.meta.env.VITE_TEXAS_ROUTES_ENABLED === 'true';
    if (isTexasEnabled && selectedState === 'TX' && (selectedReason === 'court' || selectedReason === 'insurance')) {
      window.location.assign('/texas');
      return;
    }

    let typesToUse = courseTypes;
    if (selectedCourse) {
      const found = courses.find(c => c.course_name === selectedCourse && c.state === selectedState);
      typesToUse = found ? [found.course_type] : [];
    }

    const results = courses.filter(c =>
      c.state === selectedState &&
      typesToUse.includes(c.course_type) &&
      (!selectedLanguage || c.language === selectedLanguage)
    );

    if (results.length === 1) {
      window.location.assign(`/courses/${results[0].slug}`);
    } else if (results.length > 1) {
      const courseTypeSlug = typesToUse.length === 1 ? typesToUse[0] : 'multi';
      window.location.assign(`/find/${selectedState}/${courseTypeSlug}?reason=${selectedReason}&lang=${selectedLanguage || 'any'}`);
    } else {
      setEmptyState(true);
    }
  };

  return (
    <div
      className={isCta
        ? 'bg-primary p-6 rounded-[12px]'
        : 'bg-surface-muted border border-border p-6 rounded-[12px]'}
      style={{ boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)' }}
    >
      <form className="grid grid-cols-1 lg:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <div className="col-span-1 lg:col-span-2">
          <h2 className={`text-xl leading-[30px] font-medium mb-4 ${isCta ? 'text-white' : 'text-text'}`}>
            Find the right course
          </h2>
          <p className={`text-xs leading-4 mb-4 ${isCta ? 'text-white/80' : 'text-text-body'}`}>
            Select your state and reason. If there are multiple options, we'll show you the choices.
          </p>
        </div>

        <div>
          <label htmlFor={`${variant}-state`} className={labelClass} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>State</label>
          <select
            id={`${variant}-state`}
            value={selectedState}
            onChange={e => { setSelectedState(e.target.value); setSelectedCourse(''); setSelectedLanguage(''); }}
            required
            className={selectClass}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <option value="">Select a state</option>
            {statesData.map(s => (
              <option key={s.code} value={s.code}>{stateNames[s.code] || s.code}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${variant}-reason`} className={labelClass} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Reason</label>
          <select
            id={`${variant}-reason`}
            value={selectedReason}
            onChange={e => { setSelectedReason(e.target.value); setSelectedCourse(''); setSelectedLanguage(''); }}
            required
            className={selectClass}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <option value="">Select a reason</option>
            {reasons.map(r => (
              <option key={r.key} value={r.key}>{r.label}</option>
            ))}
          </select>
        </div>

        {showAdvanced && (
          <>
            <div>
              <label htmlFor={`${variant}-course`} className={labelClass} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Course (optional)</label>
              <select
                id={`${variant}-course`}
                value={selectedCourse}
                onChange={e => setSelectedCourse(e.target.value)}
                disabled={!courseOptions.length}
                className={selectClass}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <option value="">Best option for my state</option>
                {courseOptions.map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
              <p className={`text-xs leading-4 mt-2 ${isCta ? 'text-white/80' : 'text-text-body'}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                Leave "Course" as 'Best option' and we'll recommend the right one.
              </p>
            </div>
            <div>
              <label htmlFor={`${variant}-language`} className={labelClass} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>Language</label>
              <select
                id={`${variant}-language`}
                value={selectedLanguage}
                onChange={e => setSelectedLanguage(e.target.value)}
                disabled={!languageOptions.length}
                className={selectClass}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <option value="">Any language</option>
                {languageOptions.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </>
        )}

        <div className="col-span-1 lg:col-span-2">
          <button
            type="submit"
            className={`w-full mt-2 text-sm font-semibold py-3 px-4 rounded-[16px] min-h-[44px] flex items-center justify-center transition-colors ${
              isCta
                ? 'bg-white hover:bg-gray-50 text-primary hover:text-primary-hover'
                : 'bg-primary hover:bg-primary-hover text-white'
            }`}
            style={{ fontFamily: "'Inter', sans-serif", boxShadow: '0 20px 25px -5px rgba(17,23,34,0.10), 0 8px 10px -6px rgba(17,23,34,0.05)' }}
          >
            Find course
          </button>
          {emptyState && (
            <div
              className={`text-sm mt-2 ${isCta ? 'text-white bg-red-500/20 border border-red-500/50 rounded-[8px] px-4 py-2' : 'text-error'}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              No courses found for your selection.
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
