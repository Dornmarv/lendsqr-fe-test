'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.scss';
import Assets from '@/lib/assets';
import Icon from '@/components/ui/icon';
import { DELAYS, ROUTES } from '@/lib/constants';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        // Simulate login - in real app we would call login endpoint
        setTimeout(() => {
            localStorage.setItem('isLoggedIn', 'true');
            router.push(ROUTES.USERS);
        }, DELAYS.LOGIN_SIMULATION_MS);
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftSection}>
                <div className={styles.logo}>
                    <Image
                        src={Assets.LENDSQR_LOGO_GROUP_ICON}
                        alt="Lendsqr logo"
                        width={173}
                        height={36}
                        priority
                    />
                </div>

                <div className={styles.illustration}>
                    <Image
                        src={Assets.PABLO_SIGN_IN_ICON}
                        alt="Pablo sign in illustration"
                        width={600}
                        height={337}
                        priority
                    />
                </div>
            </div>

            <div className={styles.rightSection}>
                <div className={styles.formContainer}>
                    <h1 className={styles.title}>Welcome!</h1>
                    <p className={styles.subtitle}>Enter details to login.</p>

                    <form onSubmit={handleSubmit} className={styles.form} aria-label="Login form">
                        <div className={styles.inputGroup}>
                            <label htmlFor="login-email" className="visually-hidden">Email</label>
                            <input
                                id="login-email"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? 'email-error' : undefined}
                                autoComplete="email"
                            />
                            {errors.email && <span id="email-error" className={styles.error} role="alert">{errors.email}</span>}
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="login-password" className="visually-hidden">Password</label>
                            <div className={styles.passwordWrapper}>
                                <input
                                    id="login-password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                                    aria-invalid={!!errors.password}
                                    aria-describedby={errors.password ? 'password-error' : undefined}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className={styles.showPassword}
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? 'HIDE' : 'SHOW'}
                                </button>
                            </div>
                            {errors.password && <span id="password-error" className={styles.error} role="alert">{errors.password}</span>}
                        </div>

                        <Link href="#" className={styles.forgotPassword}>
                            FORGOT PASSWORD?
                        </Link>

                        <button
                            type="submit"
                            className={styles.submitBtn}
                            disabled={isLoading}
                            aria-busy={isLoading}
                        >
                            {isLoading ? 'LOGGING IN...' : 'LOG IN'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
