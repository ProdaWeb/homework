// Модуль для работы счётчиков количества товара на карточках (кнопки "+" и "-").
// Экспортирует функцию itemCounterFunc(), которая находит все карточки и навешивает обработчики.

export function itemCounterFunc() {
	// Перебираем каждую карточку товара (.special-offers__item)
	document.querySelectorAll(".special-offers__item").forEach((item) => {
		// Внутри карточки ищем кнопку уменьшения (минус), увеличения (плюс) и поле ввода
		const minusBtn = item.querySelector(".counter-btn.minus");
		const plusBtn = item.querySelector(".counter-btn.plus");
		const input = item.querySelector(".counter-value");

		// При клике на минус – уменьшаем значение, но не меньше 1
		minusBtn.addEventListener("click", () => {
			let currentValue = parseInt(input.value);
			if (currentValue > 1) {
				input.value = currentValue - 1;
			}
		});

		// При клике на плюс – увеличиваем значение на 1 (без ограничения сверху)
		plusBtn.addEventListener("click", () => {
			let currentValue = parseInt(input.value);
			input.value = currentValue + 1;
		});
	});
}
