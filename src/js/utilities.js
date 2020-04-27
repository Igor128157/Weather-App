import cityItemTempl from "../templates/cityItem.hbs";
import moment from "moment";

export function addMarkupToPage(murkup, elem, position = "afterbegin") {
  elem.insertAdjacentHTML(position, murkup);
}

export function getDayNumber(element) {
  const ms = element * 1000;

  return new Date(ms).getUTCDate();
}

const listCities = document.querySelector(".js-slider-list");

export function setLocalStorageCity(cityName) {
  const cities = JSON.parse(localStorage.getItem("cities"));
  if (cities === null) {
    localStorage.setItem("cities", JSON.stringify([cityName]));
    const markup = cityItemTempl(cityName);
    listCities.insertAdjacentHTML("beforeend", markup);
  } else if (!cities.includes(cityName)) {
    localStorage.setItem(
      "cities",
      JSON.stringify(!cities ? [cityName] : [...cities, cityName]),
    );
    const markup = cityItemTempl(cityName);
    listCities.insertAdjacentHTML("beforeend", markup);
  }
}

export function removeLocalStorageCity(cityName) {
  const cities = JSON.parse(localStorage.getItem("cities"));
  localStorage.setItem(
    "cities",
    JSON.stringify(cities.filter((value) => value !== cityName)),
  );
}

export function toLowCaseCity(str) {
  return str.toLowerCase();
}

export function setBodyBackground(url) {
  document.body.style.backgroundImage = `url(${url})`;
}

export function createCurrentWeatherObject(res) {
  const {
    dt,
    main: { temp, temp_min, temp_max },
    name,
    weather: [{ icon }],
    sys: { sunrise, sunset },
    timezone,
  } = res;

  const newObj = {
    dt,
    currentTime: getLocalTime().format("HH:mm:ss"),
    month: getLocalTime().format("MMMM"),
    date: getLocalTime().format("DD"),
    dayOfWeek: getLocalTime().format("ddd"),
    temp: Math.floor(temp),
    temp_max: Math.floor(temp_max),
    temp_min: Math.floor(temp_min),
    icon: `http://openweathermap.org/img/wn/${icon}@2x.png`,
    name,
    sunrise,
    sunriseTime: {
      hours: new Date(sunrise * 1000).getUTCHours(),
      mins: new Date(sunrise * 1000).getUTCMinutes(),
    },
    sunset,
    sunsetTime: {
      hours: new Date(sunset * 1000).getUTCHours(),
      mins: new Date(sunset * 1000).getUTCMinutes(),
    },
    timezone,
  };

  function getLocalTime() {
    return moment.utc(new Date().getTime()).utcOffset(timezone / 60 / 60);
  }
  
  return newObj;
}

export function allowLocation(location) {
  localStorage.removeItem("geolocation");

  const {coords: { latitude, longitude }} = location;
  const geolocation = {
    acces: true,
    latitude : +latitude.toFixed(2),
    longitude : +longitude.toFixed(2),
  };
  return localStorage.setItem("geolocation", JSON.stringify(geolocation));
}
export function denyLocation() {
  localStorage.removeItem("geolocation");
  
  const geolocation = {
    acces: false,
  };
  return localStorage.setItem("geolocation", JSON.stringify(geolocation));
}
