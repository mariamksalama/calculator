import React, { useRef, useEffect, useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Input } from '@mui/material';
import { spacing, typography, colors, borderRadius } from '../../theme/designSystem';

interface CalculatorDisplayProps {
  value: string;
  onChange: (value: string) => void;
  onCursorChange?: (cursorPosition: number) => void;
}

// Styled container for the calculator display
const Display = styled(Box)({
  width: '100%',
  height: '60px',
  borderRadius: borderRadius.md,
  marginBottom: spacing.lg,
  padding: `${spacing.sm} ${spacing.md}`,
  display: 'flex',
  alignItems: 'center',
  color: colors.text.primary,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  ...typography.display,
});

const StyledInput = styled(Input)({
  width: '100%',
  color: colors.text.primary,
  ...typography.display,
  padding: 0,
  textAlign: 'right',
  caretColor: colors.text.primary,
  '&::before, &::after': {
    display: 'none',
  },
  '& input': {
    padding: 0,
    textAlign: 'right',
    color: colors.text.primary,
    ...typography.display,
    cursor: 'text',
    whiteSpace: 'nowrap',
    overflowX: 'auto',
    display: 'block',
    touchAction: 'manipulation',
    webkitOverflowScrolling: 'touch',
  },
  '&:hover': {
    cursor: 'text',
  },
});

export const CalculatorDisplay = ({ value, onChange, onCursorChange }: CalculatorDisplayProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const lastCursorPosition = useRef<number | null>(null);
  const [isManuallyScrolled, setIsManuallyScrolled] = useState(false);

  // Auto-scroll to cursor position when value changes
  useEffect(() => {
    const inputElement = inputRef.current;
    if (!inputElement || isManuallyScrolled) return;
    if (lastCursorPosition.current !== null) {
      inputElement.scrollLeft = inputElement?.scrollWidth - lastCursorPosition.current;
    } else {
      inputElement.scrollLeft = inputElement?.scrollWidth;
    }
  }, [value, isManuallyScrolled]);

  // Handles input changes and filters out invalid characters
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const cursorPos = target.selectionStart ?? value.length;
    lastCursorPosition.current = cursorPos;

    const newValue = target.value.replace(/[^0-9+\-*/%.]/g, '');
    onChange(newValue);
  };

  // Handles text selection and cursor position changes
  const handleSelect = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    lastCursorPosition.current = target.selectionStart;
    if (onCursorChange && lastCursorPosition.current !== null) {
      onCursorChange(lastCursorPosition.current);
    }
  };

  // Handle touch selection changes
  const handleTouchStart = useCallback(() => {
    const inputElement = inputRef.current;
    if (!inputElement) return;

    // Use requestAnimationFrame to continuously check cursor position during touch interaction
    const checkCursorPosition = () => {
      const cursorPos = inputElement.selectionStart;
      if (cursorPos !== lastCursorPosition.current) {
        lastCursorPosition.current = cursorPos;
        if (onCursorChange && cursorPos !== null) {
          onCursorChange(cursorPos);
        }
      }
      touchAnimationFrame.current = requestAnimationFrame(checkCursorPosition);
    };

    touchAnimationFrame.current = requestAnimationFrame(checkCursorPosition);
  }, [onCursorChange]);

  const handleTouchEnd = useCallback(() => {
    if (touchAnimationFrame.current) {
      cancelAnimationFrame(touchAnimationFrame.current);
    }
  }, []);

  // Reference for the animation frame
  const touchAnimationFrame = useRef<number | undefined>(undefined);

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (touchAnimationFrame.current) {
        cancelAnimationFrame(touchAnimationFrame.current);
      }
    };
  }, []);

  // Tracks manual horizontal scrolling
  const handleScroll = useCallback(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      const isAtRightmost =
        inputElement.scrollLeft + inputElement.clientWidth + 50 >= inputElement.scrollWidth;
      setIsManuallyScrolled(!isAtRightmost);
    }
  }, []);

  // Set up scroll event listener
  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (inputElement) {
        inputElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <Display>
      <StyledInput
        inputRef={inputRef}
        value={value}
        onChange={handleChange}
        onSelect={handleSelect}
        onInput={handleSelect}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      />
    </Display>
  );
};
