import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { CalculatorButton } from './CalculatorButton';
import { controlButtons } from '../../utils/buttonUtils';
import { spacing } from '../../theme/designSystem';

const ControlsRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridArea: 'controls',
  gap: spacing.md,
  justifyItems: 'center',
  alignItems: 'center',
});

interface ControlButtonsProps {
  onClick: (value: string) => void;
}

export const ControlButtons = ({ onClick }: ControlButtonsProps) => (
  <ControlsRow role="group" aria-label="Control buttons">
    {controlButtons.map((button) => (
      <CalculatorButton key={button.value} {...button} onClick={() => onClick(button.value)} />
    ))}
  </ControlsRow>
);
