import { burgerMenuFunc } from "./burger.js";
import { headerShadowFunc } from "./header-shadow.js";
import { tagListFunc } from "./specialOffers/tag-list.js";
import { filterFunc } from "./specialOffers/special-offers-filter.js";
import { itemCounterFunc } from "./specialOffers/itemCounter.js";
import { commentLightGallery } from "./lightGallery.js";
import { reviewShowMore } from "./reviewShowMore.js";
import { newsShowMore } from "./newsShowMore.js";

const header = document.querySelector(".header");

burgerMenuFunc(header);
headerShadowFunc(header);
tagListFunc();
filterFunc();
itemCounterFunc();
commentLightGallery(2);
reviewShowMore();
newsShowMore();
