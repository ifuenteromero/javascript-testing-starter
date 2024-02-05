import { vi, it, expect, describe, beforeEach } from 'vitest';
import {
	getDiscount,
	getPriceInCurrency,
	getShippingInfo,
	isOnline,
	login,
	renderPage,
	signUp,
	submitOrder,
} from '../src/mocking';
import { getExchangeRate } from '../src/libs/currency';
import { getShippingQuote } from '../src/libs/shipping';
import { trackPageView } from '../src/libs/analytics';
import { charge } from '../src/libs/payment';
import { sendEmail } from '../src/libs/email';
import security from '../src/libs/security';

vi.mock('../src/libs/currency');
vi.mock('../src/libs/shipping');
vi.mock('../src/libs/analytics');
vi.mock('../src/libs/payment');
vi.mock('../src/libs/email', async (importOriginal) => {
	const originalModule = await importOriginal();
	return {
		...originalModule,
		sendEmail: vi.fn(),
	};
});

// A mock function is a function that imitates the behaviour of a real function
// We use them to test a unit in asolation
// Si tenemos una functionA que utiliza una functionB. Para testear la functionA in asolation
// we have to decouple A from functionB para eso usamos mocks
// We replace the real implementation of function B with a mock function that we can control
// in our tests

describe('test suite', () => {
	it('test case', () => {
		const greet = vi.fn(); // esto retorna una mock function
		// si la ejecutamos greet() por defecto retorna undefined
		greet.mockReturnValue('Hello');
		const result = greet(); //*1
		console.log({ result });

		const promise = vi.fn();
		promise.mockResolvedValue('Irene');
		promise().then((resultPromise) => console.log({ resultPromise })); //*2

		///
		const sum = vi.fn();
		sum.mockImplementation((a) => a + 3);
		const resultSum = sum(102); // 3
		console.log({ resultSum });

		//
		expect(greet).toHaveBeenCalled(); //*1
		expect(promise).toHaveBeenCalled(); //*2
		expect(sum).toHaveBeenCalled(); // 3

		expect(sum).toHaveBeenCalledWith(102);

		expect(greet).toHaveBeenCalledOnce(); //*1
		expect(promise).toHaveBeenCalledOnce(); //*2
		expect(sum).toHaveBeenCalledOnce(); // 3
	});
});

describe('sendText', () => {
	it('test case', () => {
		const sendText = vi.fn();
		sendText.mockReturnValue('ok');
		const result = sendText('message');
		expect(sendText).toHaveBeenCalledWith('message');
		expect(result).toBe('ok');
	});
});

describe('getPriceInCurrency', () => {
	it('should return the price in the current currency', () => {
		vi.mocked(getExchangeRate).mockReturnValue(1.5);
		const price = getPriceInCurrency(10, 'AUD');
		expect(price).toBe(15);
	});
});

describe('getShippingInfo', () => {
	it('should return shipping unavailable if quote cannot be fetched', () => {
		vi.mocked(getShippingQuote).mockReturnValue(null);
		const info = getShippingInfo('London');
		expect(info).toMatch(/unavailable/i);
	});
	it('should return shipping info if quote can be fetched', () => {
		vi.mocked(getShippingQuote).mockReturnValue({
			cost: 11,
			estimatedDays: 2,
		});
		const info = getShippingInfo('London');
		expect(info).toMatch('$11');
		expect(info).toMatch(/\$11/i);
		expect(info).toMatch(/2 days/i);
		expect(info).toMatch(/shipping cost: \$11 \(2 days\)/i);
	});
});

describe('renderPage', () => {
	it('should return correct content', async () => {
		const result = await renderPage();
		expect(result).toMatch(/content/i);
	});
	it('should call analytics', async () => {
		await renderPage();
		expect(trackPageView).toHaveBeenCalledWith('/home');
	});
});

describe('submitOrder', () => {
	const order = { totalAmount: 10 };
	const creditCard = { creditCardNumber: '1234' };

	it('should charge the customer', async () => {
		vi.mocked(charge).mockResolvedValue({ status: 'success' });
		await submitOrder(order, creditCard);
		expect(charge).toBeCalledWith(creditCard, order.totalAmount);
	});

	it('should return success when payment is successful', async () => {
		vi.mocked(charge).mockResolvedValue({
			status: 'success',
		});
		const result = await submitOrder(order, creditCard);
		expect(result).toEqual({ success: true });
	});

	it('should return failed when payment is failed', async () => {
		vi.mocked(charge).mockResolvedValue({ status: 'failed' });
		const result = await submitOrder(order, creditCard);
		expect(result).toEqual({ success: false, error: 'payment_error' });
	});
});

describe('signUp', () => {
	// beforeEach(() => {
	// 	vi.mocked(sendEmail).mockClear();
	// 	vi.clearAllMocks();
	// });
	const email = 'name@domain.com';
	it('should return true if a valid email is given', async () => {
		const result = await signUp(email);
		expect(result).toBe(true);
	});
	it('should return false if invalid email is given', async () => {
		const result = await signUp('a');
		expect(result).toBe(false);
	});
	it('should send the welcome email if email is valid', async () => {
		await signUp(email);
		expect(sendEmail).toHaveBeenCalledOnce();
		const [[emailTo, message]] = vi.mocked(sendEmail).mock.calls;
		expect(emailTo).toBe(email);
		expect(message).toMatch(/welcome/i);
	});
});

describe('login', () => {
	it('should email the one-time login code ', async () => {
		const email = 'name@domain.com';
		const spy = vi.spyOn(security, 'generateCode');
		await login(email);
		const securityCode = spy.mock.results[0].value.toString();
		expect(sendEmail).toHaveBeenCalledWith(email, securityCode);
	});
});

describe('isOnline', () => {
	it('should return false if current hour is outside opening hours', () => {
		vi.setSystemTime('05-02-2024 07:59');
		expect(isOnline()).toBe(false);
		vi.setSystemTime('05-02-2024 20:00');
		expect(isOnline()).toBe(false);
	});
	it('should return true if current hour is within opening hours', () => {
		vi.setSystemTime('05-02-2024 08:00');
		expect(isOnline()).toBe(true);
		vi.setSystemTime('05-02-2024 12:30');
		expect(isOnline()).toBe(true);
		vi.setSystemTime('05-02-2024 19:59');
		expect(isOnline()).toBe(true);
	});
});

describe('getDiscount', () => {
	it('should return 0.2 on Christmas day', () => {
		vi.setSystemTime('12-25-2024 00:00');
		expect(getDiscount()).toBe(0.2);
		vi.setSystemTime('12-25-2024 23:59');
		expect(getDiscount()).toBe(0.2);
		vi.setSystemTime('12-25-2024 12:59');
		expect(getDiscount()).toBe(0.2);
	});
	it('should return 0 on any other day', () => {
		vi.setSystemTime('12-26-2024 00:00');
		expect(getDiscount()).toBe(0);
		vi.setSystemTime('12-26-2024 12:00');
		expect(getDiscount()).toBe(0);
		vi.setSystemTime('12-24-2024 23:59');
		expect(getDiscount()).toBe(0);
	});
});
