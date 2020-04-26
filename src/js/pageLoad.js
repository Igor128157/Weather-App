import { addMarkupToPage, setBodyBackground } from "./utilities";
import { forecast, modifyResponse } from "./forecast";
import { getDayNumber } from "./utilities";
import { modify } from "./forecast-info";

import OpenWeather from "../API/OpenWeather";
import OpenGalleryImg from "../API/OpenGalleryImg";
import getForecastMarkup from "../templates/forecast.hbs";
import getForecastInfoMarkup from "../templates/forecast-info.hbs";

const forecastList = document.querySelector(".forecast__days");
const forecastListInfo = document.querySelector(".forecast-info__list");

export function ready() {
  OpenWeather.fetchForecast()
    .then(forecast)
    .then((arr) => {
      const modifyForecast = modifyResponse(arr);

      const murkup = getForecastMarkup(modifyForecast.slice(1));
      addMarkupToPage(murkup, forecastList);

      forecastList.addEventListener("click", (e) => {
        const { target } = e;

        if (target.tagName == "LI") {
          Array.from(forecastList.children).forEach((el) => {
            el.firstElementChild.classList.remove("forecast__day-name--active");
          });

          target.firstElementChild.classList.add("forecast__day-name--active");
          forecastListInfo.innerHTML = "";
          forecastListInfo.classList.remove("hidden");

          const details = arr.filter((el) => {
            return getDayNumber(el[0].dt) == target.dataset.date;
          });

          const murkup = getForecastInfoMarkup(modify(...details));
          addMarkupToPage(murkup, forecastListInfo);
        }
      });
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

