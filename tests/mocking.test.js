import { vi, it, expect, describe } from 'vitest';

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
