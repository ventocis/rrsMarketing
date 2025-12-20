import React, { useMemo, useEffect } from 'react';
import courses from '../data/courses.json';
import { stateNames } from '../utils/states.js';
import CourseResultCard from '../components/CourseResultCard.jsx';
import SEO from '../components/SEO.jsx';

export default function CoursesIndex() {
  // Set document title
  useEffect(() => {
    document.title = 'All Courses | Road Ready Safety';
  }, []);

  // Group courses by state and sort them
  const coursesByState = useMemo(() => {
    const grouped = {};
    
    // Group courses by state
    courses.forEach(course => {
      if (!grouped[course.state]) {
        grouped[course.state] = [];
      }
      grouped[course.state].push(course);
    });
    
    // Sort courses within each state (preserve recommended order if available, otherwise by name)
    Object.keys(grouped).forEach(stateCode => {
      grouped[stateCode].sort((a, b) => {
        // If there's a recommended order field, use it
        if (a.recommended_order !== undefined && b.recommended_order !== undefined) {
          return a.recommended_order - b.recommended_order;
        }
        // Otherwise sort by course name
        return a.course_name.localeCompare(b.course_name);
      });
    });
    
    // Convert to array and sort states alphabetically by full name
    return Object.entries(grouped)
      .map(([stateCode, stateCourses]) => ({
        stateCode,
        stateName: stateNames[stateCode] || stateCode,
        courses: stateCourses
      }))
      .sort((a, b) => a.stateName.localeCompare(b.stateName));
  }, []);

  return (
    <>
      <SEO 
        title="All Courses"
        description="Browse our complete catalog of state-approved traffic courses and defensive driving programs. Find the right course for your needs."
        keywords="traffic courses, defensive driving, state approved, online courses, traffic school"
        image="/assets/rrs (1200 x 630 px).png"
        url="/courses"
      />
      <main className="bg-gray-50 min-h-screen pb-12">
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All Courses</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Browse our complete catalog of state-approved traffic courses and defensive driving programs.
          </p>
        </div>
        
        {/* States and Courses */}
        <div className="space-y-16">
          {coursesByState.map(({ stateCode, stateName, courses: stateCourses }) => (
            <div key={stateCode} id={stateCode}>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">
                {stateName}
              </h2>
              
              {/* Course Grid */}
              <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
                {stateCourses.map(course => (
                  <CourseResultCard key={course.slug} course={course} />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State (defensive programming) */}
        {coursesByState.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">No courses available</h2>
            <p className="text-gray-600">Check back soon for new course offerings.</p>
          </div>
        )}
      </section>
    </main>
    </>
  );
}
