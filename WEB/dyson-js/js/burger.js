export function burgerMenuFunc(header) {
	const menuBtn = document.querySelector(".header__burger-btn");
	const body = document.body;

	menuBtn.addEventListener("click", () => {
		header.classList.toggle("open");
		body.classList.toggle("lock");
	});
}
