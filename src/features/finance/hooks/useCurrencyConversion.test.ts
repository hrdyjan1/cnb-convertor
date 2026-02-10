import { renderHook } from '@testing-library/react-native';
import * as debounceHook from '../../../hooks/useDebounceValue';
import { useCurrencyConversion } from './useCurrencyConversion';

// Mock useDebounceValue to return the value immediately
jest
  .spyOn(debounceHook, 'useDebounceValue')
  .mockImplementation((value) => value);

describe('useCurrencyConversion', () => {
  const rates = [{ code: 'USD', rate: 25, amount: 1 }];

  it('returns converted value for valid input', () => {
    const { result } = renderHook(() =>
      useCurrencyConversion('250', 'USD', rates),
    );

    expect(result.current.result).toBe(10); // 250 / (25/1) = 10
    expect(result.current.error).toBeNull();
  });

  it('returns error for invalid number', () => {
    const { result } = renderHook(() =>
      useCurrencyConversion('abc', 'USD', rates),
    );

    expect(result.current.result).toBeNull();
    expect(result.current.error).toBe('This is not a valid amount "abc"');
  });

  it('returns error when rate not found', () => {
    const { result } = renderHook(() =>
      useCurrencyConversion('100', 'EUR', rates),
    );

    expect(result.current.result).toBeNull();
    expect(result.current.error).toBe('Rate not found');
  });

  it('returns null result and error if input is empty', () => {
    const { result } = renderHook(() =>
      useCurrencyConversion('', 'USD', rates),
    );

    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeNull();
  });
});
