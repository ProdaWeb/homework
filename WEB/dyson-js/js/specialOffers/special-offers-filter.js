export function filterFunc() {
	const filterMenuBtn = document.querySelector(".special-offers__header-button");
	const filterList = document.querySelector(".filter-menu__list");
	const filterItem = document.querySelector(".filter-menu__list-item");
	const List = document.querySelectorAll(".filter-menu__list-item");
	const body = document.body;

	filterMenuBtn.addEventListener(`click`, () => {
		filterMenuBtn.classList.toggle("open");
		body.classList.toggle("lock");
	});

	window.addEventListener("click", (event) => {
		if (!filterMenuBtn.contains(event.target) && filterMenuBtn.classList.contains("open")) {
			filterMenuBtn.classList.remove("open");
			body.classList.remove("lock");
		}
	});

	filterList.addEventListener(`click`, (event) => {
		const targetItem = event.target.closest(`li`);
		const targetId = targetItem.dataset.id;
		const targetText = targetItem.querySelector("span").textContent;
		filterMenuBtn.querySelector("p").textContent = targetText;
		filterMenuBtn.dataset.id = targetId;

		List.forEach((item) => {
			if (filterMenuBtn.dataset.id === item.dataset.id) {
				item.classList.toggle("active");
			} else {
				item.classList.remove("active");
			}
		});
	});
}
