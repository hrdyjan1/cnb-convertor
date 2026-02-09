import { useQuery } from '@tanstack/react-query';
import { fetchCnbRates } from '../api/fetchCnbRates';
import type { RatesResponse } from '../types';

function useCnbRates() {
  const query = useQuery<RatesResponse>({
    queryKey: ['cnbRates'],
    queryFn: fetchCnbRates,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    enabled: true,
    refetchInterval: 5 * 60 * 1000,
  });

  return query;
}

export { useCnbRates };
