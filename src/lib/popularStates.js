// Returns an array of state codes (e.g., ['FL','TX',...])
export function getPopularStates({ courses, states, courseType, limit = 8 }) {
  if (!Array.isArray(courses) || !Array.isArray(states)) return [];
  let filtered = courses;
  if (courseType) {
    filtered = courses.filter(c => c.course_type === courseType);
  }
  const counts = {};
  filtered.forEach(c => {
    if (c.state) counts[c.state] = (counts[c.state] || 0) + 1;
  });
  let sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([code]) => code);
  // Only include codes present in states.json
  const validCodes = new Set(states.map(s => s.code));
  sorted = sorted.filter(code => validCodes.has(code));
  if (sorted.length < limit) {
    const fallback = ['TX','FL','CA','NY','VA','MI','GA','PA'].filter(code => validCodes.has(code));
    sorted = Array.from(new Set([...sorted, ...fallback]));
  }
  return sorted.slice(0, limit);
}
