import { styled } from '@mui/material/styles';
import { Box, Input } from '@mui/material';
import { useEffect, useRef } from 'react';

interface CalculatorDisplayProps {
  value: string;
  onChange: (value: string) => void;
  onCursorChange: (position: number | null) => void;
}

const Display = styled(Box)({
  width: '100%',
  height: '60px',
  borderRadius: '10px',
  marginBottom: '20px',
  padding: '10px 15px',
  display: 'flex',
  alignItems: 'center',
  color: 'white',
  fontSize: '2rem',
  fontFamily: 'monospace',
  backgroundColor: 'transparent',
});

const StyledInput = styled(Input)({
  width: '100%',
  color: 'white',
  fontSize: '2rem',
  fontFamily: 'monospace',
  padding: 0,
  textAlign: 'right',
  caretColor: 'white',
  '&::before, &::after': {
    display: 'none',
  },
  '& input': {
    padding: 0,
    textAlign: 'right',
    color: 'white',
    fontSize: '2rem',
    fontFamily: 'monospace',
    cursor: 'text',
  },
  '&:hover': {
    cursor: 'text',
  },
});

export const CalculatorDisplay = ({ value, onChange, onCursorChange }: CalculatorDisplayProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const lastCursorPosition = useRef<number | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      if (lastCursorPosition.current !== null) {
        inputRef.current.setSelectionRange(lastCursorPosition.current, lastCursorPosition.current);
      } else {
        inputRef.current.setSelectionRange(value.length, value.length);
      }
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/[^0-9\s+\-×÷%\.]/, '');
    onChange(newValue);
  };

  const handleSelect = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    lastCursorPosition.current = target.selectionStart;
    onCursorChange(target.selectionStart);
  };

  const handleFocus = () => {
    if (lastCursorPosition.current !== null) {
      inputRef.current?.setSelectionRange(lastCursorPosition.current, lastCursorPosition.current);
    } else {
      inputRef.current?.setSelectionRange(value.length, value.length);
    }
    onCursorChange(inputRef.current?.selectionStart || null);
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
