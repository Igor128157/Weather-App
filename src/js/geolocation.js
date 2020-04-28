import OpenWeather from "../API/OpenWeather";
import {allowLocation , denyLocation} from "./utilities"


//Это запрос на геолокацию. Эти коллбеки записывают в localstorage данные о геолокации,
//которые потом можно использовать(В "geolocation"). Записывают разрешил ли доступ
//пользователь. Если да,то еще широту и долготу

navigator.geolocation.getCurrentPosition(allowLocation , denyLocation);



// Это временная функция запроса Олега но по геолокации.Нужно как-то переделать.
// Я пробывал чтобы не сильно переписывать код,но не получилось.Приходится слишком много всего менять
function readyByGeolocation() {

  OpenWeather.fetchForecastByLocation()
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

export { readyByGeolocation };
