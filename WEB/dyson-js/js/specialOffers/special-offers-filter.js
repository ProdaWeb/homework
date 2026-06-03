// Модуль для фильтра товаров: по нажатию на кнопку открывается выпадающий список,
// при выборе элемента меняется текст на кнопке и устанавливается активный класс.
// Экспортирует функцию filterFunc().

export function filterFunc() {
	// Кнопка, которая открывает/закрывает меню фильтра
	const filterMenuBtn = document.querySelector(".special-offers__header-button");
	// Список элементов фильтра (контейнер .filter-menu__list)
	const filterList = document.querySelector(".filter-menu__list");
	// Все элементы списка (для перебора)
	const List = document.querySelectorAll(".filter-menu__list-item");
	const body = document.body;

	// При клике на кнопку – переключаем класс open у кнопки и блокируем/разблокируем прокрутку body
	filterMenuBtn.addEventListener(`click`, () => {
		filterMenuBtn.classList.toggle("open");
		body.classList.toggle("lock");
	});

	// Если клик произошёл вне кнопки, а меню открыто – закрываем его
	window.addEventListener("click", (event) => {
		if (!filterMenuBtn.contains(event.target) && filterMenuBtn.classList.contains("open")) {
			filterMenuBtn.classList.remove("open");
			body.classList.remove("lock");
		}
	});

	// Обработчик выбора пункта из меню фильтра (используем делегирование)
	filterList.addEventListener(`click`, (event) => {
		const targetItem = event.target.closest(`li`); // ищем ближайший li
		if (!targetItem) return;
		const targetId = targetItem.dataset.id; // значение data-id (например, "popular")
		const targetText = targetItem.querySelector("span").textContent; // текст пункта
		// Меняем текст на кнопке фильтра
		filterMenuBtn.querySelector("p").textContent = targetText;
		// Сохраняем выбранный filter id как data-атрибут кнопки
		filterMenuBtn.dataset.id = targetId;

		// Устанавливаем класс active только для выбранного элемента списка
		List.forEach((item) => {
			if (filterMenuBtn.dataset.id === item.dataset.id) {
				item.classList.toggle("active");
			} else {
				item.classList.remove("active");
			}
		});
	});
}
