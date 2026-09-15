import test from 'node:test';
import assert from 'node:assert/strict';
import { applicationFields, scheduleEntries } from '../src/applicationFields.js';

test('maps the six existing Google Form questions without changing response columns', () => {
  assert.deepEqual(applicationFields, {
    name: 'entry.1347612758', age: 'entry.198386654',
    email: 'entry.2121696889', phone: 'entry.1714718245',
    date: 'entry.1999897058', time: 'entry.1344349465',
  });
});

test('preserves the chosen calendar date and midnight without UTC conversion', () => {
  assert.deepEqual(scheduleEntries('2028-02-29', '00:05'), {
    'entry.1999897058_year': '2028', 'entry.1999897058_month': '2',
    'entry.1999897058_day': '29', 'entry.1344349465_hour': '0',
    'entry.1344349465_minute': '5',
  });
  assert.equal(scheduleEntries('2026-12-31', '23:59')['entry.1344349465_hour'], '23');
});

test('clearing native date and time fields clears every corresponding response value', () => {
  assert.deepEqual(Object.values(scheduleEntries('', '')), ['', '', '', '', '']);
  assert.deepEqual(Object.values(scheduleEntries(undefined, undefined)), ['', '', '', '', '']);
});
