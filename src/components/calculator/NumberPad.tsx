import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { CalculatorButton } from './CalculatorButton';
import {
  controlButtons,
  numberButtons,
  operatorButtons,
  decimalButton,
  actionButtons,
} from '../../utils/ButtonUtils';

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

const ControlsRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridArea: 'controls',
  gap: '10px',
  justifyItems: 'center',
  alignItems: 'center',
});

const NumbersGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridArea: 'numbers',
  gap: '10px',
  justifyItems: 'center',
  '& .zero-button': {
    gridColumn: 'span 2',
  },
});

const OperatorsGrid = styled(Box)({
  display: 'grid',
  gridArea: 'operators',
  gap: '10px',
  justifyItems: 'center',
  alignContent: 'space-between',
});

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

interface NumberPadProps {
  onClick: (value: string, isOperator?: boolean) => void;
}

export const NumberPad: React.FC<NumberPadProps> = ({ onClick }) => {
  const [historyButton, equalsButton] = actionButtons;

  return (
    <CalculatorGrid>
      <ControlsRow role="group" aria-label="Control buttons">
        {controlButtons.map((button) => (
          <CalculatorButton key={button.value} {...button} onClick={() => onClick(button.value)} />
        ))}
      </ControlsRow>
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
      <ActionsRow>
        <Box>
          <CalculatorButton {...historyButton} onClick={() => onClick(historyButton.value)} />
        </Box>
        <Box />
        <Box>
          <CalculatorButton {...equalsButton} onClick={() => onClick(equalsButton.value)} />
        </Box>
      </ActionsRow>
    </CalculatorGrid>
  );
};
