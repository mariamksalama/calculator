import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { ControlButtons } from './ControlButtons';
import { NumberButtons } from './NumberButtons';
import { OperatorButtons } from './OperatorButtons';
import { ActionButtons } from './ActionButtons';

const CalculatorGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '3fr 1fr',
  gridTemplateRows: 'auto 1fr auto',
  gridTemplateAreas: `
    "controls operators"
    "numbers operators"
    "actions actions"
  `,
  width: '100%',
  gap: '10px',
  height: '100%',
});

interface NumberPadProps {
  onClick: (value: string, isOperator?: boolean) => void;
}

export const NumberPad = ({ onClick }: NumberPadProps) => {
  const handleOperatorClick = (value: string) => onClick(value, true);
  const handleButtonClick = (value: string) => onClick(value);

  return (
    <CalculatorGrid>
      <ControlButtons onClick={handleButtonClick} />
      <NumberButtons onClick={handleButtonClick} />
      <OperatorButtons onClick={handleOperatorClick} />
      <ActionButtons onClick={handleButtonClick} />
    </CalculatorGrid>
  );
};
