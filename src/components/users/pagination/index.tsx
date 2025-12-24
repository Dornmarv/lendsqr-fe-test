import Icon from '@/components/ui/icon';
import Assets from '@/lib/assets';
import { PAGINATION } from '@/lib/constants';
import styles from './pagination.module.scss';

interface PaginationProps {
    page: number;
    limit: number;
    total: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

export default function Pagination({
    page,
    limit,
    total,
    onPageChange,
    onLimitChange,
}: PaginationProps) {
    const totalPages = Math.ceil(total / limit);

    const renderPageNumbers = (): (number | string)[] => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (page <= 3) {
                pages.push(1, 2, 3, '...', totalPages - 1, totalPages);
            } else if (page >= totalPages - 2) {
                pages.push(1, 2, '...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
            }
        }

        return pages;
    };

    return (
        <div className={styles.pagination}>
            <div className={styles.paginationInfo}>
                <span>Showing</span>
                <select
                    value={limit}
                    onChange={(e) => {
                        onLimitChange(Number(e.target.value));
                        onPageChange(1);
                    }}
                >
                    {PAGINATION.PAGE_SIZE_OPTIONS.map((size) => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
                <span>out of {total}</span>
            </div>
            <div className={styles.paginationControls}>
                <button
                    className={styles.pageBtn}
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                    aria-label="Previous page"
                >
                    <Icon src={Assets.PREV_BTN_ICON} alt="Previous" width={14} height={14} />
                </button>
                {renderPageNumbers().map((p, i) => (
                    <button
                        key={i}
                        className={`${styles.pageBtnNumber} ${p === page ? styles.active : ''} ${p === '...' ? styles.dots : ''}`}
                        onClick={() => typeof p === 'number' && onPageChange(p)}
                        disabled={p === '...'}
                    >
                        {p}
                    </button>
                ))}
                <button
                    className={styles.pageBtn}
                    disabled={page === totalPages}
                    onClick={() => onPageChange(page + 1)}
                    aria-label="Next page"
                >
                    <Icon src={Assets.NEXT_BTN_ICON} alt="Next" width={7} height={12} />
                </button>
            </div>
        </div>
    );
}
