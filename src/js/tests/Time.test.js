const Time = require('../Time'),
	moment = require('moment-timezone');

describe('Time:', () => {
	const time = new Time();

	test.each`
    startTime                        | symbCount | language | expectedResult
    ${'11/09/2020, 10:23 Friday'}    | ${10}     | ${'en'}  | ${'11/09/2020, 11:23 Friday'}
    ${'11/09/2020, 7:54 Friday'}     | ${54}     | ${'en'}  | ${'11/09/2020, 11:00 Friday'}
    ${'11/09/2020, 15:02 Friday'}    | ${1112}   | ${'ru'}  | ${'11/09/2020, 16:02 Friday'}
    ${'11/09/2020, 18:16 Friday'}    | ${180}    | ${'ru'}  | ${'14/09/2020, 10:16 Monday'}
    ${'12/09/2020, 13:32 Saturday'}  | ${255}    | ${'en'}  | ${'14/09/2020, 11:00 Monday'}
    ${'13/09/2020, 20:20 Sunday'}    | ${1333}   | ${'uk'}  | ${'14/09/2020, 11:00 Monday'}
    ${'14/09/2020, 10:48 Monday'}    | ${3999}   | ${'en'}  | ${'15/09/2020, 13:48 Tuesday'}
    ${'11/09/2020, 15:35 Friday'}    | ${17996}  | ${'ru'}  | ${'15/09/2020, 11:05 Tuesday'}
    ${'30/09/2020, 12:03 Wednesday'} | ${120637} | ${'uk'}  | ${'14/10/2020, 12:33 Wednesday'}
    ${'13/09/2020, 9:57 Sunday'}     | ${18149}  | ${'en'}  | ${'22/09/2020, 10:30 Tuesday'}
    ${'12/09/2020, 23:29 Saturday'}  | ${21146}  | ${'en'}  | ${'23/09/2020, 10:30 Wednesday'}
    ${'12/09/2020, 18:42 Saturday'}  | ${85312}  | ${'ru'}  | ${'23/09/2020, 11:00 Wednesday'}
    ${'13/09/2020, 2:25 Sunday'}     | ${90644}  | ${'uk'}  | ${'23/09/2020, 15:00 Wednesday'}
  `(
		'calculateResultDate__table',
		({ startTime, symbCount, language, expectedResult }) => {
			const startDate = moment(startTime, 'DD/MM/YYYY HH:mm dddd').tz("Ukraine/Kiev").toDate(),
				endDate = moment(expectedResult, 'DD/MM/YYYY HH:mm dddd').tz("Ukraine/Kiev").toDate();

			expect(time.calculateExecutionTime(symbCount, language, startDate)).toEqual(endDate);
		},
	);
});