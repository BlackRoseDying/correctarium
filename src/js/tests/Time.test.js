const Time = require('../Time');

describe('Time:', () => {
	const time = new Time();

	test(`working time is 1 hour. Order accepted at 10:23 on Friday`, () => {
		const initialDate = new Date(2020, 8, 11, 10, 23, 0, 0),
			executionDate = new Date(2020, 8, 11, 11, 23, 0, 0);

		expect(time.calculateExecutionTime(10, 'en', initialDate)).toEqual(executionDate);
	});

	test(`working time is 1 hour. Order accepted at 7:54 on Friday`, () => {
		const initialDate = new Date(2020, 8, 11, 7, 54, 0, 0),
			executionDate = new Date(2020, 8, 11, 11, 0, 0, 0);

		expect(time.calculateExecutionTime(54, 'en', initialDate)).toEqual(executionDate);
	});

	test(`working time is 1 hour. Order accepted at 15:02 on Friday`, () => {
		const initialDate = new Date(2020, 8, 11, 15, 2, 0, 0),
			executionDate = new Date(2020, 8, 11, 16, 2, 0, 0);

		expect(time.calculateExecutionTime(1112, 'ru', initialDate)).toEqual(executionDate);
	});

	test(`working time is 1 hour. Order accepted at 18:16 on Friday`, () => {
		const initialDate = new Date(2020, 8, 11, 18, 16, 0, 0),
			executionDate = new Date(2020, 8, 14, 10, 16, 0, 0);

		expect(time.calculateExecutionTime(255, 'en', initialDate)).toEqual(executionDate);
	});

	test(`working time is 1 hour. Order accepted at 13:32 on Saturday`, () => {
		const initialDate = new Date(2020, 8, 12, 13, 32, 0, 0),
			executionDate = new Date(2020, 8, 14, 11, 0, 0, 0);

		expect(time.calculateExecutionTime(255, 'en', initialDate)).toEqual(executionDate);
	});

	test(`working time is 1 hour. Order accepted at 20:20 on Sunday`, () => {
		const initialDate = new Date(2020, 8, 13, 20, 20, 0, 0),
			executionDate = new Date(2020, 8, 14, 11, 0, 0, 0);

		expect(time.calculateExecutionTime(1333, 'uk', initialDate)).toEqual(executionDate);
	});

	test(`working time is 1 day and 3 hours. Order accepted at 10:48 on Monday`, () => {
		const initialDate = new Date(2020, 8, 14, 10, 48, 0, 0),
			executionDate = new Date(2020, 8, 15, 13, 48, 0, 0);

		expect(time.calculateExecutionTime(3999, 'en', initialDate)).toEqual(executionDate);
	});

	test(`working time is 1 day, 4 hours and 30 minutes. Order accepted at 15:35 on Friday`, () => {
		const initialDate = new Date(2020, 8, 11, 15, 35, 0, 0),
			executionDate = new Date(2020, 8, 15, 11, 5, 0, 0);

		expect(time.calculateExecutionTime(17996, 'ru', initialDate)).toEqual(executionDate);
	});

	test(`working time is 10 days and 30 minutes. Order accepted at 12:03 on Wednesday. This is last Wednesday in month`, () => {
		const initialDate = new Date(2020, 8, 30, 12, 3, 0, 0),
			executionDate = new Date(2020, 9, 14, 12, 33, 0, 0);

		expect(time.calculateExecutionTime(120637, 'uk', initialDate)).toEqual(executionDate);
	});

	test(`working time is 6 days and 30 minutes. Order accepted at 9:57 on Sunday to Saturday`, () => {
		const initialDate = new Date(2020, 8, 13, 9, 57, 0, 0),
			executionDate = new Date(2020, 8, 22, 10, 30, 0, 0);

		expect(time.calculateExecutionTime(18149, 'en', initialDate)).toEqual(executionDate);
	});

	test(`working time is 7 days and 30 minutes. Order accepted at 23:29 on Saturday to Sunday`, () => {
		const initialDate = new Date(2020, 8, 12, 23, 29, 0, 0),
			executionDate = new Date(2020, 8, 23, 10, 30, 0, 0);

		expect(time.calculateExecutionTime(21146, 'en', initialDate)).toEqual(executionDate);
	});

	test(`working time is 7 days and 1 hour. Order accepted at 18:42 on Saturday to Saturday`, () => {
		const initialDate = new Date(2020, 8, 12, 18, 42, 0, 0),
			executionDate = new Date(2020, 8, 23, 11, 0, 0, 0);

		expect(time.calculateExecutionTime(85312, 'ru', initialDate)).toEqual(executionDate);
	});

	test(`working time is 7 days and 5 hour. Order accepted at 2:25 on Sunday to Sunday`, () => {
		const initialDate = new Date(2020, 8, 13, 2, 25, 0, 0),
			executionDate = new Date(2020, 8, 23, 15, 0, 0, 0);

		expect(time.calculateExecutionTime(90644, 'uk', initialDate)).toEqual(executionDate);
	});
});