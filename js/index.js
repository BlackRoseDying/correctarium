'use strict';

const textarea = document.querySelector('.textarea'),
	download = document.querySelector('.download'),
	downloadLabel = document.querySelector('.download-label'),
	wordCounter = document.querySelector('.word-counter'),
	languages = document.getElementsByName('language'),
	priceField = document.querySelector('.price'),
	timeField = document.querySelector('.time'),
	price = new Price(),
	time = new Time();

textarea.addEventListener('input', evt => {
	let wordCount = evt.target.textLength;

	price.wordCount = wordCount;

	wordCounter.style.display = 'block';
	wordCounter.textContent = wordCount;

	if (wordCount > 0) {
		downloadLabel.style.display = 'none';
		timeField.style.opacity = '1';
	} else {
		downloadLabel.style.display = 'block';
		timeField.style.opacity = '0';
	}

	price.setPrice(wordCount);
	setPriceInField(priceField);

	time.calculateExecutionTime();
	setTimeInField(timeField);
});

download.addEventListener('change', () => {
	let file = download.files[0];
});

languages.forEach(language => {
	language.addEventListener('click', evt => {
		let lang = evt.target.value;

		price.setLanguage(lang);
		setPriceInField(priceField);

		time.calculateExecutionTime();
		setTimeInField(timeField);
	})
});