import { styled, Box } from '@mui/material';
interface CalculatorDisplayProps {
  value?: string;
}
const Display = styled(Box)({
  width: '80%',
  margin: '10%',
  textAlign: 'right',
  color: 'white',
  fontSize: '2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
});
export const CalculatorDisplay = ({ value = '0' }: CalculatorDisplayProps) => {
  return (
    <Display role="textbox" aria-label="Calculator display" aria-live="polite" aria-atomic="true">
      {value}
    </Display>
  );
};
