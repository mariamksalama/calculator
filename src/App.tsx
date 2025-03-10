import { Container } from '@mui/material';
import './App.css';
import { Calculator } from './components/calculator/calculator';

function App() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      <Calculator />
    </Container>
  );
}

export default App;
