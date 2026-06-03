export function headerShadowFunc(header) {
	// обработчик скролла
	window.addEventListener("scroll", () => {
		// если есть куда крутить вверх, добавляется тень
		if (window.scrollY > 0) {
			header.classList.add("shadow");
		} else {
			header.classList.remove("shadow");
		}
	});
}
