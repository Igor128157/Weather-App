import moment from "moment";

const modify = (arr) => {
  return arr.map((el) => {
    return {
      time: moment(el.dt * 1000).format("LT"),
      temp: Math.round(el.main.temp),
      pressure: el.main.pressure,
      humidity: el.main.humidity,
      wind: Math.round(el.wind.speed),
      icon: `http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`,
    };
  });
};

export { modify };
