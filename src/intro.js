// Lesson: Writing your first tests
export const max = (a, b) => (a > b ? a : b);

// Exercise
export const fizzBuzz = (n) => {
	if (n % 3 === 0 && n % 5 === 0) return 'FizzBuzz';
	if (n % 3 === 0) return 'Fizz';
	if (n % 5 === 0) return 'Buzz';
	return n.toString();
};

export const calculateAverage = (numbers) => {
	if (!Array.isArray(numbers)) return NaN;
	if (numbers.length === 0) return NaN;
	const sum = numbers.reduce((total, current) => {
		if (isNaN(parseInt(current))) return NaN;
		return total + parseInt(current);
	}, 0);
	return sum / numbers.length;
};
