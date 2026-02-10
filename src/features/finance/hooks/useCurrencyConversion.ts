import { useEffect, useState } from 'react';
import { useDebounceValue } from '../../../hooks/useDebounceValue';
import { convertFromCZK } from '../../../utils/convertFromCZK';
import { isDefined } from '../../../utils/isDefined';
import { toNumber } from '../../../utils/toNumber';

export function useCurrencyConversion(
  czkInput: string,
  currency: string,
  rates: { rate: number | null; amount: number | null; code: string }[] = [],
) {
  const debouncedCzkInput = useDebounceValue(czkInput, 500);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { rate, amount } = rates.find((rate) => rate.code === currency) ?? {
    rate: null,
    amount: null,
  };

  useEffect(() => {
    if (!debouncedCzkInput) {
      setResult(null);
      setError(null);
      return;
    }

    if (isDefined(rate) && isDefined(amount)) {
      try {
        const normalized = debouncedCzkInput.replace(',', '.');
        const value = toNumber(normalized);
        const converted = convertFromCZK(value, rate, amount);
        setResult(converted);
        setError(null);
      } catch {
        setResult(null);
        setError(`This is not a valid amount "${debouncedCzkInput}"`);
      }
    } else {
      setResult(null);
      setError('Rate not found');
    }
  }, [debouncedCzkInput, rate, amount]);

  return { result, error };
}
