import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { CalculatorButton } from './CalculatorButton';
import {
  controlButtons,
  numberButtons,
  operatorButtons,
  decimalButton,
} from '../../utils/ButtonUtils';

const MainGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '3fr 1fr',
  width: '100%',
  gap: '10px',
});

const TopRow = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  width: '100%',
  gap: '10px',
  justifyItems: 'center',
});

const NumberPad = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '10px',
  width: '100%',
  justifyItems: 'center',
  '& .zero-button': {
    gridColumn: 'span 2',
  },
});
const OperatorGrid = styled(Box)({
  display: 'grid',
  gridTemplateRows: 'repeat(5, 1fr)',
  height: '100%',
  justifyItems: 'center',
  alignItems: 'center',
});

interface NumberPadProps {
  onClick: (value: string, isOperator?: boolean) => void;
}

export const NumbeberPad: React.FC<NumberPadProps> = ({ onClick }) => {
  return (
    <MainGrid>
      <Box
        display="flex"
        flexDirection="column"
        gap="10px"
        role="group"
        aria-label="Calculator keypad"
      >
        <TopRow role="group" aria-label="Control buttons">
          {controlButtons.map((button) => (
            <CalculatorButton key={button.value} {...button} onClick={() => {}} />
          ))}
        </TopRow>
        <NumberPad role="group" aria-label="Number pad">
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
        </NumberPad>
      </Box>
      <OperatorGrid role="group" aria-label="Operator buttons">
        {operatorButtons.map((button) => (
          <CalculatorButton
            key={button.value}
            {...button}
            onClick={() => onClick(button.value, true)}
            aria-label={button.ariaLabel}
          />
        ))}
      </OperatorGrid>
    </MainGrid>
  );
};
