import React from 'react';
import { Select } from 'flowbite-react';
import states from '../data/states.json';

export default function FiltersBar({
  state, courseType, language, sort, languageOptions, onChange
}) {
  return (
    <form className="flex flex-col md:flex-row gap-4 items-end mb-8" onSubmit={e => e.preventDefault()}>
      <div className="flex-1">
        <label htmlFor="state-select" className="block font-medium mb-1">State</label>
        <Select
          id="state-select"
          value={state}
          onChange={e => onChange({ state: e.target.value })}
          className="w-full"
        >
          {states.map(s => (
            <option key={s.code} value={s.code}>{s.name}</option>
          ))}
        </Select>
      </div>
      <div className="flex-1">
        <label htmlFor="language-select" className="block font-medium mb-1">Language</label>
        <Select
          id="language-select"
          value={language}
          onChange={e => onChange({ language: e.target.value })}
          className="w-full"
        >
          <option value="any">Any</option>
          {languageOptions.map(l => (
            <option key={l} value={l}>{l}</option>
          ))}
        </Select>
      </div>
      <div className="flex-1">
        <label htmlFor="sort-select" className="block font-medium mb-1">Sort</label>
        <Select
          id="sort-select"
          value={sort}
          onChange={e => onChange({ sort: e.target.value })}
          className="w-full"
        >
          <option value="recommended">Recommended</option>
          <option value="price-low">Price (low)</option>
          <option value="duration-short">Duration (short)</option>
        </Select>
      </div>
    </form>
  );
}
