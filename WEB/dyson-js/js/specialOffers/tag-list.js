// Модуль для кнопки "Показать ещё / Скрыть" у списка тегов (категорий товаров).
// Экспортирует функцию tagListFunc().

export const tagListFunc = () => {
	// Кнопка для раскрытия полного списка тегов
	const showMore = document.querySelector(".special-offers__tag-list-button");

	// Обработчик клика на кнопку
	showMore.addEventListener("click", () => {
		// Контейнер со скрытыми тегами (имеет класс .tag-list__show-more)
		const tagList = document.querySelector(".tag-list__show-more");

		// Переключаем класс open у кнопки и у списка тегов (CSS управляет видимостью)
		showMore.classList.toggle("open");
		tagList.classList.toggle("open");

		// Меняем текст кнопки в зависимости от состояния
		if (showMore.classList.contains(`open`)) {
			showMore.innerHTML = `Скрыть`;
		} else {
			showMore.innerHTML = `Показать ещё`;
		}
	});
};
