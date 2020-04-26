import OpenGalleryImg from "../API/OpenGalleryImg";
import { addToFavorites } from "./addFavoriteCity";
import OpenWeather from "../API/OpenWeather";
import { ready, axiosCityImg } from "./pageLoad";
import { toLowCaseCity } from "./utilities";

export const inputForm = document.querySelector(".js-form");

const handleInput = (e) => {
  e.preventDefault();
  const inputValue = toLowCaseCity(inputForm.elements.query.value);
  OpenGalleryImg.searchQuery = inputValue;
  OpenWeather.querry = inputValue;
  ready();
  axiosCityImg();
  inputForm.reset();
  const cities = JSON.parse(localStorage.getItem("cities"));
  if (cities !== null) {
    if (!cities.includes(inputValue)) {
      addToFavorites.classList.remove("activ-bnt");
      addToFavorites.disabled = false;
    } else {
      addToFavorites.classList.add("activ-bnt");
      addToFavorites.disabled = true;
    }
  }
};

inputForm.addEventListener("submit", handleInput);
