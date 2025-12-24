/**
 * Unit tests for StatisticsCards component
 * Tests both positive and negative scenarios
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import StatisticsCards from '@/components/users/statistics-cards';

const mockCards = [
    { title: 'USERS', icon: '/icon.png', key: 'totalUsers', value: 100 },
    { title: 'ACTIVE USERS', icon: '/icon.png', key: 'activeUsers', value: 50 },
];

const mockStatistics = {
    totalUsers: '500',
    activeUsers: '250',
};

describe('StatisticsCards Component', () => {
    // POSITIVE SCENARIOS
    describe('Positive Scenarios', () => {
        it('should render all cards', () => {
            render(<StatisticsCards cards={mockCards} statistics={mockStatistics} />);

            expect(screen.getByText('USERS')).toBeInTheDocument();
            expect(screen.getByText('ACTIVE USERS')).toBeInTheDocument();
        });

        it('should display statistics values', () => {
            render(<StatisticsCards cards={mockCards} statistics={mockStatistics} />);

            expect(screen.getByText('500')).toBeInTheDocument();
            expect(screen.getByText('250')).toBeInTheDocument();
        });

        it('should render skeleton when loading is true', () => {
            render(<StatisticsCards cards={mockCards} statistics={mockStatistics} loading={true} />);

            // When loading, titles should not be visible
            expect(screen.queryByText('USERS')).not.toBeInTheDocument();
            expect(screen.queryByText('ACTIVE USERS')).not.toBeInTheDocument();
        });

        it('should render actual content when loading is false', () => {
            render(<StatisticsCards cards={mockCards} statistics={mockStatistics} loading={false} />);

            expect(screen.getByText('USERS')).toBeInTheDocument();
        });

        it('should use value from statistics object when available', () => {
            render(<StatisticsCards cards={mockCards} statistics={mockStatistics} />);

            // Should show '500' from statistics, not '100' from cards default
            expect(screen.getByText('500')).toBeInTheDocument();
        });
    });

    // NEGATIVE SCENARIOS
    describe('Negative Scenarios', () => {
        it('should display 0 when statistic key does not exist', () => {
            render(<StatisticsCards cards={mockCards} statistics={{}} />);

            // Should show '0' as fallback
            expect(screen.getAllByText('0').length).toBeGreaterThan(0);
        });

        it('should handle empty cards array', () => {
            render(<StatisticsCards cards={[]} statistics={mockStatistics} />);

            // Should not throw error, just render empty
            expect(screen.queryByText('USERS')).not.toBeInTheDocument();
        });

        it('should NOT show skeleton when loading is undefined', () => {
            render(<StatisticsCards cards={mockCards} statistics={mockStatistics} />);

            // Should show actual content
            expect(screen.getByText('USERS')).toBeInTheDocument();
        });

        it('should handle missing icon gracefully', () => {
            const cardsWithoutIcon = [
                { title: 'TEST', icon: '', key: 'test', value: 0 },
            ];

            // Should not throw error
            expect(() => {
                render(<StatisticsCards cards={cardsWithoutIcon} statistics={{}} />);
            }).not.toThrow();
        });
    });
});
