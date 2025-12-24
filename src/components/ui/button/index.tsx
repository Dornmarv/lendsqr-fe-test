import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './button.module.scss';

type ButtonVariant = 'primary' | 'danger' | 'outline-primary' | 'outline-danger' | 'outline-secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    children: ReactNode;
    fullWidth?: boolean;
}

export default function Button({
    variant = 'primary',
    children,
    fullWidth = false,
    className = '',
    ...props
}: ButtonProps): React.ReactElement {
    const buttonClass = [
        styles.button,
        styles[variant],
        fullWidth ? styles.fullWidth : '',
        className,
    ].filter(Boolean).join(' ');

    return (
        <button className={buttonClass} {...props}>
            {children}
        </button>
    );
}
