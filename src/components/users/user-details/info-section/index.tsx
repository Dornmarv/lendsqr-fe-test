import styles from './info-section.module.scss';

interface InfoItem {
    label: string;
    value: string;
}

interface InfoSectionProps {
    title?: string;
    items: InfoItem[];
    columns?: 4 | 5;
}

export default function InfoSection({ title, items, columns = 5 }: InfoSectionProps) {
    const gridClass = columns === 4 ? styles.infoGrid4 : styles.infoGrid;

    return (
        <section className={styles.section}>
            {title && <h3 className={styles.sectionTitle}>{title}</h3>}
            <div className={gridClass}>
                {items.map((item, index) => (
                    <div key={index} className={styles.infoItem}>
                        <span className={styles.label}>{item.label}</span>
                        <span className={styles.value}>{item.value}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
