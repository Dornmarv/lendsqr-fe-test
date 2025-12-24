import Link from 'next/link';
import styles from './not-found.module.scss';

/**
 * Custom 404 page for handling non-existent routes
 */
export default function NotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.code}>404</h1>
                <h2 className={styles.title}>Page Not Found</h2>
                <p className={styles.message}>
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Link href="/dashboard/users" className={styles.homeLink}>
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
}
