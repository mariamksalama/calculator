import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { CalculatorButton } from './CalculatorButton';
import { numberButtons, decimalButton } from '../../utils/buttonUtils';
import { spacing } from '../../theme/designSystem';

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

interface NumberButtonsProps {
  onClick: (value: string) => void;
}

export const NumberButtons = ({ onClick }: NumberButtonsProps) => (
  <NumbersGrid role="group" aria-label="Number pad">
    {numberButtons.map((button) => (
      <CalculatorButton
        key={button.value}
        {...button}
        onClick={() => onClick(button.value)}
        className={button.value === '0' ? 'zero-button' : ''}
        aria-label={button.ariaLabel}
      />
    ))}
    <CalculatorButton {...decimalButton} onClick={() => onClick(decimalButton.value)} />
  </NumbersGrid>
);
