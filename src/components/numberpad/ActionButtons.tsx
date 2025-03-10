import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { CalculatorButton } from './CalculatorButton';
import { actionButtons } from '../../utils/buttonUtils';
import { useCalculator } from '../../context/CalculatorContext';

const ActionsRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr 2fr 1fr',
  gridArea: 'actions',
  gap: '10px',
  '& > :first-of-type': {
    justifySelf: 'start',
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
        <CalculatorButton {...historyButton} onClick={() => setIsHistoryOpen(true)} />
      </Box>
      <Box />
      <Box>
        <CalculatorButton {...equalsButton} onClick={() => onClick(equalsButton.value)} />
      </Box>
    </ActionsRow>
  );
};
