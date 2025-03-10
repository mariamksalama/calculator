import { Button, styled } from '@mui/material';
import { VariantTypes } from '../../types/buttonTypes';
import { getButtonColor } from '../../utils/ButtonUtils';

interface CalculatorButtonProps {
  value: string;
  onClick: () => void;
  variant: VariantTypes;
  className?: string;
}

type StyledButtonProps = {
  buttonVariant: CalculatorButtonProps['variant'];
};

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'buttonVariant',
})<StyledButtonProps>(({ buttonVariant, value }) => ({
  height: '50px',
  minWidth: '50px',
  width: value === '0' ? '120px' : '50px',
  fontSize: '1rem',
  borderRadius: '100px',
  backgroundColor: getButtonColor(buttonVariant),
  textTransform: 'none',
  color: '#fff',
  fontWeight: '500',
  display: 'flex',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  '& .MuiButton-label': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  '&:hover': {
    backgroundColor: buttonVariant === 'number' ? '#666' : '#ffb94a',
  },
}));

export const CalculatorButton = ({
  value,
  onClick,
  variant = 'number',
  className,
}: CalculatorButtonProps) => {
  return (
    <StyledButton
      variant="contained"
      onClick={onClick}
      buttonVariant={variant}
      value={value}
      className={className}
    >
      {value}
    </StyledButton>
  );
};
