import { it, expect, describe } from 'vitest';
import { max } from '../src/intro';

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
