'use strict';

class Time {
	constructor() {
		this.enSymbolsPerHour = 333;
		this.ruSymbolsPerHour = 1333;
		this.executionDate = 0;
		this.language = '';
	}

	getExecutionDate() {
		if (!this.language) return;

		const formattingDate = (date) => {
			return (date < 10 ? '0' + date : date)
		};

		const date = this.executionDate,
			day = formattingDate(date.getDate()),
			month = formattingDate(date.getMonth()),
			year = date.getFullYear() % 100,
			hours = formattingDate(date.getHours()),
			minutes = formattingDate(date.getMinutes());

		return `Срок сдачи: ${day}.${month}.${year} в ${hours}:${minutes}`;
	}

	countWeekendDays(initialDate, currentDate) {
		let daysCount = 1 + Math.round((currentDate.getTime() - initialDate.getTime()) / (24 * 3600 * 1000)),
			weekendCount = Math.floor((initialDate.getDay() + daysCount) / 7) * 2;

		return weekendCount + (initialDate.getDay() === 0) - (currentDate.getDay() === 6);
	}

	increaseDateAndCheckWeekend(date, increaseCount, minutes) {
		if (!increaseCount && !minutes) return date;

		let newDate = date;

		newDate.setDate(newDate.getDate() + increaseCount);

		if (newDate.getDay() === 0 || newDate.getDay() === 6) {
			let day = newDate.getDay();

			newDate.setDate(newDate.getDate() + (day === 0 ? 1 : 2));
		}

		if (minutes) newDate = this.increaseMinutes(newDate, minutes);

		return newDate;
	}

	increaseMinutes(date, minutes) {
		let newDate = date,
			currentHours = newDate.getHours(),
			currentMinutes = newDate.getMinutes();

		if (newDate.getDay() === 0 || newDate.getDay() === 6) {
			let day = newDate.getDay();

			newDate.setDate(newDate.getDate() + (day === 0 ? 1 : 2));

			currentHours = 10;
			currentMinutes = 0;

			newDate.setHours(currentHours);
			newDate.setMinutes(currentMinutes);
		}

		if (currentHours >= 19) {
			newDate = this.increaseDateAndCheckWeekend(newDate, 1);

			newDate.setHours(10);
			newDate.setMinutes(0 + minutes);
		} else if (currentHours < 10) {
			newDate.setHours(10);
			newDate.setMinutes(0 + minutes);
		} else {
			let remainderMinutesInHours = Math.floor(minutes / 60),
				hoursSum = currentHours + remainderMinutesInHours,
				difference = minutes - remainderMinutesInHours * 60;

			if (hoursSum >= 19 || (hoursSum === 18 && currentMinutes + difference >= 60)) {
				let completedHours = 19 - currentHours,
					completedMinutes = 60 - currentMinutes,
					remainingHours = minutes / 60 - completedHours,
					remainingMinutes = 60 - completedMinutes;

				newDate = this.increaseDateAndCheckWeekend(newDate, 1);

				newDate.setHours(10 + remainingHours);
				newDate.setMinutes(0 + remainingMinutes);
			} else {
				newDate.setMinutes(currentMinutes + minutes);
			}
		}

		return newDate;
	}

	calculateExecutionTime() {
		let date = new Date();

		const initialDate = new Date(),
			wordCount = price.wordCount;

		this.language = price.language;

		if (this.language) {
			let symbolsPerHour = (this.language === 'en' ? this.enSymbolsPerHour : this.ruSymbolsPerHour),
				symbolsPerMinute = symbolsPerHour / 60;

			if (wordCount > this.enSymbolsPerHour) {
				let executionTimeInMinutes = Math.floor(wordCount / symbolsPerMinute),
					executionTimeInDays = Math.floor(executionTimeInMinutes / 60 / 9),
					remainderMinutes = executionTimeInMinutes - (Math.floor(executionTimeInDays * 9 * 60)),
					weekendCount = 0;

				date.setDate(date.getDate() + executionTimeInDays);

				weekendCount = this.countWeekendDays(initialDate, date);

				date = this.increaseDateAndCheckWeekend(date, weekendCount, remainderMinutes);
			} else {
				date = this.increaseMinutes(date, 60);
			}
			console.log(date);
			this.executionDate = date;
		}
	};
}