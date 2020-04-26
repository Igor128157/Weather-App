import cityItemTempl from "../templates/cityItem.hbs";

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
