// Модуль реализует слайдер товаров со скидками, фильтрацию (популярные, дорогие, дешёвые, новинки, с высоким рейтингом),
// а также интеграцию с корзиной и счётчиками. Экспортирует функцию sliderFunc().

import { cartFunc } from "../cart.js";
import { itemCounterFunc } from "./itemCounter.js";

export function sliderFunc() {
	// Массив товаров для слайдера (заглушка, в реальном проекте данные могут приходить с сервера)
	const products = [
		{
			id: 0,
			name: "Фен Dyson",
			price: 69990,
			dis: "-15%",
			qty: 1,
			rating: 4.9,
			views: 12500,
			isNew: false,
			img: "./images/special offers/special-offers-image-1.jpg",
		},
		{
			id: 1,
			name: "Фен Dyson",
			price: 39990,
			dis: "-15%",
			qty: 1,
			rating: 4.8,
			views: 13500,
			isNew: true,
			img: "./images/special offers/special-offers-image-2.jpg",
		},
		{
			id: 2,
			name: "Фен Dyson",
			price: 159990,
			dis: "-30%",
			qty: 1,
			rating: 4.7,
			views: 11500,
			isNew: false,
			img: "./images/special offers/special-offers-image-3.jpg",
		},
		{
			id: 3,
			name: "Фен Dyson",
			price: 89990,
			dis: "-20%",
			qty: 1,
			rating: 4.9,
			views: 15500,
			isNew: false,
			img: "./images/special offers/special-offers-image-1.jpg",
		},
		{
			id: 4,
			name: "Фен Dyson",
			price: 79990,
			dis: "-35%",
			qty: 1,
			rating: 4.5,
			views: 6500,
			isNew: false,
			img: "./images/special offers/special-offers-image-2.jpg",
		},
		{
			id: 5,
			name: "Фен Dyson",
			price: 59990,
			dis: "-5%",
			qty: 1,
			rating: 5,
			views: 1500,
			isNew: true,
			img: "./images/special offers/special-offers-image-3.jpg",
		},
		{
			id: 6,
			name: "Фен Dyson",
			price: 59990,
			dis: "-30%",
			qty: 1,
			rating: 4.1,
			views: 4500,
			isNew: false,
			img: "./images/special offers/special-offers-image-1.jpg",
		},
		{
			id: 7,
			name: "Фен Dyson",
			price: 59990,
			dis: "-15%",
			qty: 1,
			rating: 4.9,
			views: 11600,
			isNew: true,
			img: "./images/special offers/special-offers-image-2.jpg",
		},
		{
			id: 8,
			name: "Фен Dyson",
			price: 59990,
			dis: "-15%",
			qty: 1,
			rating: 4.4,
			views: 8500,
			isNew: false,
			img: "./images/special offers/special-offers-image-3.jpg",
		},
		{
			id: 9,
			name: "Фен Dyson",
			price: 59990,
			dis: "-15%",
			qty: 1,
			rating: 4.3,
			views: 7500,
			isNew: false,
			img: "./images/special offers/special-offers-image-1.jpg",
		},
		{
			id: 10,
			name: "Фен Dyson",
			price: 59990,
			dis: "-5%",
			qty: 1,
			rating: 4.9,
			views: 22500,
			isNew: true,
			img: "./images/special offers/special-offers-image-2.jpg",
		},
		{
			id: 11,
			name: "Фен Dyson",
			price: 59990,
			dis: "-15%",
			qty: 1,
			rating: 4.8,
			views: 11540,
			isNew: false,
			img: "./images/special offers/special-offers-image-3.jpg",
		},
		{
			id: 12,
			name: "Фен Dyson",
			price: 59990,
			dis: "-20%",
			qty: 1,
			rating: 4.1,
			views: 3500,
			isNew: false,
			img: "./images/special offers/special-offers-image-1.jpg",
		},
		{
			id: 13,
			name: "Фен Dyson",
			price: 59990,
			dis: "-25%",
			qty: 1,
			rating: 4.0,
			views: 2500,
			isNew: false,
			img: "./images/special offers/special-offers-image-2.jpg",
		},
		{
			id: 14,
			name: "Фен Dyson",
			price: 59990,
			dis: "-10%",
			qty: 1,
			rating: 4.9,
			views: 12800,
			isNew: true,
			img: "./images/special offers/special-offers-image-3.jpg",
		},
	];

	const PER_SLIDE = 6; // На одном слайде отображается 6 карточек

	// Функция разбивает массив товаров на слайды (массив массивов, каждый подмассив – до PER_SLIDE товаров)
	function splitToSlides(productsArray) {
		const result = [];
		for (let i = 0; i < productsArray.length; i += PER_SLIDE) {
			result.push(productsArray.slice(i, i + PER_SLIDE));
		}
		return result;
	}

	let slidesData = splitToSlides(products); // исходное разбиение (до фильтрации)
	let currentIndex = 0; // индекс текущего слайда (начиная с 0)
	let currentFilter = "popular"; // активный фильтр (по умолчанию "популярные")
	const totalSlides = slidesData.length;
	let slides = []; // будет хранить текущее разбиение после фильтрации

	// DOM-элементы
	const track = document.getElementById("track"); // контейнер-лента слайдов
	const prevBtn = document.getElementById("prevBtn"); // кнопка "Назад"
	const nextBtn = document.getElementById("nextBtn"); // кнопка "Вперёд"
	const counterDiv = document.getElementById("counter"); // отображение "текущий / всего"
	const filterBtns = document.querySelectorAll(".filter-menu__list-item"); // кнопки фильтра

	// ---- Функция сортировки товаров в зависимости от выбранного фильтра ----
	function getSortedProducts(filter) {
		const copy = [...products]; // создаём копию, чтобы не мутировать оригинал
		if (filter === "popular") return copy.sort((a, b) => b.views - a.views); // по убыванию просмотров
		if (filter === "expensive") return copy.sort((a, b) => b.price - a.price); // по убыванию цены
		if (filter === "cheap") return copy.sort((a, b) => a.price - b.price); // по возрастанию цены
		if (filter === "new") return copy.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); // новинки вперёд
		if (filter === "high-rating") return copy.sort((a, b) => b.rating - a.rating); // по убыванию рейтинга
		return copy;
	}

	// Обновляет данные слайдера после смены фильтра: пересортировывает товары, разбивает на слайды,
	// корректирует текущий индекс и перерисовывает слайдер.
	function refreshData() {
		const sorted = getSortedProducts(currentFilter);
		slides = splitToSlides(sorted);
		// Если текущий индекс стал больше количества слайдов – сбрасываем на последний
		if (currentIndex >= slides.length) currentIndex = Math.max(0, slides.length - 1);
		if (currentIndex < 0) currentIndex = 0;
		renderSlider();
	}

	// Создаёт DOM-элемент карточки товара на основе объекта product.
	function createCard(product) {
		// Если товар новый – добавляем метку "Новинка"
		let textNew = "";
		if (product.isNew) {
			textNew = `<span class="text-new">Новинка</span>`;
		}
		// Вычисляем цену без скидки (для отображения перечёркнутой старой цены).
		// Так как dis хранится как "-15%", вырезаем число и подставляем в формулу.
		let priceWithoutDisc = Math.round(product.price / (1 - Number(product.dis.slice(1, -1)) / 100));

		const card = document.createElement("a");
		card.className = "special-offers__item";
		card.innerHTML = `
            <div class="special-offers__item-image">
				<img class="special-offers__item-img" src="${product.img}" alt="Изображение секции продукта" />
			</div>
			<div class="special-offers__item-content">
				<div class="special-offers__item-container">
					<h3 class="special-offers__item-title title-product-card">
						${product.name}
						${textNew}
					</h3>
					<div class="special-offers__item-info">
						<div class="special-offers__availability-indicator">
							<div class="special-offers__availability-indicator-icon"></div>
							<p class="special-offers__availability-indicator-text text-availability-indicator">В наличии</p>
						</div>
						<div class="special-offers__item-info-discount text-button-white">${product.dis}</div>
					</div>
					<div class="special-offers__item-price">
						<div class="special-offers__item-price-actual text-product-card-price">
							${product.price} <span class="rub-symbol">₽</span>
						</div>
						<div class="special-offers__item-price-old text-product-card-old-price">
							${priceWithoutDisc} <span class="rub-symbol">₽</span>
						</div>
					</div>
				</div>
				<div class="special-offers__item-cart-menu">
					<div class="special-offers__item-cart-menu-counter text-button-black">
						<button class="counter-btn minus" aria-label="Уменьшить количество">−</button>
						<input name="counter" type="text" class="counter-value" value="${product.qty}"  />
						<button class="counter-btn plus" aria-label="Увеличить количество">🞢</button>
					</div>
					<div class="special-offers__item-cart-menu-button text-button-white">В корзину</div>
				</div>
			</div>
        `;
		return card;
	}

	// Отрисовывает все слайды в треке. Для каждого слайда создаётся div.slide,
	// внутри него div.special-offers__content с карточками.
	function renderSlider() {
		track.innerHTML = "";
		if (slides.length === 0) {
			track.innerHTML = '<div class="slide"><div class="empty">Товаров нет</div></div>';
			counterDiv.innerText = `0 / 0`;
			prevBtn.disabled = true;
			nextBtn.disabled = true;
			return;
		}

		slides.forEach((slideProducts) => {
			const slideDiv = document.createElement("div");
			slideDiv.className = "slide";
			const grid = document.createElement("div");
			grid.className = "special-offers__content";
			slideProducts.forEach((p) => grid.appendChild(createCard(p)));
			slideDiv.appendChild(grid);
			track.appendChild(slideDiv);
		});
		updatePosition(); // сдвигаем ленту на нужный слайд
		itemCounterFunc(); // обновляем счётчики на новых карточках
		cartFunc(); // переинициализируем обработчики корзины для новых карточек
	}

	// Обновляет положение слайдера (сдвиг по горизонтали), состояние кнопок и счётчик слайдов.
	function updatePosition() {
		if (slides.length === 0) return;
		const offset = -currentIndex * 100;
		track.style.transform = `translateX(${offset}%)`;
		counterDiv.innerText = `${currentIndex + 1} / ${slides.length}`;
		prevBtn.disabled = currentIndex === 0;
		nextBtn.disabled = currentIndex === slides.length - 1;
	}

	function next() {
		if (currentIndex < slides.length - 1) {
			currentIndex++;
			updatePosition();
		}
	}
	function prev() {
		if (currentIndex > 0) {
			currentIndex--;
			updatePosition();
		}
	}

	// Устанавливает фильтр, обнуляет индекс слайда и перезагружает данные.
	function setFilter(filter) {
		currentFilter = filter;
		currentIndex = 0;
		refreshData();
	}

	// Навешиваем обработчики на кнопки слайдера и фильтры
	prevBtn.onclick = prev;
	nextBtn.onclick = next;
	filterBtns.forEach((btn) => {
		btn.onclick = () => setFilter(btn.dataset.id);
	});

	// Запускаем слайдер с фильтром "popular"
	setFilter("popular");
}
