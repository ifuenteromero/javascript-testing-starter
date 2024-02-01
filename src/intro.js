// Lesson: Writing your first tests
export const max = (a, b) => (a > b ? a : b);

// Exercise
export const fizzBuzz = (n) => {
	if (n % 3 === 0 && n % 5 === 0) return 'FizzBuzz';
	if (n % 3 === 0) return 'Fizz';
	if (n % 5 === 0) return 'Buzz';
	return n.toString();
};
