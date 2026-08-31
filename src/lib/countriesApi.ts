import axios from "axios";

export const countriesApi = axios.create({
  baseURL: "https://raw.githubusercontent.com/datasets/geo-countries/master/data",
  timeout: 10000,
});
