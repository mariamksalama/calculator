import { Container, styled } from '@mui/material';
import './App.css';
import { Calculator } from './components/Calculator';
import { CalculatorProvider } from './context/CalculatorContext';

function App() {
  const AppContainer = styled(Container)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    padding: '1rem',
    boxSizing: 'border-box',
  });
  return (
    <CalculatorProvider>
      <AppContainer>
        <Calculator />
      </AppContainer>
    </CalculatorProvider>
  );
}

export default App;
