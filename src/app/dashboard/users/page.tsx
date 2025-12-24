'use client';

/**
 * Users Page
 * 
 * Displays all users with filtering, pagination, and statistics.
 * Uses React Query for efficient data fetching and caching.
 */

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { StatisticsCards, UsersFilter, UsersTable, Pagination } from '@/components/users';
import { useUsers, useUsersStatistics, useOrganizations } from '@/hooks/useQueries';
import { storageService } from '@/lib/storage';
import { User, UserFilter, UsersStatistics } from '@/lib/types';
import { PAGINATION, DEFAULT_STATS } from '@/lib/constants';
import Assets from '@/lib/assets';
import styles from './page.module.scss';

const statCards = [
    { title: 'USERS', icon: Assets.USERS_2_ICON, key: 'totalUsers', value: DEFAULT_STATS.TOTAL_USERS },
    { title: 'ACTIVE USERS', icon: Assets.ACTIVE_USERS_ICON, key: 'activeUsers', value: DEFAULT_STATS.ACTIVE_USERS },
    { title: 'USERS WITH LOANS', icon: Assets.USERS_WITH_LOANS_ICON, key: 'usersWithLoans', value: DEFAULT_STATS.USERS_WITH_LOANS },
    { title: 'USERS WITH SAVINGS', icon: Assets.USERS_WITH_SAVINGS_ICON, key: 'usersWithSavings', value: DEFAULT_STATS.USERS_WITH_SAVINGS },
];

export default function UsersPage() {
    const router = useRouter();

    // Pagination state
    const [page, setPage] = useState<number>(PAGINATION.DEFAULT_PAGE);
    const [limit, setLimit] = useState<number>(PAGINATION.DEFAULT_LIMIT);

    // Filter state
    const [filters, setFilters] = useState<UserFilter>({});
    const [appliedFilters, setAppliedFilters] = useState<UserFilter>({});
    const [showFilter, setShowFilter] = useState(false);

    // Menu state
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    // React Query hooks
    const {
        data: usersData,
        isLoading: usersLoading,
        refetch: refetchUsers
    } = useUsers({
        pagination: { page, limit },
        filters: appliedFilters,
    });

    const {
        data: statistics,
        isLoading: statsLoading
    } = useUsersStatistics();

    const { data: organizations = [] } = useOrganizations();

    // Transform statistics to Record<string, string> for StatisticsCards
    const usersStatistics: Record<string, string> = statistics ? {
        totalUsers: statistics.totalUsers,
        activeUsers: statistics.activeUsers,
        usersWithLoans: statistics.usersWithLoans,
        usersWithSavings: statistics.usersWithSavings,
    } : {};

    // Handlers
    const handleFilterChange = useCallback((field: keyof UserFilter, value: string) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleApplyFilter = useCallback(() => {
        setPage(1);
        setAppliedFilters(filters);
        setShowFilter(false);
    }, [filters]);

    const handleResetFilter = useCallback(() => {
        setFilters({});
        setAppliedFilters({});
        setPage(1);
        setShowFilter(false);
    }, []);

    const handleViewDetails = useCallback(async (user: User) => {
        await storageService.saveUser(user);
        router.push(`/dashboard/users/${user.id}`);
    }, [router]);

    const handleBlacklist = useCallback(async (user: User) => {
        await storageService.saveUser({ ...user, status: 'Blacklisted' });
        refetchUsers();
        setActiveMenu(null);
    }, [refetchUsers]);

    const handleActivate = useCallback(async (user: User) => {
        await storageService.saveUser({ ...user, status: 'Active' });
        refetchUsers();
        setActiveMenu(null);
    }, [refetchUsers]);

    const handlePageChange = useCallback((newPage: number) => {
        setPage(newPage);
    }, []);

    const handleLimitChange = useCallback((newLimit: number) => {
        setLimit(newLimit);
        setPage(1); // Reset to first page when changing limit
    }, []);

    return (
        <DashboardLayout>
            <div className={styles.page}>
                <h1 className={styles.title}>Users</h1>

                <StatisticsCards
                    cards={statCards}
                    statistics={usersStatistics}
                    loading={statsLoading}
                />

                <UsersFilter
                    filters={filters}
                    organizations={organizations}
                    showFilter={showFilter}
                    onFilterChange={handleFilterChange}
                    onApply={handleApplyFilter}
                    onReset={handleResetFilter}
                    onToggle={() => setShowFilter(!showFilter)}
                    onClose={() => setShowFilter(false)}
                />

                <UsersTable
                    users={usersData?.users || []}
                    loading={usersLoading}
                    activeMenu={activeMenu}
                    onMenuToggle={setActiveMenu}
                    onViewDetails={handleViewDetails}
                    onBlacklist={handleBlacklist}
                    onActivate={handleActivate}
                />

                <Pagination
                    page={page}
                    limit={limit}
                    total={usersData?.total || 0}
                    onPageChange={handlePageChange}
                    onLimitChange={handleLimitChange}
                />
            </div>
        </DashboardLayout>
    );
}
