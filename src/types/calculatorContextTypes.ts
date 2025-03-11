export interface CalculationHistory {
  expression: string;
  result: string;
  timestamp: Date;
}

export interface CalculatorContextType {
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
