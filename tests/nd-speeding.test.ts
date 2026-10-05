// Run with: npm test   (node --experimental-strip-types --test tests/)
// Every row of the fee and point tables in the North Dakota speeding guides, plus the zone formulas.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { speedingFee, speedingPoints, assess } from '../src/lib/nd-speeding.ts';

test('fee table in north-dakota-speeding-ticket-cost (limit 65 or less / above 65)', () => {
  const rows: [number, number, number][] = [
    [5, 20, 25], [10, 30, 50], [15, 45, 75], [16, 68, 100], [20, 80, 120], [25, 95, 145], [30, 110, 170],
  ];
  for (const [over, low, high] of rows) {
    assert.equal(speedingFee(55, over), low, `${over} over, limit 55`);
    assert.equal(speedingFee(75, over), high, `${over} over, limit 75`);
  }
});

test('points table, limit 65 or less (north-dakota-speeding-ticket-points)', () => {
  const rows: [number, number, number][] = [[1, 10, 0], [11, 15, 1], [16, 20, 3], [21, 25, 5], [26, 35, 9], [36, 45, 12], [46, 60, 15]];
  for (const [from, to, pts] of rows) for (let o = from; o <= to; o++) assert.equal(speedingPoints(65, o), pts, `${o} over`);
});

test('points table, limit above 65', () => {
  const rows: [number, number, number][] = [[1, 5, 0], [6, 10, 1], [11, 15, 3], [16, 20, 5], [21, 25, 7], [26, 30, 10], [31, 35, 12], [36, 50, 15]];
  for (const [from, to, pts] of rows) for (let o = from; o <= to; o++) assert.equal(speedingPoints(70, o), pts, `${o} over`);
});

test('key facts and FAQ answers in the guides', () => {
  assert.equal(speedingFee(55, 10), 30); // "Ten over in a 55 zone is no points and a $30 fee"
  assert.equal(speedingPoints(55, 10), 0);
  assert.equal(speedingPoints(55, 20), 3); // 20 over: 3 points / 5 points above 65
  assert.equal(speedingPoints(75, 20), 5);
  assert.equal(speedingPoints(55, 36), 12); // one ticket for 36 over in a 55 zone is 12 points
  assert.equal(speedingPoints(75, 31), 12);
});

test('school zone: $40 for 1-10 over, +$1 a mph after, unless the regular fee is higher', () => {
  assert.equal(speedingFee(20, 1, 'school'), 40);
  assert.equal(speedingFee(20, 10, 'school'), 40);
  assert.equal(speedingFee(20, 12, 'school'), 42);
  assert.equal(speedingFee(20, 15, 'school'), 45); // regular 45, zone 45
  assert.equal(speedingFee(20, 16, 'school'), 68); // regular 48+20 beats zone 46
});

test('work zone: $150 for 1-10 over, +$2 a mph after, unless the regular fee is higher', () => {
  assert.equal(speedingFee(55, 5, 'work'), 150);
  assert.equal(speedingFee(55, 10, 'work'), 150);
  assert.equal(speedingFee(55, 11, 'work'), 152);
  assert.equal(speedingFee(55, 20, 'work'), 170);
  assert.equal(speedingFee(75, 30, 'work'), 190); // zone 190 beats regular 170
});

test('assess: in lieu of points, suspension and no-violation cases', () => {
  assert.deepEqual([assess(55, 64).points, assess(55, 64).inLieu], [0, false]);
  assert.equal(assess(55, 70).inLieu, true); // 15 over, 1 point
  assert.equal(assess(55, 80).inLieu, true); // 25 over, 5 points
  assert.equal(assess(55, 81).inLieu, false); // 26 over, 9 points
  assert.equal(assess(55, 91).suspends, true); // 36 over, 12 points
  assert.equal(assess(65, 60).over, 0);
  assert.equal(assess(65, 60).fee, 0);
});
