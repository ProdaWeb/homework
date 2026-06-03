export const tagListFunc = () => {
	const showMore = document.querySelector(".special-offers__tag-list-button"); //ищет кнопку

	// обработчик клика на кнопку
	showMore.addEventListener("click", () => {
		const tagList = document.querySelector(".tag-list__show-more"); //ищет список тегов(одним элементом)

		showMore.classList.toggle("open"); // добавляет/удаляет класс "open" кнопке
		tagList.classList.toggle("open"); // добавляет/удаляет класс "open" списку тегов(весь процесс в css сделал)

		// здесь условие для замены текста кнопки
		if (showMore.classList.contains(`open`)) {
			showMore.innerHTML = `Скрыть`;
		} else {
			showMore.innerHTML = `Показать ещё`;
		}
	});
};
