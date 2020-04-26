import cityItemTempl from "../templates/cityItem.hbs";

import OpenGalleryImg from "../API/OpenGalleryImg";
import OpenWeather from "../API/OpenWeather";
import { setLocalStorageCity } from "./utilities";
import { ready, axiosCityImg } from "./pageLoad";

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
  OpenWeather.querry = cities[0];
  OpenGalleryImg.searchQuery = cities[0];
  ready();
  axiosCityImg();
  addToFavorites.classList.add("activ-bnt");
  addToFavorites.disabled = true;
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
