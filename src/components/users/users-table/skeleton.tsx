import Skeleton from '@/components/ui/skeleton';
import { TABLE_COLUMNS } from '@/lib/constants';
import styles from './users-table.module.scss';

/**
 * Skeleton loader for users table
 */
export default function UsersTableSkeleton() {
    const skeletonRows = Array.from({ length: 10 }, (_, i) => i + 1);

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th><Skeleton variant="text" width={80} height={12} /></th>
                        <th><Skeleton variant="text" width={60} height={12} /></th>
                        <th><Skeleton variant="text" width={100} height={12} /></th>
                        <th><Skeleton variant="text" width={100} height={12} /></th>
                        <th><Skeleton variant="text" width={90} height={12} /></th>
                        <th><Skeleton variant="text" width={60} height={12} /></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {skeletonRows.map((row) => (
                        <tr key={row}>
                            <td><Skeleton variant="text" width={100} height={14} /></td>
                            <td><Skeleton variant="text" width={140} height={14} /></td>
                            <td><Skeleton variant="text" width={80} height={14} /></td>
                            <td><Skeleton variant="text" width={100} height={14} /></td>
                            <td><Skeleton variant="text" width={120} height={14} /></td>
                            <td><Skeleton variant="rectangular" width={80} height={28} /></td>
                            <td><Skeleton variant="circular" width={20} height={20} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
