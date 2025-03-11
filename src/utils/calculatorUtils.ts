import { isOperator } from './buttonUtils';

const operatorPrecedence = (op: string): number => {
  switch (op) {
    case '+':
    case '-':
      return 1;
    case '×':
    case '÷':
    case '%':
      return 2;
    default:
      return 0;
  }
};

const performOperation = (a: number, b: number, operation: string): number => {
  switch (operation) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '×':
      return a * b;
    case '÷':
      return b !== 0 ? a / b : NaN;
    case '%':
      return b !== 0 ? a % b : NaN;
    default:
      return NaN;
  }
};

const splitExpression = (expression: string): string[] => {
  const result: string[] = [];
  let currentNumber = '';

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    if (isOperator(char)) {
      if (currentNumber) {
        result.push(currentNumber);
        currentNumber = '';
      }
      if (char === '-' && (i === 0 || isOperator(expression[i - 1]))) {
        currentNumber = '-';
      } else {
        result.push(char);
      }
    } else {
      currentNumber += char;
    }
  }

  if (currentNumber) {
    result.push(currentNumber);
  }

  return result;
};

export const calculateResult = (expression: string): string => {
  try {
    const parts = splitExpression(expression);

    if (parts.length === 0) return '0';
    if (parts.length === 1) return parts[0];

    // First pass: handle multiplication, division, and modulus (higher precedence)
    let numberStack: number[] = [];
    let operatorStack: string[] = [];

    for (let i = 0; i < parts.length; i++) {
      const token = parts[i];

      if (isOperator(token)) {
        // Handle operators with higher precedence (×, ÷, %)
        while (
          operatorStack.length > 0 &&
          operatorPrecedence(operatorStack[operatorStack.length - 1]) >= operatorPrecedence(token)
        ) {
          const operator = operatorStack.pop()!;
          const b = numberStack.pop()!;
          const a = numberStack.pop()!;
          const result = performOperation(a, b, operator);
          numberStack.push(result);
        }
        operatorStack.push(token);
      } else {
        numberStack.push(parseFloat(token));
      }
    }

    // Second pass: handle addition and subtraction (lower precedence)
    while (operatorStack.length > 0) {
      const operator = operatorStack.pop()!;
      const b = numberStack.pop()!;
      const a = numberStack.pop()!;
      const result = performOperation(a, b, operator);
      numberStack.push(result);
    }

    const result = numberStack.pop()!;
    return Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, '');
  } catch {
    return 'Error';
  }
};

export const handleCalculatorInput = (
  currentValue: string,
  buttonValue: string,
  isOperator?: boolean
): string => {
  switch (buttonValue) {
    case 'ac':
      return '0';
    case 'del':
      return currentValue.length > 1 ? currentValue.slice(0, -1) : '0';
    case '+/-':
      if (currentValue === '0') return currentValue;
      return currentValue.startsWith('-') ? currentValue.slice(1) : '-' + currentValue;
    default:
      if (currentValue === '0' && !isOperator) return buttonValue;

      if (isOperator) {
        if (
          currentValue.endsWith('+') ||
          currentValue.endsWith('-') ||
          currentValue.endsWith('×') ||
          currentValue.endsWith('÷') ||
          currentValue.endsWith('%')
        ) {
          return currentValue.slice(0, -1) + buttonValue;
        }
        return currentValue + buttonValue;
      }

      return currentValue + buttonValue;
  }
};
