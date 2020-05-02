import { addMarkupToPage, setBodyBackground } from "./utilities";
import { forecast, modifyResponse } from "./forecast";

import OpenWeather from "../API/OpenWeather";
import OpenGalleryImg from "../API/OpenGalleryImg";

import getForecastMarkup from "../templates/forecast.hbs";

const cityName = document.querySelector(".forecast__city-name");
const forecastList = document.querySelector(".forecast__days");

export function ready() {
  OpenWeather.fetchForecast()
    .then(forecast)
    .then((data) => {
      sessionStorage.setItem("curentForecast", JSON.stringify(data));

      forecastList.innerHTML = "";

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
