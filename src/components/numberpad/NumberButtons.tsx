import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { CalculatorButton } from './CalculatorButton';
import { numberButtons, decimalButton } from '../../utils/buttonUtils';
import { spacing } from '../../theme/designSystem';
import { useCalculator } from '../../hooks/useCalculator';

const NumbersGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridArea: 'numbers',
  gap: spacing.md,
  justifyItems: 'center',
  '& .zero-button': {
    gridColumn: 'span 2',
  },
});

export const NumberButtons = () => {
  const { updateDisplay, cursorPosition } = useCalculator();
  return (
    <NumbersGrid role="group" aria-label="Number pad">
      {numberButtons.map((button) => (
        <CalculatorButton
          key={button.value}
          {...button}
          onClick={() => updateDisplay(button.value, cursorPosition)}
          className={button.value === '0' ? 'zero-button' : ''}
          aria-label={button.ariaLabel}
        />
      ))}
      <CalculatorButton
        {...decimalButton}
        onClick={() => updateDisplay(decimalButton.value, cursorPosition)}
      />
    </NumbersGrid>
  );
};
