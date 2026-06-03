// Модуль для кнопки "Показать ещё / Скрыть" в блоке отзывов.
// Если отзывов больше 3, остальные скрываются, и появляется кнопка.
// Экспортирует функцию reviewShowMore().

export function reviewShowMore() {
	// Кнопка "Показать ещё" (классы .reviews__button.button-show-more)
	const showMore = document.querySelector(".reviews__button.button-show-more");
	// Контейнер со всеми отзывами (.reviews__content)
	const reviews = document.querySelector(".reviews__content");
	// Текст внутри кнопки
	const showMoreText = document.querySelector(".reviews__button-text");
	// Футер блока отзывов, содержащий кнопку (удаляем целиком, если кнопка не нужна)
	const reviewsFooter = document.querySelector(".reviews__footer");

	// Если количество отзывов больше 3
	if (reviews.childElementCount > 3) {
		// Обработчик клика по кнопке
		showMore.addEventListener("click", () => {
			showMore.classList.toggle("open");
			reviews.classList.toggle("open");
			if (showMore.classList.contains(`open`)) {
				showMoreText.innerHTML = `Скрыть`;
			} else {
				showMoreText.innerHTML = `Показать ещё`;
				reviews.scrollIntoView(); // при скрытии перемещаем в начало блока
			}
		});
	} else {
		// Если отзывов 3 или меньше – кнопка не нужна, удаляем футер целиком
		reviewsFooter.remove();
	}
}
