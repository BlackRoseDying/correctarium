const calculatePrice = require('../calculatePrice');

describe('Price:', () => {
	test('symbols amount less than minimal amount with ru language', () => {
		expect(calculatePrice(10, 'ru')).toBe('50.00');
	});

	test('symbols amount less than minimal amount with uk language', () => {
		expect(calculatePrice(23, 'uk')).toBe('50.00');
	});

	test('symbols amount less than minimal amount with en language', () => {
		expect(calculatePrice(104, 'en')).toBe('120.00');
	});

	test('symbols amount equals 0 with ru language', () => {
		expect(calculatePrice(0, 'ru')).toBe('0.00');
	});

	test('symbols amount equals 0 with uk language', () => {
		expect(calculatePrice(0, 'uk')).toBe('0.00');
	});

	test('symbols amount equals 0 with en language', () => {
		expect(calculatePrice(0, 'en')).toBe('0.00');
	});

	test('symbols amount greater than minimal amount with ru language', () => {
		expect(calculatePrice(2131, 'ru')).toBe('106.55');
	});

	test('symbols amount greater than minimal amount with uk language', () => {
		expect(calculatePrice(3076, 'uk')).toBe('153.80');
	});

	test('symbols amount greater than minimal amount with en language', () => {
		expect(calculatePrice(10600, 'en')).toBe('1272.00');
	});
});