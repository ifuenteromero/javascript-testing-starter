export const calculateAverage = (numbers: number[]): number => {
  const countNumbers = numbers.length;
  if (countNumbers === 0) return NaN;
  const sum = numbers.reduce((total, current) => total + current, 0);
  return sum / countNumbers;
};
