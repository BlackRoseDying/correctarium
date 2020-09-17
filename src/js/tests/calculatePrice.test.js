const calculatePrice = require('../calculatePrice');

describe('Price:', () => {
	test.each`
    symbCount  | language | result
    ${10}      | ${'ru'}  | ${'50.00'}
    ${23}      | ${'uk'}  | ${'50.00'}
    ${104}     | ${'en'}  | ${'120.00'}
    ${0}       | ${'ru'}  | ${'0.00'}
    ${0}       | ${'uk'}  | ${'0.00'}
    ${0}       | ${'en'}  | ${'0.00'}
    ${2131}    | ${'ru'}  | ${'106.55'}
    ${3076}    | ${'uk'}  | ${'153.80'}
    ${10600}   | ${'en'}  | ${'1272.00'}
  `('calculatePrice__table', ({ symbCount, language, result }) => {
			expect(calculatePrice(symbCount, language)).toBe(result);
		}
	);
});

