import Skeleton from '@/components/ui/skeleton';
import styles from './user-details-skeleton.module.scss';

export default function UserDetailsSkeleton() {
    return (
        <div className={styles.page}>
            <Skeleton variant="text" width={120} height={16} />
            <div className={styles.header}>
                <Skeleton variant="text" width={150} height={28} />
                <div className={styles.actions}>
                    <Skeleton variant="rectangular" width={140} height={40} />
                    <Skeleton variant="rectangular" width={140} height={40} />
                </div>
            </div>
            <div className={styles.summaryCard}>
                <div className={styles.userInfo}>
                    <Skeleton variant="circular" width={100} height={100} />
                    <div>
                        <Skeleton variant="text" width={150} height={24} />
                        <Skeleton variant="text" width={100} height={14} />
                    </div>
                    <div>
                        <Skeleton variant="text" width={80} height={14} />
                        <Skeleton variant="text" width={60} height={20} />
                    </div>
                    <div>
                        <Skeleton variant="text" width={120} height={14} />
                        <Skeleton variant="text" width={150} height={16} />
                    </div>
                </div>
            </div>
            <div className={styles.detailsCard}>
                <Skeleton variant="text" width="100%" height={200} />
            </div>
        </div>
    );
}
