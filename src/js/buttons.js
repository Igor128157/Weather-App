const refs = {
  today: document.querySelector(".button-today"),
  forecast: document.querySelector(".button-forecast"),
  buttonWrapper: document.querySelector(".button-wrapper"),
  forecastWrapper: document.querySelector(".forecast"),
  dateInfo: document.querySelector(".daily"),
  currentWeather: document.querySelector(".current-weather"),
};

refs.buttonWrapper.addEventListener("click", (e) => {
  const { target } = e;
  if (target === refs.buttonWrapper) {
    return;
  }
  if (target === refs.today) {
    refs.forecast.classList.remove("selected");
    refs.forecastWrapper.style.display = "none";
    refs.dateInfo.style.display = "flex";
    refs.currentWeather.style.display = "flex";
    refs.today.classList.add("selected");
    return;
  }
  refs.today.classList.remove("selected");
  refs.forecastWrapper.style.display = "block";
  refs.dateInfo.style.display = "none";
  refs.currentWeather.style.display = "none";
  refs.forecast.classList.add("selected");
});

document.addEventListener("DOMContentLoaded", () => {
  refs.today.classList.add("selected");
});
