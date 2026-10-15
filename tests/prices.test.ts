// Run with: npm test
// The price system: every published figure derives from src/data/texas-course.ts and the state data files,
// and the {{TOKEN}} filler (src/data/prices.ts) resolves to those same labels.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  TEXAS_COURSE, TEXAS_PRICE_LABEL, TEXAS_PRICE_CENTS_LABEL, TEXAS_LEGAL_MINIMUM_LABEL, TEXAS_AUDIO_PRICE_LABEL,
  TEXAS_AUDIO_TOTAL_LABEL, TEXAS_ALL_IN_TOTAL, TEXAS_ALL_IN_LABEL, TEXAS_PROMO_PRICE_LABEL, texasAllIn,
} from '../src/data/texas-course.ts';

const json = (p: string) => JSON.parse(readFileSync(new URL(`../${p}`, import.meta.url), 'utf-8'));

test('labels derive from the one price', () => {
  assert.equal(TEXAS_PRICE_LABEL, `$${TEXAS_COURSE.price}`);
  assert.equal(TEXAS_PRICE_CENTS_LABEL, `$${TEXAS_COURSE.price.toFixed(2)}`);
  assert.equal(TEXAS_LEGAL_MINIMUM_LABEL, `$${TEXAS_COURSE.legalMinimumPrice}`);
  assert.equal(TEXAS_AUDIO_PRICE_LABEL, `$${TEXAS_COURSE.audioPrice.toFixed(2)}`);
  assert.equal(TEXAS_PROMO_PRICE_LABEL, `$${TEXAS_COURSE.price - TEXAS_COURSE.promoDiscount}`);
});

test('all-in is court fee + course + Type 3A record', () => {
  assert.equal(TEXAS_ALL_IN_TOTAL, TEXAS_COURSE.typicalCourtFee + TEXAS_COURSE.price + TEXAS_COURSE.type3aRecordFee);
  assert.equal(TEXAS_ALL_IN_LABEL, `$${TEXAS_ALL_IN_TOTAL}`);
  assert.equal(texasAllIn(100), 100 + TEXAS_COURSE.price + TEXAS_COURSE.type3aRecordFee);
});

test('audio total is course + audio (+ autoplay once live)', () => {
  const expected = TEXAS_COURSE.price + TEXAS_COURSE.audioPrice + (TEXAS_COURSE.autoplayLive ? TEXAS_COURSE.autoplayPrice : 0);
  assert.equal(TEXAS_AUDIO_TOTAL_LABEL, `$${expected.toFixed(2)}`);
});

test('the price never drops below the statutory floor, promo included', () => {
  assert.ok(TEXAS_COURSE.price >= TEXAS_COURSE.legalMinimumPrice, 'price below Tex. Educ. Code §1001.352 floor');
  assert.ok(TEXAS_COURSE.price - TEXAS_COURSE.promoDiscount >= TEXAS_COURSE.legalMinimumPrice, 'promo price below the floor');
});

test('state data files carry a price for the token filler', () => {
  for (const f of ['src/data/courses/nd-ddc.json', 'src/data/courses/mo-dip.json', 'src/data/courses/id-ddc.json']) {
    assert.match(json(f).course.priceUsd, /^\d+\.\d{2}$/, f);
  }
  assert.match(json('src/data/ade-texas.json').course.priceUsd, /^\d+\.\d{2}$/);
});

test('every token the content uses is one the filler knows', () => {
  const known = new Set(['TX_PRICE', 'TX_PRICE_CENTS', 'TX_LEGAL_MIN', 'TX_AUDIO_PRICE', 'TX_AUTOPLAY_PRICE', 'TX_AUDIO_TOTAL', 'TX_ALL_IN', 'ADE_PRICE', 'ND_PRICE', 'MO_PRICE', 'ID_PRICE', 'OH_PRICE', 'FEE_MIN', 'FEE_MAX']);
  const src = readFileSync(new URL('../src/data/prices.ts', import.meta.url), 'utf-8');
  for (const k of known) if (!k.startsWith('FEE_')) assert.ok(src.includes(k), `prices.ts lacks ${k}`);
});
