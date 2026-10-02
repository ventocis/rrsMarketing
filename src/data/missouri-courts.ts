/** Typed access to src/data/missouri-courts.json (Missouri court pages, /missouri/courts/*). */
import data from './missouri-courts.json';

export interface MoCourt {
  slug: string;
  name: string;
  seoTitle: string;
  description: string;
  type: string;
  typeLabel: string;
  county: string;
  countyNote: string | null;
  address: string;
  phone: string;
  email: string | null;
  website: string;
  hours: string | null;
  /** Court originator number for MO Form 4444. Only when the court itself publishes it. */
  ori: string | null;
  hears: string;
  alsoHears: string[];
  payment: string | null;
  appearance: string | null;
  dipWording: string | null;
  courtSays: string;
  otherCourt: string;
  cityGuide: string | null;
  sources: { name: string; url: string }[];
  checked: string;
}

export const moCourts = data.courts as MoCourt[];
