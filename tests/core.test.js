import { it, expect, describe } from 'vitest';
import { getCoupons } from '../src/core';

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
