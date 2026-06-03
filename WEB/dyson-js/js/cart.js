// Модуль корзины: хранит товары в массиве cart, реализует добавление/удаление, изменение количества,
// пересчёт стоимости, скидок, отображение корзины в модальном окне.
// Экспортирует функцию cartFunc(), которая инициализирует все обработчики на карточках товаров.

let cart = [
	// Массив, в котором хранятся объекты товаров, добавленных в корзину.
	// Пример структуры объекта:
	// {
	//   id: number,        // уникальный идентификатор товара (совпадает с data-item-id)
	//   name: string,      // название товара
	//   price: number,     // исходная цена (без учёта скидки)
	//   dis: number,       // скидка в процентах (например, 15 -> -15%)
	//   qty: number,       // количество единиц данного товара
	//   img: string        // путь к изображению товара
	// }
	// Начальное состояние – пустая корзина (комментарии показывают примеры)
];

export function cartFunc() {
	// Находим все карточки товаров на странице (по классу .special-offers__item)
	let itemList = document.querySelectorAll(".special-offers__item");
	// Находим все кнопки "В корзину" на карточках
	let addToCartBtn = document.querySelectorAll(".special-offers__item-cart-menu-button");
	// Находим элемент счётчика рядом с иконкой корзины в шапке (показывает общее количество единиц товаров)
	let headerCartCount = document.querySelector(".header__cart-count");
	// Переменная для общего количества товаров
	let itemTotalCount = 0;

	// Проходим по всем карточкам, чтобы присвоить каждой уникальный data-атрибут и навесить обработчик добавления
	for (let i = 0; i < itemList.length; i++) {
		// Присваиваем каждой карточке атрибут data-item-id со значением, равным индексу в псевдомассиве.
		// Это позволяет однозначно идентифицировать карточку, даже если изменится порядок или будут фильтры.
		itemList[i].setAttribute("data-item-id", `${i}`);

		// Добавляем обработчик клика на кнопку "В корзину" для текущей карточки
		addToCartBtn[i].addEventListener("click", () => {
			// Извлекаем название товара. Ищем внутри карточки с текущим data-item-id элемент с классом .special-offers__item-title,
			// берём его текстовое содержимое и удаляем лишние пробелы по краям.
			let productName = document
				.querySelector(`.special-offers__item[data-item-id="${i}"] .special-offers__item-title`)
				.textContent.trim();

			// Пытаемся найти старую цену (перечёркнутую) – если есть скидка, то такой элемент присутствует
			let oldPrice = document.querySelector(
				`.special-offers__item[data-item-id="${i}"] .special-offers__item-price-old`,
			);

			let productPrice;
			if (oldPrice) {
				// Если старая цена существует, значит товар со скидкой.
				// Берём текст, обрезаем последний символ (знак рубля "₽" или "р"), преобразуем в число.
				productPrice = Number(oldPrice.textContent.trim().slice(0, -1));
			} else {
				// Иначе – товар без скидки, берём актуальную цену (также убираем последний символ)
				productPrice = Number(
					document
						.querySelector(
							`.special-offers__item[data-item-id="${i}"] .special-offers__item-price-actual`,
						)
						.textContent.trim()
						.slice(0, -1),
				);
			}

			// Извлекаем скидку в процентах из элемента .special-offers__item-info-discount.
			// Текст может выглядеть как "-15%", поэтому обрезаем первый символ (минус) и последний (процент),
			// преобразуем в число. Например: "-15%" -> slice(1, -1) -> "15" -> Number -> 15.
			let productDiscount = Number(
				document
					.querySelector(
						`.special-offers__item[data-item-id="${i}"] .special-offers__item-info-discount`,
					)
					.textContent.trim()
					.slice(1, -1),
			);

			// Получаем количество из счётчика (поле input с классом .counter-value) в этой карточке.
			// .value даёт строку, но в HTML это число, для хранения оставляем как есть, позже преобразуем.
			let productQty = document.querySelector(
				`.special-offers__item[data-item-id="${i}"] .counter-value`,
			).value;

			// Получаем путь к изображению из src тега img с классом .special-offers__item-img
			let productImg = document.querySelector(
				`.special-offers__item[data-item-id="${i}"] .special-offers__item-img`,
			).src;

			// Формируем объект товара для добавления в корзину
			let product = {
				id: i, // уникальный ID, равный индексу карточки
				name: productName,
				price: productPrice,
				dis: productDiscount,
				qty: productQty,
				img: productImg,
			};

			// Вызываем функцию добавления в корзину
			addToCart(product);
			// Всплывающее уведомление для пользователя
			alert("Товар добавлен в корзину");
			// Перерисовываем содержимое корзины (обновляем отображение)
			render();
		});
	}

	// Вспомогательная функция: добавляет товар в массив cart или увеличивает количество, если уже есть.
	function addToCart(product) {
		// Ищем товар с таким же id в корзине
		let existing = cart.find((item) => item.id === product.id);

		if (existing) {
			// Если уже есть – увеличиваем количество на product.qty
			existing.qty = Number(existing.qty) + Number(product.qty);
			render();
		} else {
			// Иначе добавляем новый объект, копируя свойства из product
			cart.push({
				id: product.id,
				name: product.name,
				price: product.price,
				dis: product.dis,
				qty: product.qty, // Здесь используется qty из карточки (может быть больше 1)
				img: product.img,
			});
			render();
		}
	}

	// Вычисляет итоговую стоимость позиции корзины с учётом скидки и количества.
	// Формула: цена * (1 - скидка/100) * количество
	function itemTotal(item) {
		let priceWithDisc = item.price * (1 - item.dis / 100);
		return priceWithDisc * item.qty;
	}

	// Форматирует число в рубли с символом рубля (в виде HTML-спана).
	// Использует toLocaleString() для разделения тысяч пробелами.
	function rub(amount) {
		return Math.round(amount).toLocaleString() + `<span class="rub-symbol">&nbsp₽</span>`;
	}

	// Простейшая защита от XSS: заменяет символы &, <, > на HTML-сущности.(Увидел в видео-уроке на ютубе)
	function safeText(str) {
		if (typeof str !== "string") str = String(str);
		return str.replace(/[&<>]/g, function (m) {
			if (m === "&") return "&amp;";
			if (m === "<") return "&lt;";
			if (m === ">") return "&gt;";
			return m;
		});
	}

	// Главная функция отрисовки корзины: обновляет содержимое модального окна, счётчик в шапке,
	// а также перепривязывает обработчики к кнопкам изменения количества и удаления.
	function render() {
		// Контейнер, куда вставляются строки с товарами
		let container = document.getElementById("cartItems");
		// Футер корзины (область с итогами и кнопками)
		let footer = document.getElementById("cartFooter");

		// Если корзина пуста – показываем сообщение и очищаем футер
		if (cart.length === 0) {
			container.innerHTML = `<div class="empty">Корзина пуста. <div>`;
			footer.innerHTML = ``;
			headerCartCount.value = 0; // обнуляем счётчик в шапке

			let resetBtn = document.getElementById("resetBtn");
			if (resetBtn) resetBtn.onclick = () => resetCart(); // если есть кнопка сброса – привязываем

			return;
		}

		// Переменная для накопления HTML-разметки строк товаров
		let rows = "";
		// Проходим по каждому товару в корзине
		for (let item of cart) {
			let total = itemTotal(item); // итоговая стоимость данной позиции (со скидкой)

			// Формируем блок скидки:
			let discountHtml = "";
			if (item.dis > 0) {
				// Если скидка есть – показываем процент и сумму скидки (цена без скидки * процент / 100 * количество)
				discountHtml =
					'<span class="discount">-' +
					item.dis +
					"%</span>" +
					'<div class="discount-value">' +
					rub(((item.price * item.dis) / 100) * item.qty) +
					"</div>";
			} else {
				// Если скидки нет – показываем прочерк
				discountHtml = '<span class="discount" style="background:#e9ecef; color:#5f6c80;">—</span>';
			}

			// Если есть скидка, показываем старую (перечёркнутую) цену за единицу
			let oldPriceHtml = item.dis > 0 ? '<div class="old-price">' + rub(item.price) + "</div>" : "";

			// Итоговая цена за позицию (с учётом количества)
			let price = "";
			if (item.dis > 0) {
				price = `${rub(item.price * (1 - item.dis / 100) * item.qty)}`;
			} else {
				price = `${rub(item.price * item.qty)}`;
			}

			// Формируем HTML-строку для одного товара
			rows += `
            <div class="cart-row" data-id="${item.id}">
                <div class="product">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="product-info">
                        <div class="product-title">${safeText(item.name)}</div>
                    </div>
                </div>
                <div class="id">
                    ${item.id}
                </div>
				<div class="price">
					${oldPriceHtml}
                </div>
                <div class="quantity">
                    <button class="qty-btn decr" aria-label="Уменьшить количество" data-id="${item.id}">−</button>
					<input name="counter" type="number" class="qty-input" value="${item.qty}" min="1" data-id="${item.id}"/>
					<button class="qty-btn incr" aria-label="Увеличить количество" data-id="${item.id}">🞢</button>    
                </div>
				<div>${discountHtml}</div>
                <div class="total-price price">
                    ${price}
                </div>
                <button class="remove-btn" data-id="${item.id}"><span></span><span></span></button>
            </div>                
        `;
		}

		// Вставляем сгенерированные строки в контейнер
		container.innerHTML = rows;

		// Переменные для подсчёта итогов по всей корзине
		let subtotal = 0, // сумма без скидок (цена * количество)
			totalDiscount = 0, // общая сумма скидки
			grandTotal = 0, // итоговая сумма к оплате
			itemTotalCount = 0; // общее количество единиц товаров (сумма qty)

		for (let item of cart) {
			let full = item.price * item.qty; // полная стоимость без скидки
			let final = itemTotal(item); // стоимость со скидкой
			subtotal += full;
			totalDiscount += full - final;
			grandTotal += final;
			itemTotalCount += Number(item.qty);
			headerCartCount.value = itemTotalCount; // обновляем счётчик в шапке
		}

		// Формируем футер: выводим стоимость без скидки, общее количество, сумму скидки и итого,
		// а также кнопки "Очистить" и "Оформить".
		footer.innerHTML = `
			<div class="summary">
				<div class="summary-text"><span class="text-value-without-discount">Стоимость без скидки:</span></div>
				<div class="summary-item summary-text">${rub(subtotal)}</div>
				<div class="summary-item total-item summary-text">${itemTotalCount}</div>
        		<div class="summary-item summary-text">${rub(totalDiscount)}</div>
				<div class="summary-item summary-text">${rub(grandTotal)}</div>
            </div>
            <div class="modal-cart__footer-btn">
			<div class="summary-item grand-total summary-text"></div>
                <button id="clearCartBtn" class="btn-outline">Очистить</button>
                <button id="orderBtn" class="btn-order">Оформить</button>
            </div>
        `;

		// Привязываем обработчики событий к кнопкам внутри корзины (удаление, изменение количества)
		attachEvents();
		// Кнопка "Очистить" – полностью очищает корзину
		document.getElementById("clearCartBtn")?.addEventListener("click", () => {
			cart = [];
			render();
		});
		// Кнопка "Оформить" – выводит сообщение о заказе
		document.getElementById("orderBtn")?.addEventListener("click", () => {
			if (cart.length) alert(`Заказ оформлен!\nСумма: ${Math.round(grandTotal)} ₽`);
			else alert("Корзина пуста");
		});

		// Внутренняя функция, которая навешивает обработчики на динамически созданные кнопки.
		function attachEvents() {
			// Кнопки удаления (крестик)
			document.querySelectorAll(".remove-btn").forEach((btn) => {
				btn.onclick = (e) => {
					let id = parseInt(btn.dataset.id);
					cart = cart.filter((i) => i.id != id);
					render();
				};
			});

			// Кнопки уменьшения количества
			document.querySelectorAll(".decr").forEach((btn) => {
				btn.onclick = () => {
					let id = parseInt(btn.dataset.id);
					let item = cart.find((i) => i.id === id);
					if (item && item.qty > 1) {
						item.qty--;
						render();
					} else if (item && item.qty === 1) {
						// Если количество 1 и нажали "минус" – спрашиваем, удалить ли товар
						if (confirm(`Удалить "${item.name}"?`)) {
							cart = cart.filter((i) => i.id !== id);
							render();
						}
					}
				};
			});

			// Кнопки увеличения количества
			document.querySelectorAll(".incr").forEach((btn) => {
				btn.onclick = () => {
					let id = parseInt(btn.dataset.id);
					let item = cart.find((i) => i.id === id);
					if (item) {
						item.qty++;
						render();
					}
				};
			});

			// Поля ввода количества
			document.querySelectorAll(".qty-input").forEach((inp) => {
				inp.onchange = () => {
					let id = parseInt(inp.dataset.id);
					let item = cart.find((i) => i.id === id);
					if (item) {
						let newVal = parseInt(inp.value);
						if (isNaN(newVal) || newVal < 1) newVal = 1;
						item.qty = newVal;
						render();
					}
				};
			});
		}
	}

	// Первоначальный вызов render, чтобы отобразить корзину (даже пустую)
	render();
}
