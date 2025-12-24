import Icon from '@/components/ui/icon';
import Skeleton from '@/components/ui/skeleton';
import styles from './statistics-cards.module.scss';

interface StatCard {
    title: string;
    icon: string;
    key: string;
    value: number;
}

interface StatisticsCardsProps {
    cards: StatCard[];
    statistics: Record<string, string>;
    loading?: boolean;
}

export default function StatisticsCards({ cards, statistics, loading = false }: StatisticsCardsProps) {
    if (loading) {
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

    return (
        <div className={styles.statsGrid}>
            {cards.map((card) => (
                <div key={card.key} className={styles.statCard}>
                    <Icon src={card.icon} alt={card.title} width={40} height={40} />
                    <span className={styles.statLabel}>{card.title}</span>
                    <span className={styles.statValue}>{statistics[card.key] || '0'}</span>
                </div>
            ))}
        </div>
    );
}
