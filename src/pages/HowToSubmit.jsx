import React, { useState } from "react";
import md from "/blueprint/legal/how-to-submit.md?raw";
import DocPage from "../components/DocPage.jsx";
import courses from "../data/courses.json";
import SEO from "../components/SEO.jsx";

// Component for state-specific course links
function StateCourseLinks() {
  console.log('StateCourseLinks: Component is rendering');
  console.log('StateCourseLinks: courses data:', courses);

  const [expandedStates, setExpandedStates] = useState(new Set());

  // State name mapping for full names
  const stateNames = {
    'FL': 'Florida',
    'IL': 'Illinois', 
    'LA': 'Louisiana',
    'MI': 'Michigan',
    'MO': 'Missouri',
    'NY': 'New York',
    'TN': 'Tennessee',
    'TX': 'Texas',
    'VA': 'Virginia'
  };

  // Group courses by state
  const coursesByState = courses.reduce((acc, course) => {
    if (!acc[course.state]) {
      acc[course.state] = [];
    }
    acc[course.state].push(course);
    return acc;
  }, {});

  console.log('StateCourseLinks: coursesByState:', coursesByState);

  const toggleState = (state) => {
    const newExpanded = new Set(expandedStates);
    if (newExpanded.has(state)) {
      newExpanded.delete(state);
    } else {
      newExpanded.add(state);
    }
    setExpandedStates(newExpanded);
  };

  return (
    <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        Course Requirements by State
      </h3>
      <p className="text-xs text-gray-600 mb-3">
        Click your state for detailed requirements:
      </p>
      
      <div className="space-y-1">
        {Object.entries(coursesByState).map(([stateCode, stateCourses]) => {
          const stateName = stateNames[stateCode] || stateCode;
          return (
            <div key={stateCode} className="border border-gray-200 rounded">
              <button
                onClick={() => toggleState(stateCode)}
                className="w-full px-3 py-2 text-left bg-gray-50 hover:bg-gray-100 rounded flex items-center justify-between transition-colors text-xs"
              >
                <span className="font-medium text-gray-900">{stateName} ({stateCourses.length})</span>
                <svg
                  className={`h-3 w-3 text-gray-500 transition-transform ${
                    expandedStates.has(stateCode) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedStates.has(stateCode) && (
                <div className="px-3 pb-2 bg-white border-t border-gray-200">
                  <div className="pt-2 space-y-1">
                    {stateCourses.map((course) => (
                      <a
                        key={course.slug}
                        href={`/courses/${course.slug}/requirements`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 hover:text-blue-800 hover:underline text-xs leading-tight"
                      >
                        {course.course_name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function HowToSubmit() {
  return (
    <>
      <SEO 
        title="How to Submit Your Certificate"
        description="Learn when and how to submit your traffic course completion certificate to the court or DMV. Step-by-step instructions for each state."
        keywords="certificate submission, traffic course certificate, DMV submission, court submission"
        image="/assets/rrs (1200 x 630 px).png"
        url="/support/how-to-submit"
      />
      <DocPage
        title="How to Submit Your Certificate"
        subtitle="Learn when and how to submit your course completion certificate"
        markdown={md}
        showContactCard={true}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Help Center", href: "/support" },
          { label: "How to Submit" }
        ]}
        customComponents={{
          STATE_COURSE_LINKS: <StateCourseLinks />
        }}
      />
    </>
  );
}
