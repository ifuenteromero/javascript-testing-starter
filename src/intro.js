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

export const factorial = (n) => {
	if (typeof n !== 'number' && typeof n !== 'string') return NaN;
	// quedan strings, numbers, Infinity, NaN
	if (Number.isNaN(n)) return undefined; // fuera NaN
	const float = parseFloat(n);
	if (isNaN(float)) return NaN; // fuera strings no numbers 'hola'
	if (!Number.isInteger(float)) return undefined; // fuera Infinity y float
	const number = parseInt(n);
	if (number < 0) return undefined;
	if (number === 0) return 1;
	return number * factorial(number - 1);
};
