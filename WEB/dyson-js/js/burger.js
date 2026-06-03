export function burgerMenuFunc(header) {
	const menuBtn = document.querySelector(".header__burger-btn"); //ищет кнопку
	const body = document.body; // ищет body
	let cartBtn = document.querySelector(".cart");
	let cartModal = document.querySelector(".modal");
	let modalCloseBtn = document.querySelector(".modal__close");

	//обработчик клика на кнопку
	menuBtn.addEventListener("click", () => {
		header.classList.toggle("open"); // добавляет/удаляет класс "open" хедеру (весь процесс в css)
		body.classList.toggle("lock"); // добавляет/удаляет класс "lock" body(запрещает скролл)
	});

	cartBtn.addEventListener("click", () => {
		cartModal.classList.toggle("open");
	});

	modalCloseBtn.addEventListener("click", () => {
		cartModal.classList.toggle("open");
	});
}
