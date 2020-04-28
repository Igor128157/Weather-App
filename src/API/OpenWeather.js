import axios from "axios";

export default {
  endpoint: "https://api.openweathermap.org",
  apiKey: "87cf27700817ed4e92adafa080b190b6",
  _query: null,
  _temperatureUnit: "units=metric",

  async fetchForecast() {
    const queryString = `${this.endpoint}/data/2.5/forecast?q=${this._query}&appid=${this.apiKey}&${this._temperatureUnit}`;
    const { data } = await axios.get(queryString);
    return data;
  },
  async fetchForecastByGeolocation(){
    const queryString = `${this.endpoint}/data/2.5/forecast?lat=${geolocation.latitude}&lon=${geolocation.longitude}&appid=${this.apiKey}&${this._temperatureUnit}`;
    const { data } = await axios.get(queryString);
    return data;
  },
  async fetchCurrentWeather() {
    const queryString = `${this.endpoint}/data/2.5/weather?q=${this._query}&appid=${this.apiKey}&${this._temperatureUnit}`;
    const { data } = await axios.get(queryString);
    return data;
  },
  async fetchCurrentWeatherByGeolocation() {
    const queryString = `${this.endpoint}/data/2.5/weather?lat=${geolocation.latitude}&lon=${geolocation.longitude}&appid=${this.apiKey}&${this._temperatureUnit}`;
    const { data } = await axios.get(queryString);
    return data;
  },

  //Чтобы пользоваться запросвми по геолокации,нужно в области видимости этих запросов
  //стянуть с localstorage "geolocation" => const geolocation = JSON.parse(localStorage.getItem("geolocation"));

  get temperatureUnit() {
    return this._temperatureUnit;
  },

  set temperatureUnit(value) {
    this._temperatureUnit = value;
  },

  get query() {
    this._query;
  },

  set query(value) {
    this._query = value;
  },
};
