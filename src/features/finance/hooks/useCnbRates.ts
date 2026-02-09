import { useEffect, useState } from 'react';
import { fetchCnbRates } from '../api/fetchCnbRates';
import type { RatesResponse } from '../types';

function useCnbRates() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const [data, setData] = useState<RatesResponse | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadCnbRates() {
      setError(null);
      setIsLoading(true);

      try {
        const data = await fetchCnbRates();
        if (isMounted) setData(data);
      } catch (error) {
        setError(error instanceof Error ? error : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    }

    loadCnbRates();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, error, isLoading };
}

export { useCnbRates };
