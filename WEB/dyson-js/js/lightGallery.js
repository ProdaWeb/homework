export function commentLightGallery(numberOfGallery) {
	const reviewList = document.querySelectorAll(".comment-gallery");
	const showMoreButtons = document.querySelectorAll(".comment-images-button");

	function openLightbox(galleryId) {
		lightGallery(
			document.querySelector(`.comment-gallery[data-gallery-id="${galleryId}"] .comment-images`),
		);
	}

	function Buttons(galleryId) {
		const comments = document.querySelector(
			`.comment-gallery[data-gallery-id="${galleryId}"] .comment-images`,
		);
		if (comments.childElementCount <= 3) {
			showMoreButtons[galleryId].remove();
		} else {
			showMoreButtons[galleryId].addEventListener("click", () => {
				showMoreButtons[galleryId].classList.toggle("open");
				comments.classList.toggle("open");

				if (showMoreButtons[galleryId].classList.contains(`open`)) {
					showMoreButtons[galleryId].innerHTML = `Скрыть фото`;
				} else {
					showMoreButtons[galleryId].innerHTML = `Смотреть все фото`;
				}
			});
		}
	}

	for (let i = 0; i < reviewList.length; i++) {
		reviewList[i].setAttribute("data-gallery-id", `${i}`);
		const galleryImages = document.querySelector(
			`.comment-gallery[data-gallery-id="${i}"] .comment-images`,
		);

		if (galleryImages.childElementCount === 0) {
			galleryImages.remove();
			showMoreButtons[i].remove();
		} else {
			openLightbox(i);
			Buttons(i);
		}
	}
}
