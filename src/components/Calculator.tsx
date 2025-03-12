import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

import { CalculatorDisplay } from './display/CalculatorDIsplay';
import { NumberPad } from './numberpad/NumberPad';
import { HistoryDialog } from './history/HistoryDialog';
import { borderRadius, shadows, spacing, colors } from '../theme/designSystem';
import { useCalculator } from '../hooks/useCalculator';

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: spacing.xl,
  borderRadius: borderRadius.xl,
  backgroundColor: colors.background.primary,
  height: '500px',
  maxWidth: '450px',
  boxSizing: 'border-box',
  position: 'relative',
  boxShadow: shadows.lg,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    width: '60%',
  },
}));

// Main calculator component that orchestrates display, number pad, and history functionality
export const Calculator = () => {
  const { isHistoryOpen } = useCalculator();

  return (
    <StyledContainer role="application" aria-label="Calculator">
      <CalculatorDisplay />
      <NumberPad />
      {isHistoryOpen && <HistoryDialog />}
    </StyledContainer>
  );
};
