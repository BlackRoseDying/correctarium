'use strict';
import '../css/normalize.css';
import '../css/orderPage.css';
import calculatePrice from './calculatePrice';
import Time from  './Time';
import domChanger from './domChanger';

const textarea = document.querySelector('.textarea'),
	download = document.querySelector('.download'),
	downloadLabel = document.querySelector('.download-label'),
	symbCounterElement = document.querySelector('.symb-counter'),
	languagesList = document.getElementsByName('language'),
	priceField = document.querySelector('.price'),
	timeField = document.querySelector('.time'),
	time = new Time();

let symbCount,
	language;

const setValuesIntoFields = () => {
	if (language) {
		const price = calculatePrice(symbCount, language),
			executionTime = time.getExecutionDate(time.calculateExecutionTime(symbCount, language));

		domChanger.setPriceInField(priceField, price);
		domChanger.setTimeInField(timeField, executionTime);
	}
};

textarea.addEventListener('input', evt => {
	symbCount = evt.target.textLength;

	symbCounterElement.style.display = 'block';
	symbCounterElement.textContent = symbCount;

	if (symbCount > 0) {
		downloadLabel.style.display = 'none';
		timeField.style.opacity = '1';
	} else {
		downloadLabel.style.display = 'block';
		timeField.style.opacity = '0';
	}

	setValuesIntoFields();
});

download.addEventListener('change', () => {
	let file = download.files[0];
});

languagesList.forEach(languageItem => {
	languageItem.addEventListener('click', evt => {
		language = evt.target.value;

		setValuesIntoFields();
	})
});