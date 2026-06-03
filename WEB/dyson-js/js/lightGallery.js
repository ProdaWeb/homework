export function commentLightGallery() {
	const reviewList = document.querySelectorAll(".comment-gallery");
	const showMoreButtons = document.querySelectorAll(".comment-images-button");

	// функция по ID подключает библиотеку lightGallery к галереи, сколько бы их не было.
	//  расчет был из удобства. ручками каждому комментарию с фото прикручивать библиотеку
	//  эту муторно по моему, ну или я чего-то не знаю
	// (Ты в видео показывал lightbox-ы, я их видел и пробовал все, они сами тоже автоматически ничего не делают.
	// если одна галерея, то конечно можно просто в html коде аттрибуты указать, а так это надо каждому комментарию приписывать
	// различные аттрибуты, чтобы галереи разделялись, иначе при нажатии на другие галереи они тупо не работают.
	// работают только те у которых уникальное имя галерии в аттрибуте и которые по этому имени отправляются в функцию из библиотеки ниже)
	function openLightbox(galleryId) {
		lightGallery(
			document.querySelector(`.comment-gallery[data-gallery-id="${galleryId}"] .comment-images`),
		); // вот в эту функцию библиотеки, тут если не одна галерея а тысячи просто месиво из кода будет, если самому это все вызывать
		// так что у меня тут функция, которая вызывает функцию ха-ха(везде в обучающих видео lightbox делают только для одной галерии!!! безобразие)
	}

	// Эта функция нужна чтобы проверить каждый комментарий:
	function Buttons(galleryId) {
		//Ищет каждый комментарий по ID
		const comments = document.querySelector(
			`.comment-gallery[data-gallery-id="${galleryId}"] .comment-images`,
		);
		//Проверка на количество фото в комментарии, если их 3 или меньше, то кнопка "показать еще" просто удаляется за ненадобностью
		if (comments.childElementCount <= 3) {
			showMoreButtons[galleryId].remove();
		} else {
			// Если больше 3 фото, то к каждой отдельной кнопке свой отдельный слушатель событий, также все по тому же ID.
			// иначе он просто при нажатии на любую кнопку в любом комментарии разворачивает фото только в первом)
			showMoreButtons[galleryId].addEventListener("click", () => {
				showMoreButtons[galleryId].classList.toggle("open");
				comments.classList.toggle("open");
				//ну здесь просто условие, меняющее текст, также всех кнопок по отдельности по ID.
				if (showMoreButtons[galleryId].classList.contains(`open`)) {
					showMoreButtons[galleryId].innerHTML = `Скрыть фото`;
				} else {
					showMoreButtons[galleryId].innerHTML = `Смотреть все фото`;
				}
			});
		}
	}

	//здесь этот самый ID присваивается относительно количества комментариев
	//Мне показалось это очень удобно, сколько комментариев не добавляй, все само подсасывается
	// (ну и расчет на то что пользователи их сами добавляют)
	for (let i = 0; i < reviewList.length; i++) {
		reviewList[i].setAttribute("data-gallery-id", `${i}`); // вот здесь этот ID в виде data аттрибута с числовым значением присваивается по их порядковому номеру
		//Это может и создает дополнительные вычисления при каждом редактировании, но оптимизацией уж я не стал упарываться
		const galleryImages = document.querySelector(
			`.comment-gallery[data-gallery-id="${i}"] .comment-images`,
		); // здесь опять ищем галереи по выше присвоенному ID

		// И проверяем эти галереи на наличие фото
		if (galleryImages.childElementCount === 0) {
			galleryImages.remove(); // если нет фото просто удаляем галерею за ненадобностью
			showMoreButtons[i].remove(); // ну и кнопку
		} else {
			openLightbox(i); // А если уж все условия прошли то вызывает функции, которые я описал выше
			Buttons(i);
		}
	}
}
// говоришь много кода, а я у deepseek пытался спрашивать , он мне там на любую проблему рукописи на тысячи строк выдает))
// я бросил все надежды на его помощь))
