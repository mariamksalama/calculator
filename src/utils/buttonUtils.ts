import { VariantTypes } from '../types/buttonTypes';

interface ButtonConfig {
  value: string;
  variant: VariantTypes;
  ariaLabel: string;
}

export const controlButtons: ButtonConfig[] = [
  //   { value: 'del', variant: 'control', ariaLabel: 'Delete' },
  { value: '=', variant: 'control', ariaLabel: 'Equal' },
  { value: 'ac', variant: 'control', ariaLabel: 'Clear all' },
  { value: '+/-', variant: 'control', ariaLabel: 'Toggle positive negative' },
];

export const operatorButtons: ButtonConfig[] = [
  { value: '%', variant: 'operator', ariaLabel: 'Modulos' },
  { value: '÷', variant: 'operator', ariaLabel: 'Divide' },
  { value: '×', variant: 'operator', ariaLabel: 'Multiply' },
  { value: '-', variant: 'operator', ariaLabel: 'Subtract' },
  { value: '+', variant: 'operator', ariaLabel: 'Add' },
];

export const numberButtons: ButtonConfig[] = [
  ...Array.from({ length: 9 }, (_, i) => ({
    value: (i + 1).toString(),
    variant: 'number' as const,
    ariaLabel: `Number ${i + 1}`,
  })),
  {
    value: '0',
    variant: 'number' as const,
    ariaLabel: 'Number 0',
  },
];

export const decimalButton: ButtonConfig = {
  value: '.',
  variant: 'number',
  ariaLabel: 'Decimal point',
};

export const getButtonColor = (variant: VariantTypes) => {
  switch (variant) {
    case 'operator':
      return '#E46962';
    case 'control':
      return '#65558F';
    case 'decimal':
      return '#4A4459';
    case 'number':
      return '#4A4459';
    default:
      return '#4A4459';
  }
};
