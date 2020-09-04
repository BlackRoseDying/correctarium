'use strict';

class Price {
	constructor() {
		this.wordCount = 0;
		this.price = 0;
		this.priceStep = 0;
		this.language = '';
	}

	getPrice() {
		return this.price;
	}

	setPrice() {
		if (this.language) {
			if (this.wordCount && this.wordCount <= 1000) {
				this.price = this.priceStep * 1000;
			} else {
				this.price = (this.priceStep * 1000 + (this.wordCount - 1000) * this.priceStep);
			}
		}
	}

	setLanguage(language) {
		this.language = language;

		this.setPriceStep(language);
	}

	setPriceStep(language) {
		if (language === 'en') this.priceStep = 0.12;
		else this.priceStep = 0.05;

		this.setPrice();
	}
}