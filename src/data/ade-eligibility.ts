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
 * DPS appointment and in-office wait figures live in `src/lib/dps-stats.ts`, computed at
 * build time from `src/data/dps-wait-times.json`. They are deliberately NOT duplicated here:
 * one snapshot typed in two places is how two pages end up quoting different medians.
 * Import { dpsStats } from '../../../lib/dps-stats' instead.
 */

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

/** DPS, Texas Residency Requirement for Driver Licenses and ID Cards (read 2026-09-15). */
export const residency = {
  documentsRequired: 2,
  thirtyDayRule:
    'One of the two documents must show the applicant has lived in Texas for at least 30 days.',
  thirtyDayWaived:
    'The 30-day requirement is waived for applicants surrendering a valid, unexpired driver license or ID from another state, and for commercial applicants.',
  sameSourceRule:
    'Both documents may come from the same source only if it is a local government or service provider offering multiple residential services — a water bill and a gas bill from the same utility are acceptable; two months of the same bill are not.',
  utilityWindowDays: 180,
  affidavit: 'Applicants who cannot produce two acceptable documents may be eligible to complete a Texas Residency Affidavit.',
  printedOnly: 'Documents must be printed. Printed electronic statements are acceptable; a phone screen is not.',
  examples: [
    'Deed, mortgage statement, payment booklet, or a residential rental or lease agreement',
    'Valid Texas voter registration card',
    'Valid Texas motor vehicle registration or title',
    'Valid Texas boat registration or title',
    'Valid Texas license to carry',
    'Utility or residential service bill dated within 180 days — electric, water, gas, internet, cable, streaming services, lawn service or cell phone',
    'Selective Service card',
    'Current homeowner\u2019s or renter\u2019s insurance',
  ],
} as const;

/** DPS, Third Party Skills Testing Program (read 2026-09-15). */
export const tpst = {
  what:
    'Driver education schools certified by DPS to administer the Class C non-commercial driving test.',
  /** DPS’s own stated purpose, which is why it matters given the appointment queues. */
  whyText: 'reduces the time you must wait to take your driving test',
  requires18to24: [
    'A valid DE-964/DEE-964 or ADE-1317/ADEE-1317 showing a completed driver education course',
    'A valid restricted driver license',
    'The ITAD video, with a certificate dated within 90 days before the drive test',
  ],
  requires25plus: [
    'A valid restricted driver license',
    'The ITAD video, with a certificate dated within 90 days before the drive test',
  ],
  feesNote: 'Fees for a drive test administered by a driver education school are not regulated by the Department.',
  /** DPS says this itself, unprompted, about first-time applicants over 25. */
  dpsRecommendsOver25:
    'If you are older than 25 and are applying for a Texas driver license for the first time, you are not required to have completed driver education, however it is highly recommended.',
} as const;

/** The delivered course, from the approved build (Exhibit 2B / Exhibit 3A). */
export const course = {
  instructionMinutes: 331.5,
  totalMinutes: 361.5,
  breakMinutes: 30,
  breaks: 2,
  modules: 9,
  sections: 95,
  knowledgeChecks: 7,
  videos: 2,
  finalExamQuestions: 40,
  finalExamSigns: 20,
  finalExamLaws: 20,
  finalExamPassPercent: 70,
  finalExamAttempts: 3,
  certificateCode: 'ADE-1317',
  certificateDays: 15,
} as const;
