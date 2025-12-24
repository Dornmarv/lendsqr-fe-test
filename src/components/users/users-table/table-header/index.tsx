import { SortableUserField, SortConfig } from '@/lib/types';
import Icon from '@/components/ui/icon';
import styles from './table-header.module.scss';

interface ColumnConfig {
    key: SortableUserField;
    label: string;
}

interface TableHeaderProps {
    columns: ColumnConfig[];
    sortConfig: SortConfig;
    onSort: (field: SortableUserField) => void;
    getSortIcon: (field: SortableUserField) => string | null;
}

export default function TableHeader({
    columns,
    sortConfig,
    onSort,
    getSortIcon,
}: TableHeaderProps) {
    return (
        <thead>
            <tr>
                {columns.map(column => {
                    const sortIcon = getSortIcon(column.key);
                    return (
                        <th key={column.key}>
                            <button
                                className={styles.thButton}
                                onClick={() => onSort(column.key)}
                                aria-label={`Sort by ${column.label}`}
                                aria-sort={
                                    sortConfig.field === column.key
                                        ? sortConfig.direction === 'asc'
                                            ? 'ascending'
                                            : 'descending'
                                        : 'none'
                                }
                            >
                                {column.label}
                                {sortIcon && (
                                    <>
                                        {' '}
                                        <Icon
                                            src={sortIcon}
                                            alt={`Sorted ${sortConfig.direction}`}
                                            width={10}
                                            height={6}
                                        />
                                    </>
                                )}
                            </button>
                        </th>
                    );
                })}
                <th></th>
            </tr>
        </thead>
    );
}
