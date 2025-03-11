import { isOperator } from './buttonUtils';

// Define operators and their precedence levels
const OPERATOR_PRECEDENCE: Record<string, number> = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '%': 2,
};

// Perform arithmetic operations
const performOperation = (a: number, b: number, operator: string): number => {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return b !== 0 ? a / b : NaN;
    case '%':
      return b !== 0 ? a % b : NaN;
    default:
      return NaN;
  }
};

// Format number to remove trailing zeros
const formatNumber = (num: number): string => {
  if (!Number.isFinite(num)) return 'Error';
  return Number.isInteger(num) ? num.toString() : num.toFixed(8).replace(/\.?0+$/, '');
};

// Split expression into tokens while preserving negative numbers
const tokenizeExpression = (expression: string): string[] => {
  const tokens: string[] = [];
  let currentNumber = '';
  let isNegative = false;

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (char === '-' && (i === 0 || isOperator(expression[i - 1]))) {
      isNegative = true;
      continue;
    }

    if (isOperator(char)) {
      if (currentNumber) {
        tokens.push(isNegative ? '-' + currentNumber : currentNumber);
        currentNumber = '';
        isNegative = false;
      }
      tokens.push(char);
    } else {
      currentNumber += char;
    }
  }

  if (currentNumber) {
    tokens.push(isNegative ? '-' + currentNumber : currentNumber);
  }

  return tokens;
};

export const calculateResult = (expression: string): string => {
  try {
    const tokens = tokenizeExpression(expression);
    if (tokens.length === 0) return '0';
    if (tokens.length === 1) return tokens[0];

    const numbers: number[] = [];
    const operators: string[] = [];

    // Process each token
    tokens.forEach((token) => {
      if (isOperator(token)) {
        while (
          operators.length > 0 &&
          OPERATOR_PRECEDENCE[operators[operators.length - 1]] >= OPERATOR_PRECEDENCE[token]
        ) {
          const operator = operators.pop()!;
          const b = numbers.pop()!;
          const a = numbers.pop()!;
          numbers.push(performOperation(a, b, operator));
        }
        operators.push(token);
      } else {
        numbers.push(parseFloat(token));
      }
    });

    // Process remaining operators
    while (operators.length > 0) {
      const operator = operators.pop()!;
      const b = numbers.pop()!;
      const a = numbers.pop()!;
      numbers.push(performOperation(a, b, operator));
    }

    return formatNumber(numbers[0]);
  } catch {
    return 'Error';
  }
};

// Check if expression ends with an operator
const endsWithOperator = (value: string): boolean => {
  return /[+\-*/%]$/.test(value);
};

export const handleCalculatorInput = (
  currentValue: string,
  buttonValue: string,
  isOperator?: boolean
): string => {
  // Handle special operations
  switch (buttonValue) {
    case 'ac':
      return '0';
    case 'del':
      return currentValue.length > 1 ? currentValue.slice(0, -1) : '0';
    case '+/-':
      if (currentValue === '0') return currentValue;
      return currentValue.startsWith('-') ? currentValue.slice(1) : '-' + currentValue;
  }

  // Handle regular input
  if (currentValue === '0') {
    if (buttonValue === '-') return '-';
    if (!isOperator) return buttonValue;
  }

  if (isOperator) {
    return endsWithOperator(currentValue)
      ? currentValue.slice(0, -1) + buttonValue
      : currentValue + buttonValue;
  }

  return currentValue + buttonValue;
};
