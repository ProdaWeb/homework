// Модуль для инициализации библиотеки lightGallery (галерея изображений) в блоках комментариев.
// Каждый комментарий может содержать несколько фотографий. Модуль присваивает уникальные ID,
// подключает lightGallery к каждой галерее, а также реализует кнопку "Смотреть все фото / Скрыть",
// если фотографий больше 3.
// Экспортирует функцию commentLightGallery().

export function commentLightGallery() {
	// Находим все контейнеры галерей комментариев (с классом .comment-gallery)
	const reviewList = document.querySelectorAll(".comment-gallery");
	// Находим все кнопки "Смотреть все фото"
	const showMoreButtons = document.querySelectorAll(".comment-images-button");

	// Внутренняя функция: открывает lightGallery для конкретной галереи по её идентификатору.
	function openLightbox(galleryId) {
		lightGallery(
			document.querySelector(`.comment-gallery[data-gallery-id="${galleryId}"] .comment-images`),
		);
	}

	// Функция настройки кнопки "Показать ещё" и управления отображением фотографий.
	function Buttons(galleryId) {
		// Находим контейнер с фотографиями внутри данной галереи
		const comments = document.querySelector(
			`.comment-gallery[data-gallery-id="${galleryId}"] .comment-images`,
		);
		// Если фотографий 3 или меньше – кнопка не нужна, удаляем её
		if (comments.childElementCount <= 3) {
			showMoreButtons[galleryId].remove();
		} else {
			// Иначе вешаем обработчик клика на кнопку "Смотреть все фото"
			showMoreButtons[galleryId].addEventListener("click", () => {
				// Переключаем класс open у кнопки и у контейнера с фото
				showMoreButtons[galleryId].classList.toggle("open");
				comments.classList.toggle("open");
				// Меняем текст кнопки в зависимости от состояния
				if (showMoreButtons[galleryId].classList.contains(`open`)) {
					showMoreButtons[galleryId].innerHTML = `Скрыть фото`;
				} else {
					showMoreButtons[galleryId].innerHTML = `Смотреть все фото`;
				}
			});
		}
	}

	// Проходим по всем найденным галереям комментариев
	for (let i = 0; i < reviewList.length; i++) {
		// Присваиваем каждой галерее уникальный data-gallery-id по индексу
		reviewList[i].setAttribute("data-gallery-id", `${i}`);

		// Находим контейнер с изображениями внутри этой галереи
		const galleryImages = document.querySelector(
			`.comment-gallery[data-gallery-id="${i}"] .comment-images`,
		);

		// Если внутри нет ни одного изображения – удаляем всю галерею и кнопку
		if (galleryImages.childElementCount === 0) {
			galleryImages.remove();
			showMoreButtons[i].remove();
		} else {
			// Иначе инициализируем lightbox и настраиваем кнопку
			openLightbox(i);
			Buttons(i);
		}
	}
}
