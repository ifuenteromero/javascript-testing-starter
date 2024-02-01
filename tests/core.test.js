import { it, expect, describe } from 'vitest';
import {
	calculateDiscount,
	getCoupons,
	isPriceInRange,
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
