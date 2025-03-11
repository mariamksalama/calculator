import { calculateResult } from './calculatorUtils';

describe('Calculator Operations', () => {
  // Basic Operations
  test('adds two numbers correctly', () => {
    expect(calculateResult('5+3')).toBe('8');
    expect(calculateResult('10.5+2.5')).toBe('13');
    expect(calculateResult('-5+3')).toBe('-2');
  });

  test('subtracts two numbers correctly', () => {
    expect(calculateResult('8-3')).toBe('5');
    expect(calculateResult('10.5-2.5')).toBe('8');
    expect(calculateResult('-5-3')).toBe('-8');
  });

  test('multiplies two numbers correctly', () => {
    expect(calculateResult('4*3')).toBe('12');
    expect(calculateResult('2.5*2')).toBe('5');
    expect(calculateResult('-5*3')).toBe('-15');
  });

  test('divides two numbers correctly', () => {
    expect(calculateResult('15/3')).toBe('5');
    expect(calculateResult('10/2')).toBe('5');
    expect(calculateResult('-15/3')).toBe('-5');
  });

  test('calculates modulus correctly', () => {
    expect(calculateResult('17%5')).toBe('2');
    expect(calculateResult('10%3')).toBe('1');
    expect(calculateResult('25%4')).toBe('1');
  });

  // Edge Cases
  test('handles division by zero', () => {
    expect(calculateResult('5/0')).toBe('Error');
    expect(calculateResult('10%0')).toBe('Error');
  });

  test('handles decimal results correctly', () => {
    expect(calculateResult('10/3')).toBe('3.33333333');
    expect(calculateResult('2.5*2.5')).toBe('6.25');
  });

  test('handles multiple operations in sequence', () => {
    expect(calculateResult('5+3-2')).toBe('6');
    expect(calculateResult('10*2/4')).toBe('5');
    expect(calculateResult('15%7+2')).toBe('3');
  });

  // Invalid Input Cases
  test('handles invalid expressions', () => {
    expect(calculateResult('')).toBe('0');
    expect(calculateResult('5+')).toBe('Error');
    expect(calculateResult('+5')).toBe('Error');
  });

  // Complex Expressions
  test('handles complex expressions correctly', () => {
    expect(calculateResult('10+5*2')).toBe('20');
    expect(calculateResult('20/2+3')).toBe('13');
    expect(calculateResult('100%30*3')).toBe('30');
  });

  // Negative Number Cases
  test('handles negative numbers correctly', () => {
    expect(calculateResult('-10+5')).toBe('-5');
    expect(calculateResult('10*-5')).toBe('-50');
    expect(calculateResult('-15/-3')).toBe('5');
    expect(calculateResult('-17%5')).toBe('-2');
  });
});
