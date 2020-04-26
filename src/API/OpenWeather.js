import axios from "axios";

export default {
  endpoint: "https://api.openweathermap.org",
  apiKey: "87cf27700817ed4e92adafa080b190b6",
  _querry: "",
  _temperatureUnit: "units=metric",

  async fetchForecast() {
    const queryString = `${this.endpoint}/data/2.5/forecast?q=${this._querry}&appid=${this.apiKey}&${this._temperatureUnit}`;
    const { data } = await axios.get(queryString);
    return data;
  },

  get temperatureUnit() {
    return this._temperatureUnit;
  },

  set temperatureUnit(value) {
    this._temperatureUnit = value;
  },

  get querry() {
    this._querry;
  },

  set querry(value) {
    this._querry = value;
  },
};
