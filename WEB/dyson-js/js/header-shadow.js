// Модуль добавляет тень шапке сайта при прокрутке страницы вниз.
// Экспортирует функцию headerShadowFunc, принимающую элемент шапки.

export function headerShadowFunc(header) {
	// Слушаем событие прокрутки окна
	window.addEventListener("scroll", () => {
		// Если вертикальная прокрутка больше 0 (пользователь ушёл от самого верха)
		if (window.scrollY > 0) {
			// Добавляем класс "shadow" шапке – в CSS для этого класса прописана тень
			header.classList.add("shadow");
		} else {
			// Иначе (находимся на самом верху) – убираем тень
			header.classList.remove("shadow");
		}
	});
}
