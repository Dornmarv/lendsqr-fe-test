'use client';

import { useState, useRef, useCallback } from 'react';
import { useClickOutside } from '@/hooks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Assets from '@/lib/assets';
import styles from './sidebar.module.scss';
import Icon from '@/components/ui/icon';

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

interface MenuItem {
    label: string;
    href: string;
    icon: string;
}

interface MenuSection {
    title?: string;
    items: MenuItem[];
}

// Organization options for dropdown
const organizations = [
    'Switch Organization',
    'Lendsqr',
    'Irorun',
];

const menuSections: MenuSection[] = [
    {
        items: [
            { label: 'Switch Organization', href: '#', icon: Assets.SWITCH_ORGANIZATION_ICON },
            { label: 'Dashboard', href: '#', icon: Assets.DASHBOARD_ICON },
        ],
    },
    {
        title: 'CUSTOMERS',
        items: [
            { label: 'Users', href: '/dashboard/users', icon: Assets.USERS_ICON },
            { label: 'Guarantors', href: '#', icon: Assets.GUARANTORS_ICON },
            { label: 'Loans', href: '#', icon: Assets.LOANS_ICON },
            { label: 'Decision Models', href: '#', icon: Assets.DECISION_MODELS_ICON },
            { label: 'Savings', href: '#', icon: Assets.SAVINGS_ICON },
            { label: 'Loan Requests', href: '#', icon: Assets.LOAN_REQUESTS_ICON },
            { label: 'Whitelist', href: '#', icon: Assets.WHITELIST_ICON },
            { label: 'Karma', href: '#', icon: Assets.KARMA_ICON },
        ],
    },
    {
        title: 'BUSINESSES',
        items: [
            { label: 'Organization', href: '#', icon: Assets.ORGANIZATION_ICON },
            { label: 'Loan Products', href: '#', icon: Assets.LOAN_PRODUCTS_ICON },
            { label: 'Savings Products', href: '#', icon: Assets.SAVING_PRODUCTS_ICON },
            { label: 'Fees and Charges', href: '#', icon: Assets.FEES_AND_CHARGES_ICON },
            { label: 'Transactions', href: '#', icon: Assets.TRANSACTIONS_ICON },
            { label: 'Services', href: '#', icon: Assets.SERVICES_ICON },
            { label: 'Service Account', href: '#', icon: Assets.SERVICE_ACCOUNT_ICON },
            { label: 'Settlements', href: '#', icon: Assets.SETTLEMENTS_ICON },
            { label: 'Reports', href: '#', icon: Assets.AUDIT_LOGS_ICON },
        ],
    },
    {
        title: 'SETTINGS',
        items: [
            { label: 'Preferences', href: '#', icon: Assets.PREFERENCES_ICON },
            { label: 'Fees and Pricing', href: '#', icon: Assets.FEES_AND_PRICING_ICON },
            { label: 'Audit Logs', href: '#', icon: Assets.AUDIT_LOGS_ICON },
        ],
    },
];

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
    const pathname = usePathname();
    const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
    const [selectedOrg, setSelectedOrg] = useState(organizations[0]);
    const orgDropdownRef = useRef<HTMLDivElement>(null);

    const isActive = (href: string) => {
        if (href === '/dashboard') {
            return pathname === '/dashboard';
        }
        return pathname.startsWith(href) && href !== '#';
    };

    // Close org dropdown when clicking outside
    const closeOrgDropdown = useCallback(() => setOrgDropdownOpen(false), []);
    useClickOutside(orgDropdownRef, closeOrgDropdown, orgDropdownOpen);

    const handleLinkClick = () => {
        // Close sidebar on mobile when a link is clicked
        if (onClose) {
            onClose();
        }
    };

    const handleOrgClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOrgDropdownOpen(!orgDropdownOpen);
    };

    const handleOrgSelect = (org: string) => {
        setSelectedOrg(org);
        setOrgDropdownOpen(false);
    };

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div className={styles.overlay} onClick={onClose} aria-hidden="true" />
            )}

            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <button className={styles.closeBtn} onClick={onClose} aria-label="Close menu">
                    <Icon src={Assets.CLOSE_ICON} alt="Close" width={24} height={24} />
                </button>

                <nav className={styles.nav} role="navigation" aria-label="Main navigation">
                    {menuSections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className={styles.section}>
                            {section.title && (
                                <h3 className={styles.sectionTitle}>{section.title}</h3>
                            )}
                            <ul className={styles.menu}>
                                {section.items.map((item, itemIndex) => (
                                    <li key={itemIndex}>
                                        {item.label === 'Switch Organization' ? (
                                            <div className={styles.orgDropdownWrapper} ref={orgDropdownRef}>
                                                <button
                                                    onClick={handleOrgClick}
                                                    className={`${styles.menuItem} ${styles.hasDropdown} ${orgDropdownOpen ? styles.dropdownOpen : ''}`}
                                                    aria-expanded={orgDropdownOpen}
                                                    aria-haspopup="listbox"
                                                >
                                                    <span className={styles.icon}>
                                                        <Icon src={item.icon} alt="" />
                                                    </span>
                                                    <span className={styles.label}>{selectedOrg}</span>
                                                    <span className={`${styles.chevron} ${orgDropdownOpen ? styles.rotated : ''}`} aria-hidden="true">
                                                        <Icon src={Assets.CHEVRON_DOWN_ICON} alt="" width={12} height={12} />
                                                    </span>
                                                </button>
                                                {orgDropdownOpen && (
                                                    <ul className={styles.orgDropdown} role="listbox" aria-label="Select organization">
                                                        {organizations.map((org) => (
                                                            <li key={org}>
                                                                {org === 'Switch Organization' ? (
                                                                    <span className={styles.orgLabel}>{org}</span>
                                                                ) : (
                                                                    <button
                                                                        onClick={() => handleOrgSelect(org)}
                                                                        className={`${styles.orgOption} ${org === selectedOrg ? styles.selected : ''}`}
                                                                    >
                                                                        <span className={styles.checkIcon}>
                                                                            {org === selectedOrg && <Icon src={Assets.CHECK_ICON} alt="Check" width={14} height={14} />}
                                                                        </span>
                                                                        {org}
                                                                    </button>
                                                                )}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                onClick={handleLinkClick}
                                                className={`${styles.menuItem} ${isActive(item.href) ? styles.active : ''}`}
                                            >
                                                <span className={styles.icon}>
                                                    <Icon src={item.icon} alt={item.label} />
                                                </span>
                                                <span className={styles.label}>{item.label}</span>
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>

                <div className={styles.footer}>
                    <Link href="/login" className={styles.menuItem} onClick={handleLinkClick}>
                        <span className={styles.icon}><Icon src={Assets.LOGOUT_ICON} alt="Logout" width={16} height={16} /></span>
                        <span className={styles.label}>Logout</span>
                    </Link>
                    <span className={styles.version}>v1.2.0</span>
                </div>
            </aside>
        </>
    );
}
