// Import all state requirement files statically
import floridaData from '../../blueprint/copy/requirements/florida.json';
import texasData from '../../blueprint/copy/requirements/texas.json';
import newYorkData from '../../blueprint/copy/requirements/new_york.json';
import virginiaData from '../../blueprint/copy/requirements/virginia.json';
import tennesseeData from '../../blueprint/copy/requirements/tennessee.json';
import missouriData from '../../blueprint/copy/requirements/missouri.json';
import michiganData from '../../blueprint/copy/requirements/michigan.json';
import louisianaData from '../../blueprint/copy/requirements/louisiana.json';
import illinoisData from '../../blueprint/copy/requirements/illinois.json';

/**
 * Load state-specific course requirements from JSON files
 * @param {string} stateCode - Two-letter state code (e.g., 'FL', 'TX')
 * @param {string} courseType - Course type identifier (e.g., 'BDI', 'TLSAE', 'Defensive Driving')
 * @returns {Object|null} - State requirements object or null if not found
 */
export function getStateRequirements(stateCode, courseType) {
  if (!stateCode || !courseType) {
    return null;
  }

  try {
    // Map state codes to data objects
    const stateDataMap = {
      'FL': floridaData,
      'TX': texasData, 
      'NY': newYorkData,
      'VA': virginiaData,
      'TN': tennesseeData,
      'MO': missouriData,
      'MI': michiganData,
      'LA': louisianaData,
      'IL': illinoisData
    };

    const stateData = stateDataMap[stateCode.toUpperCase()];
    if (!stateData) {
      console.warn(`No state requirements file found for state code: ${stateCode}`);
      return null;
    }
    
    if (!stateData.courses || !Array.isArray(stateData.courses)) {
      console.warn(`Invalid state data structure for ${stateCode}`);
      return null;
    }
    
    // Find matching course by course type
    const matchingCourse = stateData.courses.find(course => {
      if (!course || !course.course_name) {
        return false;
      }
      
      const courseName = course.course_name.toLowerCase();
      const searchType = courseType.toLowerCase();
      
      // Handle different course type patterns
      if (searchType === 'bdi' && courseName.includes('basic driver improvement')) {
        return true;
      }
      if (searchType === 'tlsae' && courseName.includes('traffic law & substance abuse')) {
        return true;
      }
      if (searchType === 'defensive driving' && courseName.includes('defensive driving')) {
        return true;
      }
      if (searchType === 'adult driver education' && courseName.includes('adult driver education')) {
        return true;
      }
      if (searchType === 'pre-licensing' && courseName.includes('pre-licensing')) {
        return true;
      }
      if (searchType === 'ipirp' && courseName.includes('point & insurance reduction')) {
        return true;
      }
      
      // Fallback: check if course type appears in course name
      return courseName.includes(searchType);
    });

    if (!matchingCourse) {
      console.warn(`No matching course found for ${stateCode} ${courseType}`);
      return null;
    }

    return matchingCourse;
  } catch (error) {
    console.warn(`Error loading state requirements for ${stateCode} ${courseType}:`, error);
    return null;
  }
}

/**
 * Get all available states with requirements
 * @returns {Array} - Array of state codes that have requirements data
 */
export function getAvailableStates() {
  return ['FL', 'TX', 'NY', 'VA', 'TN', 'MO', 'MI', 'LA', 'IL'];
}
