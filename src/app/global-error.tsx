'use client';

import { useEffect } from 'react';
import styles from './global-error.module.scss';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

/**
 * Global error page for handling unhandled errors in the app
 */
export default function GlobalError({ error, reset }: ErrorProps) {
    useEffect(() => {
        // We would log error to an error reporting service in a real app
        console.error('Global error:', error);
    }, [error]);

    return (
        <html lang="en">
            <body>
                <div className={styles.errorContainer}>
                    <div className={styles.errorContent}>
                        <div className={styles.errorIcon}>⚠️</div>
                        <h1 className={styles.errorTitle}>Something went wrong</h1>
                        <p className={styles.errorMessage}>
                            We apologize for the inconvenience. An unexpected error has occurred.
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
                            <button onClick={() => window.location.href = '/'} className={styles.homeButton}>
                                Go to Home
                            </button>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
