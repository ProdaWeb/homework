export function newsShowMore() {
	const showMore = document.querySelector(".news__button.button-show-more"); // ищет кнопку
	const news = document.querySelector(".news__list"); // ищет список новостей(одним элементом)
	const showMoreText = document.querySelector(".news__button-text"); // ищет текст кнопки
	const showMoreBtn = document.querySelector(".news__button-container"); // ищет весь html код, относящийся к кнопке(для ее удаления)

	// функция для сокрытия лишних статей (el - количество видимых статей)
	function maxContainer(el) {
		// проверка на количество статей для показа кнопки
		if (news.childElementCount > el) {
			// если есть скрытые статьи обрабатываем клик на кнопке
			showMore.addEventListener("click", () => {
				// добавляет/удаляет классы(весь процесс в css)
				showMore.classList.toggle("open");
				news.classList.toggle("open");
				// условие для замены текста кнопки
				if (showMore.classList.contains(`open`)) {
					showMoreText.innerHTML = `Скрыть`;
				} else {
					showMoreText.innerHTML = `Показать ещё`;
					news.scrollIntoView(); // если скрываешь статьи, перемещает к началу
				}
			});
		} else {
			showMoreBtn.remove(); // если нет скрытый статей удаляет кнопку за ненадобностью
		}
	}
	// здесь определяется относительно ширины экрана сколько статей помещается в одну строку, а остальные скрываются
	if (window.innerWidth < 635 && window.innerWidth >= 390) {
		maxContainer(2);
	} else if (window.innerWidth < 390) {
		maxContainer(1);
	} else {
		maxContainer(3);
	}
}
