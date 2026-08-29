import "server-only";

import type { FeatureCollection, Geometry } from "geojson";
import { CountryProperties } from "@/types/map";
import { countriesApi } from "@/lib/countries-api";
import { db } from "..";

interface CountryJson {
  alpha3: string;
  name: string;
}

export async function getHighlightedCountryCodes(userId: number) {
  const data = await db.query.userCountriesTable.findMany({
    where: {
      userId,
    },
    columns: {
      countryIso3: true,
    },
  });

  return data.map((country) => country.countryIso3);
}

export async function getCountriesGeojson() {
  const response = await countriesApi.get<FeatureCollection<Geometry, CountryProperties>>("/countries.geojson");

  return response.data;
}
