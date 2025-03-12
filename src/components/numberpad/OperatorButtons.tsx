import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { CalculatorButton } from './CalculatorButton';
import { operatorButtons } from '../../utils/buttonUtils';
import { spacing } from '../../theme/designSystem';
import { useCalculator } from '../../hooks/useCalculator';

const OperatorsGrid = styled(Box)({
  display: 'grid',
  gridArea: 'operators',
  gap: spacing.md,
  justifyItems: 'center',
  alignContent: 'space-between',
});

export const OperatorButtons = () => {
  const { handleOperator } = useCalculator();
  return (
    <OperatorsGrid role="group" aria-label="Operator buttons">
      {operatorButtons.map((button) => (
        <CalculatorButton
          key={button.value}
          {...button}
          onClick={() => handleOperator(button.value)}
          aria-label={button.ariaLabel}
        />
      ))}
    </OperatorsGrid>
  );
};
