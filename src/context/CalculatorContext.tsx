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
  updateDisplay: (value: string, cursorPosition: number | null) => void;
  handleControl: (control: string) => void;
  handleOperator: (operator: string) => void;
  cursorPosition: number | null;
  setCursorPosition: (position: number | null) => void;
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
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);

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
        break;
      case 'del':
        if (displayValue == 'Error') {
          setDisplayValue('0');
        } else {
          setDisplayValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
        }
        break;
      case '+/-':
        if (displayValue === '0') return;
        setDisplayValue((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
        break;
      case '%':
        const value = parseFloat(displayValue);
        if (!isNaN(value)) {
          setDisplayValue((value / 100).toString());
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

  const updateDisplay = (value: string, position: number | null) => {
    if (value === '.' && displayValue.includes('.')) {
      return;
    }

    if (displayValue === '0' && value !== '.') {
      setDisplayValue(value);
      setCursorPosition(value.length);
    } else if (position !== null) {
      setDisplayValue((prev) => {
        const before = prev.slice(0, position);
        const after = prev.slice(position);
        return before + value + after;
      });
      setCursorPosition(position + 1);
    } else {
      setDisplayValue((prev) => prev + value);
      setCursorPosition((prev) => (prev !== null ? prev + 1 : null));
    }
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
