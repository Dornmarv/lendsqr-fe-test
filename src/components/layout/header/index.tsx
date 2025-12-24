'use client';

import { useState } from 'react';
import Link from 'next/link';
import Assets from '@/lib/assets';
import styles from './header.module.scss';
import Icon from '@/components/ui/icon';

interface HeaderProps {
    onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const handleProfileClick = () => {
        setProfileDropdownOpen(!profileDropdownOpen);
    };

    const handleCloseDropdown = () => {
        setProfileDropdownOpen(false);
    };

    return (
        <header className={styles.header} role="banner">
            <button
                className={styles.menuBtn}
                onClick={onMenuClick}
                aria-label="Toggle menu"
            >
                <Icon src={Assets.HAMBURGER_ICON} alt="Menu" width={24} height={24} />
            </button>

            <div className={styles.logo}>
                <Link href="/dashboard">
                    <Icon src={Assets.LENDSQR_LOGO_GROUP_ICON} alt="Lendsqr Logo" width={145} height={30} />
                </Link>
            </div>

            <search className={styles.search} role="search">
                <label htmlFor="header-search" className="visually-hidden">Search for anything</label>
                <input
                    id="header-search"
                    type="text"
                    placeholder="Search for anything"
                    className={styles.searchInput}
                />
                <button className={styles.searchButton} aria-label="Search">
                    <Icon src={Assets.SEARCH_ICON} alt="Search" width={14} height={14} />
                </button>
            </search>

            <div className={styles.actions}>
                <Link href="#" className={styles.docsLink}>
                    Docs
                </Link>

                <button className={styles.notificationBtn} aria-label="Notifications">
                    <Icon src={Assets.NOTIFICATION_BELL_ICON} alt="Notifications" width={22} height={24} />
                </button>

                <div className={styles.profileWrapper}>
                    <button
                        className={styles.userMenu}
                        onClick={handleProfileClick}
                        aria-expanded={profileDropdownOpen}
                        aria-haspopup="true"
                        aria-label="User menu"
                    >
                        <div className={styles.avatar}>
                            <Icon src={Assets.USERS_IMAGE} alt="User avatar" width={48} height={48} />
                        </div>
                        <span className={styles.userName}>Adedeji</span>
                        <span className={`${styles.dropdownIcon} ${profileDropdownOpen ? styles.rotated : ''}`}>
                            <Icon src={Assets.DROPDOWN_ICON} alt="" width={8} height={6} />
                        </span>
                    </button>

                    {profileDropdownOpen && (
                        <>
                            <div className={styles.profileOverlay} onClick={handleCloseDropdown} aria-hidden="true" />
                            <div className={styles.profileDropdown} role="menu" aria-label="User menu">
                                <Link href="#" className={styles.profileOption} onClick={handleCloseDropdown}>
                                    View Profile
                                </Link>
                                <Link href="#" className={styles.profileOption} onClick={handleCloseDropdown}>
                                    Settings
                                </Link>
                                <div className={styles.profileDivider} />
                                <Link href="/login" className={styles.profileOption} onClick={handleCloseDropdown}>
                                    Sign Out
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
