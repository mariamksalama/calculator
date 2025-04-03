import { useRef, useCallback, useEffect } from 'react';
import { useCalculator } from './useCalculator';

interface UseCursorPositionProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
}

export function useCursorPosition({ inputRef }: UseCursorPositionProps) {
  const { setCursorPosition } = useCalculator();
  const touchAnimationFrame = useRef<number | undefined>(undefined);

  const handleSelect = useCallback(
    (event: React.SyntheticEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      if (setCursorPosition && target.selectionStart !== null) {
        setCursorPosition(target.selectionStart);
      }
    },
    [setCursorPosition]
  );

  const handleTouchStart = useCallback(() => {
    const inputElement = inputRef.current;
    if (!inputElement) return;

    const checkCursorPosition = () => {
      const cursorPos = inputElement.selectionStart;
      if (setCursorPosition && cursorPos !== null) {
        setCursorPosition(cursorPos);
      }
      touchAnimationFrame.current = requestAnimationFrame(checkCursorPosition);
    };

    touchAnimationFrame.current = requestAnimationFrame(checkCursorPosition);
  }, [inputRef, setCursorPosition]);

  const handleTouchEnd = useCallback(() => {
    if (touchAnimationFrame.current) {
      cancelAnimationFrame(touchAnimationFrame.current);
    }
  }, []);

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (touchAnimationFrame.current) {
        cancelAnimationFrame(touchAnimationFrame.current);
      }
    };
  }, []);

  return {
    handleSelect,
    handleTouchStart,
    handleTouchEnd,
  };
}
