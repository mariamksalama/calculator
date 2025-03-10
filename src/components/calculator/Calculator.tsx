import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { CalculatorButton } from './CalculatorButton';
import {
  controlButtons,
  numberButtons,
  operatorButtons,
  decimalButton,
} from '../../utils/ButtonUtils';

const StyledContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10%',
  borderRadius: '25px',
  backgroundColor: 'black',
  width: '100%',
  minWidth: '280px',
  maxWidth: '560px',
  height: '400px',
});

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

export const Calculator = () => {
  return (
    <StyledContainer role="application" aria-label="Calculator">
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
              <CalculatorButton
                key={button.value}
                value={button.value}
                variant={button.variant}
                onClick={() => {}}
                aria-label={button.ariaLabel}
              />
            ))}
          </TopRow>
          <NumberPad role="group" aria-label="Number pad">
            {numberButtons.map((button) => (
              <CalculatorButton
                key={button.value}
                value={button.value}
                variant={button.variant}
                onClick={() => {}}
                className={button.value === '0' ? 'zero-button' : ''}
                aria-label={button.ariaLabel}
              />
            ))}
            <CalculatorButton {...decimalButton} onClick={() => {}} />
          </NumberPad>
        </Box>
        <Box display="grid" role="group" aria-label="Operator buttons">
          {operatorButtons.map((button) => (
            <CalculatorButton
              key={button.value}
              value={button.value}
              variant={button.variant}
              onClick={() => {}}
              aria-label={button.ariaLabel}
            />
          ))}
        </Box>
      </MainGrid>
    </StyledContainer>
  );
};
