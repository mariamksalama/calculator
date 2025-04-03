import React, { useRef } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Input } from '@mui/material';
import { spacing, typography, colors, borderRadius } from '../../theme/designSystem';
import { useCalculator } from '../../hooks/useCalculator';
import { useCursorPosition } from '../../hooks/useCursorPosition';
import { useScroll } from '../../hooks/useScroll';

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
  const { displayValue, updateDisplay } = useCalculator();

  const { handleSelect, handleTouchStart, handleTouchEnd } = useCursorPosition({
    inputRef,
  });
  useScroll({
    inputRef,
  });

  // Handles input changes and filters out invalid characters
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/[^0-9+\-*/%.]/g, '');
    updateDisplay(newValue);
  };

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
