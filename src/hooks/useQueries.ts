/**
 * Custom Hooks for Data Fetching
 * 
 * React Query hooks for users, statistics, and organizations.
 * Provides loading states, error handling, and automatic caching.
 */

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getUsers, getUserById, getUsersStatistics, getOrganizations } from '@/lib/api';
import { queryKeys } from '@/lib/query-keys';
import { User, UsersResponse, UsersStatistics, UserFilter, PaginationParams } from '@/lib/types';

// ===========================================
// USERS HOOKS
// ===========================================

interface UseUsersParams {
    pagination?: PaginationParams;
    filters?: UserFilter;
    enabled?: boolean;
}

/**
 * Hook to fetch paginated users with optional filters
 */
export function useUsers({
    pagination,
    filters,
    enabled = true
}: UseUsersParams = {}): UseQueryResult<UsersResponse, Error> {
    return useQuery({
        queryKey: queryKeys.users.list(pagination, filters),
        queryFn: () => getUsers(pagination, filters),
        enabled,
    });
}

/**
 * Hook to fetch a single user by ID
 */
export function useUser(id: string, enabled = true): UseQueryResult<User | null, Error> {
    return useQuery({
        queryKey: queryKeys.users.detail(id),
        queryFn: () => getUserById(id),
        enabled: enabled && !!id,
    });
}

// ===========================================
// STATISTICS HOOKS
// ===========================================

/**
 * Hook to fetch user statistics
 */
export function useUsersStatistics(): UseQueryResult<UsersStatistics, Error> {
    return useQuery({
        queryKey: queryKeys.statistics.users(),
        queryFn: getUsersStatistics,
    });
}

// ===========================================
// ORGANIZATIONS HOOKS
// ===========================================

/**
 * Hook to fetch organizations list
 */
export function useOrganizations(): UseQueryResult<string[], Error> {
    return useQuery({
        queryKey: queryKeys.organizations.list(),
        queryFn: getOrganizations,
        staleTime: Infinity, // Organizations rarely change
    });
}
