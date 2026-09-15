/**
 * Texas adult driver education — eligibility and DPS process facts.
 *
 * Single source of truth for the /adult-drivers-ed/texas/* guide pages, so no page can
 * drift from another. Every value below was read from a primary source on 2026-09-15;
 * each carries its source inline. Do not edit a value without re-reading its source.
 *
 * Primary sources:
 *   STATUTE  Tex. Transp. Code §521.1601, §521.161, §521.167  (statutes.capitol.texas.gov)
 *   DPS-APP  dps.texas.gov/section/driver-license/apply-texas-driver-license
 *   DPS-MOVE dps.texas.gov/section/driver-license/moving-texas
 *   DPS-ITD  dps.texas.gov/section/driver-license/impact-texas-drivers-itd-program
 *   DPS-FEE  dps.texas.gov/section/driver-license/driver-license-fees
 *   DPS-WAIT dps.texas.gov/apps/Viewer/Document/Vue/WAITTIMES
 */

export const VERIFIED_ON = '2026-09-15';

export const law = {
  /** §521.1601(a): DPS may not issue a license to someone under 25 without a driver education certificate. */
  ageCeiling: 25,
  /** DPS-APP states the requirement band operationally. */
  requiredBand: '18 through 24',
  /** §521.1601(b), verbatim. */
  exemptionText:
    'This section does not apply to a person who holds a valid driver’s license issued by another state.',
  /** DPS-APP, verbatim. */
  dpsRequirementText:
    'A six-hour adult Driver Education course, if you are 18 through 24 years of age and applying for your first Texas driver license. This requirement is waived for new residents 18 or older who are surrendering a valid, unexpired driver license from another state. (No driver education requirements for ages 25 and older)',
  /** DPS-MOVE, verbatim — broader than the statute: covers a license not expired over two years. */
  dpsWaiverText:
    'Age 18 and Older: If you hold a valid out-of-state driver license or license not expired over two years you are exempt from the knowledge and skills exams, as well as the ITD and adult driver education requirements.',
  /** §521.167 — what finishing the course actually does. */
  examWaiver:
    'A person who has completed and passed a driver education course approved by the Texas Department of Licensing and Regulation under Section 1001.1015, Education Code, is not required to take the highway sign and traffic law parts of the examination required under Section 521.161 if those parts have been successfully completed as determined by a licensed driver education instructor.',
} as const;

/** DPS-MOVE. Holders of a valid, unexpired license from these countries may have the knowledge and skills exams waived. */
export const reciprocityCountries = [
  'France',
  'Germany',
  'South Korea',
  'United Arab Emirates',
  'Taiwan',
] as const;

/** DPS-MOVE: a transfer with no knowledge/skills exam comes from these issuers. */
export const transferIssuers = [
  'another U.S. state',
  'a U.S. territory',
  'Canada',
] as const;

export const newResident = {
  /** DPS-MOVE: how long you may drive on your home license after moving. */
  graceDays: 90,
  /** DPS-MOVE. */
  translationRule:
    'Foreign licenses not in English or Spanish must be translated by a translation service or your consulate before arriving in Texas.',
} as const;

/** DPS-ITD. Authority: 37 TAC §15.62. */
export const itd = {
  adultName: 'Impact Texas Adult Drivers (ITAD)',
  adultLengthHours: 1,
  teenName: 'Impact Texas Teen Drivers (ITTD)',
  teenLengthHours: 2,
  certValidDays: 90,
  /** Who needs ITAD, per DPS — note this includes drivers 25 and over. */
  adultAppliesTo:
    'drivers aged 18–24 who are required to complete an adult driver education course, and drivers 25 years or older',
  order:
    'after the behind-the-wheel driver education requirements and before the driving skills test',
  note: 'The ITD programs do not replace the distracted driving module in the 6-hour adult driver education course.',
} as const;

/** DPS-FEE. A $1 administrative fee is included; it is not charged for mail transactions. */
export const fees = {
  newLicense18to84: 33,
  newLicenseTermYears: 8,
  limitedTermVisitor: 33,
  replacement: 11,
} as const;

/**
 * DPS-WAIT, captured 2026-09-15 from 234 offices / 936 rows.
 * DPS refreshes this daily from the previous business day, so these are a dated snapshot,
 * not a live figure. Pages using them must say the date. Extractor:
 * ~/Claude/Texas Adult Driver Ed/_build/ade-growth/dps-wait-times.js
 */
export const waitTimes = {
  capturedOn: '2026-09-15',
  offices: 234,
  driveTest: {
    measured: 220,
    medianDays: 20,
    maxDays: 93,
    maxOffice: 'Pearsall',
    over14: 136,
    over30: 86,
  },
  original: { measured: 229, medianDays: 8, maxDays: 70 },
  /** Appointments can be booked up to six months out; a limited number of same-day slots are first come, first served. */
  bookingHorizonMonths: 6,
} as const;

/** True when the drive-test queue at the worst offices outlasts the ITD certificate. */
export const itdExpiryRisk = waitTimes.driveTest.maxDays > itd.certValidDays;

export const process = {
  appointmentOnly: true,
  cardArrivesWeeks: '2–3',
  /** §521.161(b): what the examination must cover. */
  examParts: [
    'vision',
    'highway signs',
    'traffic laws',
    'bicyclist rights and responsibilities',
    'distracted driving',
    'driving skills test',
  ],
} as const;

/** Approved claim language. §84.40(j) bars promising license issuance; never write 'skip the DPS written test'. */
export const CLAIM =
  'satisfies the highway sign and traffic law portions of the DPS knowledge exam';
