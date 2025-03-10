export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '24px',
  xl: '32px',
} as const;

export const typography = {
  display: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '2rem',
    fontWeight: 500,
    lineHeight: 1.2,
  },
  title: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '1.5rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  button: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.5,
  },
} as const;

export const colors = {
  // Background colors
  background: {
    primary: '#000000',
    secondary: '#1C1C1E',
    tertiary: '#2C2C2E',
  },

  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#8E8E93',
    tertiary: '#C7C7CC',
  },

  // Button colors
  button: {
    number: '#4A4459',
    operator: '#E46962',
    control: '#65558F',
    decimal: '#4A4459',
    action: '#E46962',
    hover: {
      number: '#666666',
      operator: '#FFB340',
      control: '#C7C7CC',
      decimal: '#666666',
      action: '#C7C7CC',
      equals: '#FFB340',
    },
  },
} as const;

export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '16px',
  xl: '24px',
  full: '100px',
} as const;

export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
} as const;
