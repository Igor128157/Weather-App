import OpenWeather from "../API/OpenWeather";
import OpenGalleryImg from "../API/OpenGalleryImg";
import { ready, axiosCityImg } from "./pageLoad";
import { addToFavorites } from "./addFavoriteCity";
import { renderCurrentWeather } from "./currentWeather";
import {renderRandomQuote} from "./quote";

const favoriteList = document.querySelector(".js-slider-list");

function clickFavoriteCityName(e) {
  if (e.target.nodeName === "P") {
    const cityName = e.target.innerText;
    OpenGalleryImg.searchQuery = cityName;
    OpenWeather.query = cityName;
    ready();
    OpenWeather.fetchForecast().then((forecast) => axiosCityImg());
    renderCurrentWeather();
    renderRandomQuote();

    addToFavorites.classList.add("activ-bnt");
    addToFavorites.disabled = true;
  }
}

favoriteList.addEventListener("click", clickFavoriteCityName);
