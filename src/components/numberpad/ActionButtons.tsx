import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { CalculatorButton } from './CalculatorButton';
import { actionButtons } from '../../utils/buttonUtils';
import { useCalculator } from '../../context/CalculatorContext';
import { BurgerMenu } from './BurgerMenu';
import { spacing } from '../../theme/designSystem';

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

interface ActionButtonsProps {
  onClick: (value: string) => void;
}

export const ActionButtons = ({ onClick }: ActionButtonsProps) => {
  const [historyButton, equalsButton] = actionButtons;
  const { setIsHistoryOpen } = useCalculator();

  return (
    <ActionsRow>
      <Box>
        <BurgerMenu onClick={() => setIsHistoryOpen(true)} />
      </Box>
      <Box />
      <Box>
        <CalculatorButton {...equalsButton} onClick={() => onClick(equalsButton.value)} />
      </Box>
    </ActionsRow>
  );
};
