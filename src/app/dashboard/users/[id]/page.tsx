'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { storageService } from '@/lib/storage';
import { getUserById } from '@/lib/api';
import { User } from '@/lib/types';
import Assets from '@/lib/assets';
import Icon from '@/components/ui/icon';
import Button from '@/components/ui/button';
import {
    UserSummaryCard,
    UserDetailsSkeleton,
    GeneralDetailsTab,
} from '@/components/users/user-details';
import styles from './page.module.scss';

interface Props {
    params: Promise<{ id: string }>;
}

const tabs = [
    'General Details',
    'Documents',
    'Bank Details',
    'Loans',
    'Savings',
    'App and System',
];

export default function UserDetailsPage({ params }: Props) {
    const { id } = use(params);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);

            // First try to get from storage
            let userData = await storageService.getUser(id);

            // If not in storage, fetch from API
            if (!userData) {
                userData = await getUserById(id);
                if (userData) {
                    await storageService.saveUser(userData);
                }
            }

            setUser(userData);
            setLoading(false);
        };

        fetchUser();
    }, [id]);

    const handleBlacklist = async () => {
        if (user) {
            await storageService.saveUser({ ...user, status: 'Blacklisted' });
            setUser({ ...user, status: 'Blacklisted' });
        }
    };

    const handleActivate = async () => {
        if (user) {
            await storageService.saveUser({ ...user, status: 'Active' });
            setUser({ ...user, status: 'Active' });
        }
    };

    if (loading) {
        return (
            <DashboardLayout>
                <UserDetailsSkeleton />
            </DashboardLayout>
        );
    }

    if (!user) {
        return (
            <DashboardLayout>
                <div className={styles.error}>
                    <p>User not found</p>
                    <Link href="/dashboard/users">Back to Users</Link>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className={styles.page}>
                <Link href="/dashboard/users" className={styles.backLink}>
                    <Icon src={Assets.BACK_ARROW_ICON} alt="Back" width={26.7} height={9.3} />
                    <span>Back to Users</span>
                </Link>

                <div className={styles.header}>
                    <h1 className={styles.title}>User Details</h1>
                    <div className={styles.actions}>
                        <Button variant="outline-danger" onClick={handleBlacklist}>
                            BLACKLIST USER
                        </Button>
                        <Button variant="outline-primary" onClick={handleActivate}>
                            ACTIVATE USER
                        </Button>
                    </div>
                </div>

                <UserSummaryCard
                    user={user}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    tabs={tabs}
                />

                {/* Content Sections */}
                <div className={styles.contentCard}>
                    {activeTab === 0 && <GeneralDetailsTab user={user} />}

                    {activeTab !== 0 && (
                        <div className={styles.emptyTab}>
                            <p>No {tabs[activeTab].toLowerCase()} information available</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
