import React, { useRef, useEffect, useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Input } from '@mui/material';
import { spacing, typography, colors, borderRadius } from '../../theme/designSystem';

interface CalculatorDisplayProps {
  value: string;
  onChange: (value: string) => void;
  onCursorChange?: (cursorPosition: number) => void;
}

// Styled component for the display container
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

// Styled component for the input field
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
    touchAction: 'pan-x',
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

  useEffect(() => {
    const inputElement = inputRef.current;
    if (!inputElement || isManuallyScrolled) return;
    if (lastCursorPosition.current !== null) {
      inputElement.scrollLeft = inputElement?.scrollWidth - lastCursorPosition.current;
    } else {
      inputElement.scrollLeft = inputElement?.scrollWidth;
    }
  }, [value, isManuallyScrolled]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const cursorPos = target.selectionStart ?? value.length;
    lastCursorPosition.current = cursorPos;

    const newValue = target.value.replace(/[^0-9+\-×÷%.]/g, '');
    onChange(newValue);

    if (cursorPos === target.value.length) {
      const inputElement = inputRef.current;
      if (inputElement) {
        inputElement.scrollLeft = inputElement.scrollWidth;
      }
    }
  };

  const handleSelect = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    lastCursorPosition.current = target.selectionStart;
    if (onCursorChange && lastCursorPosition.current !== null) {
      onCursorChange(lastCursorPosition.current);
    }
  };

  const handleScroll = useCallback(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      const isAtRightmost =
        inputElement.scrollLeft + inputElement.clientWidth >= inputElement.scrollWidth;
      setIsManuallyScrolled(!isAtRightmost);
    }
  }, []);

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
      />
    </Display>
  );
};
