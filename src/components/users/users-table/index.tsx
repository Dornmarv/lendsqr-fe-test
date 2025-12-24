'use client';

import { useState, useMemo, useCallback } from 'react';
import { User, SortConfig, SortableUserField } from '@/lib/types';
import Skeleton from '@/components/ui/skeleton';
import Assets from '@/lib/assets';
import { TABLE_COLUMNS } from '@/lib/constants';
import TableHeader from './table-header';
import TableRow from './table-row';
import styles from './users-table.module.scss';

interface UsersTableProps {
    users: User[];
    loading: boolean;
    activeMenu: string | null;
    onMenuToggle: (userId: string | null) => void;
    onViewDetails: (user: User) => void;
    onBlacklist: (user: User) => void;
    onActivate: (user: User) => void;
}

interface ColumnConfig {
    key: SortableUserField;
    label: string;
}

const SORTABLE_COLUMNS: ColumnConfig[] = [
    { key: 'username', label: 'USERNAME' },
    { key: 'organization', label: 'ORGANIZATION' },
    { key: 'email', label: 'EMAIL' },
    { key: 'phoneNumber', label: 'PHONE NUMBER' },
    { key: 'dateJoined', label: 'DATE JOINED' },
    { key: 'status', label: 'STATUS' },
];

export default function UsersTable({
    users,
    loading,
    activeMenu,
    onMenuToggle,
    onViewDetails,
    onBlacklist,
    onActivate,
}: UsersTableProps) {
    // Sort state
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        field: null,
        direction: 'asc',
    });

    // Handle column header click for sorting
    const handleSort = useCallback((field: SortableUserField) => {
        setSortConfig(prev => {
            if (prev.field === field) {
                // Toggle direction if same field
                return {
                    field,
                    direction: prev.direction === 'asc' ? 'desc' : 'asc',
                };
            }
            // New field, start with ascending
            return { field, direction: 'asc' };
        });
    }, []);

    // Get sort icon for a column (returns null if not sorted)
    const getSortIcon = useCallback((field: SortableUserField): string | null => {
        if (sortConfig.field !== field) {
            return null; // No icon when unsorted
        }
        return sortConfig.direction === 'asc'
            ? Assets.SORT_UP_ICON
            : Assets.SORT_DOWN_ICON;
    }, [sortConfig]);

    // Sort users based on current sort config
    const sortedUsers = useMemo(() => {
        if (!sortConfig.field || users.length === 0) {
            return users;
        }

        const sorted = [...users].sort((a, b) => {
            const field = sortConfig.field!;
            let aValue = a[field];
            let bValue = b[field];

            // Handle date sorting specially
            if (field === 'dateJoined') {
                const dateA = new Date(aValue).getTime();
                const dateB = new Date(bValue).getTime();
                return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
            }

            // String comparison for other fields
            aValue = String(aValue).toLowerCase();
            bValue = String(bValue).toLowerCase();

            if (aValue < bValue) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return sorted;
    }, [users, sortConfig]);

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <TableHeader
                    columns={SORTABLE_COLUMNS}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    getSortIcon={getSortIcon}
                />
                <tbody>
                    {loading ? (
                        Array.from({ length: 10 }, (_, i) => (
                            <tr key={`skeleton-${i}`}>
                                <td><Skeleton variant="text" width={100} height={14} /></td>
                                <td><Skeleton variant="text" width={140} height={14} /></td>
                                <td><Skeleton variant="text" width={80} height={14} /></td>
                                <td><Skeleton variant="text" width={100} height={14} /></td>
                                <td><Skeleton variant="text" width={120} height={14} /></td>
                                <td><Skeleton variant="rectangular" width={80} height={28} /></td>
                                <td><Skeleton variant="circular" width={20} height={20} /></td>
                            </tr>
                        ))
                    ) : sortedUsers.length === 0 ? (
                        <tr>
                            <td colSpan={TABLE_COLUMNS.USERS_TABLE_COL_SPAN} className={styles.emptyCell}>
                                No users found
                            </td>
                        </tr>
                    ) : (
                        sortedUsers.map((user) => (
                            <TableRow
                                key={user.id}
                                user={user}
                                isMenuOpen={activeMenu === user.id}
                                onMenuToggle={onMenuToggle}
                                onViewDetails={onViewDetails}
                                onBlacklist={onBlacklist}
                                onActivate={onActivate}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
