'use strict';

const calculatePrice = (symbCount, language) => {
	let priceStep = (language === 'en' ? 0.12 : 0.05);

	if (symbCount === 0) return (0).toFixed(2);

	if (symbCount <= 1000) {
		return (priceStep * 1000).toFixed(2);
	} else {
		return (priceStep * 1000 + (symbCount - 1000) * priceStep).toFixed(2);
	}
};

module.exports = calculatePrice;
