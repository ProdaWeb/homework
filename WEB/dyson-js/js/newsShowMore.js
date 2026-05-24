export function newsShowMore() {
	const showMore = document.querySelector(".news__button.button-show-more");
	const news = document.querySelector(".news__list");
	const showMoreText = document.querySelector(".news__button-text");
	const showMoreBtn = document.querySelector(".news__button-container");

	function maxContainer(el) {
		if (news.childElementCount > el) {
			showMore.addEventListener("click", () => {
				showMore.classList.toggle("open");
				news.classList.toggle("open");

				if (showMore.classList.contains(`open`)) {
					showMoreText.innerHTML = `Скрыть`;
				} else {
					showMoreText.innerHTML = `Показать ещё`;
					news.scrollIntoView();
				}
			});
		} else {
			showMoreBtn.remove();
		}
	}

	if (window.innerWidth < 635 && window.innerWidth >= 390) {
		maxContainer(2);
	} else if (window.innerWidth < 390) {
		maxContainer(1);
	} else {
		maxContainer(3);
	}
}
