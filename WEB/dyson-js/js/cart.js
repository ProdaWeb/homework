let cart = [
	// {
	// 	id: 1,
	// 	name: "Фен Dyson",
	// 	price: 59990,
	// 	qty: 1,
	// 	img: "images/special offers/special-offers-image-1.jpg",
	// },
	// {
	// 	id: 2,
	// 	name: "Фен Dyson",
	// 	price: 59990,
	// 	qty: 1,
	// 	img: "images/special offers/special-offers-image-1.jpg",
	// },
];
export function cartFunc() {
	let itemList = document.querySelectorAll(".special-offers__item");
	let addToCartBtn = document.querySelectorAll(".special-offers__item-cart-menu-button");
	let headerCartCount = document.querySelector(".header__cart-count");
	let itemTotalCount = 0;

	for (let i = 0; i < itemList.length; i++) {
		itemList[i].setAttribute("data-item-id", `${i}`); // вот здесь этот ID в виде data аттрибута с числовым значением присваивается по их порядковому номеру

		addToCartBtn[i].addEventListener("click", () => {
			let productName = document
				.querySelector(`.special-offers__item[data-item-id="${i}"] .special-offers__item-title`)
				.textContent.trim();

			let oldPrice = document.querySelector(
				`.special-offers__item[data-item-id="${i}"] .special-offers__item-price-old`,
			);

			let productPrice;
			if (oldPrice) {
				productPrice = Number(oldPrice.textContent.trim().slice(0, -1));
			} else {
				productPrice = Number(
					document
						.querySelector(
							`.special-offers__item[data-item-id="${i}"] .special-offers__item-price-actual`,
						)
						.textContent.trim()
						.slice(0, -1),
				);
			}

			let productDiscount = Number(
				document
					.querySelector(
						`.special-offers__item[data-item-id="${i}"] .special-offers__item-info-discount`,
					)
					.textContent.trim()
					.slice(1, -1),
			);

			let productQty = document.querySelector(
				`.special-offers__item[data-item-id="${i}"] .counter-value`,
			).value;

			let productImg = document.querySelector(
				`.special-offers__item[data-item-id="${i}"] .special-offers__item-img`,
			).src;

			let product = {
				id: i,
				name: productName,
				price: productPrice,
				dis: productDiscount,
				qty: productQty,
				img: productImg,
			};

			addToCart(product);
			alert("Товар добавлен в корзину");
			render();
		});
	}

	function addToCart(product) {
		let existing = cart.find((item) => item.id === product.id);

		if (existing) {
			existing.qty++;
			render();
		} else {
			cart.push({
				id: product.id,
				name: product.name,
				price: product.price,
				dis: product.dis,
				qty: product.qty,
				img: product.img,
			});

			render();
		}
	}

	function itemTotal(item) {
		let priceWithDisc = item.price * (1 - item.dis / 100);
		return priceWithDisc * item.qty;
	}

	function rub(amount) {
		return Math.round(amount).toLocaleString() + `<span class="rub-symbol">&nbsp₽</span>`;
	}

	function safeText(str) {
		if (typeof str !== "string") str = String(str);
		return str.replace(/[&<>]/g, function (m) {
			if (m === "&") return "&amp;";
			if (m === "<") return "&lt;";
			if (m === ">") return "&gt;";
			return m;
		});
	}

	function render() {
		let container = document.getElementById("cartItems");
		let footer = document.getElementById("cartFooter");

		if (cart.length === 0) {
			container.innerHTML = `<div class="empty">Корзина пуста. <div>`;
			footer.innerHTML = ``;
			headerCartCount.value = 0;

			let resetBtn = document.getElementById("resetBtn");
			if (resetBtn) resetBtn.onclick = () => resetCart();

			return;
		}

		let rows = "";
		for (let item of cart) {
			let total = itemTotal(item);

			let discountHtml = "";
			if (item.dis > 0) {
				discountHtml =
					'<span class="discount">-' +
					item.dis +
					"%</span>" +
					'<div class="discount-value">' +
					rub(((item.price * item.dis) / 100) * item.qty) +
					"</div>";
			} else {
				discountHtml = '<span class="discount" style="background:#e9ecef; color:#5f6c80;">—</span>';
			}

			let oldPriceHtml = item.dis > 0 ? '<div class="old-price">' + rub(item.price) + "</div>" : "";

			let price = "";
			if (item.dis > 0) {
				price = `${rub(item.price * (1 - item.dis / 100) * item.qty)}`;
			} else {
				price = `${rub(item.price * item.qty)}`;
			}

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

		container.innerHTML = rows;

		// расчёт сумм и общего количества товаров
		let subtotal = 0,
			totalDiscount = 0,
			grandTotal = 0,
			itemTotalCount = 0;
		for (let item of cart) {
			let full = item.price * item.qty;
			let final = itemTotal(item);
			subtotal += full;
			totalDiscount += full - final;
			grandTotal += final;
			itemTotalCount += Number(item.qty); // общее количество единиц товаров
			headerCartCount.value = itemTotalCount;
		}

		// let grandTotal = cart.reduce((s, i) => s + itemTotal(i), 0);
		// for (let item of cart) {
		// 	itemTotalCount += parseInt(item.qty);
		// 	headerCartCount.value = itemTotalCount;
		// }

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

		attachEvents();
		document.getElementById("clearCartBtn")?.addEventListener("click", () => {
			cart = [];

			render();
		});
		document.getElementById("orderBtn")?.addEventListener("click", () => {
			if (cart.length) alert(`Заказ оформлен!\nСумма: ${rub(grandTotal)}`);
			else alert("Корзина пуста");
		});

		function attachEvents() {
			document.querySelectorAll(".remove-btn").forEach((btn) => {
				btn.onclick = (e) => {
					let id = parseInt(btn.dataset.id);
					cart = cart.filter((i) => i.id != id);

					render();
				};
			});

			document.querySelectorAll(".decr").forEach((btn) => {
				btn.onclick = () => {
					let id = parseInt(btn.dataset.id);
					let item = cart.find((i) => i.id === id);

					if (item && item.qty > 1) {
						item.qty--;

						render();
					} else if (item && item.qty === 1) {
						if (confirm(`Удалить "${item.name}"?`)) {
							cart = cart.filter((i) => i.id !== id);

							render();
						}
					}
				};
			});

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

			document.querySelectorAll("qty-input").forEach((inp) => {
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

		function resetCart() {
			cart = [
				// {
				// 	id: 1,
				// 	name: "Фен Dyson",
				// 	price: 59990,
				// 	qty: 2,
				// 	img: "images/special offers/special-offers-image-1.jpg",
				// },
				// {
				// 	id: 2,
				// 	name: "Фен Dyson",
				// 	price: 59990,
				// 	qty: 2,
				// 	img: "images/special offers/special-offers-image-1.jpg",
				// },
			];
			render();
		}
	}
	render();
}
