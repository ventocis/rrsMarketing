import floridaData from '../data/requirements/florida.json';
import texasData from '../data/requirements/texas.json';
import newYorkData from '../data/requirements/new_york.json';
import virginiaData from '../data/requirements/virginia.json';
import tennesseeData from '../data/requirements/tennessee.json';
import missouriData from '../data/requirements/missouri.json';
import michiganData from '../data/requirements/michigan.json';
import louisianaData from '../data/requirements/louisiana.json';
import illinoisData from '../data/requirements/illinois.json';

interface CourseRequirement {
  course_name: string;
  languages?: string[];
  who_for?: string;
  requirements?: string[];
  submission?: {
    certificate?: string;
    reporting?: string;
    deadlines?: string;
  };
  court_vs_insurance?: {
    court?: string;
    insurance?: string;
  };
  sources?: { name: string; url: string }[];
}

interface StateData {
  state: string;
  courses: CourseRequirement[];
}

const stateDataMap: Record<string, StateData> = {
  FL: floridaData as StateData,
  TX: texasData as StateData,
  NY: newYorkData as StateData,
  VA: virginiaData as StateData,
  TN: tennesseeData as StateData,
  MO: missouriData as StateData,
  MI: michiganData as StateData,
  LA: louisianaData as StateData,
  IL: illinoisData as StateData,
};

export function getStateRequirements(stateCode: string, courseType: string): CourseRequirement | null {
  if (!stateCode || !courseType) return null;

  try {
    const stateData = stateDataMap[stateCode.toUpperCase()];
    if (!stateData?.courses?.length) return null;

    const searchType = courseType.toLowerCase();
    const match = stateData.courses.find(course => {
      if (!course?.course_name) return false;
      const name = course.course_name.toLowerCase();
      if (searchType === 'bdi' && name.includes('basic driver improvement')) return true;
      if (searchType === 'tlsae' && name.includes('traffic law & substance abuse')) return true;
      if (searchType === 'defensive driving' && name.includes('defensive driving')) return true;
      if (searchType === 'adult driver education' && name.includes('adult driver education')) return true;
      if (searchType === 'pre-licensing' && name.includes('pre-licensing')) return true;
      if (searchType === 'ipirp' && name.includes('point & insurance reduction')) return true;
      return name.includes(searchType);
    });

    return match ?? null;
  } catch {
    return null;
  }
}
