import { useEffect, RefObject, useCallback } from 'react';

/**
 * Hook that handles click outside of the passed ref element
 * 
 * @param ref - React ref object pointing to a DOM element
 * @param handler - Callback function to execute when clicking outside
 * @param enabled - Optional flag to enable/disable the listener (default: true)
 * 
 * @example
 * const dropdownRef = useRef<HTMLDivElement>(null);
 * const [isOpen, setIsOpen] = useState(false);
 * 
 * useClickOutside(dropdownRef, () => setIsOpen(false), isOpen);
 */
export function useClickOutside<T extends HTMLElement>(
    ref: RefObject<T | null>,
    handler: () => void,
    enabled: boolean = true
): void {
    // Memoize the handler to prevent unnecessary re-renders
    const memoizedHandler = useCallback(handler, [handler]);

    useEffect(() => {
        if (!enabled) return;

        const handleClickOutside = (event: Event) => {
            const target = event.target as Node;

            // Check if click is outside the ref element
            if (ref.current && !ref.current.contains(target)) {
                memoizedHandler();
            }
        };

        // Use capture phase for immediate response
        document.addEventListener('mousedown', handleClickOutside, true);
        document.addEventListener('touchstart', handleClickOutside, true);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true);
            document.removeEventListener('touchstart', handleClickOutside, true);
        };
    }, [ref, memoizedHandler, enabled]);
}

export default useClickOutside;
