import { styled } from '@mui/material/styles';
import { Box, Input } from '@mui/material';
import { useEffect, useRef } from 'react';
import { spacing, typography, colors, borderRadius } from '../../theme/designSystem';

interface CalculatorDisplayProps {
  value: string;
  onChange: (value: string) => void;
  onCursorChange: (position: number) => void;
}

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
  },
  '&:hover': {
    cursor: 'text',
  },
});

export const CalculatorDisplay = ({ value, onChange, onCursorChange }: CalculatorDisplayProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const lastCursorPosition = useRef<number | null>(null);

  useEffect(() => {
    if (inputRef.current && lastCursorPosition.current !== null) {
      const newCursorPosition = lastCursorPosition.current + 1;
      inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
      inputRef.current.scrollLeft = inputRef.current.scrollWidth; // Keep cursor in view
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const cursorPos = target.selectionStart ?? value.length;
    lastCursorPosition.current = cursorPos;

    const newValue = target.value.replace(/[^0-9+\-×÷%.]/g, '');
    onChange(newValue);
  };

  const handleSelect = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    lastCursorPosition.current = target.selectionStart;
    if (target.selectionStart !== null) {
      onCursorChange(target.selectionStart);
    }
  };

  const handleFocus = () => {
    if (inputRef.current) {
      const cursorPos = lastCursorPosition.current ?? value.length;
      inputRef.current.setSelectionRange(cursorPos, cursorPos);
      onCursorChange(cursorPos);
    }
  };

  return (
    <Display role="status" aria-label="Calculator display" aria-live="polite" aria-atomic="true">
      <StyledInput
        inputRef={inputRef}
        value={value}
        onChange={handleChange}
        onSelect={handleSelect}
        onFocus={handleFocus}
        disableUnderline
        fullWidth
        inputProps={{
          'aria-label': 'Calculator input',
          spellCheck: false,
          autoFocus: true,
        }}
      />
    </Display>
  );
};
