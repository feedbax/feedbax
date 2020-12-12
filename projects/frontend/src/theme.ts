export const colors = {
  first: '#3a5568',
  second: '#ff7d65',
  third: '#ffffff',
  fourth: '#1f1f1f',
  transparent: 'rgba(0, 0, 0, 0)',
} as const;

export type Colors = keyof typeof colors;
