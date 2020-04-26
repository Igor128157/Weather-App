import OpenWeather from "../API/OpenWeather";
import { ready } from "./pageLoad";

const desCelsius = document.querySelector(".celsius");
const desFahrenheit = document.querySelector(".fahrenheit");
const toggleTemperature = document.querySelector(".js-toggle");
const switchInput = document.querySelector(".js-switch-input");

const temperatureUnit = {
  metric: "units=metric",
  imperial: "units=imperial",
};

if (localStorage.getItem("temperatureUnit") !== null) {
  const tempUnitNow = localStorage.getItem("temperatureUnit");
  if (tempUnitNow === temperatureUnit.imperial) {
    OpenWeather.temperatureUnit = tempUnitNow;
    ready();
    switchInput.checked = true;
    desFahrenheit.classList.add("isActiveColor");
    desCelsius.classList.remove("isActiveColor");
  }
}

function handlerToggleClick(e) {
  if (!switchInput.checked) {
    localStorage.setItem("temperatureUnit", temperatureUnit.imperial);
    OpenWeather.temperatureUnit = temperatureUnit.imperial;
    ready();
    desCelsius.classList.remove("isActiveColor");
    desFahrenheit.classList.add("isActiveColor");
  } else {
    localStorage.setItem("temperatureUnit", temperatureUnit.metric);
    OpenWeather.temperatureUnit = temperatureUnit.metric;
    ready();
    desFahrenheit.classList.remove("isActiveColor");
    desCelsius.classList.add("isActiveColor");
  }
}

toggleTemperature.addEventListener("click", handlerToggleClick);
