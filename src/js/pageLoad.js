import { addMarkupToPage, setBodyBackground } from "./utilities";
import { forecast, modifyResponse } from "./forecast";

import OpenWeather from "../API/OpenWeather";
import OpenGalleryImg from "../API/OpenGalleryImg";

import getForecastMarkup from "../templates/forecast.hbs";

const forecastSection = document.querySelector(".forecast-wrap");
const cityName = document.querySelector(".forecast__city-name");
const forecastList = document.querySelector(".forecast__days");
const forecastListInfo = document.querySelector(".forecast-info__list");

export function ready() {
  if (OpenWeather._query === "") return;

  OpenWeather.fetchForecast()
    .then(forecast)
    .then((data) => {
      sessionStorage.setItem("curentForecast", JSON.stringify(data));

      forecastSection.classList.remove("hidden");
      forecastList.innerHTML = "";
      forecastListInfo.parentElement.classList.add("hidden");

      cityName.innerHTML = `${data.city.name}, ${data.city.country}`;

      const modifyForecast = modifyResponse(data);
      let murkup = "";

      if (modifyForecast.length === 5) {
        murkup = getForecastMarkup(modifyForecast);
      } else {
        murkup = getForecastMarkup(modifyForecast.slice(1));
      }

      addMarkupToPage(murkup, forecastList);
    })
    .catch(console.error);
}

export function axiosCityImg() {
  OpenGalleryImg.axiosCityImg()
    .then((res) => {
      const randomCity = Math.floor(Math.random() * res.length);
      const cityPhoto = res[randomCity].largeImageURL;
      setBodyBackground(cityPhoto);
    })
    .catch(console.error);
}
