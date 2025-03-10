import { Box, IconButton, List, ListItem } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useCalculator } from '../../context/CalculatorContext';
import { styled } from '@mui/material/styles';

const HistoryContainer = styled(Box)(({ open }: { open: boolean }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: '#000000',
  transform: open ? 'translateX(0)' : 'translateX(100%)',
  transition: 'transform 0.3s ease-in-out',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  boxSizing: 'border-box',
}));

const HistoryHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
  color: 'white',
  '& h2': {
    margin: 0,
    fontSize: '1.5rem',
  },
});

const HistoryList = styled(List)({
  flex: 1,
  overflow: 'auto',
  '& .MuiListItem-root': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: '1rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
  },
});

const Expression = styled(Box)({
  color: 'white',
  fontSize: '1.1rem',
  width: '100%',
});

const Result = styled(Box)({
  color: 'rgba(255, 255, 255, 0.6)',
  fontSize: '1rem',
  marginTop: '0.25rem',
  alignSelf: 'flex-end',
});

interface HistoryDialogProps {
  onSelectExpression: (expression: string) => void;
}

export const HistoryDialog = ({ onSelectExpression }: HistoryDialogProps) => {
  const { history, isHistoryOpen, setIsHistoryOpen } = useCalculator();

  const handleClose = () => {
    setIsHistoryOpen(false);
  };

  const handleItemClick = (expression: string) => {
    onSelectExpression(expression);
    setIsHistoryOpen(false);
  };

  return (
    <HistoryContainer open={isHistoryOpen}>
      <HistoryHeader>
        <h2>History</h2>
        <IconButton onClick={handleClose} size="small" sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </HistoryHeader>
      <HistoryList>
        {history.map((item, index) => (
          <ListItem key={index} onClick={() => handleItemClick(item.expression)}>
            <Expression>{item.expression}</Expression>
            <Result>= {item.result}</Result>
          </ListItem>
        ))}
        {history.length === 0 && (
          <ListItem>
            <Expression>No calculations yet</Expression>
          </ListItem>
        )}
      </HistoryList>
    </HistoryContainer>
  );
};
