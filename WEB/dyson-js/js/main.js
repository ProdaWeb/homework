import { burgerMenuFunc } from "./burger.js";
import { headerShadowFunc } from "./header-shadow.js";
import { tagListFunc } from "./specialOffers/tag-list.js";
import { filterFunc } from "./specialOffers/special-offers-filter.js";
import { sliderFunc } from "./specialOffers/slider.js";
import { commentLightGallery } from "./lightGallery.js";
import { reviewShowMore } from "./reviewShowMore.js";
import { newsShowMore } from "./newsShowMore.js";
import { cartFunc } from "./cart.js"; //для работы корзины после смены фильтра товаров
import { itemCounterFunc } from "./specialOffers/itemCounter.js"; // для работы счетчика на карточках товаров после мены фильтра

const header = document.querySelector(".header");

burgerMenuFunc(header); // функция для бургера
headerShadowFunc(header); // функция для тени хедера
tagListFunc(); // функция для работы только списка тэгов и кнопки
sliderFunc(); // функция для работы слайдера товаров
filterFunc(); // функция для работы только меню фильтра
commentLightGallery(); // функция для работы библиотеки lightGallery и кнопок
reviewShowMore(); // функция для работы кнопки 'показать еще' в отзывах
newsShowMore(); //  функция для работы кнопки 'показать еще' в новостях
//cartFunc();
//itemCounterFunc();
