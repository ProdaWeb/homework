export function reviewShowMore() {
	const showMore = document.querySelector(".reviews__button.button-show-more"); // ищет кнопку
	const reviews = document.querySelector(".reviews__content"); // ищет контейнер для отзывов
	const showMoreText = document.querySelector(".reviews__button-text"); // ищет текст кнопки
	const reviewsFooter = document.querySelector(".reviews__footer"); // ищет контейнер где хранится кнопка(для удаления)

	// если отзывов больше 3
	if (reviews.childElementCount > 3) {
		// обработчик клика на кнопку
		showMore.addEventListener("click", () => {
			//добавляет/удаляет классы(весь процесс в css)
			showMore.classList.toggle("open");
			reviews.classList.toggle("open");

			// условие для замены текста кнопки
			if (showMore.classList.contains(`open`)) {
				showMoreText.innerHTML = `Скрыть`;
			} else {
				showMoreText.innerHTML = `Показать ещё`;
				reviews.scrollIntoView(); // при скрытии перемещает в начало
			}
		});
		//если отзывов 3 и меньше
	} else {
		reviewsFooter.remove(); // удаляет кнопку за ненадобностью
	}
}
