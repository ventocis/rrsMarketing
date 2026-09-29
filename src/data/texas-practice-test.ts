// Free practice questions for /texas/defensive-driving-practice-test.
//
// These are written for the website only. None of them is taken from, or
// reworded from, the Texas course question bank (Exhibit 4). Keep it that way:
// the public page must never expose a real exam or quiz question. Every item
// below tests a rule the bank does not ask about, and cites the statute or
// TDLR rule it comes from so a reader can check it.
//
// Statutes verified against statutes.capitol.texas.gov on 2026-09-24.

export interface PracticeQuestion {
  id: string;
  topic: string;
  q: string;
  options: string[];
  /** Index into options. */
  answer: number;
  explain: string;
  source: string;
}

export const practiceQuestions: PracticeQuestion[] = [
  // ---- how the ticket-dismissal program works ----
  {
    id: 'course-length',
    topic: 'The course',
    q: 'How long is every TDLR-approved Texas defensive driving course, online or in a classroom?',
    options: ['4 hours', '6 hours', '8 hours', 'However long the provider decides'],
    answer: 1,
    explain: 'Six hours, with at least five hours of instruction not counting breaks. Online courses enforce it with page timers, so no approved course is shorter.',
    source: 'TDLR Course of Organized Instruction, Six-Hour Driving Safety',
  },
  {
    id: 'ninety-days',
    topic: 'The course',
    q: 'Once the court grants your request to take defensive driving, how long does state law give you to finish and turn in your paperwork?',
    options: ['30 days', '60 days', '90 days', '180 days'],
    answer: 2,
    explain: 'The court defers judgment and gives you 90 days to hand in the certificate, your driving record and the affidavit. The court can allow more time for good cause.',
    source: 'Tex. Code Crim. Proc. arts. 45A.355, 45A.356(a)',
  },
  {
    id: 'speed-ineligible',
    topic: 'The course',
    q: 'Which of these speeding tickets cannot be dismissed with defensive driving?',
    options: ['9 mph over the limit', '15 mph over the limit', '24 mph over the limit', '25 mph over the limit'],
    answer: 3,
    explain: 'Speeding 25 mph or more over the posted limit, or 95 mph or faster, is excluded. 24 over is still eligible if everything else checks out.',
    source: 'Tex. Code Crim. Proc. art. 45A.352(a)(5)',
  },
  {
    id: 'twelve-months',
    topic: 'The course',
    q: 'You took defensive driving for a ticket and finished the course 8 months before your new ticket. Can you use it again for the new one?',
    options: [
      'Yes, there is no limit',
      'No, not if you finished a course in the 12 months before the new offense date',
      'Yes, as long as the new ticket is in a different county',
      'Only if you pay a second course fee to the court',
    ],
    answer: 1,
    explain: 'The 12 months are counted back from the date of the new offense. A course finished 8 months earlier blocks dismissal of the new ticket.',
    source: 'Tex. Code Crim. Proc. art. 45A.352(a)(3)',
  },
  {
    id: 'cdl',
    topic: 'The course',
    q: 'You hold a commercial driver license (CDL) and got a speeding ticket in your personal car. Can defensive driving dismiss it?',
    options: [
      'Yes, because you were not in a commercial vehicle',
      'Yes, if the ticket is under 10 mph over',
      'No, the program does not apply to anyone who holds a CDL',
      'Only with the employer’s written permission',
    ],
    answer: 2,
    explain: 'Ticket dismissal by driving safety course does not apply to a person who holds a CDL, or who held one when the offense happened, in any vehicle.',
    source: 'Tex. Code Crim. Proc. art. 45A.351(c)',
  },

  // ---- Texas rules of the road ----
  {
    id: 'move-over-multilane',
    topic: 'Rules of the road',
    q: 'On a highway with two lanes going your way, you come up on a stopped tow truck with its lights flashing. What does Texas law require?',
    options: [
      'Nothing, as long as you stay in your lane',
      'Leave the lane closest to it, or slow to 20 mph below the posted limit',
      'Stop behind it until it leaves',
      'Tap your horn so the driver knows you are there',
    ],
    answer: 1,
    explain: 'The Move Over or Slow Down law covers police, fire and ambulance, tow trucks, TxDOT and utility vehicles and several others. A first offense carries a $500 to $1,250 fine.',
    source: 'Tex. Transp. Code §545.157',
  },
  {
    id: 'move-over-slow-street',
    topic: 'Rules of the road',
    q: 'Same situation, but the posted limit is 20 mph and you cannot change lanes. How slow must you go while passing?',
    options: ['5 mph', '10 mph', '15 mph', 'You do not have to slow down'],
    answer: 0,
    explain: 'When the limit is under 25 mph, the law says 5 mph. At 25 mph and up, it is 20 mph below the limit.',
    source: 'Tex. Transp. Code §545.157(b)(2)(B)',
  },
  {
    id: 'signal-distance',
    topic: 'Rules of the road',
    q: 'How far before a turn must you start signaling in Texas?',
    options: ['At least 50 feet', 'At least 100 feet', 'At least 200 feet', 'Only as you begin to turn'],
    answer: 1,
    explain: 'You must signal continuously for at least the last 100 feet before the turn.',
    source: 'Tex. Transp. Code §545.104(b)',
  },
  {
    id: 'hydrant',
    topic: 'Rules of the road',
    q: 'How close to a fire hydrant can you legally park?',
    options: ['5 feet', '10 feet', '15 feet', '30 feet'],
    answer: 2,
    explain: 'No closer than 15 feet, except for a moment to pick up or drop off a passenger.',
    source: 'Tex. Transp. Code §545.302(b)(2)',
  },
  {
    id: 'rail-crossing',
    topic: 'Rules of the road',
    q: 'The lights are flashing at a railroad crossing. Where must you stop?',
    options: [
      'Between 15 and 50 feet from the nearest rail',
      'Right at the nearest rail',
      'At least 100 feet back',
      'Anywhere, as long as you can see the tracks',
    ],
    answer: 0,
    explain: 'Stop no closer than 15 feet and no farther than 50 feet from the nearest rail. The same applies when a gate is down or a flagger warns of a train.',
    source: 'Tex. Transp. Code §545.251(a)',
  },
  {
    id: 'siren',
    topic: 'Rules of the road',
    q: 'An ambulance with siren and lights is coming up behind you. What must you do?',
    options: [
      'Speed up to get out of its way',
      'Stop right where you are, even in an intersection',
      'Move into the left lane and keep going',
      'Pull as close as you can to the right edge, clear of the intersection, and stop until it passes',
    ],
    answer: 3,
    explain: 'Yield, move to the right-hand edge or curb clear of any intersection, and stay stopped until the emergency vehicle has passed.',
    source: 'Tex. Transp. Code §545.156',
  },
  {
    id: 'urban-default',
    topic: 'Rules of the road',
    q: 'You are on a city street in a built-up area and see no speed limit sign. What is the lawful speed?',
    options: ['25 mph', '30 mph', '35 mph', '40 mph'],
    answer: 1,
    explain: 'Unless posted otherwise, the limit is 30 mph in an urban district and 15 mph in an alley.',
    source: 'Tex. Transp. Code §545.352(b)(1)',
  },
  {
    id: 'texting-stopped',
    topic: 'Rules of the road',
    q: 'Under the statewide Texas law, when may you read or send a text on a handheld phone behind the wheel?',
    options: [
      'Any time you are on a road with no other cars',
      'Only when your vehicle is stopped',
      'Only on highways, not city streets',
      'Any time, as long as you hold the phone at eye level',
    ],
    answer: 1,
    explain: 'State law bans reading, writing or sending messages while driving unless the vehicle is stopped. Many Texas cities go further and ban all handheld phone use, and handheld use is banned in active school crossing zones statewide.',
    source: 'Tex. Transp. Code §§545.4251, 545.425',
  },
  {
    id: 'dark-signal',
    topic: 'Rules of the road',
    q: 'A storm knocked out power and the traffic signal ahead shows no lights at all. How do you treat the intersection?',
    options: [
      'Drive through if the cross street looks clear',
      'Whoever is on the bigger road goes first',
      'Wait until the signal comes back on',
      'As if it had a stop sign: stop, yield, then go when it is safe',
    ],
    answer: 3,
    explain: 'When a signal is present but dark, the law treats it like a stop: stop, yield, and proceed only when you can enter safely.',
    source: 'Tex. Transp. Code §545.151(a)(1)(B)',
  },
  {
    id: 'uncontrolled',
    topic: 'Rules of the road',
    q: 'Two cars reach an intersection with no signs or signals at about the same time. Who yields?',
    options: [
      'The car on the left yields to the car on the right',
      'The car on the right yields to the car on the left',
      'The larger vehicle goes first',
      'Whoever honks first',
    ],
    answer: 0,
    explain: 'At an uncontrolled intersection you yield to a vehicle that has entered, or is approaching, from your right.',
    source: 'Tex. Transp. Code §545.151(d)',
  },
  {
    id: 'left-on-red',
    topic: 'Rules of the road',
    q: 'When is a left turn on a steady red light legal in Texas, after a full stop?',
    options: [
      'Never',
      'Any time no cars are coming',
      'When turning from a one-way street onto another one-way street, unless a sign forbids it',
      'Only between midnight and 6 a.m.',
    ],
    answer: 2,
    explain: 'After stopping and yielding, you may turn right on red, and turn left on red only from a one-way street onto a one-way street. A posted sign can prohibit either turn.',
    source: 'Tex. Transp. Code §544.007(d), (f)',
  },
  {
    id: 'left-on-green',
    topic: 'Rules of the road',
    q: 'You have a solid green light (no arrow) and want to turn left. What must you do?',
    options: [
      'Go first, because green means you have the right-of-way',
      'Yield to oncoming traffic close enough to be a hazard, and to pedestrians in the crosswalk',
      'Wait for the light to turn yellow before you turn',
      'Flash your lights so oncoming cars stop',
    ],
    answer: 1,
    explain: 'A left turn on a circular green is permitted, but you must yield to oncoming vehicles and to pedestrians lawfully crossing.',
    source: 'Tex. Transp. Code §§544.007(b), 545.152',
  },
  {
    id: 'headlights',
    topic: 'Rules of the road',
    q: 'When does Texas require your headlights to be on?',
    options: [
      'From half an hour after sunset to half an hour before sunrise, and any time you cannot see 1,000 feet ahead',
      'Only after full dark',
      'Only when it is raining',
      'Only on highways',
    ],
    answer: 0,
    explain: 'Lights are required at nighttime, which Texas defines as half an hour after sunset to half an hour before sunrise, and whenever people or vehicles are not clearly visible at 1,000 feet.',
    source: 'Tex. Transp. Code §§547.302(a), 541.401',
  },
  {
    id: 'high-beams',
    topic: 'Rules of the road',
    q: 'You are using high beams on a dark road and a car comes toward you. When must you switch to low beams?',
    options: ['Within 100 feet', 'Within 250 feet', 'Within 500 feet', 'Only if the other driver flashes you'],
    answer: 2,
    explain: 'Dim within 500 feet of an oncoming vehicle, and within 300 feet when you are following one.',
    source: 'Tex. Transp. Code §547.333(c)',
  },
  {
    id: 'seat-belts',
    topic: 'Rules of the road',
    q: 'Who must wear a seat belt in a moving passenger vehicle in Texas?',
    options: [
      'Only the driver',
      'Only people in the front seat',
      'Everyone in a seat that has a belt, front and back',
      'Only passengers under 17',
    ],
    answer: 2,
    explain: 'Everyone 15 and older in a belted seat is responsible for buckling up, in any row. The driver can also be ticketed for any passenger under 17 who is not secured.',
    source: 'Tex. Transp. Code §545.413',
  },
];
