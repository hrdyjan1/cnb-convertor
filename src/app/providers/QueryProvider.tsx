import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

const client = new QueryClient();

interface QueryProviderProps extends PropsWithChildren {}

function QueryProvider({ children }: QueryProviderProps) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export { QueryProvider };
