const setPriceInField = (priceField, price) => {
	priceField.textContent = (price + ' грн').replace('.', ',');
};

const setTimeInField = (timeField, executionDate) => {
	timeField.textContent = executionDate;
};

export default {setTimeInField, setPriceInField};