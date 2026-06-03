export function filterFunc() {
	const filterMenuBtn = document.querySelector(".special-offers__header-button"); //ищет кнопку фильтра
	const filterList = document.querySelector(".filter-menu__list"); //ищет меню фильтра
	const filterItem = document.querySelector(".filter-menu__list-item"); //ищет элемент меню фильтра
	const List = document.querySelectorAll(".filter-menu__list-item"); //ищет каждый элемент меню фильтра
	const body = document.body; //ищет body

	//обработчик клика на кнопку
	filterMenuBtn.addEventListener(`click`, () => {
		filterMenuBtn.classList.toggle("open"); //добавляет/удаляет класс "open" у кнопки(весь процесс в css)
		body.classList.toggle("lock"); //добавляет/удаляет класс "lock" у body(запрещает скролл)
	});

	//обработчик клика на любое место кроме кнопки
	window.addEventListener("click", (event) => {
		// проверка на наличие класса "open" у кнопки и на то, что клик не по кнопке
		if (!filterMenuBtn.contains(event.target) && filterMenuBtn.classList.contains("open")) {
			filterMenuBtn.classList.remove("open"); // удаляет класс "open"  у кнопки
			body.classList.remove("lock"); // удаляет класс "lock" у body(разрешает скролл)
		}
	});

	// обработчик клика на элементы меню
	filterList.addEventListener(`click`, (event) => {
		const targetItem = event.target.closest(`li`); // ищет элемент меню, ближайший к клику
		const targetId = targetItem.dataset.id; // копирует значение data аттрибута нажатого элемента
		const targetText = targetItem.querySelector("span").textContent; // ищет текст нажатого элемента
		filterMenuBtn.querySelector("p").textContent = targetText; // меняет текст кнопки на текст нажатого элемента
		filterMenuBtn.dataset.id = targetId; //меняет data аттрибут кнопки на data аттрибут нажатого элемента

		// тут присваивается класс только выбранному элементу меню, нужно для стилизации
		List.forEach((item) => {
			if (filterMenuBtn.dataset.id === item.dataset.id) {
				item.classList.toggle("active");
			} else {
				item.classList.remove("active");
			}
		});
	});
}
