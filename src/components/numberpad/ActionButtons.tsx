import { styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { CalculatorButton } from './CalculatorButton';
import { actionButtons, isOperator } from '../../utils/buttonUtils';
import { spacing, colors } from '../../theme/designSystem';
import { useCalculator } from '../../hooks/useCalculator';
import { calculateResult } from '../../utils/calculatorUtils';

const ActionsRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 2fr 1fr',
  gridArea: 'actions',
  gap: spacing.md,
  '& > :first-of-type': {
    justifySelf: 'start',
    display: 'flex',
    alignItems: 'center',
  },
  '& > :last-child': {
    justifySelf: 'center',
  },
});

const StyledIconButton = styled(IconButton)({
  padding: 0,
  color: colors.text.primary,
  '& svg': {
    fontSize: '1.5rem',
  },
});

export const ActionButtons = () => {
  const [, equalsButton] = actionButtons;
  const { setIsHistoryOpen, displayValue, setDisplayValue, addToHistory } = useCalculator();

  const handleEqualButtonClick = () => {
    if (
      !(
        (isOperator(displayValue.charAt(displayValue.length - 1)) &&
          displayValue.charAt(displayValue.length - 1) != '%') ||
        displayValue.trim() === '' ||
        (displayValue.length === 1 && isOperator(displayValue))
      )
    ) {
      const result = calculateResult(displayValue);
      setDisplayValue(result);
      if (!result.includes('Error') && !result.includes('Nan')) {
        addToHistory(displayValue, result);
      }
    }
  };

  return (
    <ActionsRow>
      <Box>
        <StyledIconButton
          onClick={() => setIsHistoryOpen(true)}
          aria-label="Open calculation history"
        >
          <MenuIcon />
        </StyledIconButton>
      </Box>
      <Box />
      <Box>
        <CalculatorButton {...equalsButton} onClick={() => handleEqualButtonClick()} />
      </Box>
    </ActionsRow>
  );
};
