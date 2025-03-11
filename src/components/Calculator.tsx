import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import { CalculatorDisplay } from './display/CalculatorDIsplay';
import { NumberPad } from './numberpad/NumberPad';
import { calculateResult } from '../utils/calculatorUtils';
import { HistoryDialog } from './history/HistoryDialog';
import { useCalculator } from '../context/CalculatorContext';
import { isControl, isOperator } from '../utils/buttonUtils';
import { borderRadius, shadows, spacing, colors } from '../theme/designSystem';

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: spacing.xl,
  borderRadius: borderRadius.xl,
  backgroundColor: colors.background.primary,
  height: '500px',
  maxWidth: '450px',
  boxSizing: 'border-box',
  position: 'relative',
  boxShadow: shadows.lg,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: '60%',
  },
}));

export const Calculator = () => {
  const {
    displayValue,
    setDisplayValue,
    updateDisplay,
    addToHistory,
    isHistoryOpen,
    setIsHistoryOpen,
    handleControl,
    handleOperator,
    cursorPosition,
    setCursorPosition,
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
      updateDisplay(buttonValue, cursorPosition);
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
      <CalculatorDisplay
        value={displayValue}
        onChange={handleDisplayChange}
        onCursorChange={setCursorPosition}
      />
      <NumberPad onClick={handleButtonClick} />
      {isHistoryOpen && <HistoryDialog onSelectExpression={handleHistorySelect} />}
    </StyledContainer>
  );
};
