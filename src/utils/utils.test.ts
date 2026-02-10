import { convertFromCZK } from './convertFromCZK';
import { formatCurrency } from './formatCurrency';
import { getLastUpdatedLabel } from './getLastUpdatedLabel';
import { toNumber } from './toNumber';

describe('convertFromCZK', () => {
  it('returns 0 if rate is 0', () => {
    expect(convertFromCZK(100, 0, 1)).toBe(0);
  });

  it('returns 0 if amount is 0', () => {
    expect(convertFromCZK(100, 1, 0)).toBe(0);
  });

  it('converts correctly', () => {
    expect(convertFromCZK(200, 2, 1)).toBe(100);
  });
});

describe('formatCurrency', () => {
  it('formats number as currency', () => {
    // Intl can use regular spaces or NBSPs for grouping depending on runtime/ICU.
    const formatted = formatCurrency(1234.56, 'CZK').replace(/\s/g, ' ');
    expect(formatted).toBe('1 234,56 Kč');
  });

  it('formats with custom locale', () => {
    expect(formatCurrency(1234.56, 'USD', 'en-US')).toBe('$1,234.56');
  });
});

describe('getLastUpdatedLabel', () => {
  it('returns placeholder if no date', () => {
    expect(getLastUpdatedLabel()).toBe('Last updated: —');
  });

  it('formats date correctly', () => {
    const date = new Date('2026-02-10T12:34:56');
    expect(getLastUpdatedLabel(date)).toBe(
      `Last updated: ${date.toLocaleString('cs-CZ')}`,
    );
  });
});

describe('toNumber', () => {
  it('converts string to number', () => {
    expect(toNumber('42')).toBe(42);
  });

  it('converts string with comma to number', () => {
    expect(toNumber('42.123')).toBe(42.123);
  });

  it('throws error on invalid number', () => {
    expect(() => toNumber('abc')).toThrow('Invalid number for value: "abc"');
  });

  it('includes label in error message', () => {
    expect(() => toNumber('abc', 'Age')).toThrow(
      'Invalid number for "Age": "abc"',
    );
  });
});
