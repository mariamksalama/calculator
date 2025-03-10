import { styled } from '@mui/material/styles';
import { Box, Input } from '@mui/material';
import { useEffect, useRef } from 'react';

interface CalculatorDisplayProps {
  value: string;
  onChange: (value: string) => void;
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

export const CalculatorDisplay = ({ value, onChange }: CalculatorDisplayProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const selectionStart = inputRef.current.selectionStart;
      const selectionEnd = inputRef.current.selectionEnd;
      inputRef.current.setSelectionRange(selectionStart, selectionEnd);

      if (document.activeElement !== inputRef.current) {
        inputRef.current.scrollLeft = inputRef.current.scrollWidth;
      }
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/[^0-9\s+\-×÷%\.]/, '');
    onChange(newValue);
  };

  return (
    <Display role="status" aria-label="Calculator display" aria-live="polite" aria-atomic="true">
      <StyledInput
        inputRef={inputRef}
        value={value}
        onChange={handleChange}
        disableUnderline
        fullWidth
        inputProps={{
          'aria-label': 'Calculator input',
          spellCheck: false,
        }}
      />
    </Display>
  );
};
