import { vi, it, expect, describe } from 'vitest';
import { getPriceInCurrency, getShippingInfo } from '../src/mocking';
import { getExchangeRate } from '../src/libs/currency';
import { getShippingQuote } from '../src/libs/shipping';

vi.mock('../src/libs/currency');
vi.mock('../src/libs/shipping');

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
