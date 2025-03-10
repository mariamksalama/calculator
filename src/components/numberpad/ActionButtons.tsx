import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { CalculatorButton } from './CalculatorButton';
import { actionButtons } from '../../utils/buttonUtils';

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

  return (
    <ActionsRow>
      <Box>
        <CalculatorButton {...historyButton} onClick={() => onClick(historyButton.value)} />
      </Box>
      <Box />
      <Box>
        <CalculatorButton {...equalsButton} onClick={() => onClick(equalsButton.value)} />
      </Box>
    </ActionsRow>
  );
};
