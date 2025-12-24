'use client';

import { useRef, useEffect } from 'react';
import { UserFilter, UserStatus } from '@/lib/types';
import Icon from '@/components/ui/icon';
import Button from '@/components/ui/button';
import Assets from '@/lib/assets';
import styles from './users-filter.module.scss';

interface UsersFilterProps {
    filters: UserFilter;
    organizations: string[];
    showFilter: boolean;
    onFilterChange: (field: keyof UserFilter, value: string) => void;
    onApply: () => void;
    onReset: () => void;
    onToggle: () => void;
    onClose: () => void;
}

export default function UsersFilter({
    filters,
    organizations,
    showFilter,
    onFilterChange,
    onApply,
    onReset,
    onToggle,
    onClose,
}: UsersFilterProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonWrapperRef = useRef<HTMLDivElement>(null);

    // Close dropdown on click outside (but not on button click)
    useEffect(() => {
        if (!showFilter) return;

        const handleClickOutside = (event: Event) => {
            const target = event.target as Node;

            // If clicking the button, let the button's onClick handle it
            if (buttonWrapperRef.current?.contains(target)) {
                return;
            }

            // If clicking outside the dropdown, close it
            if (dropdownRef.current && !dropdownRef.current.contains(target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside, true);
        document.addEventListener('touchstart', handleClickOutside, true);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true);
            document.removeEventListener('touchstart', handleClickOutside, true);
        };
    }, [showFilter, onClose]);

    return (
        <div className={styles.filterBtnWrapper}>
            <div ref={buttonWrapperRef}>
                <Button
                    variant="outline-secondary"
                    onClick={onToggle}
                    aria-expanded={showFilter}
                    aria-haspopup="true"
                    aria-controls="filter-dropdown"
                >

                    FILTER
                    <Icon src={Assets.FILTER_BUTTON_ICON} alt="" width={16} height={10} />
                </Button>
            </div>
            {showFilter && (
                <div
                    id="filter-dropdown"
                    className={styles.filterDropdown}
                    role="dialog"
                    aria-label="Filter users"
                    ref={dropdownRef}
                >
                    <div className={styles.filterGroup}>
                        <label htmlFor="filter-organization">Organization</label>
                        <select
                            id="filter-organization"
                            value={filters.organization || ''}
                            onChange={(e) => onFilterChange('organization', e.target.value)}
                        >
                            <option value="">Select</option>
                            {organizations.map(org => (
                                <option key={org} value={org}>{org}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.filterGroup}>
                        <label htmlFor="filter-username">Username</label>
                        <input
                            id="filter-username"
                            type="text"
                            placeholder="User"
                            value={filters.username || ''}
                            onChange={(e) => onFilterChange('username', e.target.value)}
                        />
                    </div>
                    <div className={styles.filterGroup}>
                        <label htmlFor="filter-email">Email</label>
                        <input
                            id="filter-email"
                            type="email"
                            placeholder="Email"
                            value={filters.email || ''}
                            onChange={(e) => onFilterChange('email', e.target.value)}
                        />
                    </div>
                    <div className={styles.filterGroup}>
                        <label htmlFor="filter-date">Date</label>
                        <input
                            id="filter-date"
                            type="date"
                            placeholder="Date"
                            value={filters.date || ''}
                            onChange={(e) => onFilterChange('date', e.target.value)}
                        />
                    </div>
                    <div className={styles.filterGroup}>
                        <label htmlFor="filter-phone">Phone Number</label>
                        <input
                            id="filter-phone"
                            type="text"
                            placeholder="Phone Number"
                            value={filters.phoneNumber || ''}
                            onChange={(e) => onFilterChange('phoneNumber', e.target.value)}
                        />
                    </div>
                    <div className={styles.filterGroup}>
                        <label htmlFor="filter-status">Status</label>
                        <select
                            id="filter-status"
                            value={filters.status || ''}
                            onChange={(e) => onFilterChange('status', e.target.value as UserStatus)}
                        >
                            <option value="">Select</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending</option>
                            <option value="Blacklisted">Blacklisted</option>
                        </select>
                    </div>
                    <div className={styles.filterActions}>
                        <Button variant="outline-secondary" onClick={onReset}>
                            Reset
                        </Button>
                        <Button variant="primary" onClick={onApply}>
                            Filter
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
