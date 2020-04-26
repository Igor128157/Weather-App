import axios from "axios";

const baseUrl = "https://pixabay.com/api";
const apiKey = "13689220-f8624404383f6a2586dfba74c";

export default {
  query: "",

  axiosCityImg() {
    const requestParams = `/?image_type=photo&orientation=horizontal&q=${this.query}&key=${apiKey}`;
    return axios.get(`${baseUrl}${requestParams}`).then((res) => {
      return res.data.hits;
    });
  },

  get searchQuery() {
    return this.query;
  },

  set searchQuery(string) {
    this.query = string;
  },
};
