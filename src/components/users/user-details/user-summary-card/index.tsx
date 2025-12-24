import { User } from '@/lib/types';
import Assets from '@/lib/assets';
import Icon from '@/components/ui/icon';
import styles from './user-summary-card.module.scss';

interface UserSummaryCardProps {
    user: User;
    activeTab: number;
    onTabChange: (index: number) => void;
    tabs: string[];
}

export default function UserSummaryCard({ user, activeTab, onTabChange, tabs }: UserSummaryCardProps) {
    const renderStars = (tier: number) => {
        return Array.from({ length: 3 }, (_, i) => (
            <span key={i}>
                {i < tier ? (
                    <Icon src={Assets.STAR_FILLED_ICON} alt="Star Filled" width={14} height={14} />
                ) : (
                    <Icon src={Assets.STAR_EMPTY_ICON} alt="Star Empty" width={14} height={14} />
                )}
            </span>
        ));
    };

    return (
        <div className={styles.summaryCard}>
            <div className={styles.userInfo}>
                <div className={styles.avatar}>
                    <Icon src={Assets.AVATAR_1_ICON} alt="User Avatar" width={100} height={100} />
                </div>
                <div className={styles.nameSection}>
                    <h2 className={styles.userName}>{user.personalInfo.fullName}</h2>
                    <p className={styles.userId}>{user.id}</p>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.tierSection}>
                    <p className={styles.tierLabel}>User&apos;s Tier</p>
                    <div className={styles.stars}>
                        {renderStars(user.userTier)}
                    </div>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.balanceSection}>
                    <h3 className={styles.balance}>{user.accountBalance}</h3>
                    <p className={styles.bankInfo}>{user.accountNumber}/{user.bankName}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className={styles.tabs}>
                {tabs.map((tab, index) => (
                    <button
                        key={tab}
                        className={`${styles.tab} ${activeTab === index ? styles.active : ''}`}
                        onClick={() => onTabChange(index)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
}
