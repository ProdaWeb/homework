// Главный входной файл (точка входа). Импортирует все модули и инициализирует их после загрузки DOM.
// Здесь подключается бургер-меню, тень шапки, фильтры, слайдер, галереи, кнопки "показать ещё" и корзина.

import { burgerMenuFunc } from "./burger.js";
import { headerShadowFunc } from "./header-shadow.js";
import { tagListFunc } from "./specialOffers/tag-list.js";
import { filterFunc } from "./specialOffers/special-offers-filter.js";
import { sliderFunc } from "./specialOffers/slider.js";
import { commentLightGallery } from "./lightGallery.js";
import { reviewShowMore } from "./reviewShowMore.js";
import { newsShowMore } from "./newsShowMore.js";

// Находим элемент шапки по классу .header – он нужен для бургер-меню и тени
const header = document.querySelector(".header");

// Вызов всех функций инициализации
burgerMenuFunc(header); // активируем бургер-меню
headerShadowFunc(header); // включаем тень при скролле
tagListFunc(); // обрабатываем кнопку "Показать ещё" у списка тегов
sliderFunc(); // инициализируем слайдер товаров со скидками
filterFunc(); // настраиваем выпадающее меню фильтра
commentLightGallery(); // подключаем lightGallery для фото в отзывах
reviewShowMore(); // кнопка "Показать ещё" для отзывов
newsShowMore(); // кнопка "Показать ещё" для новостей
