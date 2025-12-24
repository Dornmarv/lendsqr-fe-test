/**
 * Unit tests for Skeleton component
 * Tests both positive and negative scenarios
 */

import React from 'react';
import { render } from '@testing-library/react';
import Skeleton, { SkeletonText, SkeletonCircle, SkeletonCard } from '@/components/ui/skeleton';

describe('Skeleton Component', () => {
    // POSITIVE SCENARIOS
    describe('Positive Scenarios', () => {
        it('should render with default text variant', () => {
            const { container } = render(<Skeleton />);

            const skeleton = container.querySelector('.skeleton');
            expect(skeleton).toBeInTheDocument();
            expect(skeleton).toHaveClass('text');
        });

        it('should render with circular variant', () => {
            const { container } = render(<Skeleton variant="circular" />);

            const skeleton = container.querySelector('.skeleton');
            expect(skeleton).toHaveClass('circular');
        });

        it('should render with rectangular variant', () => {
            const { container } = render(<Skeleton variant="rectangular" />);

            const skeleton = container.querySelector('.skeleton');
            expect(skeleton).toHaveClass('rectangular');
        });

        it('should apply width as pixels when number is provided', () => {
            const { container } = render(<Skeleton width={100} />);

            const skeleton = container.querySelector('.skeleton');
            expect(skeleton).toHaveStyle({ width: '100px' });
        });

        it('should apply width as string when string is provided', () => {
            const { container } = render(<Skeleton width="50%" />);

            const skeleton = container.querySelector('.skeleton');
            expect(skeleton).toHaveStyle({ width: '50%' });
        });

        it('should apply height as pixels when number is provided', () => {
            const { container } = render(<Skeleton height={50} />);

            const skeleton = container.querySelector('.skeleton');
            expect(skeleton).toHaveStyle({ height: '50px' });
        });

        it('should apply custom className', () => {
            const { container } = render(<Skeleton className="custom-skeleton" />);

            const skeleton = container.querySelector('.skeleton');
            expect(skeleton).toHaveClass('custom-skeleton');
        });
    });

    // NEGATIVE SCENARIOS
    describe('Negative Scenarios', () => {
        it('should NOT have explicit width when no width prop', () => {
            const { container } = render(<Skeleton />);

            const skeleton = container.querySelector('.skeleton') as HTMLElement;
            expect(skeleton.style.width).toBe('');
        });

        it('should NOT have explicit height when no height prop', () => {
            const { container } = render(<Skeleton />);

            const skeleton = container.querySelector('.skeleton') as HTMLElement;
            expect(skeleton.style.height).toBe('');
        });

        it('should NOT have circular class when variant is text', () => {
            const { container } = render(<Skeleton variant="text" />);

            const skeleton = container.querySelector('.skeleton');
            expect(skeleton).not.toHaveClass('circular');
        });
    });


    // PRESET COMPONENTS
    describe('SkeletonText', () => {
        it('should render with default dimensions', () => {
            const { container } = render(<SkeletonText />);

            const skeleton = container.querySelector('.skeleton');
            expect(skeleton).toBeInTheDocument();
        });

        it('should accept custom width', () => {
            const { container } = render(<SkeletonText width={200} />);

            const skeleton = container.querySelector('.skeleton');
            expect(skeleton).toHaveStyle({ width: '200px' });
        });
    });

    describe('SkeletonCircle', () => {
        it('should render with default size', () => {
            const { container } = render(<SkeletonCircle />);

            const skeleton = container.querySelector('.skeleton');
            expect(skeleton).toHaveStyle({ width: '40px', height: '40px' });
        });

        it('should accept custom size', () => {
            const { container } = render(<SkeletonCircle size={60} />);

            const skeleton = container.querySelector('.skeleton');
            expect(skeleton).toHaveStyle({ width: '60px', height: '60px' });
        });
    });

    describe('SkeletonCard', () => {
        it('should render with default height', () => {
            const { container } = render(<SkeletonCard />);

            const skeleton = container.querySelector('.skeleton');
            expect(skeleton).toHaveStyle({ height: '100px' });
        });

        it('should accept custom height', () => {
            const { container } = render(<SkeletonCard height={200} />);

            const skeleton = container.querySelector('.skeleton');
            expect(skeleton).toHaveStyle({ height: '200px' });
        });
    });
});
