import { it, expect, describe } from 'vitest';
import { calculateDiscount, getCoupons } from '../src/core';

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
