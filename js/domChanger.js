const setPriceInField = (priceField) => {
	let newPrice = price.getPrice();

	priceField.textContent = (newPrice.toFixed(2) + ' грн').replace('.', ',');
};

const setTimeInField = (timeField) => {
	const executionTime = time.getExecutionDate();

	timeField.textContent = executionTime;
};