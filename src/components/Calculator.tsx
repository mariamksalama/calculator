import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import { CalculatorDisplay } from './display/CalculatorDIsplay';
import { NumberPad } from './numberpad/NumberPad';
import { calculateResult } from '../utils/calculatorUtils';
import { HistoryDialog } from './history/HistoryDialog';
import { useCalculator } from '../context/CalculatorContext';
import { isControl, isOperator } from '../utils/buttonUtils';

const StyledContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  borderRadius: '25px',
  backgroundColor: 'black',
  width: '320px',
  height: '500px',
  boxSizing: 'border-box',
  position: 'relative',
  overflow: 'hidden',
  '@media (min-width: 400px)': {
    width: '360px',
  },
  '@media (min-width: 560px)': {
    width: '400px',
  },
});

export const Calculator = () => {
  const {
    displayValue,
    setDisplayValue,
    updateDisplay,
    addToHistory,
    setIsHistoryOpen,
    handleControl,
    handleOperator,
  } = useCalculator();

  const handleButtonClick = (buttonValue: string) => {
    if (buttonValue === '=') {
      if (
        !(
          isOperator(displayValue.charAt(displayValue.length - 1)) ||
          displayValue.trim() === '' ||
          (displayValue.length === 1 && isOperator(displayValue))
        )
      ) {
        const result = calculateResult(displayValue);
        setDisplayValue(result);
        if (result !== 'Error') {
          addToHistory(displayValue, result);
        }
      }
    } else if (buttonValue === 'h') {
      setIsHistoryOpen(true);
    } else if (isControl(buttonValue)) {
      handleControl(buttonValue);
    } else if (isOperator(buttonValue)) {
      handleOperator(buttonValue);
    } else {
      updateDisplay(buttonValue);
    }
  };

  const handleDisplayChange = (newValue: string) => {
    setDisplayValue(newValue);
  };

  const handleHistorySelect = (expression: string) => {
    setDisplayValue(expression);
  };

  return (
    <StyledContainer role="application" aria-label="Calculator">
      <CalculatorDisplay value={displayValue} onChange={handleDisplayChange} />
      <NumberPad onClick={handleButtonClick} />
      <HistoryDialog onSelectExpression={handleHistorySelect} />
    </StyledContainer>
  );
};
