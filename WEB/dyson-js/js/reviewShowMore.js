export function reviewShowMore() {
	const showMore = document.querySelector(".reviews__button.button-show-more");
	const reviews = document.querySelector(".reviews__content");
	const showMoreText = document.querySelector(".reviews__button-text");
	const reviewsFooter = document.querySelector(".reviews__footer");

	if (reviews.childElementCount > 3) {
		showMore.addEventListener("click", () => {
			showMore.classList.toggle("open");
			reviews.classList.toggle("open");

			if (showMore.classList.contains(`open`)) {
				showMoreText.innerHTML = `Скрыть`;
			} else {
				showMoreText.innerHTML = `Показать ещё`;
				reviews.scrollIntoView();
			}
		});
	} else {
		reviewsFooter.remove();
	}
}
