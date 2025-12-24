/**
 * Query Keys
 * 
 * Centralized query key management for React Query.
 * Ensures consistency and type safety across all queries.
 */

import { UserFilter, PaginationParams } from '@/lib/types';

export const queryKeys = {
    // Users queries
    users: {
        all: ['users'] as const,
        lists: () => [...queryKeys.users.all, 'list'] as const,
        list: (params?: PaginationParams, filters?: UserFilter) =>
            [...queryKeys.users.lists(), { params, filters }] as const,
        details: () => [...queryKeys.users.all, 'detail'] as const,
        detail: (id: string) => [...queryKeys.users.details(), id] as const,
    },

    // Statistics queries
    statistics: {
        all: ['statistics'] as const,
        users: () => [...queryKeys.statistics.all, 'users'] as const,
    },

    // Organizations queries
    organizations: {
        all: ['organizations'] as const,
        list: () => [...queryKeys.organizations.all, 'list'] as const,
    },
} as const;
