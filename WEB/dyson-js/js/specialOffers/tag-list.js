export const tagListFunc = () => {
	const showMore = document.querySelector(".special-offers__tag-list-button");

	showMore.addEventListener("click", () => {
		const tagList = document.querySelector(".tag-list__show-more");

		showMore.classList.toggle("open");
		tagList.classList.toggle("open");

		if (showMore.classList.contains(`open`)) {
			showMore.innerHTML = `Скрыть`;
		} else {
			showMore.innerHTML = `Показать ещё`;
		}
	});
};
