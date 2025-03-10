import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { colors, spacing } from '../../theme/designSystem';

interface BurgerMenuProps {
  onClick: () => void;
}

const MenuButton = styled(Box)({
  width: '16px',
  height: '16px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  cursor: 'pointer',
  padding: '2px',
  '&:hover': {
    opacity: 0.8,
  },
});

const MenuLine = styled(Box)({
  width: '100%',
  height: '1.5px',
  backgroundColor: colors.text.primary,
  borderRadius: '1px',
});

export const BurgerMenu = ({ onClick }: BurgerMenuProps) => {
  return (
    <MenuButton onClick={onClick} role="button" aria-label="View calculation history">
      <MenuLine />
      <MenuLine />
      <MenuLine />
    </MenuButton>
  );
};
