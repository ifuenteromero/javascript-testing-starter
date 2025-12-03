export const calculateAverage = (numbers: number[]): number => {
  const countNumbers = numbers.length;
  if (countNumbers === 0) return NaN;
  const sum = numbers.reduce((total, current) => total + current, 0);
  return sum / countNumbers;
};

export const factorial = (n: number): number | undefined => {
  if (!Number.isInteger(n)) return undefined;
  if (n < 0) return undefined;
  if (n === 0 || n === 1) return 1;
  return n * (factorial(n - 1) as number);
};
