'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import ErrorBoundary from '@/components/ui/error-boundary';
import styles from './dashboard-layout.module.scss';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleMenuClick = () => {
        setSidebarOpen(true);
    };

    const handleCloseSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <div className={styles.layout}>
            <Header onMenuClick={handleMenuClick} />
            <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
            <main className={styles.main} role="main">
                <ErrorBoundary>
                    {children}
                </ErrorBoundary>
            </main>
        </div>
    );
}
