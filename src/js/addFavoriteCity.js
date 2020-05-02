import cityItemTempl from "../templates/cityItem.hbs";

import OpenGalleryImg from "../API/OpenGalleryImg";
import OpenWeather from "../API/OpenWeather";
import { setLocalStorageCity } from "./utilities";
import { ready, axiosCityImg } from "./pageLoad";
import { renderCurrentWeather } from "./currentWeather";
import { renderRandomQuote } from "./quote";
export const addToFavorites = document.querySelector("#js-btnAdd");
export const btnNext = document.querySelector(".js-btnNext");
export const btnPrev = document.querySelector(".js-btnPrev");
const listSities = document.querySelector(".js-slider-list");

const cities = JSON.parse(localStorage.getItem("cities"));
if (cities !== null && cities.length !== 0) {
  cities.forEach((city) =>
    listSities.insertAdjacentHTML("beforeend", cityItemTempl(city)),
  );
  OpenWeather.query = cities[0];
  OpenGalleryImg.searchQuery = cities[0];
  ready();
  OpenWeather.fetchForecast().then((forecast) => axiosCityImg());
  renderCurrentWeather();
  renderRandomQuote();

  addToFavorites.classList.add("activ-bnt");
  addToFavorites.disabled = true;
} else {
  btnNext.style.visibility = "hidden";
  btnPrev.style.visibility = "hidden";
}

if (cities === null || cities.length === 0) {
  OpenWeather.query = "Kyiv";
  OpenGalleryImg.searchQuery = "Kyiv";
  ready();
  OpenWeather.fetchForecast().then((forecast) => axiosCityImg());
  renderCurrentWeather();
  renderRandomQuote();
}

addToFavorites.addEventListener("click", handlerClickButton);

function handlerClickButton() {
  const city = OpenGalleryImg.query;
  console.log(city);
  if (city) {
    setLocalStorageCity(city);
    addToFavorites.classList.add("activ-bnt");
    addToFavorites.disabled = true;
    addToFavorites.classList.remove("inactiv-bnt");
    btnNext.style.visibility = "visible";
    btnPrev.style.visibility = "visible";
  }
}
