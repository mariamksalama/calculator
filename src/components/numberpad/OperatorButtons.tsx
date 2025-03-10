import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { CalculatorButton } from './CalculatorButton';
import { operatorButtons } from '../../utils/buttonUtils';

const OperatorsGrid = styled(Box)({
  display: 'grid',
  gridArea: 'operators',
  gap: '10px',
  justifyItems: 'center',
  alignContent: 'space-between',
});

interface OperatorButtonsProps {
  onClick: (value: string, isOperator: boolean) => void;
}

export const OperatorButtons = ({ onClick }: OperatorButtonsProps) => (
  <OperatorsGrid role="group" aria-label="Operator buttons">
    {operatorButtons.map((button) => (
      <CalculatorButton
        key={button.value}
        {...button}
        onClick={() => onClick(button.value, true)}
        aria-label={button.ariaLabel}
      />
    ))}
  </OperatorsGrid>
);
