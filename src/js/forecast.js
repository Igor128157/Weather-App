import moment from "moment";

import { getDayNumber } from "./utilities";

const forecast = ({ list }) => {
  const allDates = list.map((el) => getDayNumber(el.dt));

  const uniqueDates = allDates.filter((el, i) => allDates.indexOf(el) === i);

  return uniqueDates.map((date) => {
    return list.filter((el) => {
      return getDayNumber(el.dt) === date;
    });
  });
};

const modifyResponse = (arr) => {
  return arr.map((day) => {
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

export { forecast, modifyResponse };
