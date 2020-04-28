import moment from "moment";

import { getDayNumber } from "./utilities";
import { addMarkupToPage } from "./utilities";
import getForecastInfoMarkup from "../templates/forecast-info.hbs";
import { modify } from "./forecast-info";

const forecastList = document.querySelector(".forecast__days");
const forecastListInfo = document.querySelector(".forecast-info__list");

const forecast = (response) => {
  const { list } = response;

  const allDates = list.map((el) => getDayNumber(el.dt));

  const uniqueDates = allDates.filter((el, i) => allDates.indexOf(el) === i);

  const myList = uniqueDates.map((date) =>
    list.filter((el) => getDayNumber(el.dt) === date),
  );

  return { ...response, list: myList };
};

const modifyResponse = ({ list }) => {
  return list.map((day) => {
    const dayForecast = {
      dayOfWeek: "",
      date: "",
      month: "",
      tempMin: [],
      tempMax: [],
      icon: "",
    };

    day.forEach((el) => {
      const forecastDate = moment(el.dt_txt);
      const date = forecastDate.date();
      const dayOfWeek = forecastDate.format("dddd");
      const month = forecastDate.format("MMM");

      dayForecast.dayOfWeek = dayOfWeek;
      dayForecast.date = date;
      dayForecast.month = month;

      dayForecast.tempMin.push(el.main.temp_min);
      dayForecast.tempMax.push(el.main.temp_max);

      if (
        el.dt_txt.endsWith("15:00:00") ||
        el.dt_txt.endsWith("12:00:00") ||
        el.dt_txt.endsWith("09:00:00") ||
        el.dt_txt.endsWith("06:00:00") ||
        el.dt_txt.endsWith("03:00:00") ||
        el.dt_txt.endsWith("00:00:00")
      ) {
        dayForecast.icon = `http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`;
      }
    });

    dayForecast.tempMin = Math.round(Math.min(...dayForecast.tempMin));
    dayForecast.tempMax = Math.round(Math.max(...dayForecast.tempMax));

    return dayForecast;
  });
};

// EVENT LIST INFO

function showInfo(e) {
  const { target } = e;

  if (target.tagName === "LI") {
    const isActive = Array.from(target.firstElementChild.classList).includes(
      "forecast__day-name--active",
    );

    if (isActive) {
      forecastListInfo.parentElement.classList.add("hidden");
      target.firstElementChild.classList.remove("forecast__day-name--active");
      return;
    }

    Array.from(forecastList.children).forEach((el) => {
      el.firstElementChild.classList.remove("forecast__day-name--active");
    });
    target.firstElementChild.classList.add("forecast__day-name--active");
    forecastListInfo.scrollLeft = 0;
    forecastListInfo.innerHTML = "";
    forecastListInfo.parentElement.classList.remove("hidden");

    const data = JSON.parse(sessionStorage.getItem("curentForecast"));

    const details = data.list.filter((el) => {
      return getDayNumber(el[0].dt) == target.dataset.date;
    });

    const murkup = getForecastInfoMarkup(modify(...details));
    addMarkupToPage(murkup, forecastListInfo);
  }
}

forecastList.addEventListener("click", showInfo);

export { forecast, modifyResponse };
