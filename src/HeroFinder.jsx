// sref: hero-finder.v1
import React from 'react';
import { Card, Button } from 'flowbite-react';

const HERO = {
  h1: "The modern way to finish your traffic course.",
  sub: "Approved where required, built to be simple. Start on your phone, finish on your laptop—pick up right where you left off.",
  cta: "Get started",
  cta_anchor: "#find-course"
};

const FINDER = {
  heading: "Find the right course",
  sub: "Select your state and reason. If there are multiple options, we’ll show you the choices.",
  label_state: "State",
  label_reason: "Reason",
  label_course: "Course (optional)",
  label_language: "Language",
  any_language: "Any language",
  option_best: "Best option for my state",
  reasons: {
    court: "Court / Ticket",
    insurance: "Insurance Discount",
    license: "Driver License"
  },
  submit: "Find course",
  helper: "Leave “Course” as ‘Best option’ and we’ll recommend the right one.",
  comingSoon: "We’re adding courses for this state. Check back soon."
};

const STATES = [
  { code: "FL", name: "Florida" },
  { code: "TX", name: "Texas" },
  { code: "VA", name: "Virginia" },
  { code: "NY", name: "New York" },
  { code: "IL", name: "Illinois" },
  { code: "MI", name: "Michigan" },
  { code: "MO", name: "Missouri" },
  { code: "TN", name: "Tennessee" }
];

export default function HeroFinder() {
  return (
    <section className="bg-gray-50 border-b border-gray-200 pt-8 pb-12" id="find-course">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">{HERO.h1}</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">{HERO.sub}</p>
        <a href={HERO.cta_anchor} className="inline-block mb-8">
          <Button size="lg">{HERO.cta}</Button>
        </a>
        <Card className="max-w-xl mx-auto text-left shadow-md">
          <form className="space-y-4">
            <h2 className="text-xl font-semibold mb-2">{FINDER.heading}</h2>
            <p className="text-gray-600 mb-4">{FINDER.sub}</p>
            <div>
              <label htmlFor="state" className="block text-sm font-medium mb-1">{FINDER.label_state}</label>
              <select id="state" name="state" className="w-full border rounded px-3 py-2">
                <option value="">Select a state</option>
                {STATES.map(s => (
                  <option key={s.code} value={s.code}>{s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="reason" className="block text-sm font-medium mb-1">{FINDER.label_reason}</label>
              <select id="reason" name="reason" className="w-full border rounded px-3 py-2">
                <option value="">Select a reason</option>
                {Object.entries(FINDER.reasons).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
            <Button type="submit" className="w-full">{FINDER.submit}</Button>
            <p className="text-xs text-gray-500 mt-2">{FINDER.helper}</p>
          </form>
        </Card>
      </div>
    </section>
  );
}
