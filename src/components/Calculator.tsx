import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import { CalculatorDisplay } from './display/CalculatorDIsplay';
import { useState } from 'react';
import { NumberPad } from './numberpad/NumberPad';

const StyledContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10%',
  paddingBottom: '15%',
  borderRadius: '25px',
  backgroundColor: 'black',
  width: '100%',
  minWidth: '280px',
  maxWidth: '560px',
  height: '400px',
});

export const Calculator = () => {
  const [displayValue, setDisplayValue] = useState<string | undefined>(undefined);
  const handleButtonClick = (buttonValue: string, isOperator?: boolean) => {
    const newValue = displayValue
      ? isOperator
        ? displayValue + ' ' + buttonValue + ' '
        : displayValue + buttonValue
      : buttonValue;
    setDisplayValue(newValue);
  };
  return (
    <StyledContainer role="application" aria-label="Calculator">
      <CalculatorDisplay value={displayValue} />
      <NumberPad onClick={handleButtonClick} />
    </StyledContainer>
  );
};
