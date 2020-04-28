import cityItemTempl from "../templates/cityItem.hbs";

import OpenGalleryImg from "../API/OpenGalleryImg";
import OpenWeather from "../API/OpenWeather";
import { setLocalStorageCity } from "./utilities";
import { ready, axiosCityImg } from "./pageLoad";
import { renderCurrentWeather } from "./currentWeather";
import {renderRandomQuote} from "./quote"
export const addToFavorites = document.querySelector("#js-btnAdd");
export const btnNext = document.querySelector(".js-btnNext");
const listSities = document.querySelector(".js-slider-list");

document.addEventListener("DOMContentLoaded", () => {
  if (!listSities.childElementCount) {
    btnNext.style.visibility = "hidden";
  }
});

const cities = JSON.parse(localStorage.getItem("cities"));
if (cities !== null) {
  cities.forEach((city) =>
    listSities.insertAdjacentHTML("beforeend", cityItemTempl(city)),
  );
  // Нужно придумать что будет при первой закгрузке, если пока нет избранных городов?!?!?!?!
  OpenWeather.query = cities[0];
  OpenGalleryImg.searchQuery = cities[0];
  ready();
  axiosCityImg();
  renderCurrentWeather();
  renderRandomQuote();
  addToFavorites.classList.add("activ-bnt");
  addToFavorites.disabled = true;
}
//Добавил загрузку по умолчанию погоды и фона Киева
if (!! cities) {
  OpenWeather.query = "Kyiv";
  OpenGalleryImg.searchQuery = "Kyiv";
  ready();
  axiosCityImg();
  renderCurrentWeather();
  renderRandomQuote();
}

addToFavorites.addEventListener("click", handlerClickButton);

function handlerClickButton(e) {
  const city = OpenGalleryImg.searchQuery;
  if (city) {
    setLocalStorageCity(city);
    addToFavorites.classList.add("activ-bnt");
    addToFavorites.disabled = true;
    addToFavorites.classList.remove("inactiv-bnt");
    btnNext.style.visibility = "visible";
  }
}
