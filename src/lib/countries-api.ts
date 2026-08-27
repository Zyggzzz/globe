import "server-only";

import axios from "axios";
import type { FeatureCollection, Geometry } from "geojson";
import { CountryProperties } from "@/types/map";

const countriesApi = axios.create({
  baseURL: "https://raw.githubusercontent.com/datasets/geo-countries/master/data",
  timeout: 10000,
});

export async function getCountriesGeojson() {
  const response = await countriesApi.get<FeatureCollection<Geometry, CountryProperties>>("/countries.geojson");

  return response.data;
}
