// Модуль для кнопки "Показать ещё / Скрыть" в блоке новостей.
// В зависимости от ширины экрана показывает определённое количество новостей (1, 2 или 3),
// остальные скрывает. При нажатии на кнопку раскрывает/скрывает лишние новости.
// Экспортирует функцию newsShowMore().

export function newsShowMore() {
	// Кнопка "Показать ещё" (имеет класс .news__button.button-show-more)
	const showMore = document.querySelector(".news__button.button-show-more");
	// Список всех новостей (контейнер .news__list, содержащий статьи)
	const news = document.querySelector(".news__list");
	// Текст внутри кнопки (элемент .news__button-text)
	const showMoreText = document.querySelector(".news__button-text");
	// Весь контейнер кнопки (используется для полного удаления, если кнопка не нужна)
	const showMoreBtn = document.querySelector(".news__button-container");

	// Функция определяет максимальное количество видимых статей и настраивает кнопку.
	// el – количество статей, которые должны быть видны изначально.
	function maxContainer(el) {
		// Если общее количество статей больше, чем el (есть скрытые)
		if (news.childElementCount > el) {
			// Вешаем обработчик клика на кнопку
			showMore.addEventListener("click", () => {
				// Переключаем класс open у кнопки и у контейнера новостей
				showMore.classList.toggle("open");
				news.classList.toggle("open");
				// Меняем текст кнопки
				if (showMore.classList.contains(`open`)) {
					showMoreText.innerHTML = `Скрыть`;
				} else {
					showMoreText.innerHTML = `Показать ещё`;
					// Прокручиваем к началу блока новостей, чтобы скрытые новости не "выпрыгивали"
					news.scrollIntoView();
				}
			});
		} else {
			// Если все новости и так помещаются – кнопка не нужна, удаляем её
			showMoreBtn.remove();
		}
	}

	// Адаптив: в зависимости от ширины экрана устанавливаем количество видимых новостей.
	// При ширине от 390px до 635px – показываем 2 новости, меньше 390px – 1 новость, иначе (больше 635px) – 3 новости.
	if (window.innerWidth < 635 && window.innerWidth >= 390) {
		maxContainer(2);
	} else if (window.innerWidth < 390) {
		maxContainer(1);
	} else {
		maxContainer(3);
	}
}
