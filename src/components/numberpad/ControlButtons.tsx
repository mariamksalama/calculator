import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { CalculatorButton } from './CalculatorButton';
import { controlButtons } from '../../utils/buttonUtils';
import { spacing } from '../../theme/designSystem';
import { useCalculator } from '../../hooks/useCalculator';

const ControlsRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridArea: 'controls',
  gap: spacing.md,
  justifyItems: 'center',
  alignItems: 'center',
});

export const ControlButtons = () => {
  const { handleControl } = useCalculator();
  return (
    <ControlsRow role="group" aria-label="Control buttons">
      {controlButtons.map((button) => (
        <CalculatorButton
          key={button.value}
          {...button}
          onClick={() => handleControl(button.value)}
        />
      ))}
    </ControlsRow>
  );
};
