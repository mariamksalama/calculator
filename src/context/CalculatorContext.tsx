// This module provides the global state management for the calculator application.
// It manages the calculator's display value, history, cursor position, and operations

import { createContext, useState, ReactNode } from 'react';
import { CalculatorContextType, CalculationHistory } from '../types/calculatorContextTypes';

// Create context with undefined default value
const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

interface CalculatorProviderProps {
  children: ReactNode;
}

export function CalculatorProvider({ children }: CalculatorProviderProps) {
  // State management
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState('0');
  const [cursorPosition, setCursorPosition] = useState(1);

  // Adds a calculation to history, maintaining last 10 entries

  const addToHistory = (expression: string, result: string) => {
    setHistory((prev) => {
      const newHistory = [{ expression, result, timestamp: new Date() }, ...prev].slice(0, 10);
      return newHistory;
    });
  };

  const handleControl = (control: string) => {
    switch (control) {
      case 'ac': // Clear all
        setDisplayValue('0');
        setCursorPosition(1);
        break;
      case 'del': // Delete last character
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
      case '+/-': // Toggle negative/positive
        if (displayValue === '0') return;
        setDisplayValue((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
        setCursorPosition((prev) => prev + 1);
        break;
      case '%': // Convert to percentage
        const value = parseFloat(displayValue);
        if (!isNaN(value)) {
          const newValue = (value / 100).toString();
          setDisplayValue(newValue);
          setCursorPosition(newValue.length);
        }
        break;
    }
  };

  //  Handles mathematical operators

  const handleOperator = (operator: string) => {
    // Special case for minus sign at the start
    if (operator === '-' && displayValue === '0') {
      setDisplayValue('-');
      setCursorPosition(1);
      return;
    }

    const trimmedValue = displayValue.trimEnd();
    const newValue = trimmedValue + operator;
    setDisplayValue(newValue);
    setCursorPosition(newValue.length);
  };

  // Updates display value with new input at specified cursor position

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
}

// Export context for use in hook
export { CalculatorContext };
