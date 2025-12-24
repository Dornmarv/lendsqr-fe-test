'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './error.module.scss';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

/**
 * Dashboard error page for handling errors within the dashboard routes
 */
export default function DashboardError({ error, reset }: ErrorProps) {
    useEffect(() => {
        // We would log error to an error reporting service in a real app
        console.error('Dashboard error:', error);
    }, [error]);

    return (
        <div className={styles.errorContainer}>
            <div className={styles.errorContent}>
                <div className={styles.errorIcon}>⚠️</div>
                <h2 className={styles.errorTitle}>Something went wrong</h2>
                <p className={styles.errorMessage}>
                    We encountered an error while loading this page. Please try again.
                </p>
                {process.env.NODE_ENV === 'development' && (
                    <details className={styles.errorDetails}>
                        <summary>Error Details</summary>
                        <pre>{error.message}</pre>
                        {error.digest && <pre>Digest: {error.digest}</pre>}
                    </details>
                )}
                <div className={styles.errorActions}>
                    <button onClick={reset} className={styles.retryButton}>
                        Try Again
                    </button>
                    <Link href="/dashboard/users" className={styles.homeButton}>
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
