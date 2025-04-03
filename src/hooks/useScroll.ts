import { useEffect } from 'react';
import { useCalculator } from './useCalculator';

interface UseScrollProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export function useScroll({ inputRef }: UseScrollProps) {
  const { cursorPosition, displayValue } = useCalculator();

  useEffect(() => {
    const inputElement = inputRef.current;
    if (!inputElement) return;

    // Check if the cursor is at the end of the display value
    if (cursorPosition === displayValue.length) {
      requestAnimationFrame(() => {
        inputElement.scrollLeft = inputElement.scrollWidth;
      });
    }
  }, [cursorPosition, displayValue, inputRef]);

  return;
}
