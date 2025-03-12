import React, { useRef, useEffect, useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Input } from '@mui/material';
import { spacing, typography, colors, borderRadius } from '../../theme/designSystem';
import { useCalculator } from '../../hooks/useCalculator';

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

export const CalculatorDisplay = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isManuallyScrolled, setIsManuallyScrolled] = useState(false);
  const { displayValue, setDisplayValue, setCursorPosition, cursorPosition } = useCalculator();

  // Auto-scroll to cursor position when value changes
  useEffect(() => {
    const inputElement = inputRef.current;
    if (!inputElement || isManuallyScrolled) return;
    if (cursorPosition !== null) {
      inputElement.scrollLeft = inputElement?.scrollWidth - cursorPosition;
    } else {
      inputElement.scrollLeft = inputElement?.scrollWidth;
    }
  }, [displayValue, isManuallyScrolled, cursorPosition]);

  // Handles input changes and filters out invalid characters
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const cursorPos = target.selectionStart ?? displayValue.length;
    setCursorPosition(cursorPos);

    const newValue = target.value.replace(/[^0-9+\-*/%.]/g, '');
    setDisplayValue(newValue);
  };

  // Handles text selection and cursor position changes
  const handleSelect = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    if (setCursorPosition && target.selectionStart && cursorPosition !== null) {
      setCursorPosition(target.selectionStart);
    }
  };

  // Handle touch selection changes
  const handleTouchStart = useCallback(() => {
    const inputElement = inputRef.current;
    if (!inputElement) return;

    // Use requestAnimationFrame to continuously check cursor position during touch interaction
    const checkCursorPosition = () => {
      const cursorPos = inputElement.selectionStart;

      if (setCursorPosition && cursorPos !== null) {
        setCursorPosition(cursorPos);
      }
      touchAnimationFrame.current = requestAnimationFrame(checkCursorPosition);
    };

    touchAnimationFrame.current = requestAnimationFrame(checkCursorPosition);
  }, [setCursorPosition]);

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
        value={displayValue}
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
