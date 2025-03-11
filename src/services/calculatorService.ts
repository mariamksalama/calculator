import { isOperator } from '../utils/buttonUtils';

const performOperation = (a: number, b: number, operation: string): number => {
  switch (operation) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return b !== 0 ? a / b : NaN;
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
      // Handle negative numbers
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

    let result = parseFloat(parts[0]);

    // Process each operation in sequence
    for (let i = 1; i < parts.length; i += 2) {
      const operation = parts[i];
      const nextNumber = parseFloat(parts[i + 1]);

      if (!isOperator(operation) || isNaN(nextNumber)) {
        throw new Error('Invalid expression');
      }

      result = performOperation(result, nextNumber, operation);

      if (isNaN(result) || !isFinite(result)) {
        return 'Error';
      }
    }

    return Number.isInteger(result) ? result.toString() : result.toFixed(8).replace(/\.?0+$/, '');
  } catch {
    return 'Error';
  }
};
