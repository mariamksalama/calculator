import { styled } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { CalculatorButton } from './CalculatorButton';
import { actionButtons } from '../../utils/buttonUtils';
import { spacing, colors } from '../../theme/designSystem';
import { useCalculator } from '../../hooks/useCalculator';

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

interface ActionButtonsProps {
  onClick: (value: string) => void;
}

export const ActionButtons = ({ onClick }: ActionButtonsProps) => {
  const [, equalsButton] = actionButtons;
  const { setIsHistoryOpen } = useCalculator();

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
        <CalculatorButton {...equalsButton} onClick={() => onClick(equalsButton.value)} />
      </Box>
    </ActionsRow>
  );
};
