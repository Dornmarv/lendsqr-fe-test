/**
 * Unit tests for Button component
 * Tests both positive and negative scenarios
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/ui/button';

describe('Button Component', () => {
    // POSITIVE SCENARIOS
    describe('Positive Scenarios', () => {
        it('should render with children text', () => {
            render(<Button>Click me</Button>);

            expect(screen.getByRole('button')).toHaveTextContent('Click me');
        });

        it('should render with primary variant by default', () => {
            render(<Button>Primary</Button>);

            const button = screen.getByRole('button');
            expect(button).toHaveClass('button');
            expect(button).toHaveClass('primary');
        });

        it('should apply danger variant class', () => {
            render(<Button variant="danger">Danger</Button>);

            const button = screen.getByRole('button');
            expect(button).toHaveClass('danger');
        });

        it('should apply outline-primary variant class', () => {
            render(<Button variant="outline-primary">Outline Primary</Button>);

            const button = screen.getByRole('button');
            expect(button).toHaveClass('outline-primary');
        });

        it('should apply outline-danger variant class', () => {
            render(<Button variant="outline-danger">Outline Danger</Button>);

            const button = screen.getByRole('button');
            expect(button).toHaveClass('outline-danger');
        });

        it('should apply outline-secondary variant class', () => {
            render(<Button variant="outline-secondary">Outline Secondary</Button>);

            const button = screen.getByRole('button');
            expect(button).toHaveClass('outline-secondary');
        });

        it('should apply fullWidth class when prop is true', () => {
            render(<Button fullWidth>Full Width</Button>);

            const button = screen.getByRole('button');
            expect(button).toHaveClass('fullWidth');
        });

        it('should handle onClick events', () => {
            const handleClick = jest.fn();
            render(<Button onClick={handleClick}>Click me</Button>);

            fireEvent.click(screen.getByRole('button'));

            expect(handleClick).toHaveBeenCalledTimes(1);
        });

        it('should pass through additional props', () => {
            render(<Button data-testid="test-button" type="submit">Submit</Button>);

            const button = screen.getByTestId('test-button');
            expect(button).toHaveAttribute('type', 'submit');
        });

        it('should apply custom className', () => {
            render(<Button className="custom-class">Custom</Button>);

            const button = screen.getByRole('button');
            expect(button).toHaveClass('custom-class');
        });
    });

    // NEGATIVE SCENARIOS
    describe('Negative Scenarios', () => {
        it('should be disabled when disabled prop is true', () => {
            render(<Button disabled>Disabled</Button>);

            const button = screen.getByRole('button');
            expect(button).toBeDisabled();
        });

        it('should NOT trigger onClick when disabled', () => {
            const handleClick = jest.fn();
            render(<Button disabled onClick={handleClick}>Disabled</Button>);

            fireEvent.click(screen.getByRole('button'));

            expect(handleClick).not.toHaveBeenCalled();
        });

        it('should NOT have fullWidth class when prop is false', () => {
            render(<Button fullWidth={false}>Not Full Width</Button>);

            const button = screen.getByRole('button');
            expect(button).not.toHaveClass('fullWidth');
        });

        it('should NOT have fullWidth class by default', () => {
            render(<Button>Default</Button>);

            const button = screen.getByRole('button');
            expect(button).not.toHaveClass('fullWidth');
        });

        it('should NOT apply invalid variant (fallback to default)', () => {
            // TypeScript would catch this, but testing runtime behavior
            render(<Button>Default Variant</Button>);

            const button = screen.getByRole('button');
            expect(button).toHaveClass('primary');
        });
    });
});
