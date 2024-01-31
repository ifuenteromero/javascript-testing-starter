import { it, expect, describe } from 'vitest';
import { calculateAverage, factorial, fizzBuzz, max } from '../src/intro';

describe('max', () => {
	it('should return the first argument if it is greater', () => {
		// AAA
		// Arrange: Turn on the TV
		const a = 2;
		const b = 1;
		// Act: Press the power button
		const result = max(a, b);

		// Assert: Verify TV is off
		expect(result).toBe(2);
	});
	it('should return the second argument if it is greater', () => {
		// AAA
		// Arrange: Turn on the TV
		const a = 1;
		const b = 2;
		// Act: Press the power button
		const result = max(a, b);

		// Assert: Verify TV is off
		expect(result).toBe(2);
	});
	it('should return the first argument if they are equal', () => {
		// AAA
		// Arrange: Turn on the TV
		const a = 1;
		const b = 1;
		// Act: Press the power button
		const result = max(a, b);

		// Assert: Verify TV is off
		expect(result).toBe(1);
	});
});

describe('fizzBuzz', () => {
	it('should return FizzBuzz if argument is divisible by 3 AND 5', () => {
		expect(fizzBuzz(30)).toBe('FizzBuzz');
	});
	it('should return Fizz if argument is only divisible by 3', () => {
		expect(fizzBuzz(9)).toBe('Fizz');
	});
	it('should return Buzz if argument is only divisible by 5', () => {
		expect(fizzBuzz(125)).toBe('Buzz');
	});
	it('should return arg as a string if it is no divisible by 3 or 5', () => {
		expect(fizzBuzz(4)).toBe('4');
	});
});

describe('calculateAverage', () => {
	it('should return NaN if numbers is an empty array', () => {
		expect(calculateAverage([])).toBe(NaN);
	});
	it('should return NaN if is not an array', () => {
		expect(calculateAverage('2')).toBe(NaN);
	});
	it('should return NaN if is not an array', () => {
		expect(calculateAverage({ a: 2 })).toBe(NaN);
	});
	it('should return NaN if some element in numbers is not a number or a string number', () => {
		expect(calculateAverage([false])).toBe(NaN);
	});
	it('should return NaN if some element in numbers is not a number or a finite number', () => {
		expect(calculateAverage([1, Infinity])).toBe(NaN);
	});
	it('should return NaN if some element in numbers is not a number or a finite number', () => {
		expect(calculateAverage([1, NaN, []])).toBe(NaN);
	});
	it('should return the average if is a string number', () => {
		expect(calculateAverage(['1'])).toBe(1);
	});
	it('should return the average if numbers has a string number', () => {
		expect(calculateAverage([2, '1'])).toBe(1.5);
	});
	it('should return the average if numbers has a string number', () => {
		expect(calculateAverage([2, '1', -3])).toBe(0);
	});
	it('should return the average if numbers has a string number', () => {
		expect(calculateAverage([2, '1', -3, 8, 0, 2])).toBe(5 / 3);
	});
});

describe('factorial', () => {
	it('should return NaN if argument is an empty array', () => {
		expect(factorial([])).toBe(NaN);
	});
	it('should return NaN if argument is an array of two numbers', () => {
		expect(factorial([-1, 2])).toBe(NaN);
	});
	it('should return NaN if argument is an object', () => {
		expect(factorial({ a: 2 })).toBe(NaN);
	});
	it('should return NaN if argument is a boolean', () => {
		expect(factorial(false)).toBe(NaN);
	});
	it('should return NaN if argument is a string but not a string number', () => {
		expect(factorial('hola')).toBe(NaN);
	});
	it('should return NaN if argument is null', () => {
		expect(factorial(null)).toBe(NaN);
	});
	it('should return NaN if argument is undefined', () => {
		expect(factorial(undefined)).toBe(NaN);
	});
	it('should return NaN if argument is a function', () => {
		expect(factorial((n) => n + 1)).toBe(NaN);
	});
	it('should return undefined if argument is Infinity', () => {
		expect(factorial(Infinity)).toBe(undefined);
	});
	it('should return undefined if argument is NaN', () => {
		expect(factorial(NaN)).toBe(undefined);
	});
	it('should return undefined if argument is a float', () => {
		expect(factorial(1.2)).toBe(undefined);
	});
	it('should return undefined if argument is an integer less than 0', () => {
		expect(factorial(-2)).toBe(undefined);
	});
	it('should return 1 if n is 0', () => {
		expect(factorial(0)).toBe(1);
	});
	it('should return 1 if n is `0`', () => {
		expect(factorial('0')).toBe(1);
	});
	it('should return 1 if n is 1', () => {
		expect(factorial(1)).toBe(1);
	});
	it('should return 1 if n is `1`', () => {
		expect(factorial('1')).toBe(1);
	});
	it('should return 2 if n is 2', () => {
		expect(factorial(2)).toBe(2);
	});
	it('should return 2 if n is ``2``', () => {
		expect(factorial('2')).toBe(2);
	});
	it('should return 6 if n is 3', () => {
		expect(factorial(3)).toBe(6);
	});
	it('should return 6 if n is ``3``', () => {
		expect(factorial('3')).toBe(6);
	});
	it('should return 120 if n is 5', () => {
		expect(factorial(5)).toBe(120);
	});
	it('should return 720 if n is 6', () => {
		expect(factorial(6)).toBe(720);
	});
});
