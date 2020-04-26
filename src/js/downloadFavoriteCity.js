import OpenWeather from "../API/OpenWeather";
import OpenGalleryImg from "../API/OpenGalleryImg";
import { ready, axiosCityImg } from "./pageLoad";
import { addToFavorites } from "./addFavoriteCity";

const favoriteList = document.querySelector(".js-slider-list");

function clickFavoriteCityName(e) {
  if (e.target.nodeName === "P") {
    const cityName = e.target.innerText;
    OpenGalleryImg.searchQuery = cityName;
    OpenWeather.querry = cityName;
    ready();
    axiosCityImg();
    addToFavorites.classList.add("activ-bnt");
    addToFavorites.disabled = true;
  }
}

favoriteList.addEventListener("click", clickFavoriteCityName);
