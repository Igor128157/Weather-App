import OpenWeather from "../API/OpenWeather";
import CurrentWeather from "../templates/current-weather.hbs";
import DateInfo from "../templates/date-info.hbs";
import { addMarkupToPage } from "./utilities";
import { createCurrentWeatherObject } from "./utilities";

const weatherContainer = document.querySelector(".current-weather");
const dateInfoContainer = document.querySelector(".date-info");

function renderCurrentWeather() {
  OpenWeather.fetchCurrentWeather()
    .then(createCurrentWeatherObject)
    .then((weatherObj) => {
      weatherContainer.innerHTML = "";
      dateInfoContainer.innerHTML = "";

      const currentWeatherMarkup = CurrentWeather(weatherObj);
      const dateInfoMarkup = DateInfo(weatherObj);

      addMarkupToPage(currentWeatherMarkup, weatherContainer);
      addMarkupToPage(dateInfoMarkup, dateInfoContainer);
    });
}

function renderCurrentWeatherByLocation(geolocation) {
  OpenWeather.fetchCurrentWeatherByLocation(geolocation)
    .then(createCurrentWeatherObject)
    .then((weatherObj) => {
      weatherContainer.innerHTML = "";
      dateInfoContainer.innerHTML = "";

      const currentWeatherMarkup = CurrentWeather(weatherObj);
      const dateInfoMarkup = DateInfo(weatherObj);

      addMarkupToPage(currentWeatherMarkup, weatherContainer);
      addMarkupToPage(dateInfoMarkup, dateInfoContainer);
    });
}

export { renderCurrentWeather, renderCurrentWeatherByLocation };
