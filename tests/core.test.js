import { it, expect, describe } from 'vitest';
import {
	calculateDiscount,
	canDrive,
	getCoupons,
	isPriceInRange,
	isValidUsername,
	validateUserInput,
} from '../src/core';

describe('getCoupons', () => {
	const coupons = getCoupons();
	it('should return a non empty array', () => {
		expect(Array.isArray(coupons)).toBe(true);
		expect(coupons.length).toBeGreaterThan(0);
	});
	it('should return an array with valid codes', () => {
		coupons.forEach((coupon) => {
			expect(coupon).toHaveProperty('code');
			expect(typeof coupon.code).toBe('string');
			expect(coupon.code).toBeTruthy();
			expect(coupon.code).toBe(coupon.code.toUpperCase());
		});
	});
	it('should return an array with valid discounts', () => {
		coupons.forEach((coupon) => {
			expect(coupon).toHaveProperty('discount');
			expect(typeof coupon.discount).toBe('number');
			expect(coupon.discount).toBeGreaterThanOrEqual(0);
			expect(coupon.discount).toBeLessThanOrEqual(1);
		});
	});
});

describe('calculateDiscount', () => {
	it('should return discounted price if given valid code', () => {
		expect(calculateDiscount(10, 'SAVE10')).toBe(9);
		expect(calculateDiscount(10, 'SAVE20')).toBe(8);
	});
	it('should handle non-numeric price', () => {
		expect(calculateDiscount('10', 'SAVE10')).toMatch(/invalid/i);
		expect(calculateDiscount('10', 'INVALIDCODE')).toMatch(/invalid/i);
	});
	it('should handle non-string discount code', () => {
		expect(calculateDiscount(10, 10)).toMatch(/invalid/i);
		expect(calculateDiscount('10', 1)).toMatch(/invalid/i);
	});
	it('should handle negative price', () => {
		expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i);
	});
	it('should handle invalid discount code', () => {
		expect(calculateDiscount(10, '')).toBe(10);
	});
});

describe('validateUserInput', () => {
	it('should return success if given valid input', () => {
		expect(validateUserInput('mosh', 42)).toMatch(/success/i);
	});

	it('should return an error if username is not a string', () => {
		expect(validateUserInput(1, 42)).toMatch(/invalid/i);
	});

	it('should return an error if username is less than 3 characters', () => {
		expect(validateUserInput('mo', 42)).toMatch(/invalid/i);
	});

	it('should return an error if username is longer than 255 characters', () => {
		expect(validateUserInput('A'.repeat(256), 42)).toMatch(/invalid/i);
	});

	it('should return an error if age is not a number', () => {
		expect(validateUserInput('mosh', '42')).toMatch(/invalid/i);
	});

	it('should return an error if age is less than 18', () => {
		expect(validateUserInput('mosh', 17)).toMatch(/invalid/i);
	});

	it('should return an error if age is greater than 100', () => {
		expect(validateUserInput('mosh', 101)).toMatch(/invalid/i);
	});

	it('should return an error if both username and age are invalid', () => {
		expect(validateUserInput('', 0)).toMatch(/invalid username/i);
		expect(validateUserInput('', 0)).toMatch(/invalid age/i);
	});
});

describe('isPriceInRange', () => {
	it('should return false when the price is outside the range', () => {
		expect(isPriceInRange(-10, 0, 100)).toBe(false);
		expect(isPriceInRange(200, 0, 100)).toBe(false);
	});
	it('should return true when the price is within the range', () => {
		expect(isPriceInRange(50, 0, 100)).toBe(true);
	});
	it('should return true when the price is equal to the min or to the max', () => {
		expect(isPriceInRange(0, 0, 100)).toBe(true);
		expect(isPriceInRange(100, 0, 100)).toBe(true);
		expect(isPriceInRange(100, 100, 100)).toBe(true);
	});
	it('should return false when the range is invalid', () => {
		expect(isPriceInRange(-10, 100, 0)).toBe(false);
		expect(isPriceInRange(200, 100, 0)).toBe(false);
		expect(isPriceInRange(50, 100, 0)).toBe(false);
		expect(isPriceInRange(0, 100, 0)).toBe(false);
		expect(isPriceInRange(100, 100, 0)).toBe(false);
	});
});

describe('isPriceInRange2', () => {
	it.each([
		{ price: -10, min: 0, max: 100, result: false },

		{ price: 200, min: 0, max: 100, result: false },
		{ price: 50, min: 0, max: 100, result: true },
		{ price: 0, min: 0, max: 100, result: true },
		{ price: 100, min: 0, max: 100, result: true },
		{ price: 100, min: 100, max: 100, result: true },
		{ price: -10, min: 100, max: 0, result: false },
		{ price: 200, min: 100, max: 0, result: false },
		{ price: 50, min: 100, max: 0, result: false },
		{ price: 0, min: 100, max: 0, result: false },
		{ price: 100, min: 100, max: 0, result: false },
	])(
		'should return $result for price $price, min $min, max $max',
		({ price, min, max, result }) => {
			expect(isPriceInRange(price, min, max)).toBe(result);
		}
	);
});

describe('isValidUsername', () => {
	const minLength = 5;
	const maxLength = 15;
	it('should return false if username is too short', () => {
		expect(isValidUsername('A'.repeat(minLength - 1))).toBe(false);
	});
	it('should return false if username is too long', () => {
		expect(isValidUsername('A'.repeat(maxLength + 1))).toBe(false);
	});
	it('should return true if usernameis is at the min or max length', () => {
		expect(isValidUsername('A'.repeat(minLength))).toBe(true);
		expect(isValidUsername('A'.repeat(maxLength))).toBe(true);
	});
	it('should return true if usernameis is within the length constraint', () => {
		expect(isValidUsername('A'.repeat(minLength + 1))).toBe(true);
		expect(isValidUsername('A'.repeat(maxLength - 1))).toBe(true);
	});
	it('should return true if is a valid range', () => {
		expect(typeof minLength === 'number').toBe(true);
		expect(typeof maxLength === 'number').toBe(true);
		expect(isFinite(minLength)).toBe(true);
		expect(isFinite(maxLength)).toBe(true);
		expect(Number.isInteger(minLength)).toBe(true);
		expect(Number.isInteger(maxLength)).toBe(true);
		expect(minLength).toBeGreaterThan(0);
		expect(maxLength).toBeGreaterThan(0);
		expect(maxLength - minLength).toBeGreaterThan(0);
	});
	it('should return false if is a invalid username', () => {
		expect(isValidUsername(null)).toBe(false);
		expect(isValidUsername(undefined)).toBe(false);
	});
});

describe('canDrive', () => {
	it('should return error for invalid country code', () => {
		expect(canDrive(30, 'FR')).toMatch(/invalid/i);
	});

	it.each([
		{ age: 15, country: 'US', result: false },
		{ age: 16, country: 'US', result: true },
		{ age: 17, country: 'US', result: true },
		{ age: 16, country: 'UK', result: false },
		{ age: 17, country: 'UK', result: true },
		{ age: 18, country: 'UK', result: true },
	])(
		'should return $result for $age, $country',
		({ age, country, result }) => {
			expect(canDrive(age, country)).toBe(result);
		}
	);
});
