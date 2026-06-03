// Модуль отвечает за работу бургер-меню и открытие/закрытие модального окна корзины.
// Экспортирует функцию burgerMenuFunc, которая принимает элемент шапки (header) и навешивает слушатели.

export function burgerMenuFunc(header) {
	// Находим кнопку бургера по классу .header__burger-btn
	const menuBtn = document.querySelector(".header__burger-btn");
	// Запоминаем элемент <body>, чтобы управлять блокировкой скролла
	const body = document.body;
	// Находим кнопку корзины по классу .cart
	let cartBtn = document.querySelector(".cart");
	// Находим модальное окно корзины по классу .modal
	let cartModal = document.querySelector(".modal");
	// Находим кнопку закрытия внутри модального окна по классу .modal__close
	let modalCloseBtn = document.querySelector(".modal__close");

	// Добавляем обработчик клика на кнопку бургера
	menuBtn.addEventListener("click", () => {
		// Переключаем класс "open" у шапки – CSS-правила показывают/скрывают меню
		header.classList.toggle("open");
		// Переключаем класс "lock" у body – запрещает прокрутку страницы при открытом меню
		body.classList.toggle("lock");
	});

	// Обработчик клика на иконку корзины – открывает модальное окно (добавляет класс open)
	cartBtn.addEventListener("click", () => {
		cartModal.classList.toggle("open");
	});

	// Обработчик клика на кнопку закрытия в модальном окне – закрывает окно
	modalCloseBtn.addEventListener("click", () => {
		cartModal.classList.toggle("open");
	});
}
