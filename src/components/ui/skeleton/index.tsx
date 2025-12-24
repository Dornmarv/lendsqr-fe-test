import React from 'react';
import styles from './skeleton.module.scss';

type SkeletonVariant = 'text' | 'circular' | 'rectangular';

interface SkeletonProps {
    variant?: SkeletonVariant;
    width?: string | number;
    height?: string | number;
    className?: string;
}

/**
 * Reusable skeleton loader component for loading states
 */
export default function Skeleton({
    variant = 'text',
    width,
    height,
    className = '',
}: SkeletonProps): React.ReactElement {
    const style: React.CSSProperties = {
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
    };

    const skeletonClass = [
        styles.skeleton,
        styles[variant],
        className,
    ].filter(Boolean).join(' ');

    return <div className={skeletonClass} style={style} />;
}

// Preset skeleton components for common use cases
export function SkeletonText({ width = '100%', height = 16 }: { width?: string | number; height?: number }): React.ReactElement {
    return <Skeleton variant="text" width={width} height={height} />;
}

export function SkeletonCircle({ size = 40 }: { size?: number }): React.ReactElement {
    return <Skeleton variant="circular" width={size} height={size} />;
}

export function SkeletonCard({ height = 100 }: { height?: number }): React.ReactElement {
    return <Skeleton variant="rectangular" width="100%" height={height} />;
}
