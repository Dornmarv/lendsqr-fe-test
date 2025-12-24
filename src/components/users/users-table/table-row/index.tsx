import { useRef, useEffect } from 'react';
import { User, UserStatus } from '@/lib/types';
import Icon from '@/components/ui/icon';
import Assets from '@/lib/assets';
import styles from './table-row.module.scss';

interface TableRowProps {
    user: User;
    isMenuOpen: boolean;
    onMenuToggle: (userId: string | null) => void;
    onViewDetails: (user: User) => void;
    onBlacklist: (user: User) => void;
    onActivate: (user: User) => void;
}

export default function TableRow({
    user,
    isMenuOpen,
    onMenuToggle,
    onViewDetails,
    onBlacklist,
    onActivate,
}: TableRowProps) {
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close menu on click outside
    useEffect(() => {
        if (!isMenuOpen) return;

        const handleClickOutside = (event: Event) => {
            const target = event.target as Node;

            if (dropdownRef.current && !dropdownRef.current.contains(target)) {
                onMenuToggle(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside, true);
        document.addEventListener('touchstart', handleClickOutside, true);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true);
            document.removeEventListener('touchstart', handleClickOutside, true);
        };
    }, [isMenuOpen, onMenuToggle]);

    const getStatusClass = (status: UserStatus): string => {
        return styles[`status${status}`];
    };

    const handleRowClick = (): void => {
        onViewDetails(user);
    };

    return (
        <tr onClick={handleRowClick} className={styles.clickableRow}>
            <td className={styles.username}>{user.username}</td>
            <td>{user.organization}</td>
            <td>{user.email}</td>
            <td>{user.phoneNumber}</td>
            <td>{user.dateJoined}</td>
            <td>
                <span
                    className={`${styles.statusBadge} ${getStatusClass(user.status)}`}
                    role="status"
                    aria-label={`User status: ${user.status}`}
                >
                    {user.status}
                </span>
            </td>
            <td className={styles.actionCell} onClick={(e) => e.stopPropagation()}>
                <button
                    className={styles.moreBtn}
                    onClick={() => onMenuToggle(isMenuOpen ? null : user.id)}
                >
                    <Icon src={Assets.MORE_ICON} alt="More" width={20} height={20} />
                </button>
                {isMenuOpen && (
                    <div className={styles.dropdown} ref={dropdownRef}>
                        <button onClick={() => onViewDetails(user)}>
                            <Icon src={Assets.VIEW_DETAILS_ICON} alt="View" /> View Details
                        </button>
                        <button onClick={() => onBlacklist(user)}>
                            <Icon src={Assets.BLACKLIST_USER_ICON} alt="Blacklist" /> Blacklist User
                        </button>
                        <button onClick={() => onActivate(user)}>
                            <Icon src={Assets.ACTIVATE_USER_ICON} alt="Activate" /> Activate User
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
}
