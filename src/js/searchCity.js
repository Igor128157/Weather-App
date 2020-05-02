import OpenGalleryImg from "../API/OpenGalleryImg";
import { addToFavorites } from "./addFavoriteCity";
import OpenWeather from "../API/OpenWeather";
import { ready, axiosCityImg } from "./pageLoad";
import { toLowCaseCity } from "./utilities";
import { renderCurrentWeather } from "./currentWeather";
import { renderRandomQuote } from "./quote";

export const inputForm = document.querySelector(".js-form");

const handleInput = (e) => {
  e.preventDefault();
  const inputValue = toLowCaseCity(inputForm.elements.query.value);
  OpenWeather.query = inputValue;
  ready();
  OpenWeather.fetchForecast().then((forecast) => {
    OpenGalleryImg.searchQuery = inputValue;
    axiosCityImg();
  });
  renderCurrentWeather();
  renderRandomQuote();
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
