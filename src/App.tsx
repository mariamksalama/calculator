import { Container } from '@mui/material';
import './App.css';
import { Calculator } from './components/Calculator';
import { CalculatorProvider } from './context/CalculatorContext';

function App() {
  return (
    <CalculatorProvider>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem',
        }}
      >
        <Calculator />
      </Container>
    </CalculatorProvider>
  );
}

export default App;
