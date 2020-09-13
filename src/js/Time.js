'use strict';

class Time {
	constructor() {
		this.enSymbolsPerHour = 333;
		this.ruSymbolsPerHour = 1333;
	}

	getExecutionDate(date) {
		const formattingDate = (date) => {
			return (date < 10 ? '0' + date : date)
		};

		const day = formattingDate(date.getDate()),
			month = formattingDate(date.getMonth()),
			year = date.getFullYear() % 100,
			hours = formattingDate(date.getHours()),
			minutes = formattingDate(date.getMinutes());

		return `Срок сдачи: ${day}.${month}.${year} в ${hours}:${minutes}`;
	}

	checkAndSkipWeekend(date, hours, minutes) {
		if (date.getDay() === 0 || date.getDay() === 6) {
			let day = date.getDay();

			date.setDate(date.getDate() + (day === 0 ? 1 : 2));

			if (hours) {
				date.setHours(hours);
				date.setMinutes(minutes);
			}
		}

		return date;
	}

	increaseDate(date, increaseCount, minutes) {
		if (!increaseCount && !minutes) return date;

		let newDate = date;

		for (let i = 0; i < increaseCount; i++) {
			newDate = this.checkAndSkipWeekend(newDate);

			newDate.setDate(newDate.getDate() + 1);
		}

		newDate = this.checkAndSkipWeekend(newDate);

		if (minutes) newDate = this.increaseMinutes(newDate, minutes);

		return newDate;
	}

	increaseMinutes(date, minutes) {
		let newDate = date,
			currentHours,
			currentMinutes;

		newDate = this.checkAndSkipWeekend(newDate, 10, 0);

		currentHours = newDate.getHours();
		currentMinutes = newDate.getMinutes();

		if (currentHours >= 19) {
			newDate = this.increaseDate(newDate, 1);

			newDate.setHours(10);
			newDate.setMinutes(0 + minutes);
		} else if (currentHours < 10) {
			newDate.setHours(10);
			newDate.setMinutes(0 + minutes);
		} else {
			let endOfDay = 19 * 3600,
				timeSum = currentHours * 3600 + currentMinutes * 60 + minutes * 60;

			if (timeSum > endOfDay) {
				let completedSeconds = endOfDay - (currentHours * 3600 + currentMinutes * 60),
					remainingSeconds = minutes * 60 - completedSeconds;

				newDate = this.increaseDate(newDate, 1);

				newDate.setHours(10);
				newDate.setMinutes(0 + Math.floor(remainingSeconds / 60));
			} else {
				newDate.setMinutes(currentMinutes + minutes);
			}
		}

		return newDate;
	}

	calculateExecutionTime(symbCount, language, anotherDate) {
		let date = anotherDate || new Date();

		const initialDate = (anotherDate ? new Date(anotherDate) : new Date());

		this.symbCount = symbCount;
		this.language = language;

		if (this.language) {
			let symbolsPerHour = (this.language === 'en' ? this.enSymbolsPerHour : this.ruSymbolsPerHour),
				symbolsPerMinute = symbolsPerHour / 60;

			if (this.symbCount > symbolsPerHour) {
				let executionTimeInMinutes = Math.floor(this.symbCount / symbolsPerMinute),
					executionTimeInDays = Math.floor(executionTimeInMinutes / 60 / 9),
					remainderMinutes = executionTimeInMinutes - (Math.floor(executionTimeInDays * 9 * 60));

				if (initialDate.getDay() === 0 || initialDate.getDay() === 6) {
					date.setHours(10);
					date.setMinutes(0);
				}

				date = this.increaseDate(date, executionTimeInDays, remainderMinutes);
			} else {
				date = this.increaseMinutes(date, 60);
			}

			return date;
		}
	};
}

module.exports = Time;