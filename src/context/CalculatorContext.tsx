import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CalculationHistory {
  expression: string;
  result: string;
  timestamp: Date;
}

interface CalculatorContextType {
  history: CalculationHistory[];
  addToHistory: (expression: string, result: string) => void;
  isHistoryOpen: boolean;
  setIsHistoryOpen: (open: boolean) => void;
  displayValue: string;
  setDisplayValue: (value: string) => void;
  updateDisplay: (value: string, position: number) => void;
  handleControl: (control: string) => void;
  handleOperator: (operator: string) => void;
  cursorPosition: number;
  setCursorPosition: (position: number) => void;
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
};

interface CalculatorProviderProps {
  children: ReactNode;
}

export const CalculatorProvider: React.FC<CalculatorProviderProps> = ({ children }) => {
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState('0');
  const [cursorPosition, setCursorPosition] = useState(1); // Always start at position 1 (after '0')

  const addToHistory = (expression: string, result: string) => {
    setHistory((prev) => {
      const newHistory = [{ expression, result, timestamp: new Date() }, ...prev].slice(0, 10);
      return newHistory;
    });
  };

  const handleControl = (control: string) => {
    switch (control) {
      case 'ac':
        setDisplayValue('0');
        setCursorPosition(1);
        break;
      case 'del':
        if (displayValue === 'Error') {
          setDisplayValue('0');
          setCursorPosition(1);
        } else if (displayValue.length > 1) {
          setDisplayValue((prev) => prev.slice(0, -1));
          setCursorPosition((prev) => Math.max(1, prev - 1));
        } else {
          setDisplayValue('0');
          setCursorPosition(1);
        }
        break;
      case '+/-':
        if (displayValue === '0') return;
        setDisplayValue((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
        setCursorPosition((prev) => prev + 1);
        break;
      case '%':
        const value = parseFloat(displayValue);
        if (!isNaN(value)) {
          const newValue = (value / 100).toString();
          setDisplayValue(newValue);
          setCursorPosition(newValue.length);
        }
        break;
    }
  };

  const handleOperator = (operator: string) => {
    const trimmedValue = displayValue.trimEnd();
    const newValue = trimmedValue + operator;
    setDisplayValue(newValue);
    setCursorPosition(newValue.length);
  };

  const updateDisplay = (value: string, position: number) => {
    // Prevent multiple decimal points
    if (value === '.' && displayValue.includes('.')) {
      return;
    }

    // Handle initial state
    if (displayValue === '0' && value !== '.') {
      setDisplayValue(value);
      setCursorPosition(value.length);
      return;
    }

    // Insert at cursor position
    setDisplayValue((prev) => {
      const before = prev.slice(0, position);
      const after = prev.slice(position);
      return before + value + after;
    });
    setCursorPosition(position + 1);
  };

  return (
    <CalculatorContext.Provider
      value={{
        history,
        addToHistory,
        isHistoryOpen,
        setIsHistoryOpen,
        displayValue,
        setDisplayValue,
        updateDisplay,
        handleControl,
        handleOperator,
        cursorPosition,
        setCursorPosition,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
};
