export function itemCounterFunc() {
	//ищет все карточки товаров, кнопки плюс, минус и инпут
	document.querySelectorAll(".special-offers__item").forEach((item) => {
		const minusBtn = item.querySelector(".counter-btn.minus");
		const plusBtn = item.querySelector(".counter-btn.plus");
		const input = item.querySelector(".counter-value");

		//обработчик клика на минус
		minusBtn.addEventListener("click", () => {
			let currentValue = parseInt(input.value);
			if (currentValue > 1) {
				input.value = currentValue - 1;
			}
		});

		//обработчик клика на плюс
		plusBtn.addEventListener("click", () => {
			let currentValue = parseInt(input.value);
			input.value = currentValue + 1;
		});
	});
}
