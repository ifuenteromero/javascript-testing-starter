import { it, expect, describe } from 'vitest';
import { fizzBuzz, max } from '../src/intro';

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
