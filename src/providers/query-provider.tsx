'use client';

/**
 * React Query Provider
 * 
 * Provides TanStack Query client to the entire application.
 * Configured with sensible defaults for caching and stale time.
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

interface QueryProviderProps {
    children: ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Data is considered fresh for 5 minutes
                        staleTime: 5 * 60 * 1000,
                        // Cache data for 30 minutes
                        gcTime: 30 * 60 * 1000,
                        // Retry failed requests 3 times
                        retry: 3,
                        // Don't refetch on window focus for better UX
                        refetchOnWindowFocus: false,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
