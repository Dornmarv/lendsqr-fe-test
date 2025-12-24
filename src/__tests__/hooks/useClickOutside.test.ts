/**
 * Unit tests for useClickOutside hook
 * Tests both positive and negative scenarios
 */

import { renderHook, act } from '@testing-library/react';
import { useRef } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';

describe('useClickOutside Hook', () => {
    let mockCallback: jest.Mock;

    beforeEach(() => {
        mockCallback = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    // POSITIVE SCENARIOS
    describe('Positive Scenarios', () => {
        it('should call callback when clicking outside the referenced element', () => {
            // Create a mock element
            const element = document.createElement('div');
            document.body.appendChild(element);

            const { result } = renderHook(() => {
                const ref = useRef<HTMLDivElement>(null);
                (ref as React.MutableRefObject<HTMLDivElement>).current = element;
                useClickOutside(ref, mockCallback, true);
                return ref;
            });

            // Click outside the element
            act(() => {
                const outsideClick = new MouseEvent('mousedown', { bubbles: true });
                document.body.dispatchEvent(outsideClick);
            });

            expect(mockCallback).toHaveBeenCalledTimes(1);

            document.body.removeChild(element);
        });

        it('should work correctly when isActive is true', () => {
            const element = document.createElement('div');
            document.body.appendChild(element);

            renderHook(() => {
                const ref = useRef<HTMLDivElement>(null);
                (ref as React.MutableRefObject<HTMLDivElement>).current = element;
                useClickOutside(ref, mockCallback, true);
                return ref;
            });

            act(() => {
                const outsideClick = new MouseEvent('mousedown', { bubbles: true });
                document.body.dispatchEvent(outsideClick);
            });

            expect(mockCallback).toHaveBeenCalled();

            document.body.removeChild(element);
        });

        it('should clean up event listener on unmount', () => {
            const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

            const { unmount } = renderHook(() => {
                const ref = useRef<HTMLDivElement>(null);
                useClickOutside(ref, mockCallback, true);
                return ref;
            });

            unmount();

            expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function), true);
            removeEventListenerSpy.mockRestore();
        });
    });


    // NEGATIVE SCENARIOS
    describe('Negative Scenarios', () => {
        it('should NOT call callback when clicking inside the referenced element', () => {
            const element = document.createElement('div');
            document.body.appendChild(element);

            renderHook(() => {
                const ref = useRef<HTMLDivElement>(null);
                (ref as React.MutableRefObject<HTMLDivElement>).current = element;
                useClickOutside(ref, mockCallback, true);
                return ref;
            });

            // Click inside the element
            act(() => {
                const insideClick = new MouseEvent('mousedown', { bubbles: true });
                element.dispatchEvent(insideClick);
            });

            expect(mockCallback).not.toHaveBeenCalled();

            document.body.removeChild(element);
        });

        it('should NOT call callback when isActive is false', () => {
            const element = document.createElement('div');
            document.body.appendChild(element);

            renderHook(() => {
                const ref = useRef<HTMLDivElement>(null);
                (ref as React.MutableRefObject<HTMLDivElement>).current = element;
                useClickOutside(ref, mockCallback, false); // isActive = false
                return ref;
            });

            act(() => {
                const outsideClick = new MouseEvent('mousedown', { bubbles: true });
                document.body.dispatchEvent(outsideClick);
            });

            expect(mockCallback).not.toHaveBeenCalled();

            document.body.removeChild(element);
        });

        it('should NOT call callback when ref.current is null', () => {
            renderHook(() => {
                const ref = useRef<HTMLDivElement>(null);
                // ref.current is null
                useClickOutside(ref, mockCallback, true);
                return ref;
            });

            act(() => {
                const outsideClick = new MouseEvent('mousedown', { bubbles: true });
                document.body.dispatchEvent(outsideClick);
            });

            // When ref.current is null, the hook should not call callback
            // because there's no element to compare against
            expect(mockCallback).not.toHaveBeenCalled();
        });

        it('should NOT add event listener when isActive is initially false', () => {
            const addEventListenerSpy = jest.spyOn(document, 'addEventListener');

            renderHook(() => {
                const ref = useRef<HTMLDivElement>(null);
                useClickOutside(ref, mockCallback, false);
                return ref;
            });

            // Check that mousedown listener was not added for our hook
            const mousedownCalls = addEventListenerSpy.mock.calls.filter(
                call => call[0] === 'mousedown'
            );
            expect(mousedownCalls.length).toBe(0);

            addEventListenerSpy.mockRestore();
        });
    });
});
