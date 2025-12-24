import Skeleton from '@/components/ui/skeleton';
import styles from './statistics-cards.module.scss';

/**
 * Skeleton loader for statistics cards
 */
export default function StatisticsCardsSkeleton() {
    return (
        <div className={styles.statsGrid}>
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className={styles.statCard}>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="text" width="60%" height={12} />
                    <Skeleton variant="text" width="40%" height={24} />
                </div>
            ))}
        </div>
    );
}
