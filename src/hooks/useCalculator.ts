/**
 * Calculator Hook Module
 *
 * Provides access to the calculator context and its functionality.
 * This hook must be used within a CalculatorProvider component.
 */

import { useContext } from 'react';
import { CalculatorContext } from '../context/CalculatorContext';
import type { CalculatorContextType } from '../types/calculatorContextTypes';

/**
 * useCalculator Hook
 *
 * A custom hook that provides access to the calculator's context.
 * Includes functionality for:
 * - Managing display value
 * - Handling operations
 * - Managing calculation history
 * - Controlling cursor position

 */
export function useCalculator(): CalculatorContextType {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
}
