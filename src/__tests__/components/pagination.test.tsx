/**
 * Unit tests for Pagination component
 * Tests both positive and negative scenarios
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '@/components/users/pagination';

describe('Pagination Component', () => {
    const defaultProps = {
        page: 1,
        limit: 10,
        total: 100,
        onPageChange: jest.fn(),
        onLimitChange: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // POSITIVE SCENARIOS
    describe('Positive Scenarios', () => {
        it('should render pagination info correctly', () => {
            render(<Pagination {...defaultProps} />);

            expect(screen.getByText('Showing')).toBeInTheDocument();
            expect(screen.getByText(/out of 100/)).toBeInTheDocument();
        });

        it('should display page size select with current limit', () => {
            render(<Pagination {...defaultProps} />);

            const select = screen.getByRole('combobox');
            expect(select).toHaveValue('10');
        });

        it('should call onLimitChange when page size is changed', () => {
            render(<Pagination {...defaultProps} />);

            const select = screen.getByRole('combobox');
            fireEvent.change(select, { target: { value: '20' } });

            expect(defaultProps.onLimitChange).toHaveBeenCalledWith(20);
        });

        it('should reset to page 1 when limit changes', () => {
            render(<Pagination {...defaultProps} />);

            const select = screen.getByRole('combobox');
            fireEvent.change(select, { target: { value: '50' } });

            expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
        });

        it('should call onPageChange when next button is clicked', () => {
            render(<Pagination {...defaultProps} />);

            const nextButton = screen.getByLabelText('Next page');
            fireEvent.click(nextButton);

            expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
        });

        it('should call onPageChange when previous button is clicked', () => {
            render(<Pagination {...defaultProps} page={2} />);

            const prevButton = screen.getByLabelText('Previous page');
            fireEvent.click(prevButton);

            expect(defaultProps.onPageChange).toHaveBeenCalledWith(1);
        });

        it('should call onPageChange when clicking a page number', () => {
            render(<Pagination {...defaultProps} />);

            const page3Button = screen.getByText('3');
            fireEvent.click(page3Button);

            expect(defaultProps.onPageChange).toHaveBeenCalledWith(3);
        });

        it('should render page size options from constants', () => {
            render(<Pagination {...defaultProps} />);

            const select = screen.getByRole('combobox');
            expect(select.querySelectorAll('option').length).toBeGreaterThan(0);
        });
    });

    // NEGATIVE SCENARIOS
    describe('Negative Scenarios', () => {
        it('should disable previous button on first page', () => {
            render(<Pagination {...defaultProps} page={1} />);

            const prevButton = screen.getByLabelText('Previous page');
            expect(prevButton).toBeDisabled();
        });

        it('should disable next button on last page', () => {
            const totalPages = Math.ceil(100 / 10); // 10 pages
            render(<Pagination {...defaultProps} page={totalPages} />);

            const nextButton = screen.getByLabelText('Next page');
            expect(nextButton).toBeDisabled();
        });

        it('should NOT call onPageChange when previous is clicked on first page', () => {
            render(<Pagination {...defaultProps} page={1} />);

            const prevButton = screen.getByLabelText('Previous page');
            fireEvent.click(prevButton);

            expect(defaultProps.onPageChange).not.toHaveBeenCalled();
        });

        it('should NOT call onPageChange when clicking ellipsis', () => {
            // With enough pages, ellipsis should appear
            render(<Pagination {...defaultProps} total={500} />);

            const ellipsisButtons = screen.getAllByText('...');
            if (ellipsisButtons.length > 0) {
                fireEvent.click(ellipsisButtons[0]);
                // Ellipsis click should not trigger page change
                expect(defaultProps.onPageChange).not.toHaveBeenCalled();
            }
        });

        it('should handle zero total gracefully', () => {
            render(<Pagination {...defaultProps} total={0} />);

            expect(screen.getByText(/out of 0/)).toBeInTheDocument();
        });

        it('should handle single page scenario', () => {
            render(<Pagination {...defaultProps} total={5} limit={10} />);

            const prevButton = screen.getByLabelText('Previous page');
            const nextButton = screen.getByLabelText('Next page');

            expect(prevButton).toBeDisabled();
            expect(nextButton).toBeDisabled();
        });
    });
});
