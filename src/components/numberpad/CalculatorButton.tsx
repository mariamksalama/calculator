import { Button, styled } from '@mui/material';
import { VariantTypes } from '../../types/buttonTypes';
import { spacing, typography, colors, borderRadius } from '../../theme/designSystem';

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
  ...typography.button,
  borderRadius: borderRadius.full,
  backgroundColor: colors.button[buttonVariant],
  textTransform: 'none',
  color: colors.text.primary,
  display: 'flex',
  '& .MuiButton-label': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  '&:hover': {
    backgroundColor: colors.button.hover[buttonVariant],
  },
  '&:focus': {
    outline: 'none',
  },
}));

export const CalculatorButton = ({
  value,
  onClick,
  variant = 'number',
  className,
}: CalculatorButtonProps) => {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    onClick();
  };

  return (
    <StyledButton
      variant="contained"
      onClick={handleClick}
      buttonVariant={variant}
      value={value}
      className={className}
      type="button"
    >
      {value}
    </StyledButton>
  );
};
